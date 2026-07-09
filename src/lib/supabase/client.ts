import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "./types";

/** Supabase client for Client Components (browser). RLS protects all writes. */
export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
