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
        <div className="flex items-center gap-3">
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
          <div className="min-w-0 flex-1">
            <p className="flex items-center gap-2 truncate font-medium text-ink">
              {it.title}
              {it.badge ? <Badge className="border-gold/30 text-gold">{it.badge}</Badge> : null}
            </p>
            {it.subtitle ? (
              <p className="truncate text-sm text-grey">{it.subtitle}</p>
            ) : null}
          </div>
          <Link
            href={it.editHref}
            className="inline-flex items-center gap-1.5 rounded-lg border border-hairline px-3 py-1.5 text-xs text-grey transition-colors hover:border-gold hover:text-gold-bright"
          >
            <Pencil className="h-3.5 w-3.5" />
            Редакция
          </Link>
          <DeleteButton onDelete={() => onDelete(it.id)} />
        </div>
      )}
    />
  );
}
