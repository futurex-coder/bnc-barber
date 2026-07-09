"use server";

import { requireAdmin } from "@/lib/admin/auth";
import { revalidateSite } from "@/lib/admin/util";

export type SettingsInput = {
  business_name: string;
  tagline: string;
  city: string;
  phone: string;
  email: string;
  instagram_shop_handle: string;
  instagram_shop_url: string;
  instagram_barber_handle: string;
  instagram_barber_url: string;
  calcom_url: string;
  default_fresha_url: string;
  contacts_intro: string;
};

export async function updateSettings(input: SettingsInput): Promise<void> {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("site_settings").update(input).eq("id", 1);
  if (error) throw new Error(error.message);
  revalidateSite();
}
