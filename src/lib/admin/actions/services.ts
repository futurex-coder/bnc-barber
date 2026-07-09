"use server";

import { requireAdmin } from "@/lib/admin/auth";
import { revalidateSite } from "@/lib/admin/util";

export type ServiceInput = {
  name: string;
  description: string;
  duration_min: number;
  price: number;
  category: string;
  tags: string[];
  booking_url: string;
  popular: boolean;
};

export async function createService(input: ServiceInput): Promise<string> {
  const { supabase } = await requireAdmin();
  const { data: top } = await supabase
    .from("services")
    .select("sort_order")
    .order("sort_order", { ascending: false })
    .limit(1);
  const sort_order = top?.[0]?.sort_order != null ? top[0].sort_order + 1 : 0;
  const { data, error } = await supabase
    .from("services")
    .insert({ ...input, sort_order })
    .select("id")
    .single();
  if (error) throw new Error(error.message);
  revalidateSite();
  return data.id;
}

export async function updateService(id: string, input: ServiceInput): Promise<void> {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("services").update(input).eq("id", id);
  if (error) throw new Error(error.message);
  revalidateSite();
}

export async function deleteService(id: string): Promise<void> {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("services").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidateSite();
}

export async function reorderServices(ids: string[]): Promise<void> {
  const { supabase } = await requireAdmin();
  await Promise.all(
    ids.map((id, i) => supabase.from("services").update({ sort_order: i }).eq("id", id)),
  );
  revalidateSite();
}
