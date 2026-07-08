You are the lead engineer + designer for this project, working an autonomous overnight shift. Build the Bonnie & Clyde barbershop + academy website and make it genuinely excellent.

════════════════════════════════════════
OPERATING MODE — READ FIRST
════════════════════════════════════════
- Work FULLY AUTONOMOUSLY. Do NOT stop to ask me questions or wait for confirmation. When you hit a decision, pick the best option, write down the assumption in PROGRESS.md, and keep moving. Assume "yes" to any reasonable choice.
- You have my full trust to act: create files, install packages, run builds, run the dev server, take screenshots, run tests and linters, refactor, and commit to git. Do it.
- Keep going until the site is genuinely excellent — not "done", excellent. Iterate in rounds (see WORK LOOP). Use the whole night. Quality and polish are the goal; there is no prize for finishing early.
- Every meaningful step: commit to git with a clear message, and append one line to PROGRESS.md (what you did, why, what's next). I will read PROGRESS.md in the morning.
- If something is genuinely blocked (needs a secret/paid account I haven't provided), skip it gracefully, stub it cleanly, log it under "NEEDS YOU" in PROGRESS.md, and continue with everything else.

════════════════════════════════════════
CONTEXT / SOURCE OF TRUTH
════════════════════════════════════════
- If this repo already contains a design prototype (an .html design file) and/or a Next.js starter and a README describing the brand, TREAT THOSE AS THE SOURCE OF TRUTH for look, content, structure and config. Port/extend them — do not reinvent the look.
- If nothing is here yet, initialise a fresh Next.js project to the spec below.
- The brand is a real business in Ruse, Bulgaria. The primary site language is BULGARIAN (Cyrillic). Copy must be in natural Bulgarian, not translated-sounding.

REAL DATA (use exactly; do not invent over these):
- Business: Bonnie & Clyde — Барбершоп & Академия, Русе.
- Phone: 0882 031 790
- Flagship address: ул. Нови Сад 4, Здравец Изток, Русе
- Second location: "Център" — mark as "Очаквай скоро" (coming soon); address is a placeholder for now.
- Instagram: shop @bonnienclyde_ruse ; founder/barber Alex @alexx_cutzz
- Fresha (cuts) flagship: https://www.fresha.com/book-now/bonnie-and-clyde-ruse-rpupecsw/all-offer
- Cal.com (academy call): https://cal.com/bonnie-clyde/consult
Anything not listed above (2nd address, 3 of the barber bios/handles, academy price/dates, review text, photos, hero video) is a PLACEHOLDER — make it realistic, on-brand, clearly swappable, and list it under "NEEDS YOU" in PROGRESS.md.

════════════════════════════════════════
TECH STACK
════════════════════════════════════════
- Next.js (App Router) + TypeScript (strict) + Tailwind CSS + Framer Motion. Deploy target: Vercel.
- next/image for images. next/font for fonts. Server components by default; client components only where interactivity/motion needs them.
- Keep ALL editable content in typed data files: data/site.ts (locations, barbers, services, academy modules, events, reviews) and config/booking.ts (single source of truth for all booking URLs). Components read from these — no hardcoded content in JSX.

════════════════════════════════════════
BRAND & DESIGN SYSTEM (match precisely)
════════════════════════════════════════
- Palette: base #0a0a0b · ink #f4f1ea · grey #9a958c · gold #c9a227→#e7c65a (use sparingly, ~8%) · oxblood #7c1f2b. Hairline borders rgba(244,241,234,.09). 16px card radius. Generous whitespace. Dark, cinematic, modern-premium — NOT vintage.
- Type: **Oswald** for condensed display headlines (MUST support Cyrillic — do not use Bebas Neue, it has no Cyrillic), **Inter** for body, **Playfair Display italic** for a single accent word per headline. Load Cyrillic subsets.
- Motion is the "wow": mask-reveal hero (lines rise on load), scroll-triggered reveals with stagger, animated stat counters, sticky nav that blurs+condenses on scroll, infinite services marquee, gentle hero parallax, hover micro-interactions (buttons lift w/ gold glow; cards raise + border warms to gold; barber photos grayscale→colour). Curve cubic-bezier(.22,1,.36,1), 0.6–0.9s. ALL motion must respect prefers-reduced-motion.
- Every image slot needs an on-brand gradient fallback so nothing ever looks broken.

════════════════════════════════════════
PAGES / SECTIONS (Bulgarian copy)
════════════════════════════════════════
Home (in order): sticky Nav → cinematic Hero with two equal-weight CTAs "Запази час" (clients→Fresha) and "Влез в Академията" (aspiring barbers→Academy) + 4.9★ badge + scroll cue → rotating events strip → infinite services marquee → animated stats → "Магазинът" split → Локации (Здравец Изток real + Център coming-soon) → Екип cards → "Услуги & цени" full menu with duration+price → dark Академия block with Cal.com booking → Instagram grid → Google/Fresha reviews → final CTA with share buttons → Footer.
Routes: / , /lokacii + /lokacii/[slug] , /ekip , /uslugi , /akademiya (with book-a-call) , /galeriya , /za-nas , /kontakti. (Use clean Bulgarian-slug or English-slug routes consistently — your call.)
Optional stretch: EN language toggle (BG default).

════════════════════════════════════════
BOOKING (two funnels, never competing)
════════════════════════════════════════
- config/booking.ts is the single source of truth: fresha per location slug, freshaByBarber per barber, calcom for academy.
- Cuts → Fresha: <FreshaButton locationSlug="zdravets-iztok"/> opens the matching URL (button or modal). Barber "Запази с [name]" buttons use freshaByBarber; fall back to the location URL.
- Academy calls → Cal.com: real embed <Cal calLink="bonnie-clyde/consult"/> (@calcom/embed-react), with a plain link fallback. Keep the two systems visually and structurally separate.

════════════════════════════════════════
SEO / SHARE / A11Y / PERF (all required)
════════════════════════════════════════
- Per-page Open Graph + Twitter summary_large_image. Dynamic OG images via next/og (ImageResponse) per location & barber.
- JSON-LD HairSalon/LocalBusiness per location (name, geo, hours, priceRange, aggregateRating, telephone). sitemap.ts + robots.ts. Semantic HTML, correct lang="bg".
- WCAG AA: contrast, focus states, keyboard nav, alt text, aria labels, reduced-motion.
- Performance: optimise images, lazy-load, minimal client JS. Target Lighthouse ≥95 on Performance/Accessibility/Best-Practices/SEO for the home page.
- Instagram: build the grid to accept a live feed (EmbedSocial/Elfsight/SociableKit or IG Basic Display API), with the static gradient grid as fallback.

════════════════════════════════════════
DEFINITION OF DONE (the quality bar)
════════════════════════════════════════
1. `npm run build` passes clean; `tsc --noEmit` clean; `next lint` clean.
2. All pages render with no console errors and no hydration warnings.
3. Fully responsive: verified at 390px, 768px, 1440px via screenshots you actually capture and look at.
4. Lighthouse ≥95 on all four categories for the home page (run it; record scores in PROGRESS.md).
5. Reduced-motion works; keyboard-only navigation works.
6. A test suite exists and passes (Vitest for units + a Playwright smoke test that loads every route and asserts no errors).
7. README updated: how to run, where to edit content, how to swap booking links + Instagram + photos, how to deploy to Vercel.
8. Clean git history on a feature branch, frequent commits.

════════════════════════════════════════
AUTONOMOUS WORK LOOP (how to spend the night)
════════════════════════════════════════
Round 0 — Orient: read any existing prototype/README/code. Write a prioritized BACKLOG.md (highest business value first). Set up the project, git branch (feat/site-build), tooling.
Then repeat until the backlog is empty AND the quality bar is met:
  1. Pick the single highest-value item.
  2. Implement it well.
  3. VERIFY: run build + typecheck + lint + tests; start the dev server; screenshot the affected pages at all 3 breakpoints and actually inspect them; fix anything that looks off. Run Lighthouse when UI changes.
  4. Commit + append to PROGRESS.md.
When you believe it's done, do THREE adversarial self-review passes and fix everything you find:
  • Design pass — as a picky art director: spacing, hierarchy, motion timing, mobile, consistency, does it feel premium?
  • Engineering pass — as a senior reviewer: types, dead code, error handling, accessibility, performance, edge cases. (Use a code-review subagent if available.)
  • Content/SEO pass — natural Bulgarian copy, metadata, OG images, structured data, no lorem left.
Use subagents/parallelism where it helps (e.g., build sections in parallel, run a separate reviewer). If you finish all that and still have time, keep raising the bar: richer motion, per-barber OG cards, a booking modal, an EN toggle, micro-polish — your call.

════════════════════════════════════════
GUARDRAILS
════════════════════════════════════════
- Work on a git branch; commit often; NEVER force-push or delete my files. Don't rewrite history.
- No secrets in the repo. No paid APIs or anything that charges money. If a deploy token exists, you may deploy a preview to Vercel; otherwise just make it deploy-ready and document it.
- Don't email, message, or post anything anywhere. Local + git only.
- If truly stuck on one thing, stub it, log it, and move on — never let one blocker stop the whole night.

════════════════════════════════════════
IN THE MORNING, LEAVE ME
════════════════════════════════════════
- A running site (`npm run dev`) and a passing `npm run build`.
- PROGRESS.md: what you built, key decisions/assumptions, Lighthouse scores, a "NEEDS YOU" list (real photos, 2nd address, bios, prices, IG key), and suggested next steps.
- A /screenshots folder with desktop + mobile shots of every page.
Now begin. Don't ask me anything — build.
