"use server";

import { requireAdmin } from "@/lib/admin/auth";
import { revalidateSite } from "@/lib/admin/util";

export type BarberInput = {
  slug: string;
  name: string;
  role: string;
  tagline: string;
  bio: string;
  instagram_handle: string;
  instagram_url: string;
  location_id: string | null;
  specialties: string[];
  years_experience: number;
  booking_url: string;
  avatar_url: string;
  is_placeholder: boolean;
};

export async function createBarber(input: BarberInput): Promise<string> {
  const { supabase } = await requireAdmin();
  const { data: top } = await supabase
    .from("barbers")
    .select("sort_order")
    .order("sort_order", { ascending: false })
    .limit(1);
  const sort_order = top?.[0]?.sort_order != null ? top[0].sort_order + 1 : 0;
  const { data, error } = await supabase
    .from("barbers")
    .insert({ ...input, sort_order })
    .select("id")
    .single();
  if (error) throw new Error(error.message);
  revalidateSite();
  return data.id;
}

export async function updateBarber(id: string, input: BarberInput): Promise<void> {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("barbers").update(input).eq("id", id);
  if (error) throw new Error(error.message);
  revalidateSite();
}

export async function deleteBarber(id: string): Promise<void> {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("barbers").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidateSite();
}

export async function reorderBarbers(ids: string[]): Promise<void> {
  const { supabase } = await requireAdmin();
  await Promise.all(
    ids.map((id, i) => supabase.from("barbers").update({ sort_order: i }).eq("id", id)),
  );
  revalidateSite();
}
