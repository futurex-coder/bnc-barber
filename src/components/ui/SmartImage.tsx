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
  variant?: 1 | 2 | 3;
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
      // Fill the (positioned) parent. `absolute inset-0` both sizes this box
      // and makes it a containing block for the absolutely-positioned monogram,
      // so the placeholder never collapses to height 0 when its only children
      // are absolutely positioned.
      className={cn(
        "absolute inset-0 overflow-hidden",
        variant === 1 ? "img-fallback" : variant === 2 ? "img-fallback-2" : "img-fallback-3",
        className,
      )}
    >
      <div className="grain absolute inset-0" aria-hidden />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-2 select-none"
      >
        <span className="font-display text-5xl uppercase tracking-tight text-gold/40 sm:text-6xl">
          {label ?? "B&C"}
        </span>
        <span className="h-px w-10 bg-gold/30" />
        <span className="text-[10px] uppercase tracking-[0.3em] text-ink/35">
          Bonnie &amp; Clyde
        </span>
      </span>
    </div>
  );
}
