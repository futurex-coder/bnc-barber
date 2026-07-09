import { renderOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getGuest } from "@/lib/content";
import { formatDateRange } from "@/lib/utils";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Bonnie & Clyde — гост артист";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const g = await getGuest(slug);
  return renderOg({
    eyebrow: g ? `${g.discipline} · ${formatDateRange(g.from, g.to)}` : "Гост · Русе",
    title: g?.name ?? "Гост артист",
    subtitle: g?.style ?? "Резиденция в Bonnie & Clyde",
  });
}
