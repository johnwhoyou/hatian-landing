"use client";
import { useState } from "react";
import { formatMoney } from "@/lib/format";
import { PaymentMethods, type PaymentMethod } from "@/components/PaymentMethods";
import { applyPayment, personKey, type Person } from "./person";

type Props = {
  token: string;
  payerName: string;
  currency: string;
  people: Person[];
  methods: PaymentMethod[];
};

export function ExpenseShare({ token, payerName, currency, people: initialPeople, methods }: Props) {
  const [people, setPeople] = useState(initialPeople);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const selected = people.find((p) => personKey(p) === selectedKey);
  const money = (amount: number) => formatMoney(amount, currency);

  if (!selected) {
    return <PersonPicker people={people} money={money} onPick={(p) => setSelectedKey(personKey(p))} />;
  }

  const replace = (updated: Person) =>
    setPeople((ps) => ps.map((p) => (personKey(p) === personKey(updated) ? updated : p)));

  return (
    <>
      <div className="flex items-baseline justify-between gap-4 mb-6">
        <h2 className="font-heading text-2xl font-extrabold text-text truncate">{selected.name}</h2>
        <button onClick={() => setSelectedKey(null)} className="shrink-0 font-body text-sm text-accent">
          Not you?
        </button>
      </div>
      <PersonView
        person={selected}
        token={token}
        payerName={payerName}
        methods={methods}
        money={money}
        onPaid={replace}
      />
    </>
  );
}

type Money = (amount: number) => string;

function statusHint(person: Person, money: Money) {
  switch (person.status) {
    case "member": return "On Hatian";
    case "owes": return money(person.owed);
    case "pending": return "Pending";
    case "settled": return "Paid";
  }
}

function PersonPicker({ people, money, onPick }: {
  people: Person[]; money: Money; onPick: (p: Person) => void;
}) {
  if (people.length === 0) {
    return <p className="font-body text-text-secondary">Nobody else is on this split.</p>;
  }
  return (
    <section>
      <h2 className="font-heading text-lg font-bold text-text mb-3">Who are you?</h2>
      <ul className="space-y-3">
        {people.map((p) => (
          <li key={personKey(p)}>
            <button onClick={() => onPick(p)}
              className="flex w-full items-center justify-between gap-4 rounded-lg border border-black/10 bg-card p-4 text-left">
              <span className="font-body font-semibold text-text truncate">{p.name}</span>
              <span className="shrink-0 font-body text-sm text-text-secondary">{statusHint(p, money)}</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

function PersonView({ person, token, payerName, methods, money, onPaid }: {
  person: Person; token: string; payerName: string; methods: PaymentMethod[];
  money: Money; onPaid: (updated: Person) => void;
}) {
  switch (person.status) {
    case "member":
      return (
        <Notice title="You're on Hatian">
          Settle up with {payerName} in the Hatian app.
        </Notice>
      );
    case "pending":
      return (
        <Notice title={`Waiting for ${payerName} to confirm`}>
          You said you paid {money(person.pending)}. {payerName} will confirm it in Hatian.
        </Notice>
      );
    case "settled":
      return <Notice title="All paid up 🎉">You&apos;re settled with {payerName} for this expense.</Notice>;
    case "owes":
      return (
        <>
          <section className="mb-10">
            <p className="font-heading text-3xl font-extrabold text-text">You owe {money(person.owed)}</p>
            {person.owed < person.share && (
              <p className="font-body text-sm text-text-secondary mt-1">Your share is {money(person.share)}.</p>
            )}
            {person.pending > 0 && (
              <p className="font-body text-sm text-text-secondary mt-3 rounded-md bg-accent-light px-3 py-2">
                {money(person.pending)} is waiting for {payerName} to confirm.
              </p>
            )}
          </section>
          <section className="mb-10">
            <PaymentMethods methods={methods} payeeName={payerName} />
          </section>
          <PayForm
            key={`${person.owed}:${person.pending}`}
            person={person}
            token={token}
            payerName={payerName}
            methods={methods}
            money={money}
            onPaid={onPaid}
          />
        </>
      );
  }
}

function Notice({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <p className="font-heading text-2xl font-bold text-text mb-2">{title}</p>
      <p className="font-body text-text-secondary">{children}</p>
    </section>
  );
}

const AMOUNT = /^\d+(\.\d{1,2})?$/;

function parseAmount(input: string, owed: number, money: Money): { amount: number } | { error: string } {
  const clean = input.replace(/,/g, "").trim();
  if (!AMOUNT.test(clean)) return { error: "Enter an amount like 250 or 250.50." };
  const amount = Number(clean);
  if (amount <= 0) return { error: "Enter an amount above zero." };
  if (Math.round(amount * 100) > Math.round(owed * 100)) {
    return { error: `That's more than you owe (${money(owed)}).` };
  }
  return { amount };
}

function methodOptions(methods: PaymentMethod[]) {
  const labels = methods.map((m) => m.label.trim().slice(0, 40)).filter(Boolean);
  if (!labels.some((l) => l.toLowerCase() === "cash")) labels.push("Cash");
  return [...new Set(labels)];
}

function errorCopy(status: number | null, payerName: string) {
  switch (status) {
    case 404: return `This link no longer works. Ask ${payerName} for a new one.`;
    case 409: return "What you owe changed since you opened this page. Reload to see the latest amount.";
    case 429: return "Too many tries. Wait a few minutes and try again.";
    default: return "Couldn't record your payment right now. Try again in a bit.";
  }
}

type Submit = { phase: "idle" } | { phase: "sending" } | { phase: "failed"; message: string };

function PayForm({ person, token, payerName, methods, money, onPaid }: {
  person: Person & { status: "owes" }; token: string; payerName: string;
  methods: PaymentMethod[]; money: Money; onPaid: (updated: Person) => void;
}) {
  const options = methodOptions(methods);
  const [amountInput, setAmountInput] = useState(String(person.owed));
  const [method, setMethod] = useState(options[0]);
  const [reference, setReference] = useState("");
  const [submit, setSubmit] = useState<Submit>({ phase: "idle" });

  const parsed = parseAmount(amountInput, person.owed, money);
  const busy = submit.phase === "sending";

  const send = async () => {
    if (!("amount" in parsed)) return;
    setSubmit({ phase: "sending" });
    const result = await fetch(`/e/${token}/pay`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        person_kind: person.kind,
        person_id: person.id,
        amount: parsed.amount,
        method_label: method,
        reference: reference.trim() || undefined,
      }),
    }).then((res) => (res.ok ? "ok" : res.status), () => null);

    if (result === "ok") {
      onPaid(applyPayment(person, parsed.amount));
      setSubmit({ phase: "idle" });
    } else {
      setSubmit({ phase: "failed", message: errorCopy(result, payerName) });
    }
  };

  const field = "w-full rounded-md border border-black/15 bg-card px-3 py-3 font-body text-text";

  return (
    <section>
      <h2 className="font-heading text-lg font-bold text-text mb-3">Paid already? Let {payerName} know</h2>
      <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); send(); }}>
        <label className="block">
          <span className="block font-body text-sm font-medium text-text mb-1">Amount</span>
          <input inputMode="decimal" autoComplete="off" value={amountInput}
            onChange={(e) => setAmountInput(e.target.value)} className={field} />
          {"error" in parsed && (
            <span className="block font-body text-sm text-red-600 mt-1">{parsed.error}</span>
          )}
        </label>

        <fieldset>
          <legend className="font-body text-sm font-medium text-text mb-2">Paid with</legend>
          <div className="flex flex-wrap gap-2">
            {options.map((label) => (
              <label key={label}
                className="cursor-pointer rounded-full border border-black/15 px-4 py-2 font-body text-sm text-text has-checked:border-accent has-checked:bg-accent-light has-focus-visible:ring-2 has-focus-visible:ring-accent">
                <input type="radio" name="method" value={label} checked={method === label}
                  onChange={() => setMethod(label)} className="sr-only" />
                {label}
              </label>
            ))}
          </div>
        </fieldset>

        <label className="block">
          <span className="block font-body text-sm font-medium text-text mb-1">
            Reference number <span className="text-text-secondary font-normal">(optional)</span>
          </span>
          <input maxLength={64} autoComplete="off" value={reference}
            onChange={(e) => setReference(e.target.value)} className={field} />
        </label>

        {submit.phase === "failed" && (
          <p role="alert" className="font-body text-sm text-red-600">{submit.message}</p>
        )}

        <button type="submit" disabled={busy || "error" in parsed}
          className="w-full rounded-md bg-accent py-3 font-body font-semibold text-white disabled:opacity-60">
          {busy ? "Sending…" : "I've paid"}
        </button>
      </form>
    </section>
  );
}
