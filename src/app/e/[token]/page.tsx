import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { formatMoney } from "@/lib/format";
import type { PaymentMethod } from "@/components/PaymentMethods";
import { parsePerson, type Person, type RawPerson } from "./person";
import { ExpenseShare } from "./ExpenseShare";

export const dynamic = "force-dynamic";

// Generic, PII-free — link-preview bots must not surface names or amounts.
export const metadata: Metadata = {
  title: "Expense — Hatian",
  description: "A shared expense on Hatian.",
  robots: { index: false, follow: false },
};

type RawShare = {
  payer_name: string;
  expense: { merchant: string; amount: number; currency: string; date: string; group_name: string | null };
  people: RawPerson[];
  payment_methods: PaymentMethod[];
};

async function resolve(token: string) {
  const { data, error } = await supabaseAdmin.rpc("get_expense_share", { p_token: token });
  if (error || !data) return null;
  const share = data as RawShare;

  return {
    payerName: share.payer_name,
    expense: share.expense,
    people: share.people.map(parsePerson).filter((p): p is Person => p !== null),
    methods: share.payment_methods,
  };
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-PH", { dateStyle: "medium", timeZone: "UTC" })
    .format(new Date(`${date}T00:00:00Z`));
}

export default async function ExpenseSharePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  if (!/^[a-f0-9]{32}$/.test(token)) notFound();

  const result = await resolve(token);
  if (!result) notFound();
  const { payerName, expense, people, methods } = result;

  return (
    <main className="py-16 px-6">
      <article className="max-w-lg mx-auto">
        <p className="font-body text-sm font-medium text-accent mb-2 tracking-wide uppercase">
          Paid by {payerName}
        </p>
        <h1 className="font-heading text-3xl font-extrabold text-text mb-2">{expense.merchant}</h1>
        <p className="font-body text-sm text-text-secondary mb-10">
          {[formatMoney(expense.amount, expense.currency), formatDate(expense.date), expense.group_name]
            .filter(Boolean).join(" · ")}
        </p>

        <ExpenseShare
          token={token}
          payerName={payerName}
          currency={expense.currency}
          people={people}
          methods={methods}
        />

        <a href="https://apps.apple.com/app/id0000000000" rel="noreferrer"
           className="block text-center mt-10 font-body text-sm text-accent">
          Settling up with friends? Get Hatian →
        </a>
      </article>
    </main>
  );
}
