import { renderOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { guests, getGuest } from "@/data/site";
import { formatDateRange } from "@/lib/utils";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Bonnie & Clyde — гост артист";

export function generateStaticParams() {
  return guests.map((g) => ({ slug: g.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const g = getGuest(slug);
  return renderOg({
    eyebrow: g ? `${g.discipline} · ${formatDateRange(g.from, g.to)}` : "Гост · Русе",
    title: g?.name ?? "Гост артист",
    subtitle: g?.style ?? "Резиденция в Bonnie & Clyde",
  });
}
