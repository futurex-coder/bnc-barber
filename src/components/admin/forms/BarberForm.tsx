"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Input, Field, Select, Switch, Card } from "@/components/admin/ui";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { TagInput } from "@/components/admin/TagInput";
import { useSave } from "@/components/admin/useSave";
import { slugify } from "@/lib/admin/slug";
import {
  createBarber,
  updateBarber,
  type BarberInput,
} from "@/lib/admin/actions/barbers";
import type { Tables } from "@/lib/supabase/types";

export function BarberForm({
  barber,
  locations,
}: {
  barber?: Tables<"barbers"> | null;
  locations: { id: string; name: string }[];
}) {
  const { save, saving } = useSave();
  const [f, setF] = useState<BarberInput>(() => ({
    slug: barber?.slug ?? "",
    name: barber?.name ?? "",
    role: barber?.role ?? "",
    tagline: barber?.tagline ?? "",
    bio: barber?.bio ?? "",
    instagram_handle: barber?.instagram_handle ?? "",
    instagram_url: barber?.instagram_url ?? "",
    location_id: barber?.location_id ?? locations[0]?.id ?? null,
    specialties: barber?.specialties ?? [],
    years_experience: barber?.years_experience ?? 0,
    booking_url: barber?.booking_url ?? "",
    avatar_url: barber?.avatar_url ?? "",
    is_placeholder: barber?.is_placeholder ?? false,
  }));
  const set = (patch: Partial<BarberInput>) => setF((p) => ({ ...p, ...patch }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload: BarberInput = {
      ...f,
      slug: f.slug.trim() || slugify(f.name),
      instagram_url:
        f.instagram_url ||
        (f.instagram_handle ? `https://instagram.com/${f.instagram_handle}` : ""),
    };
    if (barber) {
      await save(() => updateBarber(barber.id, payload), { redirectTo: "/admin/team" });
    } else {
      await save(() => createBarber(payload), {
        redirectTo: (id) => `/admin/team/${id}`,
        success: "Създадено — сега добави снимки към галерията.",
      });
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-6 lg:grid-cols-[1fr_300px]">
      <div className="order-2 flex flex-col gap-5 lg:order-1">
        <Card className="flex flex-col gap-5 p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Име">
              <Input value={f.name} onChange={(e) => set({ name: e.target.value })} required />
            </Field>
            <Field label="URL адрес (slug)" hint="Оставено празно — генерира се от името.">
              <Input
                value={f.slug}
                onChange={(e) => set({ slug: e.target.value })}
                placeholder={slugify(f.name) || "primer-ime"}
              />
            </Field>
            <Field label="Роля / позиция">
              <Input value={f.role} onChange={(e) => set({ role: e.target.value })} />
            </Field>
            <Field label="Кратко мото (tagline)">
              <Input value={f.tagline} onChange={(e) => set({ tagline: e.target.value })} />
            </Field>
          </div>

          <Field label="Описание / биография">
            <RichTextEditor value={f.bio} onChange={(bio) => set({ bio })} />
          </Field>

          <Field label="Специалности (тагове)">
            <TagInput
              value={f.specialties}
              onChange={(specialties) => set({ specialties })}
              placeholder="Skin fade, Брада…"
            />
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
          <Field label="Опит (години)">
            <Input
              type="number"
              min={0}
              value={f.years_experience}
              onChange={(e) => set({ years_experience: Number(e.target.value) })}
            />
          </Field>
          <Field label="Instagram потребител" hint="Без @">
            <Input
              value={f.instagram_handle}
              onChange={(e) => set({ instagram_handle: e.target.value })}
              placeholder="alexx_cutzz"
            />
          </Field>
          <Field label="Instagram линк" hint="Оставено празно — от потребителя.">
            <Input
              value={f.instagram_url}
              onChange={(e) => set({ instagram_url: e.target.value })}
              placeholder="https://instagram.com/…"
            />
          </Field>
          <Field
            label="Линк за резервация (Fresha)"
            hint="Ако е празно — ползва линка на локацията."
            className="sm:col-span-2"
          >
            <Input
              value={f.booking_url}
              onChange={(e) => set({ booking_url: e.target.value })}
              placeholder="https://fresha.com/…"
            />
          </Field>
        </Card>
      </div>

      {/* Side: avatar + flags + actions */}
      <div className="order-1 flex flex-col gap-4 lg:order-2">
        <Card className="flex flex-col gap-3 p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-grey">Профилна снимка</p>
          <ImageUploader
            value={f.avatar_url}
            onChange={(avatar_url) => set({ avatar_url })}
            folder="barbers"
          />
        </Card>
        <Card className="flex items-center justify-between gap-3 p-4">
          <div>
            <p className="text-sm text-ink">Placeholder</p>
            <p className="text-xs text-grey">Маркирай, ако данните са примерни.</p>
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
            href="/admin/team"
            className="inline-flex items-center justify-center rounded-lg border border-hairline px-4 text-sm text-grey transition-colors hover:text-ink"
          >
            Отказ
          </Link>
        </div>
      </div>
    </form>
  );
}
