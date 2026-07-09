import { notFound } from "next/navigation";
import { PageHeading } from "@/components/admin/PageHeading";
import { BarberForm } from "@/components/admin/forms/BarberForm";
import { GalleryManager } from "@/components/admin/GalleryManager";
import { Card } from "@/components/admin/ui";
import { getBarberRow, listBarberImages, locationOptions } from "@/lib/admin/read";

export const dynamic = "force-dynamic";

export default async function BarberEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const isNew = id === "new";

  const [locations, barber] = await Promise.all([
    locationOptions(),
    isNew ? Promise.resolve(null) : getBarberRow(id),
  ]);
  if (!isNew && !barber) notFound();

  const images = isNew ? [] : await listBarberImages(id);

  return (
    <div className="max-w-4xl">
      <PageHeading
        title={isNew ? "Нов бръснар" : (barber?.name ?? "Редакция")}
        back={{ href: "/admin/team", label: "Към екипа" }}
      />
      <BarberForm barber={barber} locations={locations} />

      {!isNew ? (
        <Card className="mt-6 p-5">
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-grey">
            Галерия на бръснаря
          </p>
          <GalleryManager
            table="barber_images"
            parentId={id}
            folder="barbers"
            initial={images.map((i) => ({
              id: i.id,
              url: i.url,
              alt: i.alt ?? "",
              sort_order: i.sort_order,
            }))}
          />
        </Card>
      ) : null}
    </div>
  );
}
