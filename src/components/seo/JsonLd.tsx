import { SITE, SITE_URL } from "@/config/site";
import { locations, aggregateRating, type Location } from "@/data/site";

function JsonLdScript({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      // JSON-LD is trusted, static content generated from our own data.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Maps our hours shape to schema.org OpeningHoursSpecification. */
const DAY_MAP: Record<string, string> = {
  Понеделник: "Monday",
  Вторник: "Tuesday",
  Сряда: "Wednesday",
  Четвъртък: "Thursday",
  Петък: "Friday",
  Събота: "Saturday",
  Неделя: "Sunday",
};

function openingHours(loc: Location) {
  return loc.hours
    .filter((h) => h.open && h.close)
    .map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: DAY_MAP[h.day],
      opens: h.open,
      closes: h.close,
    }));
}

export function hairSalonSchema(loc: Location) {
  return {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    "@id": `${SITE_URL}/lokacii/${loc.slug}#business`,
    name: `${SITE.name} — ${loc.name}`,
    image: `${SITE_URL}/lokacii/${loc.slug}/opengraph-image`,
    url: `${SITE_URL}/lokacii/${loc.slug}`,
    telephone: SITE.phone,
    priceRange: loc.priceRange,
    currenciesAccepted: "BGN",
    address: {
      "@type": "PostalAddress",
      streetAddress: loc.addressLine,
      addressLocality: loc.city,
      addressRegion: "Русе",
      postalCode: loc.postalCode,
      addressCountry: "BG",
    },
    ...(loc.geo
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: loc.geo.lat,
            longitude: loc.geo.lng,
          },
        }
      : {}),
    ...(loc.status === "open"
      ? {
          openingHoursSpecification: openingHours(loc),
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: aggregateRating.value,
            reviewCount: aggregateRating.count,
          },
        }
      : {}),
    sameAs: [SITE.instagram.shop.url],
  };
}

/** Organization + primary business, rendered site-wide in the root layout. */
export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}#org`,
        name: SITE.name,
        url: SITE_URL,
        telephone: SITE.phone,
        sameAs: [SITE.instagram.shop.url, SITE.instagram.barber.url],
      },
      hairSalonSchema(locations[0]),
    ],
  };
  return <JsonLdScript data={data} />;
}

export function LocationJsonLd({ loc }: { loc: Location }) {
  return <JsonLdScript data={hairSalonSchema(loc)} />;
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.url}`,
    })),
  };
  return <JsonLdScript data={data} />;
}

export { JsonLdScript };
