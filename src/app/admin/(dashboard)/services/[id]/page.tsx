import { notFound } from "next/navigation";
import { PageHeading } from "@/components/admin/PageHeading";
import { ServiceForm } from "@/components/admin/forms/ServiceForm";
import { getServiceRow, listServices } from "@/lib/admin/read";

export const dynamic = "force-dynamic";

export default async function ServiceEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const isNew = id === "new";

  const all = await listServices();
  const categories = Array.from(
    new Set(all.map((s) => s.category).filter((c): c is string => !!c)),
  );
  const service = isNew ? null : await getServiceRow(id);
  if (!isNew && !service) notFound();

  return (
    <div>
      <PageHeading
        title={isNew ? "Нова услуга" : (service?.name ?? "Редакция")}
        back={{ href: "/admin/services", label: "Към услугите" }}
      />
      <ServiceForm service={service} categories={categories} />
    </div>
  );
}
