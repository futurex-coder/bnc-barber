import { createClient } from "@/lib/supabase/server";

/** Resolve the current user and whether they are an admin (rpc is_admin). */
export async function getAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { supabase, user: null, isAdmin: false as const };
  const { data } = await supabase.rpc("is_admin");
  return { supabase, user, isAdmin: data === true };
}

/**
 * For Server Actions: returns an authenticated admin Supabase client, or throws.
 * RLS also enforces admin-only writes as a second line of defence.
 */
export async function requireAdmin() {
  const { supabase, user, isAdmin } = await getAdmin();
  if (!user || !isAdmin) throw new Error("Няма достъп. Влез отново в администрацията.");
  return { supabase, user };
}
