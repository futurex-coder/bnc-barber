import { renderOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { barbers, getBarber } from "@/data/site";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Bonnie & Clyde — бръснар";

export function generateStaticParams() {
  return barbers.map((b) => ({ slug: b.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const b = getBarber(slug);
  return renderOg({
    eyebrow: b?.role ?? "Екип · Русе",
    title: b?.name ?? "Bonnie & Clyde",
    subtitle: b?.tagline ?? "Барбершоп & Академия",
  });
}
