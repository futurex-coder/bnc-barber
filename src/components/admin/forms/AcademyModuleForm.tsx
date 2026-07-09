"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Input, Field, Card } from "@/components/admin/ui";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { TagInput } from "@/components/admin/TagInput";
import { useSave } from "@/components/admin/useSave";
import { createModule, updateModule, type ModuleInput } from "@/lib/admin/actions/academy";
import type { Tables } from "@/lib/supabase/types";

export function AcademyModuleForm({ module }: { module?: Tables<"academy_modules"> | null }) {
  const { save, saving } = useSave();
  const [f, setF] = useState<ModuleInput>(() => ({
    number: module?.number ?? "",
    title: module?.title ?? "",
    summary: module?.summary ?? "",
    points: module?.points ?? [],
  }));
  const set = (patch: Partial<ModuleInput>) => setF((p) => ({ ...p, ...patch }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (module) await save(() => updateModule(module.id, f), { redirectTo: "/admin/academy" });
    else await save(() => createModule(f), { redirectTo: "/admin/academy" });
  }

  return (
    <form onSubmit={onSubmit} className="flex max-w-2xl flex-col gap-5">
      <Card className="flex flex-col gap-4 p-5">
        <div className="grid gap-4 sm:grid-cols-[120px_1fr]">
          <Field label="Номер" hint="напр. 01">
            <Input value={f.number} onChange={(e) => set({ number: e.target.value })} />
          </Field>
          <Field label="Заглавие">
            <Input value={f.title} onChange={(e) => set({ title: e.target.value })} required />
          </Field>
        </div>
        <Field label="Описание">
          <RichTextEditor value={f.summary} onChange={(summary) => set({ summary })} />
        </Field>
        <Field label="Акценти / точки (features)">
          <TagInput
            value={f.points}
            onChange={(points) => set({ points })}
            placeholder="Skin fade, Blend без линии…"
          />
        </Field>
      </Card>

      <div className="flex gap-3">
        <Button type="submit" variant="gold" disabled={saving}>
          {saving ? "Запис…" : "Запази"}
        </Button>
        <Link
          href="/admin/academy"
          className="inline-flex items-center rounded-lg border border-hairline px-4 text-sm text-grey transition-colors hover:text-ink"
        >
          Отказ
        </Link>
      </div>
    </form>
  );
}
