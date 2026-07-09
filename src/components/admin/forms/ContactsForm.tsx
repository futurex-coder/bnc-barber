"use client";

import { useState } from "react";
import { Button, Input, Textarea, Field, Card } from "@/components/admin/ui";
import { useSave } from "@/components/admin/useSave";
import { updateSettings, type SettingsInput } from "@/lib/admin/actions/settings";
import type { Tables } from "@/lib/supabase/types";

export function ContactsForm({ settings }: { settings: Tables<"site_settings"> | null }) {
  const { save, saving } = useSave();
  const [f, setF] = useState<SettingsInput>(() => ({
    business_name: settings?.business_name ?? "Bonnie & Clyde",
    tagline: settings?.tagline ?? "",
    city: settings?.city ?? "Русе",
    phone: settings?.phone ?? "",
    email: settings?.email ?? "",
    instagram_shop_handle: settings?.instagram_shop_handle ?? "",
    instagram_shop_url: settings?.instagram_shop_url ?? "",
    instagram_barber_handle: settings?.instagram_barber_handle ?? "",
    instagram_barber_url: settings?.instagram_barber_url ?? "",
    calcom_url: settings?.calcom_url ?? "",
    default_fresha_url: settings?.default_fresha_url ?? "",
    contacts_intro: settings?.contacts_intro ?? "",
  }));
  const set = (patch: Partial<SettingsInput>) => setF((p) => ({ ...p, ...patch }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    await save(() => updateSettings(f), { success: "Контактите са обновени" });
  }

  return (
    <form onSubmit={onSubmit} className="flex max-w-3xl flex-col gap-5">
      <Card className="grid gap-4 p-5 sm:grid-cols-2">
        <Field label="Име на бизнеса">
          <Input value={f.business_name} onChange={(e) => set({ business_name: e.target.value })} />
        </Field>
        <Field label="Слоган">
          <Input value={f.tagline} onChange={(e) => set({ tagline: e.target.value })} />
        </Field>
        <Field label="Град">
          <Input value={f.city} onChange={(e) => set({ city: e.target.value })} />
        </Field>
        <Field label="Телефон">
          <Input value={f.phone} onChange={(e) => set({ phone: e.target.value })} />
        </Field>
        <Field label="Имейл">
          <Input value={f.email} onChange={(e) => set({ email: e.target.value })} />
        </Field>
      </Card>

      <Card className="grid gap-4 p-5 sm:grid-cols-2">
        <Field label="Instagram (салон) — потребител">
          <Input
            value={f.instagram_shop_handle}
            onChange={(e) => set({ instagram_shop_handle: e.target.value })}
            placeholder="bonnienclyde_ruse"
          />
        </Field>
        <Field label="Instagram (салон) — линк">
          <Input
            value={f.instagram_shop_url}
            onChange={(e) => set({ instagram_shop_url: e.target.value })}
          />
        </Field>
        <Field label="Instagram (бръснар) — потребител">
          <Input
            value={f.instagram_barber_handle}
            onChange={(e) => set({ instagram_barber_handle: e.target.value })}
          />
        </Field>
        <Field label="Instagram (бръснар) — линк">
          <Input
            value={f.instagram_barber_url}
            onChange={(e) => set({ instagram_barber_url: e.target.value })}
          />
        </Field>
      </Card>

      <Card className="grid gap-4 p-5 sm:grid-cols-2">
        <Field label="Fresha линк (по подразбиране)" hint="Ползва се, когато локация/бръснар няма свой.">
          <Input
            value={f.default_fresha_url}
            onChange={(e) => set({ default_fresha_url: e.target.value })}
          />
        </Field>
        <Field label="Cal.com линк (Академия)">
          <Input value={f.calcom_url} onChange={(e) => set({ calcom_url: e.target.value })} />
        </Field>
        <Field label="Въведение на страница „Контакти“" className="sm:col-span-2">
          <Textarea
            value={f.contacts_intro}
            onChange={(e) => set({ contacts_intro: e.target.value })}
            rows={2}
          />
        </Field>
      </Card>

      <div>
        <Button type="submit" variant="gold" disabled={saving}>
          {saving ? "Запис…" : "Запази"}
        </Button>
      </div>
    </form>
  );
}
