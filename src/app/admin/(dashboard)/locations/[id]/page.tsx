import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHeading } from "@/components/admin/PageHeading";
import { LocationForm } from "@/components/admin/forms/LocationForm";
import { GalleryManager } from "@/components/admin/GalleryManager";
import { Card } from "@/components/admin/ui";
import { getLocationRow, listLocationImages, listBarbers } from "@/lib/admin/read";

export const dynamic = "force-dynamic";

export default async function LocationEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const isNew = id === "new";

  const location = isNew ? null : await getLocationRow(id);
  if (!isNew && !location) notFound();

  const [images, barbers] = await Promise.all([
    isNew ? Promise.resolve([]) : listLocationImages(id),
    isNew ? Promise.resolve([]) : listBarbers(),
  ]);
  const team = barbers.filter((b) => b.location_id === id);

  return (
    <div className="max-w-4xl">
      <PageHeading
        title={isNew ? "Нова локация" : (location?.name ?? "Редакция")}
        back={{ href: "/admin/locations", label: "Към локациите" }}
      />
      <LocationForm location={location} />

      {!isNew ? (
        <>
          <Card className="mt-6 p-5">
            <p className="mb-3 text-xs font-medium uppercase tracking-wide text-grey">
              Снимки на локацията
            </p>
            <GalleryManager
              table="location_images"
              parentId={id}
              folder="locations"
              initial={images.map((i) => ({
                id: i.id,
                url: i.url,
                alt: i.alt ?? "",
                sort_order: i.sort_order,
              }))}
            />
          </Card>

          <Card className="mt-6 p-5">
            <p className="mb-3 text-xs font-medium uppercase tracking-wide text-grey">
              Екип на тази локация
            </p>
            {team.length ? (
              <ul className="flex flex-wrap gap-2">
                {team.map((b) => (
                  <li key={b.id}>
                    <Link
                      href={`/admin/team/${b.id}`}
                      className="inline-flex items-center gap-2 rounded-full border border-hairline px-3 py-1.5 text-sm text-ink transition-colors hover:border-gold hover:text-gold-bright"
                    >
                      {b.name}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-grey">
                Няма назначени бръснари. Отвори{" "}
                <Link href="/admin/team" className="text-gold-bright hover:underline">
                  Екип
                </Link>{" "}
                и избери тази локация в профила на бръснаря.
              </p>
            )}
          </Card>
        </>
      ) : null}
    </div>
  );
}
