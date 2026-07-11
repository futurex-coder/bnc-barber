"use client";

import Link from "next/link";
import { Pencil } from "lucide-react";
import { SortableList } from "./SortableList";
import { DeleteButton } from "./DeleteButton";
import { Badge } from "./ui";

export type AdminListItem = {
  id: string;
  title: string;
  subtitle?: string;
  /** undefined = no thumbnail column; "" = empty (gradient) slot; url = image */
  thumb?: string | null;
  badge?: string;
  editHref: string;
};

export function AdminList({
  items,
  onReorder,
  onDelete,
  emptyText = "Още няма записи. Добави първия.",
}: {
  items: AdminListItem[];
  onReorder: (ids: string[]) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  emptyText?: string;
}) {
  if (!items.length) {
    return (
      <p className="rounded-brand border border-dashed border-hairline p-8 text-center text-sm text-grey">
        {emptyText}
      </p>
    );
  }

  return (
    <SortableList
      items={items}
      onReorder={onReorder}
      renderRow={(it) => (
        <div className="flex flex-wrap items-center gap-x-3 gap-y-3">
          {it.thumb !== undefined ? (
            it.thumb ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={it.thumb}
                alt=""
                className="h-11 w-11 shrink-0 rounded-lg border border-hairline object-cover"
              />
            ) : (
              <div className="img-fallback h-11 w-11 shrink-0 rounded-lg border border-hairline" />
            )
          ) : null}
          <div className="min-w-0 flex-1 basis-40">
            <p className="flex items-center gap-2 font-medium text-ink">
              <span className="truncate">{it.title}</span>
              {it.badge ? (
                <Badge className="shrink-0 border-gold/30 text-gold">{it.badge}</Badge>
              ) : null}
            </p>
            {it.subtitle ? (
              <p className="truncate text-sm text-grey">{it.subtitle}</p>
            ) : null}
          </div>
          {/* Actions: their own full-width row on mobile, inline from sm up. */}
          <div className="flex w-full items-center gap-2 sm:w-auto">
            <Link
              href={it.editHref}
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-hairline px-3 py-2 text-xs text-grey transition-colors hover:border-gold hover:text-gold-bright sm:flex-none sm:py-1.5"
            >
              <Pencil className="h-3.5 w-3.5" />
              Редакция
            </Link>
            <DeleteButton
              onDelete={() => onDelete(it.id)}
              className="flex-1 py-2 sm:flex-none sm:py-1.5"
            />
          </div>
        </div>
      )}
    />
  );
}
