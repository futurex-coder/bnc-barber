import { notFound } from "next/navigation";
import { PageHeading } from "@/components/admin/PageHeading";
import { AcademyModuleForm } from "@/components/admin/forms/AcademyModuleForm";
import { getModuleRow } from "@/lib/admin/read";

export const dynamic = "force-dynamic";

export default async function ModuleEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const isNew = id === "new";
  const mod = isNew ? null : await getModuleRow(id);
  if (!isNew && !mod) notFound();

  return (
    <div>
      <PageHeading
        title={isNew ? "Нов модул" : (mod?.title ?? "Редакция")}
        back={{ href: "/admin/academy", label: "Към академията" }}
      />
      <AcademyModuleForm module={mod} />
    </div>
  );
}
