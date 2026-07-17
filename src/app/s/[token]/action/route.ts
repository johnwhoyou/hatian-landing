import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

// ponytail: in-memory per-token rate limit. Single-instance only; move to a
// shared store (Supabase table / Upstash) if the site scales past one node.
const lastSent = new Map<string, number>();
const WINDOW_MS = 10 * 60 * 1000;

function fmt(amount: number, currency: string) {
  try { return new Intl.NumberFormat("en-PH", { style: "currency", currency }).format(amount); }
  catch { return `${currency} ${amount.toFixed(2)}`; }
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ token: string }> },
) {
  const { token } = await params;
  if (!/^[a-f0-9]{32}$/.test(token)) return NextResponse.json({ error: "not found" }, { status: 404 });

  const { type } = (await req.json().catch(() => ({}))) as { type?: string };
  if (type !== "paid" && type !== "dispute") {
    return NextResponse.json({ error: "bad type" }, { status: 400 });
  }

  const key = `${token}:${type}`;
  const now = Date.now();
  if (now - (lastSent.get(key) ?? 0) < WINDOW_MS) {
    return NextResponse.json({ ok: true }); // silently succeed; don't reveal rate-limit
  }

  const { data: link } = await supabaseAdmin
    .from("contact_share_links")
    .select("owner_id, contact_id, revoked_at")
    .eq("token", token)
    .maybeSingle();
  if (!link || link.revoked_at) return NextResponse.json({ error: "not found" }, { status: 404 });

  const { data: statement } = await supabaseAdmin.rpc("get_contact_statement", {
    p_owner: link.owner_id, p_contact: link.contact_id,
  });
  const contactName: string = statement?.contact_name ?? "Someone";
  const topNet = (statement?.nets ?? [])[0] as { currency: string; amount: number } | undefined;

  const { data: owner } = await supabaseAdmin
    .from("users").select("expo_push_token").eq("id", link.owner_id).maybeSingle();
  if (!owner?.expo_push_token) return NextResponse.json({ error: "unreachable" }, { status: 502 });

  const body = type === "paid"
    ? `${contactName} says they paid${topNet ? " " + fmt(Math.abs(topNet.amount), topNet.currency) : ""}.`
    : `${contactName} flagged their statement — take a look.`;

  const push = await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      to: owner.expo_push_token,
      title: type === "paid" ? "Payment update" : "Statement flagged",
      body,
      data: { type: "statement_action", contactId: link.contact_id },
      sound: "default",
    }),
  });
  if (!push.ok) return NextResponse.json({ error: "push failed" }, { status: 502 });

  lastSent.set(key, now);
  return NextResponse.json({ ok: true });
}
