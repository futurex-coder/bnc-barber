"use server";

import { requireAdmin } from "@/lib/admin/auth";
import { revalidateSite } from "@/lib/admin/util";
import type { Json } from "@/lib/supabase/types";

export type AboutValue = { title: string; text: string };

export type AboutInput = {
  eyebrow: string;
  title: string;
  lead: string;
  body: string;
  values: AboutValue[];
  image_url: string;
};

export async function updateAbout(input: AboutInput): Promise<void> {
  const { supabase } = await requireAdmin();
  const { error } = await supabase
    .from("about_settings")
    .update({ ...input, values: input.values as unknown as Json })
    .eq("id", 1);
  if (error) throw new Error(error.message);
  revalidateSite();
}
