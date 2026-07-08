import { Button } from "@/components/ui/Button";
import { freshaForLocation, freshaForBarber } from "@/config/booking";
import { ScissorsIcon } from "@/components/ui/icons";

/**
 * The client (haircut) funnel → Fresha.
 * Provide `locationSlug` for a location CTA, or `barberSlug` (+ optional
 * `locationSlug`) for a "book with this barber" CTA.
 */
export function FreshaButton({
  locationSlug = "zdravets-iztok",
  barberSlug,
  label = "Запази час",
  variant = "gold",
  size = "lg",
  className,
  withIcon = true,
}: {
  locationSlug?: string;
  barberSlug?: string;
  label?: string;
  variant?: "primary" | "gold" | "outline" | "ghost";
  size?: "md" | "lg";
  className?: string;
  withIcon?: boolean;
}) {
  const href = barberSlug
    ? freshaForBarber(barberSlug, locationSlug)
    : freshaForLocation(locationSlug);

  return (
    <Button href={href} external variant={variant} size={size} className={className}>
      {withIcon ? <ScissorsIcon className="h-4 w-4" /> : null}
      {label}
    </Button>
  );
}
