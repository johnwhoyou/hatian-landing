import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { StatementActions } from "./StatementActions";

export const dynamic = "force-dynamic";

// Generic, PII-free — link-preview bots must not surface names or amounts.
export const metadata: Metadata = {
  title: "Statement — Hatian",
  description: "A shared expense statement on Hatian.",
  robots: { index: false, follow: false },
};

type Net = { currency: string; amount: number };
type HistoryRow = {
  kind: "expense" | "settlement"; id: string; sort_key: string;
  merchant: string | null; amount: number; currency: string;
  direction: "theyOweMe" | "iOweThem" | "outgoing" | "incoming";
  payer_name: string | null; method_label: string | null;
};
type Statement = { owner_name: string; contact_name: string; nets: Net[]; history: HistoryRow[] };
type PaymentMethod = { id: string; label: string; details: Record<string, unknown> };

function fmt(amount: number, currency: string) {
  try {
    return new Intl.NumberFormat("en-PH", { style: "currency", currency }).format(amount);
  } catch {
    return `${currency} ${amount.toFixed(2)}`;
  }
}

async function resolve(token: string) {
  const { data: link } = await supabaseAdmin
    .from("contact_share_links")
    .select("owner_id, contact_id, revoked_at")
    .eq("token", token)
    .maybeSingle();
  if (!link || link.revoked_at) return null;

  const { data: statement, error } = await supabaseAdmin.rpc("get_contact_statement", {
    p_owner: link.owner_id, p_contact: link.contact_id,
  });
  if (error || !statement) return null;

  const { data: methods } = await supabaseAdmin
    .from("user_payment_methods")
    .select("id, label, details")
    .eq("user_id", link.owner_id)
    .order("sort_order", { ascending: true });

  return { statement: statement as Statement, methods: (methods ?? []) as PaymentMethod[] };
}

export default async function StatementPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  if (!/^[a-f0-9]{32}$/.test(token)) notFound();      // malformed → uniform 404

  const result = await resolve(token);
  if (!result) notFound();
  const { statement, methods } = result;

  return (
    <main className="py-16 px-6">
      <article className="max-w-lg mx-auto">
        <p className="font-body text-sm font-medium text-accent mb-2 tracking-wide uppercase">
          Statement from {statement.owner_name}
        </p>
        <h1 className="font-heading text-3xl font-extrabold text-text mb-6">{statement.contact_name}</h1>

        {/* Net balance */}
        <section className="mb-10">
          {statement.nets.length === 0 ? (
            <p className="font-heading text-2xl font-bold text-text">All settled up 🎉</p>
          ) : (
            statement.nets.map((n) => (
              <p key={n.currency} className="font-heading text-3xl font-extrabold text-text">
                {n.amount >= 0 ? "You owe " : `${statement.owner_name} owes you `}
                {fmt(Math.abs(n.amount), n.currency)}
              </p>
            ))
          )}
        </section>

        {/* Payment details */}
        {statement.nets.some((n) => n.amount > 0) && (
          <section className="mb-10">
            <h2 className="font-heading text-lg font-bold text-text mb-3">How to pay {statement.owner_name}</h2>
            {methods.length === 0 ? (
              <p className="font-body text-sm text-text-secondary">
                Ask {statement.owner_name} how they&apos;d like to be paid.
              </p>
            ) : (
              <ul className="space-y-3">
                {methods.map((m) => (
                  <li key={m.id} className="rounded-lg border border-black/10 p-4">
                    <p className="font-body font-semibold text-text">{m.label}</p>
                    <PaymentDetail details={m.details} />
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

        {/* History */}
        <section className="mb-10">
          <h2 className="font-heading text-lg font-bold text-text mb-3">History</h2>
          <ul className="divide-y divide-black/10">
            {statement.history.map((row) => {
              const positive = row.direction === "theyOweMe" || row.direction === "outgoing";
              return (
                <li key={`${row.kind}:${row.id}`} className="flex items-center justify-between py-3">
                  <div className="min-w-0">
                    <p className="font-body text-[15px] text-text truncate">
                      {row.kind === "expense" ? row.merchant : "Settlement"}
                    </p>
                    <p className="font-body text-xs text-text-secondary truncate">
                      {row.kind === "expense" ? `Paid by ${row.payer_name}` : row.method_label || "Settlement"}
                    </p>
                  </div>
                  <span className={`font-body font-semibold ${positive ? "text-green-600" : "text-red-600"}`}>
                    {positive ? "+" : "−"}{fmt(row.amount, row.currency)}
                  </span>
                </li>
              );
            })}
          </ul>
        </section>

        <StatementActions token={token} ownerName={statement.owner_name} />

        <a href="https://apps.apple.com/app/id0000000000" rel="noreferrer"
           className="block text-center mt-10 font-body text-sm text-accent">
          Settling up with friends? Get Hatian →
        </a>
      </article>
    </main>
  );
}

function PaymentDetail({ details }: { details: Record<string, unknown> }) {
  const line = (details.phone as string) || (details.account_number as string) ||
    (details.account_id as string) || (details.notes as string) || "";
  const qr = details.qr_url as string | undefined;
  return (
    <>
      {line && <p className="font-body text-sm text-text-secondary mt-1">{line}</p>}
      {qr && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={qr} alt="Payment QR" className="mt-3 w-40 h-40 rounded-md object-contain" />
      )}
    </>
  );
}
