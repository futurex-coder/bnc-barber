import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import type { Database } from "./types";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "./config";

/**
 * Refreshes the Supabase auth session and keeps cookies fresh. It performs NO
 * redirects — doing auth redirects here (while also gating in the /admin layout)
 * caused a redirect loop on Vercel, because a `NextResponse.redirect` drops the
 * refreshed auth cookies. The /admin layout is the single authoritative gate.
 */
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });

  // Touch the session so expiring tokens rotate and the refreshed cookies are
  // written onto `response`. Never throw out of the proxy.
  try {
    await supabase.auth.getUser();
  } catch {
    // ignore — the layout will handle auth state
  }

  return response;
}
