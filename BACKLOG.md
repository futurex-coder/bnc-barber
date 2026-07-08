# BACKLOG — prioritized (highest business value first)

## P0 — Foundation
- [x] Scaffold Next.js + Tailwind v4 + Framer Motion + testing
- [ ] Design system: tokens in globals.css, fonts (Oswald/Inter/Playfair Cyrillic)
- [ ] Typed content: data/site.ts, config/booking.ts
- [ ] Core primitives: Container, Section, Button, Reveal, motion helpers
- [ ] Root layout: fonts, metadata base, JSON-LD, skip link, lang="bg"

## P1 — Home page (the money page)
- [ ] Sticky Nav (blur+condense on scroll, mobile menu)
- [ ] Cinematic Hero (mask-reveal, 2 CTAs, 4.9★, scroll cue, parallax)
- [ ] Rotating events strip
- [ ] Infinite services marquee
- [ ] Animated stat counters
- [ ] "Магазинът" split section
- [ ] Локации (real + coming-soon)
- [ ] Екип cards (grayscale→colour)
- [ ] Услуги & цени menu
- [ ] Академия dark block + Cal.com embed
- [ ] Instagram grid
- [ ] Reviews
- [ ] Final CTA + share
- [ ] Footer

## P1 — Booking funnels
- [ ] FreshaButton (per location + per barber)
- [ ] Cal.com embed component + link fallback

## P2 — Routes
- [ ] /lokacii + /lokacii/[slug]
- [ ] /ekip
- [ ] /uslugi
- [ ] /akademiya
- [ ] /galeriya
- [ ] /za-nas
- [ ] /kontakti

## P2 — SEO/Share/A11y
- [ ] Per-page metadata + OG/Twitter
- [ ] Dynamic OG images (next/og) per location & barber
- [ ] JSON-LD LocalBusiness/HairSalon per location
- [ ] sitemap.ts + robots.ts
- [ ] A11y audit (focus, contrast, keyboard, reduced-motion)

## P2 — Quality gates
- [ ] Vitest unit tests
- [ ] Playwright smoke test (all routes, no errors)
- [ ] Lighthouse ≥95 all four (home)
- [ ] Screenshots at 390/768/1440 for every page

## P3 — Stretch
- [ ] EN toggle
- [ ] Booking modal
- [ ] Richer motion polish
- [ ] Adversarial review passes (design / eng / content-SEO)
