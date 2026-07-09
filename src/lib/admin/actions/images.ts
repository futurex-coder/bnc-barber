"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin/auth";

/* eslint-disable @typescript-eslint/no-explicit-any */

export type GalleryTable =
  | "barber_images"
  | "location_images"
  | "academy_images"
  | "gallery";

const PARENT_FIELD: Record<GalleryTable, "barber_id" | "location_id" | null> = {
  barber_images: "barber_id",
  location_images: "location_id",
  academy_images: null,
  gallery: null,
};

function assertTable(t: string): asserts t is GalleryTable {
  if (!(t in PARENT_FIELD)) throw new Error("Невалидна галерия.");
}

export type GalleryImageRow = {
  id: string;
  url: string;
  alt: string;
  sort_order: number;
};

/** Append uploaded images (by URL) to a gallery table; returns the new rows. */
export async function addGalleryImages(
  table: string,
  parentId: string | null,
  urls: string[],
): Promise<GalleryImageRow[]> {
  assertTable(table);
  if (!urls.length) return [];
  const { supabase } = await requireAdmin();
  const parentField = PARENT_FIELD[table];
  const db = supabase as any;

  let q = db.from(table).select("sort_order").order("sort_order", { ascending: false }).limit(1);
  if (parentField && parentId) q = q.eq(parentField, parentId);
  const { data: top } = await q;
  const start = top?.[0]?.sort_order != null ? top[0].sort_order + 1 : 0;

  const rows = urls.map((url, i) => ({
    url,
    alt: "",
    sort_order: start + i,
    ...(parentField && parentId ? { [parentField]: parentId } : {}),
  }));

  const { data, error } = await db.from(table).insert(rows).select();
  if (error) throw new Error(error.message);
  revalidatePath("/", "layout");
  return (data ?? []).map((r: any) => ({
    id: r.id,
    url: r.url,
    alt: r.alt ?? "",
    sort_order: r.sort_order,
  }));
}

export async function removeGalleryImage(table: string, id: string): Promise<void> {
  assertTable(table);
  const { supabase } = await requireAdmin();
  const db = supabase as any;
  const { error } = await db.from(table).delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/", "layout");
}

export async function reorderGalleryImages(
  table: string,
  orderedIds: string[],
): Promise<void> {
  assertTable(table);
  const { supabase } = await requireAdmin();
  const db = supabase as any;
  await Promise.all(
    orderedIds.map((id, i) => db.from(table).update({ sort_order: i }).eq("id", id)),
  );
  revalidatePath("/", "layout");
}

export async function updateGalleryImageAlt(
  table: string,
  id: string,
  alt: string,
): Promise<void> {
  assertTable(table);
  const { supabase } = await requireAdmin();
  const db = supabase as any;
  const { error } = await db.from(table).update({ alt }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/", "layout");
}
