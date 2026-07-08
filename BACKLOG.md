# BACKLOG

Everything in the original scope is **done**. See PROGRESS.md for details.

## Done
- [x] Foundation: Next 16 + Tailwind v4 + Framer Motion + testing
- [x] Design system, Cyrillic fonts, typed content + booking config
- [x] Home page (all 13 sections in spec order)
- [x] Booking funnels: FreshaButton (location + barber), Cal.com embed + fallback
- [x] Routes: /lokacii (+[slug]), /ekip, /uslugi, /akademiya, /galeriya,
      /za-nas, /kontakti, 404
- [x] SEO: per-page metadata + OG/Twitter + og:url, dynamic OG images,
      JSON-LD (Org/HairSalon/Breadcrumb/FAQ), sitemap, robots
- [x] A11y: skip link, focus-trapped drawer, contrast AA, reduced-motion,
      keyboard nav — Lighthouse a11y 100
- [x] Vitest units + Playwright smoke (incl. reduced-motion regression)
- [x] Lighthouse ≥95 all four (home, desktop): 98/100/100/100
- [x] Screenshots at 390/768/1440 for every page (/screenshots)
- [x] README + PROGRESS
- [x] Three adversarial review passes (design / engineering / content-SEO)

## Optional stretch (not built — candidates for later)
- [ ] EN language toggle (BG default)
- [ ] Booking modal (currently opens Fresha in a new tab)
- [ ] Per-barber OG routes (`/ekip/[slug]` + dynamic OG cards)
- [ ] Mobile LCP: evaluate Oswald `display:"optional"` vs `swap` (see PROGRESS)
- [ ] Live Instagram feed integration
