import type { MetadataRoute } from "next";
import { SITE_URL } from "@/config/site";
import { locations } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/lokacii",
    "/ekip",
    "/uslugi",
    "/akademiya",
    "/galeriya",
    "/za-nas",
    "/kontakti",
  ];

  const now = new Date();

  const pages: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));

  const locationPages: MetadataRoute.Sitemap = locations.map((loc) => ({
    url: `${SITE_URL}/lokacii/${loc.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...pages, ...locationPages];
}
