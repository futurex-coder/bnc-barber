import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Image slot that always looks intentional. If `src` is provided it renders
 * an optimised next/image; otherwise it renders an on-brand gradient
 * placeholder (never a broken image), with a subtle monogram watermark.
 */
export function SmartImage({
  src,
  alt,
  className,
  imgClassName,
  variant = 1,
  priority,
  sizes,
  fill = true,
  width,
  height,
  label,
}: {
  src?: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  variant?: 1 | 2;
  priority?: boolean;
  sizes?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  label?: string;
}) {
  if (src) {
    return (
      <div className={cn("relative overflow-hidden", className)}>
        <Image
          src={src}
          alt={alt}
          fill={fill}
          width={fill ? undefined : width}
          height={fill ? undefined : height}
          sizes={sizes ?? "100vw"}
          priority={priority}
          className={cn("object-cover", imgClassName)}
        />
      </div>
    );
  }

  // Gradient placeholder
  return (
    <div
      role="img"
      aria-label={alt}
      className={cn(
        "relative overflow-hidden",
        variant === 1 ? "img-fallback" : "img-fallback-2",
        className,
      )}
    >
      <div className="grain absolute inset-0" aria-hidden />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center font-display text-6xl uppercase tracking-tight text-ink/[0.06] select-none"
      >
        {label ?? "B&C"}
      </span>
    </div>
  );
}
