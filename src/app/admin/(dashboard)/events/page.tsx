import Link from "next/link";
import { Plus } from "lucide-react";
import { PageHeading } from "@/components/admin/PageHeading";
import { AdminList } from "@/components/admin/AdminList";
import { listEvents, listGuests } from "@/lib/admin/read";
import { reorderEvents, deleteEvent } from "@/lib/admin/actions/events";
import { reorderGuests, deleteGuest } from "@/lib/admin/actions/guests";
import { formatEventDate, formatDateRange } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function EventsPage() {
  const [events, guests] = await Promise.all([listEvents(), listGuests()]);

  const eventItems = events.map((e) => {
    const d = formatEventDate(e.date);
    return {
      id: e.id,
      title: e.title,
      subtitle: [`${d.day} ${d.month}`, e.label].filter(Boolean).join(" · "),
      editHref: `/admin/events/event/${e.id}`,
    };
  });

  const guestItems = guests.map((g) => ({
    id: g.id,
    title: g.name,
    subtitle: [
      g.discipline,
      g.from_date && g.to_date ? formatDateRange(g.from_date, g.to_date) : "",
    ]
      .filter(Boolean)
      .join(" · "),
    thumb: g.image_url ?? "",
    badge: g.featured ? "Спотлайт" : undefined,
    editHref: `/admin/events/guest/${g.id}`,
  }));

  return (
    <div>
      <PageHeading
        title="Събития & гости"
        description="Календар (timeline) и гост артисти — имена, дати, категории, тагове, локация."
      />

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl uppercase tracking-wide text-ink">
            Календар / събития
          </h2>
          <Link
            href="/admin/events/event/new"
            className="inline-flex items-center gap-2 rounded-lg bg-gold px-3 py-2 text-sm font-medium text-base transition-colors hover:bg-gold-bright"
          >
            <Plus className="h-4 w-4" /> Ново събитие
          </Link>
        </div>
        <AdminList
          items={eventItems}
          onReorder={reorderEvents}
          onDelete={deleteEvent}
          emptyText="Няма събития."
        />
      </section>

      <section className="mt-12">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl uppercase tracking-wide text-ink">Гост артисти</h2>
          <Link
            href="/admin/events/guest/new"
            className="inline-flex items-center gap-2 rounded-lg bg-gold px-3 py-2 text-sm font-medium text-base transition-colors hover:bg-gold-bright"
          >
            <Plus className="h-4 w-4" /> Нов гост
          </Link>
        </div>
        <AdminList
          items={guestItems}
          onReorder={reorderGuests}
          onDelete={deleteGuest}
          emptyText="Няма гости."
        />
      </section>
    </div>
  );
}
