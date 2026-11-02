export type PaymentMethod = { id: string; label: string; details: Record<string, unknown> };

export function PaymentMethods({ methods, payeeName }: { methods: PaymentMethod[]; payeeName: string }) {
  return (
    <>
      <h2 className="font-heading text-lg font-bold text-text mb-3">How to pay {payeeName}</h2>
      {methods.length === 0 ? (
        <p className="font-body text-sm text-text-secondary">
          Ask {payeeName} how they&apos;d like to be paid.
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
    </>
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
