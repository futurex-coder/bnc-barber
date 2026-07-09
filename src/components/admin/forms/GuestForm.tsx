"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Input, Field, Select, Switch, Card } from "@/components/admin/ui";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { TagInput } from "@/components/admin/TagInput";
import { useSave } from "@/components/admin/useSave";
import { slugify } from "@/lib/admin/slug";
import { createGuest, updateGuest, type GuestInput } from "@/lib/admin/actions/guests";
import type { Tables } from "@/lib/supabase/types";

export function GuestForm({
  guest,
  locations,
}: {
  guest?: Tables<"guests"> | null;
  locations: { id: string; name: string }[];
}) {
  const { save, saving } = useSave();
  const [f, setF] = useState<GuestInput>(() => ({
    slug: guest?.slug ?? "",
    name: guest?.name ?? "",
    discipline: guest?.discipline ?? "",
    style: guest?.style ?? "",
    bio: guest?.bio ?? "",
    instagram_handle: guest?.instagram_handle ?? "",
    instagram_url: guest?.instagram_url ?? "",
    from_date: guest?.from_date ?? null,
    to_date: guest?.to_date ?? null,
    location_id: guest?.location_id ?? locations[0]?.id ?? null,
    specialties: guest?.specialties ?? [],
    image_url: guest?.image_url ?? "",
    featured: guest?.featured ?? false,
    is_placeholder: guest?.is_placeholder ?? false,
  }));
  const set = (patch: Partial<GuestInput>) => setF((p) => ({ ...p, ...patch }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload: GuestInput = {
      ...f,
      slug: f.slug.trim() || slugify(f.name),
      instagram_url:
        f.instagram_url ||
        (f.instagram_handle ? `https://instagram.com/${f.instagram_handle}` : ""),
    };
    if (guest) await save(() => updateGuest(guest.id, payload), { redirectTo: "/admin/events" });
    else await save(() => createGuest(payload), { redirectTo: "/admin/events" });
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-6 lg:grid-cols-[1fr_300px]">
      <div className="order-2 flex flex-col gap-5 lg:order-1">
        <Card className="flex flex-col gap-5 p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Име">
              <Input value={f.name} onChange={(e) => set({ name: e.target.value })} required />
            </Field>
            <Field label="URL адрес (slug)">
              <Input
                value={f.slug}
                onChange={(e) => set({ slug: e.target.value })}
                placeholder={slugify(f.name) || "gost-ime"}
              />
            </Field>
            <Field label="Категория / дисциплина" hint="напр. Тату артист, Гост барбер">
              <Input value={f.discipline} onChange={(e) => set({ discipline: e.target.value })} />
            </Field>
            <Field label="Стил (един ред)">
              <Input value={f.style} onChange={(e) => set({ style: e.target.value })} />
            </Field>
            <Field label="От дата">
              <Input
                type="date"
                value={f.from_date ?? ""}
                onChange={(e) => set({ from_date: e.target.value || null })}
              />
            </Field>
            <Field label="До дата">
              <Input
                type="date"
                value={f.to_date ?? ""}
                onChange={(e) => set({ to_date: e.target.value || null })}
              />
            </Field>
          </div>

          <Field label="Описание">
            <RichTextEditor value={f.bio} onChange={(bio) => set({ bio })} />
          </Field>

          <Field label="Тагове">
            <TagInput value={f.specialties} onChange={(specialties) => set({ specialties })} />
          </Field>
        </Card>

        <Card className="grid gap-4 p-5 sm:grid-cols-2">
          <Field label="Локация">
            <Select
              value={f.location_id ?? ""}
              onChange={(e) => set({ location_id: e.target.value || null })}
            >
              <option value="">— без локация —</option>
              {locations.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.name}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Instagram потребител" hint="Без @">
            <Input
              value={f.instagram_handle}
              onChange={(e) => set({ instagram_handle: e.target.value })}
            />
          </Field>
          <Field label="Instagram линк" className="sm:col-span-2">
            <Input
              value={f.instagram_url}
              onChange={(e) => set({ instagram_url: e.target.value })}
              placeholder="https://instagram.com/…"
            />
          </Field>
        </Card>
      </div>

      <div className="order-1 flex flex-col gap-4 lg:order-2">
        <Card className="flex flex-col gap-3 p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-grey">Снимка</p>
          <ImageUploader
            value={f.image_url}
            onChange={(image_url) => set({ image_url })}
            folder="guests"
          />
        </Card>
        <Card className="flex items-center justify-between gap-3 p-4">
          <div>
            <p className="text-sm text-ink">Спотлайт</p>
            <p className="text-xs text-grey">Показва се на началната страница.</p>
          </div>
          <Switch checked={f.featured} onCheckedChange={(featured) => set({ featured })} />
        </Card>
        <Card className="flex items-center justify-between gap-3 p-4">
          <div>
            <p className="text-sm text-ink">Placeholder</p>
            <p className="text-xs text-grey">Примерни данни.</p>
          </div>
          <Switch
            checked={f.is_placeholder}
            onCheckedChange={(is_placeholder) => set({ is_placeholder })}
          />
        </Card>
        <div className="flex gap-3">
          <Button type="submit" variant="gold" disabled={saving} className="flex-1">
            {saving ? "Запис…" : "Запази"}
          </Button>
          <Link
            href="/admin/events"
            className="inline-flex items-center justify-center rounded-lg border border-hairline px-4 text-sm text-grey transition-colors hover:text-ink"
          >
            Отказ
          </Link>
        </div>
      </div>
    </form>
  );
}
