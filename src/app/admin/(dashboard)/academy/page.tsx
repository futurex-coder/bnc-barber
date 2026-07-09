import Link from "next/link";
import { Plus } from "lucide-react";
import { PageHeading } from "@/components/admin/PageHeading";
import { AcademySettingsForm } from "@/components/admin/forms/AcademySettingsForm";
import { AdminList } from "@/components/admin/AdminList";
import { GalleryManager } from "@/components/admin/GalleryManager";
import { Card } from "@/components/admin/ui";
import { getAcademySettingsRow, listModules, listAcademyImages } from "@/lib/admin/read";
import { reorderModules, deleteModule } from "@/lib/admin/actions/academy";

export const dynamic = "force-dynamic";

export default async function AcademyPage() {
  const [settings, modules, images] = await Promise.all([
    getAcademySettingsRow(),
    listModules(),
    listAcademyImages(),
  ]);

  const items = modules.map((m) => ({
    id: m.id,
    title: `${m.number ? m.number + " · " : ""}${m.title}`,
    subtitle: m.points.join(", "),
    editHref: `/admin/academy/modules/${m.id}`,
  }));

  return (
    <div className="max-w-4xl">
      <PageHeading
        title="Академия"
        description="Описание, начални дати, продължителност, модули и галерия."
      />

      <AcademySettingsForm settings={settings} />

      <section className="mt-12">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl uppercase tracking-wide text-ink">Модули</h2>
          <Link
            href="/admin/academy/modules/new"
            className="inline-flex items-center gap-2 rounded-lg bg-gold px-3 py-2 text-sm font-medium text-base transition-colors hover:bg-gold-bright"
          >
            <Plus className="h-4 w-4" /> Нов модул
          </Link>
        </div>
        <AdminList items={items} onReorder={reorderModules} onDelete={deleteModule} />
      </section>

      <Card className="mt-12 p-5">
        <p className="mb-3 text-xs font-medium uppercase tracking-wide text-grey">
          Галерия на академията
        </p>
        <GalleryManager
          table="academy_images"
          folder="academy"
          initial={images.map((i) => ({
            id: i.id,
            url: i.url,
            alt: i.alt ?? "",
            sort_order: i.sort_order,
          }))}
        />
      </Card>
    </div>
  );
}
