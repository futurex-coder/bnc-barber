"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Button, Input, Textarea, Field, Card } from "@/components/admin/ui";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { useSave } from "@/components/admin/useSave";
import { updateAbout, type AboutInput, type AboutValue } from "@/lib/admin/actions/about";
import type { Tables } from "@/lib/supabase/types";

export function AboutForm({ about }: { about: Tables<"about_settings"> | null }) {
  const { save, saving } = useSave();
  const values: AboutValue[] = Array.isArray(about?.values)
    ? (about!.values as AboutValue[])
    : [];
  const [f, setF] = useState<AboutInput>(() => ({
    eyebrow: about?.eyebrow ?? "За нас",
    title: about?.title ?? "",
    lead: about?.lead ?? "",
    body: about?.body ?? "",
    values,
    image_url: about?.image_url ?? "",
  }));
  const set = (patch: Partial<AboutInput>) => setF((p) => ({ ...p, ...patch }));

  function setValue(i: number, patch: Partial<AboutValue>) {
    set({ values: f.values.map((v, idx) => (idx === i ? { ...v, ...patch } : v)) });
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    await save(() => updateAbout(f), { success: "„За нас“ е обновено" });
  }

  return (
    <form onSubmit={onSubmit} className="flex max-w-3xl flex-col gap-5">
      <Card className="flex flex-col gap-4 p-5">
        <Field label="Надпис отгоре (eyebrow)">
          <Input value={f.eyebrow} onChange={(e) => set({ eyebrow: e.target.value })} />
        </Field>
        <Field label="Кратко въведение (lead)">
          <Textarea value={f.lead} onChange={(e) => set({ lead: e.target.value })} rows={2} />
        </Field>
        <Field label="Описание / история">
          <RichTextEditor value={f.body} onChange={(body) => set({ body })} />
        </Field>
      </Card>

      <Card className="flex flex-col gap-3 p-5">
        <p className="text-xs font-medium uppercase tracking-wide text-grey">Снимка</p>
        <div className="max-w-xs">
          <ImageUploader
            value={f.image_url}
            onChange={(image_url) => set({ image_url })}
            folder="about"
          />
        </div>
      </Card>

      <Card className="flex flex-col gap-3 p-5">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium uppercase tracking-wide text-grey">Ценности</p>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => set({ values: [...f.values, { title: "", text: "" }] })}
          >
            <Plus className="h-3.5 w-3.5" /> Добави
          </Button>
        </div>
        {f.values.length ? (
          <div className="flex flex-col gap-3">
            {f.values.map((v, i) => (
              <div key={i} className="flex gap-2 rounded-lg border border-hairline p-3">
                <div className="flex flex-1 flex-col gap-2">
                  <Input
                    value={v.title}
                    onChange={(e) => setValue(i, { title: e.target.value })}
                    placeholder="Заглавие"
                  />
                  <Textarea
                    value={v.text}
                    onChange={(e) => setValue(i, { text: e.target.value })}
                    rows={2}
                    placeholder="Описание"
                  />
                </div>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  onClick={() => set({ values: f.values.filter((_, idx) => idx !== i) })}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-grey">Няма добавени ценности.</p>
        )}
      </Card>

      <div>
        <Button type="submit" variant="gold" disabled={saving}>
          {saving ? "Запис…" : "Запази"}
        </Button>
      </div>
    </form>
  );
}
