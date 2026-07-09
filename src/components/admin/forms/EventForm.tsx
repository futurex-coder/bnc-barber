"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Input, Field, Card } from "@/components/admin/ui";
import { useSave } from "@/components/admin/useSave";
import { createEvent, updateEvent, type EventInput } from "@/lib/admin/actions/events";
import type { Tables } from "@/lib/supabase/types";

export function EventForm({ event }: { event?: Tables<"events"> | null }) {
  const { save, saving } = useSave();
  const [f, setF] = useState<EventInput>(() => ({
    date: event?.date ?? "",
    label: event?.label ?? "",
    title: event?.title ?? "",
    href: event?.href ?? "",
  }));
  const set = (patch: Partial<EventInput>) => setF((p) => ({ ...p, ...patch }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (event) await save(() => updateEvent(event.id, f), { redirectTo: "/admin/events" });
    else await save(() => createEvent(f), { redirectTo: "/admin/events" });
  }

  return (
    <form onSubmit={onSubmit} className="flex max-w-2xl flex-col gap-5">
      <Card className="flex flex-col gap-4 p-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Дата">
            <Input
              type="date"
              value={f.date}
              onChange={(e) => set({ date: e.target.value })}
              required
            />
          </Field>
          <Field label="Етикет" hint="напр. Академия, Guest barber">
            <Input value={f.label} onChange={(e) => set({ label: e.target.value })} />
          </Field>
        </div>
        <Field label="Заглавие">
          <Input value={f.title} onChange={(e) => set({ title: e.target.value })} required />
        </Field>
        <Field label="Линк (по избор)" hint="Вътрешен път или външен URL.">
          <Input value={f.href} onChange={(e) => set({ href: e.target.value })} placeholder="/akademiya" />
        </Field>
      </Card>

      <div className="flex gap-3">
        <Button type="submit" variant="gold" disabled={saving}>
          {saving ? "Запис…" : "Запази"}
        </Button>
        <Link
          href="/admin/events"
          className="inline-flex items-center rounded-lg border border-hairline px-4 text-sm text-grey transition-colors hover:text-ink"
        >
          Отказ
        </Link>
      </div>
    </form>
  );
}
