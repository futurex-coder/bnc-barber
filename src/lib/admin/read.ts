/**
 * Admin-side reads — raw DB rows (all columns) for edit forms and lists.
 * Uses the public (anon) client; the /admin layout already gates access and
 * RLS grants public SELECT. Writes go through authenticated Server Actions.
 */
import { createPublicClient } from "@/lib/supabase/public";
import type { Tables } from "@/lib/supabase/types";

const db = () => createPublicClient();

/* --------------------------------------------------------------- Barbers */
export async function listBarbers() {
  const { data } = await db()
    .from("barbers")
    .select("*, location:locations(name)")
    .order("sort_order");
  return data ?? [];
}
export async function getBarberRow(id: string): Promise<Tables<"barbers"> | null> {
  const { data } = await db().from("barbers").select("*").eq("id", id).maybeSingle();
  return data;
}
export async function listBarberImages(barberId: string) {
  const { data } = await db()
    .from("barber_images")
    .select("*")
    .eq("barber_id", barberId)
    .order("sort_order");
  return data ?? [];
}

/* -------------------------------------------------------------- Services */
export async function listServices() {
  const { data } = await db().from("services").select("*").order("sort_order");
  return data ?? [];
}
export async function getServiceRow(id: string): Promise<Tables<"services"> | null> {
  const { data } = await db().from("services").select("*").eq("id", id).maybeSingle();
  return data;
}

/* ------------------------------------------------------------- Locations */
export async function listLocations() {
  const { data } = await db().from("locations").select("*").order("sort_order");
  return data ?? [];
}
export async function getLocationRow(id: string): Promise<Tables<"locations"> | null> {
  const { data } = await db().from("locations").select("*").eq("id", id).maybeSingle();
  return data;
}
export async function listLocationImages(locationId: string) {
  const { data } = await db()
    .from("location_images")
    .select("*")
    .eq("location_id", locationId)
    .order("sort_order");
  return data ?? [];
}
export async function locationOptions(): Promise<{ id: string; name: string }[]> {
  const { data } = await db().from("locations").select("id,name").order("sort_order");
  return data ?? [];
}

/* ---------------------------------------------------------------- Guests */
export async function listGuests() {
  const { data } = await db()
    .from("guests")
    .select("*, location:locations(name)")
    .order("sort_order");
  return data ?? [];
}
export async function getGuestRow(id: string): Promise<Tables<"guests"> | null> {
  const { data } = await db().from("guests").select("*").eq("id", id).maybeSingle();
  return data;
}

/* ---------------------------------------------------------------- Events */
export async function listEvents() {
  const { data } = await db().from("events").select("*").order("date");
  return data ?? [];
}
export async function getEventRow(id: string): Promise<Tables<"events"> | null> {
  const { data } = await db().from("events").select("*").eq("id", id).maybeSingle();
  return data;
}

/* --------------------------------------------------------------- Academy */
export async function getAcademySettingsRow(): Promise<Tables<"academy_settings"> | null> {
  const { data } = await db().from("academy_settings").select("*").eq("id", 1).maybeSingle();
  return data;
}
export async function listModules() {
  const { data } = await db().from("academy_modules").select("*").order("sort_order");
  return data ?? [];
}
export async function getModuleRow(id: string): Promise<Tables<"academy_modules"> | null> {
  const { data } = await db().from("academy_modules").select("*").eq("id", id).maybeSingle();
  return data;
}
export async function listAcademyImages() {
  const { data } = await db().from("academy_images").select("*").order("sort_order");
  return data ?? [];
}

/* --------------------------------------------------------------- Gallery */
export async function listGalleryImages() {
  const { data } = await db().from("gallery").select("*").order("sort_order");
  return data ?? [];
}

/* ----------------------------------------------------------- Singletons */
export async function getAboutRow(): Promise<Tables<"about_settings"> | null> {
  const { data } = await db().from("about_settings").select("*").eq("id", 1).maybeSingle();
  return data;
}
export async function getSettingsRow(): Promise<Tables<"site_settings"> | null> {
  const { data } = await db().from("site_settings").select("*").eq("id", 1).maybeSingle();
  return data;
}

/* ------------------------------------------------------------ Dashboard */
export async function dashboardCounts() {
  const tables = [
    "barbers",
    "services",
    "locations",
    "academy_modules",
    "events",
    "guests",
    "gallery",
  ] as const;
  const results = await Promise.all(
    tables.map((t) => db().from(t).select("*", { count: "exact", head: true })),
  );
  const counts: Record<string, number> = {};
  tables.forEach((t, i) => (counts[t] = results[i].count ?? 0));
  return counts;
}
