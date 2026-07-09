import { renderOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getLocation } from "@/lib/content";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Bonnie & Clyde — локация";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const loc = await getLocation(slug);
  return renderOg({
    eyebrow: loc?.status === "coming-soon" ? "Очаквай скоро" : "Локация · Русе",
    title: loc?.name ?? "Bonnie & Clyde",
    subtitle:
      loc?.status === "coming-soon"
        ? "Нов салон идва скоро"
        : `${loc?.addressLine ?? ""}, ${loc?.city ?? "Русе"}`,
  });
}
