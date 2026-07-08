/** Tiny className joiner (no external dep). */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/** Format a BGN price. */
export function formatPrice(bgn: number): string {
  return `${bgn} лв.`;
}

/** Format a duration in minutes as "45 мин". */
export function formatDuration(min: number): string {
  return `${min} мин`;
}

const BG_MONTHS = [
  "яну",
  "фев",
  "мар",
  "апр",
  "май",
  "юни",
  "юли",
  "авг",
  "сеп",
  "окт",
  "ное",
  "дек",
];

/** Format an ISO date (YYYY-MM-DD) as "19 юли". Parsed as UTC so the displayed
 *  calendar date matches the string regardless of the runtime timezone. */
export function formatEventDate(iso: string): { day: string; month: string } {
  const d = new Date(iso + "T00:00:00Z");
  return { day: String(d.getUTCDate()), month: BG_MONTHS[d.getUTCMonth()] };
}
