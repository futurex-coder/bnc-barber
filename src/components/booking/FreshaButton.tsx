import { Button } from "@/components/ui/Button";
import { DEFAULT_FRESHA } from "@/config/booking";
import { ScissorsIcon } from "@/components/ui/icons";

/**
 * The client (haircut) funnel → Fresha. Pass a resolved `href` (from the DB —
 * a location's Fresha URL or a barber's booking link). Falls back to the
 * flagship default when none is set, so the button is never dead.
 */
export function FreshaButton({
  href,
  label = "Запази час",
  variant = "gold",
  size = "lg",
  className,
  withIcon = true,
}: {
  href?: string;
  label?: string;
  variant?: "primary" | "gold" | "outline" | "ghost";
  size?: "md" | "lg";
  className?: string;
  withIcon?: boolean;
}) {
  return (
    <Button
      href={href || DEFAULT_FRESHA}
      external
      variant={variant}
      size={size}
      className={className}
    >
      {withIcon ? <ScissorsIcon className="h-4 w-4" /> : null}
      {label}
    </Button>
  );
}
