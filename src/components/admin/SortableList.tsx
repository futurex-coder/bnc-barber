"use client";

import { useState, useTransition } from "react";
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
  verticalListSortingStrategy,
  useSortable,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { toast } from "sonner";
import { useMounted } from "./useMounted";

function Row({ id, children }: { id: string; children: React.ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id });
  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={`flex items-center gap-3 rounded-brand border border-hairline bg-base-elevated/60 p-3 ${
        isDragging ? "z-10 opacity-90 ring-2 ring-gold/40" : ""
      }`}
    >
      <button
        type="button"
        {...attributes}
        {...listeners}
        className="grid h-8 w-8 shrink-0 cursor-grab place-items-center rounded-md text-grey hover:text-ink active:cursor-grabbing"
        title="Провлачи за подредба"
      >
        <GripVertical className="h-4 w-4" />
      </button>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}

export function SortableList<T extends { id: string }>({
  items,
  onReorder,
  renderRow,
}: {
  items: T[];
  onReorder: (ids: string[]) => Promise<void>;
  renderRow: (item: T) => React.ReactNode;
}) {
  const [rows, setRows] = useState(items);
  const [, startTransition] = useTransition();
  const mounted = useMounted();

  // Reset local order when the underlying set changes (add/remove/refresh) —
  // the render-time "adjust state on prop change" pattern (no effect).
  const key = items.map((i) => i.id).join(",");
  const [prevKey, setPrevKey] = useState(key);
  if (key !== prevKey) {
    setPrevKey(key);
    setRows(items);
  }

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  function onDragEnd(e: DragEndEvent) {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const oldIndex = rows.findIndex((r) => r.id === active.id);
    const newIndex = rows.findIndex((r) => r.id === over.id);
    const next = arrayMove(rows, oldIndex, newIndex);
    setRows(next);
    startTransition(async () => {
      try {
        await onReorder(next.map((r) => r.id));
      } catch {
        toast.error("Подредбата не се запази.");
        setRows(rows);
      }
    });
  }

  // Before hydration, render a static (non-draggable) version that matches the
  // server output — dnd-kit's generated ids would otherwise mismatch.
  if (!mounted) {
    return (
      <div className="flex flex-col gap-2">
        {rows.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 rounded-brand border border-hairline bg-base-elevated/60 p-3"
          >
            <span className="grid h-8 w-8 shrink-0 place-items-center text-grey">
              <GripVertical className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1">{renderRow(item)}</div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <SortableContext items={rows.map((r) => r.id)} strategy={verticalListSortingStrategy}>
        <div className="flex flex-col gap-2">
          {rows.map((item) => (
            <Row key={item.id} id={item.id}>
              {renderRow(item)}
            </Row>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
