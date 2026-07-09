import { PageHeading } from "@/components/admin/PageHeading";
import { AdminList } from "@/components/admin/AdminList";
import { listServices } from "@/lib/admin/read";
import { reorderServices, deleteService } from "@/lib/admin/actions/services";
import { formatPrice, formatDuration } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const services = await listServices();
  const items = services.map((s) => ({
    id: s.id,
    title: s.name,
    subtitle: [s.category, formatPrice(Number(s.price)), formatDuration(s.duration_min)]
      .filter(Boolean)
      .join(" · "),
    badge: s.popular ? "Топ" : undefined,
    editHref: `/admin/services/${s.id}`,
  }));

  return (
    <div>
      <PageHeading
        title="Услуги"
        description="Име, категория, цена, времетраене, тагове и линк за резервация."
        action={{ href: "/admin/services/new", label: "Нова услуга" }}
      />
      <AdminList items={items} onReorder={reorderServices} onDelete={deleteService} />
    </div>
  );
}
