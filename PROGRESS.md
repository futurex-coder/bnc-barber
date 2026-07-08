# PROGRESS — Bonnie & Clyde website

Autonomous overnight build log. Newest entries at the bottom of each section.

## Build log
- Round 0 — Scaffolded Next.js 16 (App Router) + TypeScript strict + Tailwind v4 + Framer Motion. Created branch `feat/site-build`. Installed testing stack (Vitest, Playwright). Wrote BACKLOG.md.

## Key decisions & assumptions
- **Stack**: Next 16.2 / React 19 / Tailwind v4 (CSS `@theme` config, no tailwind.config.js) / Framer Motion 12. Deploy target Vercel.
- **Routes** use Bulgarian-transliterated slugs as specified: `/`, `/lokacii`, `/lokacii/[slug]`, `/ekip`, `/uslugi`, `/akademiya`, `/galeriya`, `/za-nas`, `/kontakti`.
- **Fonts**: Oswald (display, Cyrillic subset), Inter (body, Cyrillic), Playfair Display italic (one accent word). Loaded via `next/font/google`.
- **Content** is fully centralised in `src/data/site.ts`; all booking URLs in `src/config/booking.ts`.
- **Site URL** read from `NEXT_PUBLIC_SITE_URL`, falls back to a placeholder Vercel URL for OG/sitemap.

## Lighthouse scores (home `/`, desktop preset, production build)
- **Performance: 98**
- **Accessibility: 100**
- **Best Practices: 100**
- **SEO: 100**
- Re-run any time: `npm run build && npm start -- -p 3201`, then
  `CHROME_PATH="<chrome>" npx lighthouse http://localhost:3201 --preset=desktop`.
- A11y was 96 pre-fix (low-contrast `/70` grey labels + logo label-in-name);
  both fixed → 100. Perf 98: remaining cost is framer-motion JS (LCP 0.93).

## NEEDS YOU (real data / secrets to swap in)
- Real photos: hero video/poster, barber portraits, shop interior, gallery images (currently on-brand gradient placeholders).
- "Център" second location: real address, hours, map coords (currently "Очаквай скоро" placeholder).
- Barber bios/handles for 2 of 3 barbers (Alex @alexx_cutzz is real; others are placeholders).
- Academy: real price, cohort dates, curriculum specifics (placeholders in place).
- Reviews: real Google/Fresha review text + authors (placeholders in place).
- Instagram: live feed key (EmbedSocial/Elfsight/IG API) — static grid fallback is live now.
- `NEXT_PUBLIC_SITE_URL` env + Vercel deploy token (not provided → deploy-ready but not deployed).

## Next steps
- See BACKLOG.md for the live queue.
