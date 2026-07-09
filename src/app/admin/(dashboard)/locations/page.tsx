import { PageHeading } from "@/components/admin/PageHeading";
import { AdminList } from "@/components/admin/AdminList";
import { listLocations } from "@/lib/admin/read";
import { reorderLocations, deleteLocation } from "@/lib/admin/actions/locations";

export const dynamic = "force-dynamic";

export default async function LocationsPage() {
  const locations = await listLocations();
  const items = locations.map((l) => ({
    id: l.id,
    title: l.name,
    subtitle: [l.address_line, l.city].filter(Boolean).join(", "),
    badge: l.status === "coming-soon" ? "Скоро" : undefined,
    editHref: `/admin/locations/${l.id}`,
  }));

  return (
    <div>
      <PageHeading
        title="Локации"
        description="Адрес, карта, работно време, контакти, описание, снимки и екип."
        action={{ href: "/admin/locations/new", label: "Нова локация" }}
      />
      <AdminList items={items} onReorder={reorderLocations} onDelete={deleteLocation} />
    </div>
  );
}
