"use server";

import { requireAdmin } from "@/lib/admin/auth";
import { revalidateSite } from "@/lib/admin/util";
import type { Json } from "@/lib/supabase/types";

export type AcademyStartDate = { date: string; label: string };

export type AcademySettingsInput = {
  eyebrow: string;
  title: string;
  lead: string;
  description: string;
  price_note: string;
  duration: string;
  start_dates: AcademyStartDate[];
  cta_label: string;
  cta_url: string;
};

export async function updateAcademySettings(input: AcademySettingsInput): Promise<void> {
  const { supabase } = await requireAdmin();
  const { error } = await supabase
    .from("academy_settings")
    .update({ ...input, start_dates: input.start_dates as unknown as Json })
    .eq("id", 1);
  if (error) throw new Error(error.message);
  revalidateSite();
}

export type ModuleInput = {
  number: string;
  title: string;
  summary: string;
  points: string[];
};

export async function createModule(input: ModuleInput): Promise<string> {
  const { supabase } = await requireAdmin();
  const { data: top } = await supabase
    .from("academy_modules")
    .select("sort_order")
    .order("sort_order", { ascending: false })
    .limit(1);
  const sort_order = top?.[0]?.sort_order != null ? top[0].sort_order + 1 : 0;
  const { data, error } = await supabase
    .from("academy_modules")
    .insert({ ...input, sort_order })
    .select("id")
    .single();
  if (error) throw new Error(error.message);
  revalidateSite();
  return data.id;
}

export async function updateModule(id: string, input: ModuleInput): Promise<void> {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("academy_modules").update(input).eq("id", id);
  if (error) throw new Error(error.message);
  revalidateSite();
}

export async function deleteModule(id: string): Promise<void> {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("academy_modules").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidateSite();
}

export async function reorderModules(ids: string[]): Promise<void> {
  const { supabase } = await requireAdmin();
  await Promise.all(
    ids.map((id, i) =>
      supabase.from("academy_modules").update({ sort_order: i }).eq("id", id),
    ),
  );
  revalidateSite();
}
