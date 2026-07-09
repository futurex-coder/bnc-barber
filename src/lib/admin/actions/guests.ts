"use server";

import { requireAdmin } from "@/lib/admin/auth";
import { revalidateSite } from "@/lib/admin/util";

export type GuestInput = {
  slug: string;
  name: string;
  discipline: string;
  style: string;
  bio: string;
  instagram_handle: string;
  instagram_url: string;
  from_date: string | null;
  to_date: string | null;
  location_id: string | null;
  specialties: string[];
  image_url: string;
  featured: boolean;
  is_placeholder: boolean;
};

export async function createGuest(input: GuestInput): Promise<string> {
  const { supabase } = await requireAdmin();
  const { data: top } = await supabase
    .from("guests")
    .select("sort_order")
    .order("sort_order", { ascending: false })
    .limit(1);
  const sort_order = top?.[0]?.sort_order != null ? top[0].sort_order + 1 : 0;
  const { data, error } = await supabase
    .from("guests")
    .insert({ ...input, sort_order })
    .select("id")
    .single();
  if (error) throw new Error(error.message);
  revalidateSite();
  return data.id;
}

export async function updateGuest(id: string, input: GuestInput): Promise<void> {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("guests").update(input).eq("id", id);
  if (error) throw new Error(error.message);
  revalidateSite();
}

export async function deleteGuest(id: string): Promise<void> {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("guests").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidateSite();
}

export async function reorderGuests(ids: string[]): Promise<void> {
  const { supabase } = await requireAdmin();
  await Promise.all(
    ids.map((id, i) => supabase.from("guests").update({ sort_order: i }).eq("id", id)),
  );
  revalidateSite();
}
