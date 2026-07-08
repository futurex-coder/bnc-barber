/**
 * Single source of truth for ALL booking URLs.
 *
 * Two funnels that must never compete:
 *  1. Cuts  → Fresha  (clients booking a haircut)
 *  2. Academy → Cal.com  (aspiring barbers booking a consult call)
 *
 * To swap a link, edit it here only. Nothing else in the app hardcodes URLs.
 */

/** Fresha booking URL per location slug. */
export const fresha: Record<string, string> = {
  // Flagship — Здравец Изток (real link).
  "zdravets-iztok":
    "https://www.fresha.com/book-now/bonnie-and-clyde-ruse-rpupecsw/all-offer",
  // Second location — Център (coming soon). Falls back to flagship until it opens.
  center:
    "https://www.fresha.com/book-now/bonnie-and-clyde-ruse-rpupecsw/all-offer",
};

/**
 * Fresha "book with this barber" deep links, per barber slug.
 * When a barber has no personal link yet, the UI falls back to their
 * location's Fresha URL (see `freshaForBarber`).
 */
export const freshaByBarber: Record<string, string | undefined> = {
  // TODO(NEEDS YOU): replace with real per-barber Fresha deep links when available.
  alex: undefined,
  martin: undefined,
  kris: undefined,
};

/** Cal.com link for the Academy consult call. */
export const calcom = {
  /** calLink used by @calcom/embed-react, e.g. "bonnie-clyde/consult". */
  link: "bonnie-clyde/consult",
  /** Full URL fallback for no-JS / embed failure. */
  url: "https://cal.com/bonnie-clyde/consult",
} as const;

/** The flagship Fresha URL, used as the global default CTA. */
export const DEFAULT_FRESHA = fresha["zdravets-iztok"];

/** Resolve the Fresha URL for a location slug, falling back to flagship. */
export function freshaForLocation(slug: string): string {
  return fresha[slug] ?? DEFAULT_FRESHA;
}

/**
 * Resolve the best Fresha URL for a barber: their personal link if set,
 * otherwise their location's link, otherwise the flagship.
 */
export function freshaForBarber(
  barberSlug: string,
  locationSlug?: string,
): string {
  return (
    freshaByBarber[barberSlug] ??
    (locationSlug ? freshaForLocation(locationSlug) : DEFAULT_FRESHA)
  );
}
