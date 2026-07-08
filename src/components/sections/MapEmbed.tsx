import { MapPinIcon, ArrowUpRightIcon } from "@/components/ui/icons";

/**
 * Keyless map: an OpenStreetMap iframe (no API key/cost) plus a "directions"
 * link to Google Maps. Falls back to a gradient block for coming-soon spots.
 */
export function MapEmbed({
  query,
  lat,
  lng,
  comingSoon = false,
}: {
  query: string;
  lat?: number;
  lng?: number;
  comingSoon?: boolean;
}) {
  const directions = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

  if (comingSoon || lat === undefined || lng === undefined) {
    return (
      <div className="img-fallback-2 relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded-brand border border-hairline">
        <div className="grain absolute inset-0" aria-hidden />
        <div className="relative flex flex-col items-center gap-2 text-center">
          <MapPinIcon className="h-8 w-8 text-gold" />
          <p className="font-display text-lg uppercase tracking-wide text-ink">Скоро в Русе</p>
          <p className="text-sm text-grey">Адресът се обявява съвсем скоро.</p>
        </div>
      </div>
    );
  }

  const d = 0.006;
  const bbox = `${lng - d}%2C${lat - d}%2C${lng + d}%2C${lat + d}`;
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}`;

  return (
    <div className="relative overflow-hidden rounded-brand border border-hairline">
      <iframe
        title={`Карта — ${query}`}
        src={src}
        loading="lazy"
        className="aspect-[16/10] w-full grayscale-[0.3] invert-[0.92] hue-rotate-180"
        style={{ colorScheme: "light" }}
      />
      <a
        href={directions}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full border border-hairline bg-base/80 px-4 py-2 text-sm text-ink backdrop-blur transition-colors hover:border-gold hover:text-gold-bright"
      >
        Упътване <ArrowUpRightIcon className="h-4 w-4" />
      </a>
    </div>
  );
}
