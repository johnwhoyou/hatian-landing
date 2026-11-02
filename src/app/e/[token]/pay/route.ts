import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { formatMoney } from "@/lib/format";
import { pushToUser } from "@/lib/push";
import { parsePerson, type GuestKind, type RawPerson } from "../person";

// In-memory, so the limit holds per server instance only.
const attempts = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 5;

function allow(key: string, now: number) {
  const recent = (attempts.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  const ok = recent.length < MAX_ATTEMPTS;
  if (ok) recent.push(now);
  attempts.set(key, recent);
  return ok;
}

type GuestPayment = {
  personKind: GuestKind;
  personId: string;
  amount: number;
  methodLabel: string;
  reference: string | null;
};

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const AMOUNT = /^\d+(\.\d{1,2})?$/;

function parse(raw: unknown): GuestPayment | null {
  if (typeof raw !== "object" || raw === null) return null;
  const { person_kind, person_id, amount, method_label, reference } = raw as Record<string, unknown>;
  if (person_kind !== "contact" && person_kind !== "group_contact") return null;
  if (typeof person_id !== "string" || !UUID.test(person_id)) return null;
  if (typeof amount !== "number" || !(amount > 0) || !AMOUNT.test(String(amount))) return null;
  if (typeof method_label !== "string") return null;
  if (reference != null && typeof reference !== "string") return null;

  const methodLabel = method_label.trim();
  const ref = reference?.trim() ?? "";
  if (!methodLabel || methodLabel.length > 40 || ref.length > 64) return null;
  return { personKind: person_kind, personId: person_id, amount, methodLabel, reference: ref || null };
}

type Recorded = {
  payment_id: string; payer_id: string;
  amount: number; currency: string; merchant: string;
  person: RawPerson;
};

export async function POST(
  req: Request,
  { params }: { params: Promise<{ token: string }> },
) {
  const { token } = await params;
  if (!/^[a-f0-9]{32}$/.test(token)) return NextResponse.json({ error: "not found" }, { status: 404 });

  const payment = parse(await req.json().catch(() => null));
  if (!payment) return NextResponse.json({ error: "bad request" }, { status: 400 });

  if (!allow(`${token}:${payment.personKind}:${payment.personId}`, Date.now())) {
    return NextResponse.json({ error: "too many requests" }, { status: 429 });
  }

  const { data, error } = await supabaseAdmin.rpc("record_guest_payment", {
    p_token: token,
    p_person_kind: payment.personKind,
    p_person_id: payment.personId,
    p_amount: payment.amount,
    p_method_label: payment.methodLabel,
    p_reference: payment.reference,
  });
  if (error?.code === "P0002") return NextResponse.json({ error: "not found" }, { status: 404 });
  if (error?.code === "23514") return NextResponse.json({ error: "amount exceeds owed" }, { status: 409 });
  if (error || !data) return NextResponse.json({ error: "could not record" }, { status: 502 });

  const recorded = data as Recorded;
  const person = parsePerson(recorded.person);
  await pushToUser(recorded.payer_id, {
    title: "Payment to confirm",
    body: `${recorded.person.name} says they paid ${formatMoney(recorded.amount, recorded.currency)} for ${recorded.merchant}.`,
    data: { type: "guest_payment", paymentId: recorded.payment_id },
  });

  if (!person) return NextResponse.json({ error: "could not record" }, { status: 502 });
  return NextResponse.json({ ok: true, person });
}
