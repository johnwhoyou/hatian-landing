export type GuestKind = "contact" | "group_contact";

type Guest = { kind: GuestKind; id: string; name: string; share: number };

export type Person =
  | { status: "member"; kind: "user"; id: string; name: string; share: number }
  | (Guest & { status: "owes"; owed: number; pending: number })
  | (Guest & { status: "pending"; pending: number })
  | (Guest & { status: "settled" });

export const personKey = (p: Person) => `${p.kind}:${p.id}`;

export type RawPerson = {
  kind: string; id: string; name: string;
  share: number; owed: number; pending: number; status: string;
};

export function parsePerson(p: RawPerson): Person | null {
  const base = { id: p.id, name: p.name, share: Number(p.share) };
  if (p.status === "member") return { ...base, kind: "user", status: "member" };
  const kind: GuestKind | null = p.kind === "contact" || p.kind === "group_contact" ? p.kind : null;
  if (!kind) return null;
  const guest = { ...base, kind };
  switch (p.status) {
    case "owes": return { ...guest, status: "owes", owed: Number(p.owed), pending: Number(p.pending) };
    case "pending": return { ...guest, status: "pending", pending: Number(p.pending) };
    case "settled": return { ...guest, status: "settled" };
    default: return null;
  }
}
