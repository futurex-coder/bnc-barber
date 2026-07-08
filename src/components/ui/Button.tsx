import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "gold" | "outline" | "ghost";
type Size = "md" | "lg";

const base =
  "group/btn inline-flex items-center justify-center gap-2 rounded-full font-medium " +
  "transition-all duration-300 ease-[cubic-bezier(.22,1,.36,1)] " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-bright " +
  "disabled:opacity-50 disabled:pointer-events-none will-change-transform";

const variants: Record<Variant, string> = {
  primary:
    "bg-ink text-base hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_14px_40px_-12px_rgba(244,241,234,.4)]",
  gold:
    "bg-gradient-to-r from-gold to-gold-bright text-base font-semibold hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_rgba(201,162,39,.4),0_16px_44px_-12px_rgba(201,162,39,.55)]",
  outline:
    "border border-hairline-strong text-ink hover:-translate-y-0.5 hover:border-gold hover:text-gold-bright hover:shadow-[0_10px_30px_-14px_rgba(201,162,39,.4)]",
  ghost: "text-ink/80 hover:text-gold-bright",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-14 px-8 text-base",
};

type CommonProps = {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
};

/** Renders <Link> for internal hrefs, <a> for external, <button> otherwise. */
export function Button(
  props: CommonProps &
    (
      | { href: string; external?: boolean; onClick?: never; type?: never; ariaLabel?: string }
      | {
          href?: never;
          external?: never;
          onClick?: () => void;
          type?: "button" | "submit";
          ariaLabel?: string;
        }
    ),
) {
  const {
    children,
    variant = "primary",
    size = "md",
    className,
    ariaLabel,
  } = props;
  const cls = cn(base, variants[variant], sizes[size], className);

  if ("href" in props && props.href) {
    const isExternal = props.external ?? /^https?:\/\//.test(props.href);
    if (isExternal) {
      return (
        <a
          href={props.href}
          target="_blank"
          rel="noopener noreferrer"
          className={cls}
          aria-label={ariaLabel}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={props.href} className={cls} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={"type" in props ? props.type ?? "button" : "button"}
      onClick={"onClick" in props ? props.onClick : undefined}
      className={cls}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
