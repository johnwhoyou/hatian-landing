# Hatian Landing Page — Design Spec

## Overview

A minimal, Keeby-inspired marketing landing page for the Hatian mobile app. Single-page design with warm "Philippine Eagle" palette, optimized for pre-launch with App Store / Google Play download buttons.

**Domain:** hatian.app
**Status:** Pre-launch — store links will be placeholder until live

## Tech Stack

- **Next.js 15** (App Router) — static generation for the landing page, extensible for blog/SEO content later
- **Tailwind CSS v4** — utility-first styling
- **TypeScript**
- **Google Fonts via `next/font`** — Outfit (headings) + Plus Jakarta Sans (body), matching the mobile app
- **Deploy target:** Vercel

## Color Palette

Directly from the mobile app's `colors.ts` (light theme):

| Token        | Value     | Usage                        |
|-------------|-----------|------------------------------|
| background  | `#FBF7F0` | Page background              |
| card        | `#FFFFFF` | Feature cards, CTA section   |
| surface     | `#F5EDE3` | Subtle backgrounds           |
| text        | `#3B2314` | Headings, body text          |
| textSecondary | `#8B7B6B` | Subtitles, descriptions    |
| border      | `#E8DFD4` | Card borders, dividers       |
| primary     | `#7B4F2A` | Links, accents               |
| accent      | `#D4943A` | Feature icon backgrounds, highlights |
| accentLight | `#FDF0DC` | Feature icon container bg    |

## Typography

| Style      | Font                    | Weight     | Size   |
|-----------|-------------------------|------------|--------|
| Display   | Outfit                  | 800        | 48px   |
| Heading   | Outfit                  | 700        | 32px   |
| Body      | Plus Jakarta Sans       | 400        | 16px   |
| Body Bold | Plus Jakarta Sans       | 600        | 16px   |
| Caption   | Plus Jakarta Sans       | 400        | 14px   |

## Page Structure

### 1. Navigation (sticky)

- **Left:** App icon (32×32 rounded square, amber gradient) + "Hatian" wordmark
- **Right:** "Download" button (dark bg `#3B2314`, light text)
- Sticks to top on scroll with subtle backdrop blur
- Max-width container centered (1024px)

### 2. Hero Section

- Centered layout, generous vertical padding
- App icon (72×72, rounded, amber-to-mahogany gradient) with eagle emoji or actual icon asset
- **Headline:** "Split expenses. Keep friends." — Outfit 800, `#3B2314`
- **Subtitle:** "The easiest way to split bills with your barkada." — Plus Jakarta Sans, `#8B7B6B`
- **CTA row:** Two side-by-side buttons:
  - "App Store" (Apple icon + text, dark bg)
  - "Google Play" (Play icon + text, dark bg)
  - Placeholder `href="#"` until launch
- **Sub-CTA text:** "Free · No ads · No subscriptions" — small, secondary color

### 3. Phone Mockup

- Centered phone device frame with placeholder interior
- White card with rounded corners and border, sized to suggest a phone screen
- Interior shows a muted message: "App screenshot" with note to swap later
- Will be replaced with actual screenshot of the Hatian home screen

### 4. Features Grid

- 2×2 grid on desktop, stacks to 1-column on mobile
- Each card: white background, 16px border-radius, centered content
  - Icon container (48×48, `#FDF0DC` background, rounded)
  - Feature name (bold, 14-16px)
  - One-line description (secondary color, 13-14px)

**The 4 features:**

| Feature            | Icon | Description                              |
|-------------------|------|------------------------------------------|
| Receipt Scanning  | 📷   | Snap a receipt, auto-split the items.    |
| Group Expenses    | 👥   | Track balances across trips & roommates. |
| Easy Settlements  | 💸   | Settle up with proof in one tap.         |
| Payment Reminders | 🔔   | Gentle nudges so you don't have to ask.  |

Note: Emoji icons are placeholders. Can be swapped for custom SVG icons later.

### 5. Closing CTA

- White background section to create visual separation
- **Headline:** "No more awkward 'you owe me' texts." — Outfit 800
- **Subtitle:** "Free forever. No ads. No subscriptions."
- **CTA row:** Same App Store / Google Play buttons as hero
- Mirrors Keeby's "Try it. You'll hear the difference." pattern

### 6. Footer

- Minimal, single line centered
- "© 2026 Hatian" + Privacy link + Terms link
- Top border divider (`#E8DFD4`)

## Responsive Behavior

- **Desktop (>768px):** Max-width 1024px container, 2×2 feature grid, side-by-side store buttons
- **Mobile (<768px):** Full-width with padding, 1-column feature grid (stacked), store buttons stack vertically
- Nav remains sticky at all breakpoints

## File Structure

```
hatian-landing/
├── src/
│   └── app/
│       ├── layout.tsx          # Root layout — fonts, metadata, global styles
│       ├── page.tsx            # Landing page (all 6 sections)
│       └── globals.css         # Tailwind directives + custom properties
├── public/
│   ├── icon.png                # App icon (copy from hatian repo)
│   └── og-image.png            # Open Graph image (create later)
├── next.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

## SEO & Metadata

- **Title:** "Hatian — Split expenses with your barkada"
- **Description:** "The easiest way to split bills, track group expenses, and settle up with friends. Free, no ads, no subscriptions."
- **Open Graph:** Title, description, og-image.png (placeholder for now)
- **Favicon:** Reuse app icon from hatian repo

## Out of Scope (for now)

- Blog / MDX content (future addition, the Next.js foundation supports it)
- Dark mode toggle (landing page is light-only for now)
- Analytics / tracking scripts
- Actual app store links (placeholder until launch)
- Custom SVG icons for features (using emoji placeholders)
