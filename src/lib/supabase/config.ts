/**
 * Supabase connection for the bnc-barber project.
 *
 * The URL and the publishable ("anon") key are PUBLIC by design — they ship in
 * the browser bundle and security is enforced by Row-Level Security, not by
 * keeping these secret. They are baked here as defaults so the app works out of
 * the box (incl. on Vercel without dashboard config). Set the env vars to point
 * at a different Supabase project — they always take precedence.
 *
 * NEVER put the Supabase service_role / secret key here — the app never needs it.
 */
export const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://qqaiagnnebjkzmxfyjvu.supabase.co";

export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  "sb_publishable_3zrObCRbbNfiwcPZTPi2-A_sZqwQHOW";
