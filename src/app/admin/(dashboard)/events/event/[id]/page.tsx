import { notFound } from "next/navigation";
import { PageHeading } from "@/components/admin/PageHeading";
import { EventForm } from "@/components/admin/forms/EventForm";
import { getEventRow } from "@/lib/admin/read";

export const dynamic = "force-dynamic";

export default async function EventEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const isNew = id === "new";
  const event = isNew ? null : await getEventRow(id);
  if (!isNew && !event) notFound();

  return (
    <div>
      <PageHeading
        title={isNew ? "Ново събитие" : (event?.title ?? "Редакция")}
        back={{ href: "/admin/events", label: "Към събитията" }}
      />
      <EventForm event={event} />
    </div>
  );
}
