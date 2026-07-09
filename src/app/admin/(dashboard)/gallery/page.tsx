import { PageHeading } from "@/components/admin/PageHeading";
import { GalleryManager } from "@/components/admin/GalleryManager";
import { Card } from "@/components/admin/ui";
import { listGalleryImages } from "@/lib/admin/read";

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const images = await listGalleryImages();

  return (
    <div className="max-w-4xl">
      <PageHeading
        title="Галерия"
        description="Качи снимки и ги подреди чрез провлачване (drag & drop)."
      />
      <Card className="p-5">
        <GalleryManager
          table="gallery"
          folder="gallery"
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
