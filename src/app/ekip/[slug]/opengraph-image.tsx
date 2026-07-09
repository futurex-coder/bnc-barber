import { renderOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getBarber } from "@/lib/content";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Bonnie & Clyde — бръснар";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const b = await getBarber(slug);
  return renderOg({
    eyebrow: b?.role ?? "Екип · Русе",
    title: b?.name ?? "Bonnie & Clyde",
    subtitle: b?.tagline ?? "Барбершоп & Академия",
  });
}
