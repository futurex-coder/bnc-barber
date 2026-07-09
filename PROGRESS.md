# PROGRESS — Bonnie & Clyde website

Autonomous overnight build log. Read this first in the morning.

## TL;DR
A complete, production-ready Next.js 16 site for Bonnie & Clyde (barbershop +
academy, Ruse). Fully responsive, Bulgarian copy, two separate booking funnels
(Fresha + Cal.com), full SEO/OG/JSON-LD, tests passing, clean build/typecheck/
lint. **Lighthouse home desktop: 100 / 100 / 100 / 100.** Branch:
`feat/site-build`. Run it with `npm run dev`.

## Follow-up round (per later requests)
- **Atmospheric background** — replaced flat black with a fixed cinematic layer:
  slow-drifting gold/oxblood auroras, dot grid, grain, vignette. Still AA.
- **Tattoo guests & events (the "fancy part")** — `guests` data (tattoo artists
  + guest barbers with residency dates/styles); home **GuestSpotlight**
  (glow-border portrait + rotating GUEST badge + featured guest); `/sabitiya`
  page with guest cards + an animated **EventsTimeline** (merges events +
  residencies, oxblood=guest / gold=event, filters past); `/gosti/[slug]` guest
  pages with per-guest OG cards + `Event` JSON-LD.
- **Every team member has its own page** — `/ekip/[slug]` barber profiles (+ OG,
  `Person` JSON-LD); guests get `/gosti/[slug]`. Linked from home cards and the
  `/ekip` overview.
- **Professional motion** — route transitions (LCP-safe), nav scroll-progress
  line, magnetic CTAs, cursor-following card glow. All reduced-motion aware.
- Result: home desktop Lighthouse rose to **100 / 100 / 100 / 100**.

## What I built
- **Foundation** — Next 16 App Router + TS strict + Tailwind v4 (`@theme`
  tokens) + Framer Motion. Oswald/Inter/Playfair with Cyrillic subsets. All
  content typed in `src/data/site.ts`; all booking URLs in `src/config/booking.ts`.
- **Home** — cinematic hero (mask-reveal, two equal CTAs, 4.9★, scroll cue,
  parallax) → rotating events strip → infinite services marquee → animated stat
  counters → "Магазинът" split → Локации (real + coming-soon) → Екип cards
  (grayscale→colour) → Услуги & цени menu → dark Академия block (Cal.com) →
  Instagram grid → reviews → final CTA + share → footer.
- **Routes** — `/lokacii` (+ per-location detail with hours, keyless OSM map,
  team, JSON-LD), `/ekip` (+ per-barber profile pages `/ekip/[slug]` with
  shareable OG cards & Person JSON-LD), `/uslugi`, `/akademiya`, `/galeriya`,
  `/za-nas`, `/kontakti`, custom 404.
- **Booking** — `<FreshaButton>` per location & per barber (Fresha); Cal.com
  embed component with link fallback, gated behind a flag until the real account
  exists (keeps the console clean).
- **SEO/Share/A11y** — per-page metadata + OG/Twitter + per-page `og:url`;
  dynamic `next/og` images (site + per location); JSON-LD Organization /
  HairSalon / Breadcrumb / FAQPage; `sitemap.ts` + `robots.ts`; `lang="bg"`,
  skip link, focus-trapped mobile drawer, WCAG AA contrast, full reduced-motion
  support; Web Share + copy-link.
- **Tests** — Vitest (15 unit tests: helpers, booking resolution, content
  invariants) + Playwright (14: every route error-free, 404, skip-link, Fresha
  CTA, reduced-motion hydration).

## Adversarial review passes (done, all findings fixed)
- **Engineering** (subagent): fixed build-time "today" freeze (now client-side
  via `useSyncExternalStore`), focusable-hidden aria bug, mobile-drawer focus
  trap, duplicate academy modules, dead code, heading order, no-JS reveal
  fallback, past-event filtering.
- **Content/SEO** (subagent): natural Bulgarian fixes (Alex→Алекс,
  мастер→майстор, removed visible "placeholder" text, de-Englished
  taglines/bullets), per-page `og:url`, E.164 phone + logo in JSON-LD, dropped
  placeholder street address from coming-soon structured data.
- **Design** (self, via screenshots at 3 breakpoints): found & fixed a real bug
  where image-slot placeholders collapsed to height 0 (gallery/about/shop/
  location) — now every slot fills with a branded monogram on an on-brand
  gradient.
- **Reduced-motion verification** caught a hydration mismatch (React #418) from
  framer's `useReducedMotion`; replaced with a hydration-safe hook + a Playwright
  regression test.

## Lighthouse scores (home `/`, production build)
| Category | Desktop | Mobile |
| --- | --- | --- |
| Performance | **100** | 89 |
| Accessibility | **100** | **100** |
| Best Practices | **100** | **100** |
| SEO | **100** | **100** |

- Desktop is a perfect 100 on all four (the CSS-driven hero + atmospheric CSS
  background actually improved it from 98).
- Mobile Performance is 89: FCP 1.0s, TBT ~40ms, CLS 0 — the only drag is LCP
  (~3.8s under Lighthouse's simulated slow-4G + 4× CPU), bound by the Cyrillic
  **Oswald** display-font swap on the huge hero headline. I kept `display:swap`
  so the brand typography always renders on first paint. Switching Oswald to
  `display:"optional"` would push mobile to ~95 at the cost of showing the
  fallback font (not Oswald) on first visits over slow connections — a brand
  trade-off left for you to decide.
- Re-run: `npm run build && npm start -- -p 3311`, then
  `CHROME_PATH="<chrome>" npx lighthouse http://localhost:3311 --preset=desktop`
  (omit `--preset` for mobile).

## Definition-of-done checklist
- [x] `npm run build`, `tsc --noEmit`, `eslint` all clean
- [x] No console errors / hydration warnings on any page (normal + reduced motion)
- [x] Responsive at 390 / 768 / 1440 — screenshots in `/screenshots`, inspected
- [x] Lighthouse ≥95 all four (home, desktop) — recorded above
- [x] Reduced-motion works; keyboard-only nav + skip link work
- [x] Vitest units + Playwright smoke pass
- [x] README: run / edit content / swap booking+IG+photos / deploy
- [x] Clean git history on `feat/site-build`, frequent commits

## NEEDS YOU (real data / secrets to swap in)
- **Real photos**: hero video/poster, barber portraits, shop interior, gallery,
  Instagram. All currently branded gradient placeholders (`<SmartImage src=…>`).
- **"Център" location**: real address, hours, map coords (now "Очаквай скоро").
- **Barbers**: Мартин & Крис are placeholders (names, bios, personal Instagram/
  Fresha links). Alex/Алекс (@alexx_cutzz) is real.
- **Guest artists** (`guests` in site.ts): all placeholders — real tattoo/guest
  names, styles, residency dates, photos and Instagram handles to swap in.
- **Academy**: real price, cohort dates, curriculum specifics.
- **Reviews**: real Google/Fresha text + authors; sync `aggregateRating.count`.
- **Instagram**: live-feed key (EmbedSocial/Elfsight/IG API). Static grid is the
  fallback.
- **Env**: `NEXT_PUBLIC_SITE_URL` (real domain) and `NEXT_PUBLIC_CALCOM_EMBED=1`
  once the real Cal.com account exists. No Vercel deploy token was provided → the
  site is deploy-ready but not deployed.
- **Contact email** `hello@bonnieclyde.bg` is a placeholder (not shown on-site).
- **Currency**: prices are in `лв.` (BGN). If the shop has moved to EUR, update
  `src/data/site.ts` prices and `currenciesAccepted` in the JSON-LD.

## Suggested next steps
- Drop in real photos + the hero video (biggest visual upgrade).
- Decide the Oswald `swap` vs `optional` trade-off for mobile LCP.
- Fill real barber data and academy price/dates; flip the Cal.com embed flag.
- Optional stretch not built: EN language toggle, booking modal.

## Assumptions made
- Bulgarian-transliterated route slugs (`/lokacii`, `/ekip`, …) per the spec.
- Keyless OpenStreetMap embed for maps (no paid Google Maps key).
- Cal.com embed off by default (placeholder account 404s) — link fallback shown.
- Flagship geo coords are approximate (Здравец Изток) — verify before launch.
