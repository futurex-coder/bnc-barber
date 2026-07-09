"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Input, Field, Switch, Card } from "@/components/admin/ui";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { TagInput } from "@/components/admin/TagInput";
import { useSave } from "@/components/admin/useSave";
import {
  createService,
  updateService,
  type ServiceInput,
} from "@/lib/admin/actions/services";
import type { Tables } from "@/lib/supabase/types";

export function ServiceForm({
  service,
  categories,
}: {
  service?: Tables<"services"> | null;
  categories: string[];
}) {
  const { save, saving } = useSave();
  const [f, setF] = useState<ServiceInput>(() => ({
    name: service?.name ?? "",
    description: service?.description ?? "",
    duration_min: service?.duration_min ?? 30,
    price: Number(service?.price ?? 0),
    category: service?.category ?? "",
    tags: service?.tags ?? [],
    booking_url: service?.booking_url ?? "",
    popular: service?.popular ?? false,
  }));
  const set = (patch: Partial<ServiceInput>) => setF((p) => ({ ...p, ...patch }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (service) await save(() => updateService(service.id, f), { redirectTo: "/admin/services" });
    else await save(() => createService(f), { redirectTo: "/admin/services" });
  }

  return (
    <form onSubmit={onSubmit} className="flex max-w-3xl flex-col gap-5">
      <Card className="flex flex-col gap-5 p-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Име на услугата">
            <Input value={f.name} onChange={(e) => set({ name: e.target.value })} required />
          </Field>
          <Field label="Категория" hint="Групира услугите в менюто.">
            <Input
              value={f.category}
              onChange={(e) => set({ category: e.target.value })}
              list="service-cats"
              placeholder="Коса, Брада, Комбо…"
            />
            <datalist id="service-cats">
              {categories.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
          </Field>
          <Field label="Цена (лв.)">
            <Input
              type="number"
              min={0}
              step="0.01"
              value={f.price}
              onChange={(e) => set({ price: Number(e.target.value) })}
            />
          </Field>
          <Field label="Времетраене (мин.)">
            <Input
              type="number"
              min={0}
              value={f.duration_min}
              onChange={(e) => set({ duration_min: Number(e.target.value) })}
            />
          </Field>
        </div>

        <Field label="Описание">
          <RichTextEditor value={f.description} onChange={(description) => set({ description })} />
        </Field>

        <Field label="Тагове">
          <TagInput value={f.tags} onChange={(tags) => set({ tags })} placeholder="Популярно…" />
        </Field>

        <Field
          label="Линк за резервация"
          hint="Отваря се при клик върху услугата. Празно — ползва общия Fresha линк."
        >
          <Input
            value={f.booking_url}
            onChange={(e) => set({ booking_url: e.target.value })}
            placeholder="https://fresha.com/…"
          />
        </Field>

        <div className="flex items-center justify-between rounded-lg border border-hairline p-3">
          <div>
            <p className="text-sm text-ink">Популярна услуга</p>
            <p className="text-xs text-grey">Показва етикет „Топ“.</p>
          </div>
          <Switch checked={f.popular} onCheckedChange={(popular) => set({ popular })} />
        </div>
      </Card>

      <div className="flex gap-3">
        <Button type="submit" variant="gold" disabled={saving}>
          {saving ? "Запис…" : "Запази"}
        </Button>
        <Link
          href="/admin/services"
          className="inline-flex items-center rounded-lg border border-hairline px-4 text-sm text-grey transition-colors hover:text-ink"
        >
          Отказ
        </Link>
      </div>
    </form>
  );
}
