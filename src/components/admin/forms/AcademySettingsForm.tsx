"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Button, Input, Field, Card } from "@/components/admin/ui";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { useSave } from "@/components/admin/useSave";
import {
  updateAcademySettings,
  type AcademySettingsInput,
  type AcademyStartDate,
} from "@/lib/admin/actions/academy";
import type { Tables } from "@/lib/supabase/types";

export function AcademySettingsForm({
  settings,
}: {
  settings: Tables<"academy_settings"> | null;
}) {
  const { save, saving } = useSave();
  const startDates: AcademyStartDate[] = Array.isArray(settings?.start_dates)
    ? (settings!.start_dates as AcademyStartDate[])
    : [];
  const [f, setF] = useState<AcademySettingsInput>(() => ({
    eyebrow: settings?.eyebrow ?? "",
    title: settings?.title ?? "",
    lead: settings?.lead ?? "",
    description: settings?.description ?? "",
    price_note: settings?.price_note ?? "",
    duration: settings?.duration ?? "",
    start_dates: startDates,
    cta_label: settings?.cta_label ?? "Запиши консултация",
    cta_url: settings?.cta_url ?? "",
  }));
  const set = (patch: Partial<AcademySettingsInput>) => setF((p) => ({ ...p, ...patch }));

  function setDate(i: number, patch: Partial<AcademyStartDate>) {
    set({ start_dates: f.start_dates.map((d, idx) => (idx === i ? { ...d, ...patch } : d)) });
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    await save(() => updateAcademySettings(f), { success: "Академията е обновена" });
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <Card className="grid gap-4 p-5 sm:grid-cols-2">
        <Field label="Надпис отгоре (eyebrow)">
          <Input value={f.eyebrow} onChange={(e) => set({ eyebrow: e.target.value })} />
        </Field>
        <Field label="Заглавие">
          <Input value={f.title} onChange={(e) => set({ title: e.target.value })} />
        </Field>
        <Field label="Продължителност">
          <Input
            value={f.duration}
            onChange={(e) => set({ duration: e.target.value })}
            placeholder="8 седмици · присъствено"
          />
        </Field>
        <Field label="Бележка за цената">
          <Input value={f.price_note} onChange={(e) => set({ price_note: e.target.value })} />
        </Field>
        <Field label="Текст на бутона">
          <Input value={f.cta_label} onChange={(e) => set({ cta_label: e.target.value })} />
        </Field>
        <Field label="Линк на бутона (Cal.com)">
          <Input value={f.cta_url} onChange={(e) => set({ cta_url: e.target.value })} />
        </Field>
      </Card>

      <Card className="flex flex-col gap-4 p-5">
        <Field label="Кратко въведение (lead)">
          <RichTextEditor value={f.lead} onChange={(lead) => set({ lead })} />
        </Field>
        <Field label="Пълно описание">
          <RichTextEditor value={f.description} onChange={(description) => set({ description })} />
        </Field>
      </Card>

      <Card className="flex flex-col gap-3 p-5">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium uppercase tracking-wide text-grey">Начални дати</p>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => set({ start_dates: [...f.start_dates, { date: "", label: "" }] })}
          >
            <Plus className="h-3.5 w-3.5" /> Добави
          </Button>
        </div>
        {f.start_dates.length ? (
          <div className="flex flex-col gap-2">
            {f.start_dates.map((d, i) => (
              <div key={i} className="flex gap-2">
                <Input
                  type="date"
                  value={d.date}
                  onChange={(e) => setDate(i, { date: e.target.value })}
                  className="w-44"
                />
                <Input
                  value={d.label}
                  onChange={(e) => setDate(i, { label: e.target.value })}
                  placeholder="Есенен випуск"
                />
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  onClick={() => set({ start_dates: f.start_dates.filter((_, idx) => idx !== i) })}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-grey">Няма добавени дати.</p>
        )}
      </Card>

      <div>
        <Button type="submit" variant="gold" disabled={saving}>
          {saving ? "Запис…" : "Запази академията"}
        </Button>
      </div>
    </form>
  );
}
