import { revalidatePath } from "next/cache";

/**
 * Revalidate the whole public site after an admin mutation. Public pages are
 * `force-dynamic` (always fresh), so this is belt-and-suspenders in case any
 * route is later cached.
 */
export function revalidateSite() {
  revalidatePath("/", "layout");
}
