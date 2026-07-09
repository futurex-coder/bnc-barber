import { PageHeading } from "@/components/admin/PageHeading";
import { AdminList } from "@/components/admin/AdminList";
import { listBarbers } from "@/lib/admin/read";
import { reorderBarbers, deleteBarber } from "@/lib/admin/actions/barbers";

export const dynamic = "force-dynamic";

export default async function TeamPage() {
  const barbers = await listBarbers();
  const items = barbers.map((b) => {
    const loc = b.location as { name: string } | null;
    return {
      id: b.id,
      title: b.name,
      subtitle: [b.role, loc?.name].filter(Boolean).join(" · "),
      thumb: b.avatar_url ?? "",
      badge: b.is_placeholder ? "Примерен" : undefined,
      editHref: `/admin/team/${b.id}`,
    };
  });

  return (
    <div>
      <PageHeading
        title="Екип"
        description="Бръснари: ред (провлачи), инфо, тагове, Instagram, линк за резервация и галерия."
        action={{ href: "/admin/team/new", label: "Нов бръснар" }}
      />
      <AdminList items={items} onReorder={reorderBarbers} onDelete={deleteBarber} />
    </div>
  );
}
