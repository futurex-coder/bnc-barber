import { PageHeading } from "@/components/admin/PageHeading";
import { AboutForm } from "@/components/admin/forms/AboutForm";
import { getAboutRow } from "@/lib/admin/read";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const about = await getAboutRow();

  return (
    <div>
      <PageHeading title="За нас" description="Описание, въведение, снимка и ценности." />
      <AboutForm about={about} />
    </div>
  );
}
