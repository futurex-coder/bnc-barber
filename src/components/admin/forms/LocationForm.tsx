"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { Button, Input, Field, Select, Card } from "@/components/admin/ui";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { useSave } from "@/components/admin/useSave";
import { slugify } from "@/lib/admin/slug";
import { toast } from "sonner";
import {
  createLocation,
  updateLocation,
  type LocationInput,
  type LocationHour,
} from "@/lib/admin/actions/locations";
import type { Tables } from "@/lib/supabase/types";

const DAYS = ["Понеделник", "Вторник", "Сряда", "Четвъртък", "Петък", "Събота", "Неделя"];

function normalizeHours(hours: unknown): LocationHour[] {
  const arr = Array.isArray(hours) ? (hours as LocationHour[]) : [];
  return DAYS.map((day) => {
    const found = arr.find((h) => h?.day === day);
    return { day, open: found?.open ?? null, close: found?.close ?? null };
  });
}

function parseMapsUrl(url: string): { lat: number; lng: number } | null {
  const patterns = [
    /@(-?\d+\.\d+),(-?\d+\.\d+)/,
    /!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/,
    /[?&]q=(-?\d+\.\d+),(-?\d+\.\d+)/,
    /(-?\d+\.\d+),\s*(-?\d+\.\d+)/,
  ];
  for (const re of patterns) {
    const m = url.match(re);
    if (m) return { lat: Number(m[1]), lng: Number(m[2]) };
  }
  return null;
}

function HoursEditor({
  hours,
  onChange,
}: {
  hours: LocationHour[];
  onChange: (h: LocationHour[]) => void;
}) {
  function update(day: string, patch: Partial<LocationHour>) {
    onChange(hours.map((h) => (h.day === day ? { ...h, ...patch } : h)));
  }
  return (
    <div className="flex flex-col divide-y divide-hairline">
      {hours.map((h) => {
        const closed = !h.open && !h.close;
        return (
          <div key={h.day} className="flex flex-wrap items-center gap-3 py-2.5">
            <span className="w-28 shrink-0 text-sm text-ink">{h.day}</span>
            {closed ? (
              <span className="flex-1 text-sm text-grey">Почивен ден</span>
            ) : (
              <div className="flex flex-1 items-center gap-2">
                <Input
                  type="time"
                  value={h.open ?? ""}
                  onChange={(e) => update(h.day, { open: e.target.value })}
                  className="h-9 w-32"
                />
                <span className="text-grey">–</span>
                <Input
                  type="time"
                  value={h.close ?? ""}
                  onChange={(e) => update(h.day, { close: e.target.value })}
                  className="h-9 w-32"
                />
              </div>
            )}
            <label className="flex items-center gap-2 text-xs text-grey">
              <input
                type="checkbox"
                checked={closed}
                onChange={(e) =>
                  update(h.day, e.target.checked ? { open: null, close: null } : { open: "10:00", close: "20:00" })
                }
              />
              Почивен
            </label>
          </div>
        );
      })}
    </div>
  );
}

export function LocationForm({ location }: { location?: Tables<"locations"> | null }) {
  const { save, saving } = useSave();
  const [mapsLink, setMapsLink] = useState("");
  const [f, setF] = useState<LocationInput>(() => ({
    slug: location?.slug ?? "",
    name: location?.name ?? "",
    status: (location?.status as "open" | "coming-soon") ?? "open",
    address_line: location?.address_line ?? "",
    district: location?.district ?? "",
    city: location?.city ?? "Русе",
    postal_code: location?.postal_code ?? "",
    lat: location?.lat ?? null,
    lng: location?.lng ?? null,
    phone: location?.phone ?? "",
    email: location?.email ?? "",
    blurb: location?.blurb ?? "",
    description: location?.description ?? "",
    map_embed_query: location?.map_embed_query ?? "",
    price_range: location?.price_range ?? "",
    hours: normalizeHours(location?.hours),
    fresha_url: location?.fresha_url ?? "",
  }));
  const set = (patch: Partial<LocationInput>) => setF((p) => ({ ...p, ...patch }));

  function applyMapsLink() {
    const coords = parseMapsUrl(mapsLink);
    if (!coords) {
      toast.error("Не открих координати в линка.");
      return;
    }
    set({ lat: coords.lat, lng: coords.lng });
    toast.success("Координатите са попълнени.");
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload: LocationInput = {
      ...f,
      slug: f.slug.trim() || slugify(f.name),
      map_embed_query:
        f.map_embed_query || [f.address_line, f.district, f.city].filter(Boolean).join(", "),
    };
    if (location) await save(() => updateLocation(location.id, payload), { redirectTo: "/admin/locations" });
    else await save(() => createLocation(payload), { redirectTo: (id) => `/admin/locations/${id}` });
  }

  return (
    <form onSubmit={onSubmit} className="flex max-w-4xl flex-col gap-5">
      <Card className="grid gap-4 p-5 sm:grid-cols-2">
        <Field label="Име">
          <Input value={f.name} onChange={(e) => set({ name: e.target.value })} required />
        </Field>
        <Field label="URL адрес (slug)">
          <Input
            value={f.slug}
            onChange={(e) => set({ slug: e.target.value })}
            placeholder={slugify(f.name) || "centar"}
          />
        </Field>
        <Field label="Статус">
          <Select
            value={f.status}
            onChange={(e) => set({ status: e.target.value as "open" | "coming-soon" })}
          >
            <option value="open">Отворена</option>
            <option value="coming-soon">Очаквай скоро</option>
          </Select>
        </Field>
        <Field label="Ценови диапазон">
          <Input
            value={f.price_range}
            onChange={(e) => set({ price_range: e.target.value })}
            placeholder="25–70 лв."
          />
        </Field>
      </Card>

      <Card className="grid gap-4 p-5 sm:grid-cols-2">
        <Field label="Адрес (улица, номер)">
          <Input value={f.address_line} onChange={(e) => set({ address_line: e.target.value })} />
        </Field>
        <Field label="Квартал / район">
          <Input value={f.district} onChange={(e) => set({ district: e.target.value })} />
        </Field>
        <Field label="Град">
          <Input value={f.city} onChange={(e) => set({ city: e.target.value })} />
        </Field>
        <Field label="Пощенски код">
          <Input value={f.postal_code} onChange={(e) => set({ postal_code: e.target.value })} />
        </Field>

        <Field
          label="Google Maps линк → координати"
          hint="Постави линк от Google Maps и натисни „Вземи“."
          className="sm:col-span-2"
        >
          <div className="flex gap-2">
            <Input
              value={mapsLink}
              onChange={(e) => setMapsLink(e.target.value)}
              placeholder="https://maps.google.com/…"
            />
            <Button type="button" variant="outline" onClick={applyMapsLink} className="shrink-0">
              <MapPin className="h-4 w-4" /> Вземи
            </Button>
          </div>
        </Field>
        <Field label="Ширина (lat)">
          <Input
            type="number"
            step="any"
            value={f.lat ?? ""}
            onChange={(e) => set({ lat: e.target.value === "" ? null : Number(e.target.value) })}
          />
        </Field>
        <Field label="Дължина (lng)">
          <Input
            type="number"
            step="any"
            value={f.lng ?? ""}
            onChange={(e) => set({ lng: e.target.value === "" ? null : Number(e.target.value) })}
          />
        </Field>
      </Card>

      <Card className="grid gap-4 p-5 sm:grid-cols-2">
        <Field label="Телефон">
          <Input value={f.phone} onChange={(e) => set({ phone: e.target.value })} placeholder="0882 031 790" />
        </Field>
        <Field label="Имейл">
          <Input value={f.email} onChange={(e) => set({ email: e.target.value })} />
        </Field>
        <Field label="Линк за резервация (Fresha)" className="sm:col-span-2">
          <Input value={f.fresha_url} onChange={(e) => set({ fresha_url: e.target.value })} />
        </Field>
      </Card>

      <Card className="flex flex-col gap-4 p-5">
        <Field label="Кратко описание (за картата)">
          <Input value={f.blurb} onChange={(e) => set({ blurb: e.target.value })} />
        </Field>
        <Field label="Пълно описание">
          <RichTextEditor value={f.description} onChange={(description) => set({ description })} />
        </Field>
      </Card>

      <Card className="flex flex-col gap-2 p-5">
        <p className="text-xs font-medium uppercase tracking-wide text-grey">Работно време</p>
        <HoursEditor hours={f.hours} onChange={(hours) => set({ hours })} />
      </Card>

      <div className="flex gap-3">
        <Button type="submit" variant="gold" disabled={saving}>
          {saving ? "Запис…" : "Запази"}
        </Button>
        <Link
          href="/admin/locations"
          className="inline-flex items-center rounded-lg border border-hairline px-4 text-sm text-grey transition-colors hover:text-ink"
        >
          Отказ
        </Link>
      </div>
    </form>
  );
}
