import type { MetadataRoute } from "next";
import { SITE_URL } from "@/config/site";
import { getLocations, getBarbers, getGuests } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/lokacii",
    "/ekip",
    "/uslugi",
    "/akademiya",
    "/sabitiya",
    "/galeriya",
    "/za-nas",
    "/kontakti",
  ];

  const now = new Date();

  const [locations, barbers, guests] = await Promise.all([
    getLocations(),
    getBarbers(),
    getGuests(),
  ]);

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

  const barberPages: MetadataRoute.Sitemap = barbers.map((b) => ({
    url: `${SITE_URL}/ekip/${b.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const guestPages: MetadataRoute.Sitemap = guests.map((g) => ({
    url: `${SITE_URL}/gosti/${g.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  return [...pages, ...locationPages, ...barberPages, ...guestPages];
}
