# Support Page Design

**Date:** 2026-04-26
**Status:** Draft
**Purpose:** Satisfy App Store Connect's requirement for a support URL on the app's product page.

## Overview

Add a minimal `/support` page to the Hatian landing site. The page provides a contact email (`support@hatian.app`) for users who need help. It follows the same layout and styling conventions as the existing `/privacy` and `/terms` pages.

## Scope

Two changes:

1. **New page:** `src/app/support/page.tsx`
2. **Footer update:** Add "Support" link to `src/components/Footer.tsx`

## Page Design — `/support`

### Metadata

- **Title:** `Support — Hatian`
- **Description:** `Need help with Hatian? Reach out to our support team.`

### Layout

Uses the same container as `/privacy` and `/terms`:

- `<main className="py-16 px-6">`
- `<article className="max-w-2xl mx-auto">`

### Content

**Header block** (matches legal pages pattern):

- Eyebrow label: "Support" — styled with `text-accent`, uppercase, small, medium weight
- Heading: "Support" — `font-heading text-4xl md:text-5xl font-extrabold text-text`

**Body** (single section, `font-body text-text-secondary text-[15px] leading-relaxed`):

A short paragraph directing users to email support. The email address is a clickable `mailto:` link styled with `text-primary font-medium hover:underline` (matching the contact link style in `/privacy`).

Copy:

> If you have any questions, issues, or feedback about Hatian, we'd love to hear from you. Reach out to us at **support@hatian.app** and we'll get back to you as soon as we can.

### No additional sections

No FAQ, no form, no categories. This is intentionally minimal — enough to meet the App Store requirement and give users a clear way to contact support.

## Footer Update

Add a "Support" link between the existing Privacy and Terms links in `src/components/Footer.tsx`:

**Current:** `© 2026 Hatian · Privacy · Terms`
**Updated:** `© 2026 Hatian · Privacy · Terms · Support`

The link uses the same `text-primary hover:underline` styling and points to `/support`.

## Styling

No new design tokens, components, or CSS. Everything uses existing Tailwind classes and theme variables already defined in `globals.css`.

## URL for App Store Connect

Once deployed: `https://hatian.app/support`
