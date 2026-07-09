import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

/** Next.js 16 Proxy (formerly Middleware). Guards + refreshes admin sessions. */
export async function proxy(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  // Only run on the admin area — public pages stay fast and untouched.
  matcher: ["/admin/:path*"],
};
