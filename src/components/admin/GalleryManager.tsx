"use client";

import { useRef, useState, useTransition } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  useSortable,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, X, UploadCloud, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { uploadToMedia } from "./ImageUploader";
import { useMounted } from "./useMounted";
import {
  addGalleryImages,
  removeGalleryImage,
  reorderGalleryImages,
  type GalleryImageRow,
} from "@/lib/admin/actions/images";

type GTable = "barber_images" | "location_images" | "academy_images" | "gallery";

function SortableTile({
  img,
  onRemove,
}: {
  img: GalleryImageRow;
  onRemove: (id: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: img.id });
  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={`group relative aspect-square overflow-hidden rounded-lg border border-hairline bg-base ${
        isDragging ? "z-10 opacity-80 ring-2 ring-gold/50" : ""
      }`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={img.url} alt={img.alt} className="h-full w-full object-cover" />
      <button
        type="button"
        {...attributes}
        {...listeners}
        className="absolute left-1.5 top-1.5 grid h-7 w-7 cursor-grab place-items-center rounded-md bg-base/80 text-grey backdrop-blur active:cursor-grabbing"
        title="Провлачи за подредба"
      >
        <GripVertical className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => onRemove(img.id)}
        className="absolute right-1.5 top-1.5 grid h-7 w-7 place-items-center rounded-md bg-base/80 text-grey backdrop-blur transition-colors hover:bg-oxblood/70 hover:text-ink"
        title="Изтрий"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

export function GalleryManager({
  table,
  parentId,
  folder,
  initial,
}: {
  table: GTable;
  parentId?: string;
  folder: string;
  initial: GalleryImageRow[];
}) {
  const [images, setImages] = useState<GalleryImageRow[]>(initial);
  const [busy, setBusy] = useState(false);
  const [, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);
  const mounted = useMounted();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  async function onFiles(files: FileList | null) {
    if (!files || !files.length) return;
    setBusy(true);
    try {
      const urls: string[] = [];
      for (const file of Array.from(files)) {
        urls.push(await uploadToMedia(file, folder));
      }
      const rows = await addGalleryImages(table, parentId ?? null, urls);
      setImages((prev) => [...prev, ...rows]);
      toast.success(rows.length > 1 ? "Снимките са качени" : "Снимката е качена");
    } catch {
      toast.error("Качването се провали.");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function onRemove(id: string) {
    const prev = images;
    setImages((imgs) => imgs.filter((i) => i.id !== id));
    startTransition(async () => {
      try {
        await removeGalleryImage(table, id);
      } catch {
        setImages(prev);
        toast.error("Изтриването се провали.");
      }
    });
  }

  function onDragEnd(e: DragEndEvent) {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const oldIndex = images.findIndex((i) => i.id === active.id);
    const newIndex = images.findIndex((i) => i.id === over.id);
    const next = arrayMove(images, oldIndex, newIndex);
    setImages(next);
    startTransition(async () => {
      try {
        await reorderGalleryImages(
          table,
          next.map((i) => i.id),
        );
      } catch {
        toast.error("Подредбата не се запази.");
      }
    });
  }

  const addButton = (
    <button
      type="button"
      onClick={() => inputRef.current?.click()}
      disabled={busy}
      className="flex aspect-square flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-hairline-strong text-grey transition-colors hover:border-gold/50 hover:text-ink"
    >
      {busy ? (
        <Loader2 className="h-6 w-6 animate-spin" />
      ) : (
        <>
          <UploadCloud className="h-6 w-6" />
          <span className="text-xs">Добави</span>
        </>
      )}
    </button>
  );

  return (
    <div className="flex flex-col gap-3">
      {mounted ? (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
          <SortableContext items={images.map((i) => i.id)} strategy={rectSortingStrategy}>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
              {images.map((img) => (
                <SortableTile key={img.id} img={img} onRemove={onRemove} />
              ))}
              {addButton}
            </div>
          </SortableContext>
        </DndContext>
      ) : (
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
          {images.map((img) => (
            <div
              key={img.id}
              className="relative aspect-square overflow-hidden rounded-lg border border-hairline bg-base"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.url} alt={img.alt} className="h-full w-full object-cover" />
            </div>
          ))}
          {addButton}
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => onFiles(e.target.files)}
      />
      {images.length ? (
        <p className="text-xs text-grey/70">Провлачи снимките, за да ги подредиш.</p>
      ) : null}
    </div>
  );
}
