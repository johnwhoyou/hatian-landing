# Support Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a minimal `/support` page and footer link to satisfy App Store Connect's support URL requirement.

**Architecture:** One new Next.js App Router page (`src/app/support/page.tsx`) that mirrors the layout and styling of the existing `/privacy` page. One modification to `src/components/Footer.tsx` to add the navigation link.

**Tech Stack:** Next.js 16 (App Router), TypeScript, Tailwind CSS 4

---

## File Structure

- **Create:** `src/app/support/page.tsx` — Support page with metadata, heading, and contact paragraph
- **Modify:** `src/components/Footer.tsx` — Add "Support" link alongside Privacy and Terms

---

### Task 1: Create the support page

**Files:**
- Create: `src/app/support/page.tsx`

**Reference:** `src/app/privacy/page.tsx` — use the same layout structure (outer `<main>`, inner `<article>`, header block with eyebrow + heading, body section).

- [ ] **Step 1: Create `src/app/support/page.tsx`**

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support — Hatian",
  description:
    "Need help with Hatian? Reach out to our support team.",
};

export default function Support() {
  return (
    <main className="py-16 px-6">
      <article className="max-w-2xl mx-auto">
        <div className="mb-12">
          <p className="font-body text-sm font-medium text-accent mb-2 tracking-wide uppercase">
            Support
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-text leading-tight">
            Support
          </h1>
        </div>

        <div className="font-body text-text-secondary text-[15px] leading-relaxed">
          <p>
            If you have any questions, issues, or feedback about Hatian,
            we&apos;d love to hear from you. Reach out to us at{" "}
            <a
              href="mailto:support@hatian.app"
              className="text-primary font-medium hover:underline"
            >
              support@hatian.app
            </a>{" "}
            and we&apos;ll get back to you as soon as we can.
          </p>
        </div>
      </article>
    </main>
  );
}
```

- [ ] **Step 2: Verify the page renders**

Run: `npm run dev`

Open `http://localhost:3000/support` in a browser. Confirm:
- Eyebrow label "SUPPORT" appears in accent gold
- "Support" heading renders in the large bold heading font
- Body paragraph is visible with a clickable `support@hatian.app` mailto link
- Layout matches `/privacy` (same container width, spacing, typography)
- Navigation and footer render around the page (inherited from root layout)

- [ ] **Step 3: Commit**

```bash
git add src/app/support/page.tsx
git commit -m "Add support page for App Store Connect requirement"
```

---

### Task 2: Add Support link to footer

**Files:**
- Modify: `src/components/Footer.tsx`

- [ ] **Step 1: Update Footer.tsx**

Add a "Support" link after the existing Terms link. The full updated file:

```tsx
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border py-8 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <p className="font-body text-xs text-text-secondary">
          © {new Date().getFullYear()} Hatian ·{" "}
          <Link href="/privacy" className="text-primary hover:underline">
            Privacy
          </Link>{" "}
          ·{" "}
          <Link href="/terms" className="text-primary hover:underline">
            Terms
          </Link>{" "}
          ·{" "}
          <Link href="/support" className="text-primary hover:underline">
            Support
          </Link>
        </p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Verify footer link works**

Open `http://localhost:3000` in a browser. Confirm:
- Footer shows "© 2026 Hatian · Privacy · Terms · Support"
- Clicking "Support" navigates to `/support`
- Check from `/privacy` and `/terms` pages too — footer should be consistent everywhere

- [ ] **Step 3: Commit**

```bash
git add src/components/Footer.tsx
git commit -m "Add Support link to footer navigation"
```
