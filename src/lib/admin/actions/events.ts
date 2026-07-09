"use server";

import { requireAdmin } from "@/lib/admin/auth";
import { revalidateSite } from "@/lib/admin/util";

export type EventInput = {
  date: string;
  label: string;
  title: string;
  href: string;
};

export async function createEvent(input: EventInput): Promise<string> {
  const { supabase } = await requireAdmin();
  const { data: top } = await supabase
    .from("events")
    .select("sort_order")
    .order("sort_order", { ascending: false })
    .limit(1);
  const sort_order = top?.[0]?.sort_order != null ? top[0].sort_order + 1 : 0;
  const { data, error } = await supabase
    .from("events")
    .insert({ ...input, sort_order })
    .select("id")
    .single();
  if (error) throw new Error(error.message);
  revalidateSite();
  return data.id;
}

export async function updateEvent(id: string, input: EventInput): Promise<void> {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("events").update(input).eq("id", id);
  if (error) throw new Error(error.message);
  revalidateSite();
}

export async function deleteEvent(id: string): Promise<void> {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("events").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidateSite();
}

export async function reorderEvents(ids: string[]): Promise<void> {
  const { supabase } = await requireAdmin();
  await Promise.all(
    ids.map((id, i) => supabase.from("events").update({ sort_order: i }).eq("id", id)),
  );
  revalidateSite();
}
