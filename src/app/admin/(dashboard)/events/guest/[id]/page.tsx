import { notFound } from "next/navigation";
import { PageHeading } from "@/components/admin/PageHeading";
import { GuestForm } from "@/components/admin/forms/GuestForm";
import { getGuestRow, locationOptions } from "@/lib/admin/read";

export const dynamic = "force-dynamic";

export default async function GuestEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const isNew = id === "new";
  const [locations, guest] = await Promise.all([
    locationOptions(),
    isNew ? Promise.resolve(null) : getGuestRow(id),
  ]);
  if (!isNew && !guest) notFound();

  return (
    <div className="max-w-4xl">
      <PageHeading
        title={isNew ? "Нов гост" : (guest?.name ?? "Редакция")}
        back={{ href: "/admin/events", label: "Към събитията" }}
      />
      <GuestForm guest={guest} locations={locations} />
    </div>
  );
}
