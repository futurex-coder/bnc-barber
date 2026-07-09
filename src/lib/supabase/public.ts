import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./types";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "./config";

/**
 * Cookie-less Supabase client for PUBLIC reads (RLS grants public SELECT).
 * Safe everywhere: Server Components, Route Handlers, OG image routes and at
 * build time — it never touches request cookies, so it never forces a route
 * dynamic on its own. Public pages opt into fresh data via `force-dynamic`.
 */
export function createPublicClient() {
  return createSupabaseClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
