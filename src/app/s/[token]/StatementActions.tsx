"use client";
import { useState } from "react";

export function StatementActions({ token, ownerName }: { token: string; ownerName: string }) {
  const [done, setDone] = useState<null | string>(null);
  const [busy, setBusy] = useState(false);

  const send = async (type: "paid" | "dispute") => {
    setBusy(true);
    try {
      const res = await fetch(`/s/${token}/action`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type }),
      });
      setDone(res.ok
        ? `We've let ${ownerName} know.`
        : `Couldn't reach ${ownerName} right now — try again later.`);
    } catch {
      setDone(`Couldn't reach ${ownerName} right now — try again later.`);
    } finally {
      setBusy(false);
    }
  };

  if (done) return <p className="text-center font-body text-sm text-text-secondary mt-6">{done}</p>;

  return (
    <div className="flex gap-3 mt-6">
      <button disabled={busy} onClick={() => send("paid")}
        className="flex-1 rounded-md bg-accent py-3 font-body font-semibold text-white disabled:opacity-60">
        I&apos;ve paid
      </button>
      <button disabled={busy} onClick={() => send("dispute")}
        className="flex-1 rounded-md border border-black/15 py-3 font-body font-semibold text-text disabled:opacity-60">
        Doesn&apos;t look right
      </button>
    </div>
  );
}
