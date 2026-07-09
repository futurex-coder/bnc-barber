import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "./types";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "./config";

/** Supabase client for Client Components (browser). RLS protects all writes. */
export function createClient() {
  return createBrowserClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);
}
