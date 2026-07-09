"use server";

import { requireAdmin } from "@/lib/admin/auth";
import { revalidateSite } from "@/lib/admin/util";
import type { Json } from "@/lib/supabase/types";

export type LocationHour = { day: string; open: string | null; close: string | null };

export type LocationInput = {
  slug: string;
  name: string;
  status: "open" | "coming-soon";
  address_line: string;
  district: string;
  city: string;
  postal_code: string;
  lat: number | null;
  lng: number | null;
  phone: string;
  email: string;
  blurb: string;
  description: string;
  map_embed_query: string;
  price_range: string;
  hours: LocationHour[];
  fresha_url: string;
};

function serialize(input: LocationInput) {
  return { ...input, hours: input.hours as unknown as Json };
}

export async function createLocation(input: LocationInput): Promise<string> {
  const { supabase } = await requireAdmin();
  const { data: top } = await supabase
    .from("locations")
    .select("sort_order")
    .order("sort_order", { ascending: false })
    .limit(1);
  const sort_order = top?.[0]?.sort_order != null ? top[0].sort_order + 1 : 0;
  const { data, error } = await supabase
    .from("locations")
    .insert({ ...serialize(input), sort_order })
    .select("id")
    .single();
  if (error) throw new Error(error.message);
  revalidateSite();
  return data.id;
}

export async function updateLocation(id: string, input: LocationInput): Promise<void> {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("locations").update(serialize(input)).eq("id", id);
  if (error) throw new Error(error.message);
  revalidateSite();
}

export async function deleteLocation(id: string): Promise<void> {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("locations").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidateSite();
}

export async function reorderLocations(ids: string[]): Promise<void> {
  const { supabase } = await requireAdmin();
  await Promise.all(
    ids.map((id, i) => supabase.from("locations").update({ sort_order: i }).eq("id", id)),
  );
  revalidateSite();
}
