import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { formatMoney } from "@/lib/format";
import { pushToUser } from "@/lib/push";

// ponytail: in-memory per-token rate limit. Single-instance only; move to a
// shared store (Supabase table / Upstash) if the site scales past one node.
const lastSent = new Map<string, number>();
const WINDOW_MS = 10 * 60 * 1000;

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

  const body = type === "paid"
    ? `${contactName} says they paid${topNet ? " " + formatMoney(Math.abs(topNet.amount), topNet.currency) : ""}.`
    : `${contactName} flagged their statement — take a look.`;

  const sent = await pushToUser(link.owner_id, {
    title: type === "paid" ? "Payment update" : "Statement flagged",
    body,
    data: { type: "statement_action", contactId: link.contact_id },
  });
  if (!sent) return NextResponse.json({ error: "unreachable" }, { status: 502 });

  lastSent.set(key, now);
  return NextResponse.json({ ok: true });
}
