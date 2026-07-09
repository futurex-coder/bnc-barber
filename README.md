# Bonnie & Clyde — Барбершоп & Академия, Русе

Marketing site for a real barbershop + barber academy in Ruse, Bulgaria.
Dark, cinematic, modern-premium. Bulgarian (Cyrillic) first.

**Stack:** Next.js 16 (App Router) · TypeScript (strict) · Tailwind CSS v4 ·
Framer Motion · deployed to Vercel.

---

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
```

Other scripts:

```bash
npm run build        # production build
npm start            # serve the production build
npm run typecheck    # tsc --noEmit
npm run lint         # eslint
npm test             # Vitest unit tests
npm run test:e2e     # Playwright smoke tests (builds + serves automatically)
npm run shots        # screenshot every route at 390/768/1440 into /screenshots
```

`npm run shots` expects a server on `http://localhost:3100` (or set `BASE_URL`).
Set `REDUCED=1` to capture with `prefers-reduced-motion`.

---

## Where the content lives

**All editable content is typed and centralised — no copy is hardcoded in JSX.**

| File | What it holds |
| --- | --- |
| [`src/data/site.ts`](src/data/site.ts) | Locations, barbers, services, academy modules, events, reviews, stats, gallery, FAQ. |
| [`src/config/site.ts`](src/config/site.ts) | Business name, phone, email, Instagram handles, site URL. |
| [`src/config/booking.ts`](src/config/booking.ts) | **Single source of truth for every booking URL.** |
| [`src/config/nav.ts`](src/config/nav.ts) | Primary navigation items. |

To change text, prices, hours, team, etc., edit `src/data/site.ts`. Types guard
the shape, so `npm run typecheck` will catch mistakes.

### Swapping booking links

Everything funnels through [`src/config/booking.ts`](src/config/booking.ts):

- **Haircuts → Fresha.** `fresha[locationSlug]` per location; `freshaByBarber`
  for per-barber deep links (falls back to the location URL, then the flagship).
  Rendered by `<FreshaButton locationSlug=… />` / `<FreshaButton barberSlug=… />`.
- **Academy → Cal.com.** `calcom.link` / `calcom.url`. The live inline embed is
  gated behind `calcom.embedEnabled` (env `NEXT_PUBLIC_CALCOM_EMBED=1`) because
  the placeholder account 404s — until the real Cal.com account exists the
  styled link-out fallback is shown. Flip the flag to turn on the real embed.

The two funnels are kept deliberately separate and never compete.

### Swapping photos

Every image slot uses [`<SmartImage>`](src/components/ui/SmartImage.tsx). Pass a
`src` and it renders an optimised `next/image`; omit `src` and it renders an
on-brand gradient placeholder with the brand monogram (so nothing ever looks
broken). To add real photos:

1. Drop files in `public/` (e.g. `public/team/alex.jpg`).
2. Pass the path: `<SmartImage src="/team/alex.jpg" alt="…" className="absolute inset-0" />`.
   Keep the `absolute inset-0` (or another fill class) so it fills its parent.

Hero video: the hero currently uses a gradient backdrop
([`Hero.tsx`](src/components/sections/Hero.tsx)). Swap the `.img-fallback` layer
for a `<video>`/`next/image` poster when footage is ready.

### Swapping the Instagram feed

[`InstagramGrid`](src/components/sections/InstagramGrid.tsx) renders a static,
feed-ready grid. To wire a live feed (EmbedSocial / Elfsight / IG Basic Display
API), replace the `SmartImage` placeholders with the feed's images or embed —
the layout already matches a 6-up grid.

---

## Routes

`/` · `/lokacii` · `/lokacii/[slug]` · `/ekip` · `/ekip/[slug]` (per-barber
profiles) · `/uslugi` · `/akademiya` · `/sabitiya` (events & tattoo guests) ·
`/gosti/[slug]` (guest residency pages) · `/galeriya` · `/za-nas` · `/kontakti`
· custom `not-found`.

Dynamic OG images via `next/og`: site-wide, **per location, per barber, and per
guest**. `sitemap.xml` and `robots.txt` are generated. JSON-LD: `Organization` +
`HairSalon`/`LocalBusiness` per location, `Person` per barber, `Event` per guest
residency, `BreadcrumbList`, and `FAQPage`.

### Guests & events

`src/data/site.ts` → `guests` (tattoo artists + guest barbers, with residency
dates/styles) and `events`. The home **GuestSpotlight** features the flagged
`featured` guest; `/sabitiya` lists all guests plus an **EventsTimeline** that
merges events + residencies, sorts by date, and drops past ones client-side.

---

## Design system

Tokens live in [`src/app/globals.css`](src/app/globals.css) under Tailwind v4
`@theme` (no `tailwind.config.js`):

- Palette: `base #0a0a0b` · `ink #f4f1ea` · `grey #9a958c` ·
  `gold #c9a227→#e7c65a` (sparingly) · `oxblood #7c1f2b`. Hairlines
  `rgba(244,241,234,.09)`. Radius `16px`.
- Type: **Oswald** (condensed display, Cyrillic) · **Inter** (body) ·
  **Playfair Display italic** (one accent word per headline). Loaded via
  `next/font` with Cyrillic subsets.
- Motion respects `prefers-reduced-motion` end to end: a hydration-safe
  `usePrefersReducedMotion` hook, `MotionConfig reducedMotion="user"`, and CSS
  `@media` rules. Above-the-fold hero reveals are CSS-driven so they don't gate
  LCP behind hydration.
- **Atmospheric background** (`SiteBackground` + `.site-bg` in globals.css): a
  fixed layer of slow-drifting gold/oxblood auroras, a dot grid, grain and a
  vignette — dark enough to keep text AA. Not flat black.
- **Motion touches**: route transitions (`app/template.tsx`, first paint skips
  the animation so LCP is safe), a nav scroll-progress line, magnetic CTAs
  (`Magnetic`), and a cursor-following card glow (`CardGlow` + `.card-glow`,
  one delegated listener, off on touch). All reduced-motion aware.

---

## Deploy to Vercel

1. Push the branch and import the repo in Vercel (framework auto-detected).
2. Set env vars:
   - `NEXT_PUBLIC_SITE_URL` → the production domain (used for canonicals,
     `metadataBase`, sitemap, robots, OG, JSON-LD `@id`s). **Set this before
     launch** or those default to a placeholder Vercel URL.
   - `NEXT_PUBLIC_CALCOM_EMBED=1` → only once the real Cal.com account exists.
3. Build command `next build`, output auto. No other secrets required; there are
   no paid APIs (the map is a keyless OpenStreetMap embed).

---

## Testing

- **Vitest** — unit tests for helpers, booking-URL resolution, and content
  invariants (`src/**/*.test.ts`).
- **Playwright** — smoke test loads every route and asserts no console/page
  errors, one `<h1>` per page, the Fresha CTA target, the keyboard skip-link,
  and clean hydration under `prefers-reduced-motion`
  ([`e2e/smoke.spec.ts`](e2e/smoke.spec.ts)).

See [`PROGRESS.md`](PROGRESS.md) for the build log, Lighthouse scores, and the
**NEEDS YOU** list of real data/secrets still to supply.
