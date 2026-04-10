# Hatian Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a minimal, Keeby-inspired marketing landing page for the Hatian expense-splitting app using Next.js 15, Tailwind CSS v4, and the app's Philippine Eagle color palette.

**Architecture:** Single-page marketing site with Next.js App Router. All landing page content lives in `page.tsx` as inline sections. Navigation and Footer are extracted to shared components in `layout.tsx` so future blog pages inherit them. Tailwind v4 CSS-first config with `@theme` for the Hatian design tokens.

**Tech Stack:** Next.js 15 (App Router), Tailwind CSS v4, TypeScript, Google Fonts via `next/font` (Outfit + Plus Jakarta Sans), Vercel deployment target.

---

## File Structure

```
hatian-landing/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout — fonts, metadata, Nav + Footer
│   │   ├── page.tsx            # Landing page — Hero, Mockup, Features, CTA
│   │   ├── globals.css         # Tailwind v4 @theme with Hatian palette
│   │   └── icon.png            # Favicon (copied from hatian app)
│   └── components/
│       ├── Navigation.tsx      # Sticky nav — logo + download button
│       └── Footer.tsx          # Minimal footer — copyright + links
├── public/
│   └── og-image.png            # Open Graph placeholder (create later)
├── next.config.ts
├── tsconfig.json
├── package.json
└── .gitignore
```

---

### Task 1: Scaffold Next.js project

**Files:**
- Create: `package.json`, `next.config.ts`, `tsconfig.json`, `.gitignore`, `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`

- [ ] **Step 1: Create the Next.js project**

Run from the parent directory. Since `hatian-landing/` already exists with docs, use `--yes` to skip prompts and scaffold in place:

```bash
cd /Users/johnwhoyou/Desktop/Personal/hatian-landing
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --yes
```

This creates the full Next.js scaffold. The `--tailwind` flag may install Tailwind v3 — we'll upgrade in the next step.

- [ ] **Step 2: Upgrade to Tailwind CSS v4**

```bash
npx @tailwindcss/upgrade@next
```

This migrates `globals.css` to the v4 `@import "tailwindcss"` syntax and removes the `tailwind.config.ts` file. If the upgrade tool isn't available or fails, do it manually:

```bash
npm install tailwindcss@latest @tailwindcss/postcss@latest
```

Then replace `src/app/globals.css` contents with:

```css
@import "tailwindcss";
```

And remove `tailwind.config.ts` if it exists. Update `postcss.config.mjs` to:

```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
export default config;
```

- [ ] **Step 3: Verify the dev server starts**

```bash
npm run dev
```

Open `http://localhost:3000` — should see the default Next.js page. Stop the server.

- [ ] **Step 4: Clean the scaffold**

Remove default content from `src/app/page.tsx` — replace with a minimal placeholder:

```tsx
export default function Home() {
  return (
    <main>
      <h1>Hatian</h1>
    </main>
  );
}
```

Remove any default font imports and body classes from `src/app/layout.tsx` (we'll set these up properly in Task 2).

- [ ] **Step 5: Copy the app icon for favicon**

```bash
cp /Users/johnwhoyou/Desktop/Personal/hatian/assets/images/icon.png /Users/johnwhoyou/Desktop/Personal/hatian-landing/src/app/icon.png
```

Next.js App Router auto-serves `src/app/icon.png` as the favicon.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "Scaffold Next.js 15 project with Tailwind CSS v4"
```

---

### Task 2: Configure theme — fonts and colors

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Set up Google Fonts in layout.tsx**

Replace `src/app/layout.tsx` with:

```tsx
import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
  weight: ["700", "800"],
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plus-jakarta",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Hatian — Split expenses with your barkada",
  description:
    "The easiest way to split bills, track group expenses, and settle up with friends. Free, no ads, no subscriptions.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${plusJakarta.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 2: Configure Tailwind v4 theme in globals.css**

Replace `src/app/globals.css` with the Hatian design tokens:

```css
@import "tailwindcss";

@theme {
  /* Fonts */
  --font-heading: var(--font-outfit), ui-sans-serif, system-ui, sans-serif;
  --font-body: var(--font-plus-jakarta), ui-sans-serif, system-ui, sans-serif;

  /* Hatian Philippine Eagle palette — light theme */
  --color-background: #FBF7F0;
  --color-card: #FFFFFF;
  --color-surface: #F5EDE3;
  --color-text: #3B2314;
  --color-text-secondary: #8B7B6B;
  --color-border: #E8DFD4;
  --color-primary: #7B4F2A;
  --color-primary-light: #F0E2D0;
  --color-accent: #D4943A;
  --color-accent-light: #FDF0DC;
}
```

- [ ] **Step 3: Verify fonts and colors work**

Update `src/app/page.tsx` temporarily to test:

```tsx
export default function Home() {
  return (
    <main className="min-h-screen bg-background p-12">
      <h1 className="font-heading text-4xl font-extrabold text-text">
        Hatian
      </h1>
      <p className="font-body text-text-secondary mt-2">
        Split expenses with your barkada
      </p>
      <div className="mt-4 rounded-xl bg-card p-6 border border-border">
        <p className="text-accent font-body font-semibold">Accent color test</p>
      </div>
    </main>
  );
}
```

Run `npm run dev` and verify at `http://localhost:3000`:
- Warm cream background
- Outfit font on heading
- Plus Jakarta Sans on body text
- White card with border renders correctly

- [ ] **Step 4: Commit**

```bash
git add src/app/globals.css src/app/layout.tsx src/app/page.tsx src/app/icon.png
git commit -m "Configure Hatian theme — fonts and color palette"
```

---

### Task 3: Build Navigation component

**Files:**
- Create: `src/components/Navigation.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Create the Navigation component**

Create `src/components/Navigation.tsx`:

```tsx
import Link from "next/link";

export function Navigation() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/50">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-primary flex items-center justify-content text-white text-sm font-bold">
            <span className="m-auto">H</span>
          </div>
          <span className="font-heading text-lg font-bold text-text">
            Hatian
          </span>
        </Link>
        <a
          href="#download"
          className="bg-text text-background px-5 py-2 rounded-lg text-sm font-body font-semibold hover:opacity-90 transition-opacity"
        >
          Download
        </a>
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: Add Navigation to root layout**

Update `src/app/layout.tsx` — add the import and render inside `<body>`:

```tsx
import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import { Navigation } from "@/components/Navigation";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
  weight: ["700", "800"],
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plus-jakarta",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Hatian — Split expenses with your barkada",
  description:
    "The easiest way to split bills, track group expenses, and settle up with friends. Free, no ads, no subscriptions.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${plusJakarta.variable} antialiased`}
    >
      <body className="bg-background text-text font-body">
        <Navigation />
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Verify**

Run `npm run dev`. Confirm:
- Sticky nav with backdrop blur at the top
- Amber-to-mahogany gradient "H" logo
- "Hatian" wordmark in Outfit font
- "Download" button on the right

- [ ] **Step 4: Commit**

```bash
git add src/components/Navigation.tsx src/app/layout.tsx
git commit -m "Add sticky Navigation component"
```

---

### Task 4: Build Hero section

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Build the Hero section in page.tsx**

Replace `src/app/page.tsx` with:

```tsx
export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="text-center pt-20 pb-12 px-6">
        <div className="max-w-5xl mx-auto">
          {/* App icon */}
          <div className="w-[72px] h-[72px] rounded-[20px] bg-gradient-to-br from-accent to-primary mx-auto mb-6 flex items-center justify-center shadow-lg">
            <span className="text-4xl">🦅</span>
          </div>

          <h1 className="font-heading text-5xl md:text-6xl font-extrabold text-text leading-tight mb-4">
            Split expenses.
            <br />
            Keep friends.
          </h1>

          <p className="font-body text-lg text-text-secondary mb-8 max-w-md mx-auto">
            The easiest way to split bills with your barkada.
          </p>

          {/* Store buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-3" id="download">
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 bg-text text-background px-7 py-3.5 rounded-xl text-base font-body font-semibold hover:opacity-90 transition-opacity"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 21.99 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 21.99C7.79 22.03 6.8 20.68 5.96 19.47C4.25 16.97 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
              </svg>
              App Store
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 bg-text text-background px-7 py-3.5 rounded-xl text-base font-body font-semibold hover:opacity-90 transition-opacity"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 20.5V3.5C3 2.91 3.34 2.39 3.84 2.15L13.69 12L3.84 21.85C3.34 21.6 3 21.09 3 20.5ZM16.81 15.12L6.05 21.34L14.54 12.85L16.81 15.12ZM20.16 10.81C20.5 11.08 20.75 11.5 20.75 12C20.75 12.5 20.53 12.9 20.18 13.18L17.89 14.5L15.39 12L17.89 9.5L20.16 10.81ZM6.05 2.66L16.81 8.88L14.54 11.15L6.05 2.66Z" />
              </svg>
              Google Play
            </a>
          </div>

          <p className="font-body text-sm text-text-secondary">
            Free · No ads · No subscriptions
          </p>
        </div>
      </section>
    </main>
  );
}
```

- [ ] **Step 2: Verify**

Run `npm run dev`. Confirm:
- Centered hero with gradient app icon
- Large headline in Outfit ExtraBold
- Subtitle in Plus Jakarta Sans
- Two dark store buttons side-by-side (stacked on mobile)
- "Free · No ads · No subscriptions" caption

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "Add Hero section with store buttons"
```

---

### Task 5: Build Phone Mockup placeholder

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Add the phone mockup section below the Hero**

In `src/app/page.tsx`, add this section inside `<main>` after the Hero `</section>`:

```tsx
      {/* Phone Mockup Placeholder */}
      <section className="pb-16 px-6">
        <div className="max-w-xs mx-auto">
          <div className="bg-card rounded-[2.5rem] border-2 border-border p-4 shadow-sm">
            <div className="bg-surface rounded-[2rem] min-h-[420px] flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center mb-3">
                <span className="text-2xl">📱</span>
              </div>
              <p className="font-body text-sm text-text-secondary">
                App screenshot
              </p>
              <p className="font-body text-xs text-accent mt-1">
                Coming soon
              </p>
            </div>
          </div>
        </div>
      </section>
```

- [ ] **Step 2: Verify**

Run `npm run dev`. Confirm:
- Rounded phone-shaped card centered below hero
- Subtle border and shadow
- Placeholder text inside

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "Add phone mockup placeholder section"
```

---

### Task 6: Build Features Grid

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Add the features data and grid section**

In `src/app/page.tsx`, add this section inside `<main>` after the Phone Mockup `</section>`:

```tsx
      {/* Features Grid */}
      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              icon: "📷",
              title: "Receipt Scanning",
              description: "Snap a receipt, auto-split the items.",
            },
            {
              icon: "👥",
              title: "Group Expenses",
              description: "Track balances across trips & roommates.",
            },
            {
              icon: "💸",
              title: "Easy Settlements",
              description: "Settle up with proof in one tap.",
            },
            {
              icon: "🔔",
              title: "Payment Reminders",
              description: "Gentle nudges so you don't have to ask.",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="bg-card rounded-2xl p-8 text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-accent-light flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">{feature.icon}</span>
              </div>
              <h3 className="font-heading text-base font-bold text-text mb-1">
                {feature.title}
              </h3>
              <p className="font-body text-sm text-text-secondary leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>
```

- [ ] **Step 2: Verify**

Run `npm run dev`. Confirm:
- 2×2 grid on desktop, stacks to 1-column on mobile
- White cards with accent-light icon backgrounds
- Feature titles in Outfit bold

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "Add 2x2 features grid section"
```

---

### Task 7: Build Closing CTA section

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Add the closing CTA section**

In `src/app/page.tsx`, add this section inside `<main>` after the Features Grid `</section>`:

```tsx
      {/* Closing CTA */}
      <section className="py-20 px-6 bg-card">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text leading-tight mb-3">
            No more awkward
            <br />
            &ldquo;you owe me&rdquo; texts.
          </h2>
          <p className="font-body text-base text-text-secondary mb-8">
            Free forever. No ads. No subscriptions.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 bg-text text-background px-7 py-3.5 rounded-xl text-base font-body font-semibold hover:opacity-90 transition-opacity"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 21.99 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 21.99C7.79 22.03 6.8 20.68 5.96 19.47C4.25 16.97 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
              </svg>
              App Store
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 bg-text text-background px-7 py-3.5 rounded-xl text-base font-body font-semibold hover:opacity-90 transition-opacity"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 20.5V3.5C3 2.91 3.34 2.39 3.84 2.15L13.69 12L3.84 21.85C3.34 21.6 3 21.09 3 20.5ZM16.81 15.12L6.05 21.34L14.54 12.85L16.81 15.12ZM20.16 10.81C20.5 11.08 20.75 11.5 20.75 12C20.75 12.5 20.53 12.9 20.18 13.18L17.89 14.5L15.39 12L17.89 9.5L20.16 10.81ZM6.05 2.66L16.81 8.88L14.54 11.15L6.05 2.66Z" />
              </svg>
              Google Play
            </a>
          </div>
        </div>
      </section>
```

- [ ] **Step 2: Verify**

Run `npm run dev`. Confirm:
- White background section creates visual break
- Large headline with smart quotes around "you owe me"
- Store buttons match hero section

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "Add closing CTA section"
```

---

### Task 8: Build Footer component

**Files:**
- Create: `src/components/Footer.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Create the Footer component**

Create `src/components/Footer.tsx`:

```tsx
export function Footer() {
  return (
    <footer className="border-t border-border py-8 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <p className="font-body text-xs text-text-secondary">
          © {new Date().getFullYear()} Hatian ·{" "}
          <a href="#" className="text-primary hover:underline">
            Privacy
          </a>{" "}
          ·{" "}
          <a href="#" className="text-primary hover:underline">
            Terms
          </a>
        </p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Add Footer to root layout**

In `src/app/layout.tsx`, add the import and render the Footer after `{children}`:

Add import at the top:
```tsx
import { Footer } from "@/components/Footer";
```

Update the body:
```tsx
<body className="bg-background text-text font-body">
  <Navigation />
  {children}
  <Footer />
</body>
```

- [ ] **Step 3: Verify**

Run `npm run dev`. Confirm:
- Footer at the bottom with top border
- Copyright with current year
- Privacy and Terms links in primary color

- [ ] **Step 4: Commit**

```bash
git add src/components/Footer.tsx src/app/layout.tsx
git commit -m "Add Footer component"
```

---

### Task 9: SEO metadata and Open Graph

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Expand metadata in layout.tsx**

Update the `metadata` export in `src/app/layout.tsx`:

```tsx
export const metadata: Metadata = {
  title: "Hatian — Split expenses with your barkada",
  description:
    "The easiest way to split bills, track group expenses, and settle up with friends. Free, no ads, no subscriptions.",
  metadataBase: new URL("https://hatian.app"),
  openGraph: {
    title: "Hatian — Split expenses with your barkada",
    description:
      "The easiest way to split bills, track group expenses, and settle up with friends. Free, no ads, no subscriptions.",
    url: "https://hatian.app",
    siteName: "Hatian",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hatian — Split expenses with your barkada",
    description:
      "The easiest way to split bills, track group expenses, and settle up with friends. Free, no ads, no subscriptions.",
  },
};
```

- [ ] **Step 2: Verify**

Run `npm run dev`. View source at `http://localhost:3000` and confirm:
- `<title>` tag is set
- `<meta name="description">` is present
- Open Graph meta tags are rendered
- Twitter card meta tags are rendered

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "Add SEO metadata and Open Graph tags"
```

---

### Task 10: Final polish and responsive verification

**Files:**
- Modify: `src/app/page.tsx` (if needed)
- Modify: `src/app/globals.css` (if needed)

- [ ] **Step 1: Add smooth scroll behavior**

Add to `src/app/globals.css` after the `@theme` block:

```css
html {
  scroll-behavior: smooth;
}
```

- [ ] **Step 2: Run production build**

```bash
npm run build
```

Verify no TypeScript errors or build warnings.

- [ ] **Step 3: Test responsive behavior**

Run `npm run dev` and test at these breakpoints:
- **Mobile (375px):** All sections stack vertically, buttons stack, feature cards 1-column
- **Tablet (768px):** Feature grid 2×2, buttons side-by-side
- **Desktop (1024px+):** Centered content with max-width, comfortable spacing

Fix any layout issues found.

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "Final polish — smooth scroll and responsive fixes"
```
