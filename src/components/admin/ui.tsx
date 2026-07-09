import * as React from "react";
import { cn } from "@/lib/cn";

/* ------------------------------------------------------------------ Button */

const btnVariants = {
  gold: "bg-gold text-base hover:bg-gold-bright shadow-[0_6px_20px_-8px_rgba(201,162,39,.6)]",
  primary: "bg-ink text-base hover:bg-white",
  outline: "border border-hairline-strong text-ink hover:border-gold hover:text-gold-bright",
  ghost: "text-grey hover:text-ink hover:bg-white/[0.04]",
  danger: "border border-oxblood/60 text-red-300 hover:bg-oxblood/20 hover:border-oxblood",
} as const;

const btnSizes = {
  sm: "h-8 px-3 text-xs gap-1.5",
  md: "h-10 px-4 text-sm gap-2",
  lg: "h-12 px-6 text-base gap-2",
  icon: "h-9 w-9",
} as const;

export const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: keyof typeof btnVariants;
    size?: keyof typeof btnSizes;
  }
>(function Button({ className, variant = "outline", size = "md", ...props }, ref) {
  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex select-none items-center justify-center rounded-lg font-medium transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50",
        btnVariants[variant],
        btnSizes[size],
        className,
      )}
      {...props}
    />
  );
});

/* ------------------------------------------------------------------ Inputs */

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(function Input({ className, ...props }, ref) {
  return (
    <input
      ref={ref}
      className={cn(
        "h-10 w-full rounded-lg border border-hairline bg-base px-3 text-sm text-ink placeholder:text-grey/60 transition-colors focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/20",
        className,
      )}
      {...props}
    />
  );
});

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(function Textarea({ className, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      className={cn(
        "min-h-24 w-full rounded-lg border border-hairline bg-base px-3 py-2 text-sm text-ink placeholder:text-grey/60 transition-colors focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/20",
        className,
      )}
      {...props}
    />
  );
});

export function Select({
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "h-10 w-full rounded-lg border border-hairline bg-base px-3 text-sm text-ink transition-colors focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/20",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}

export function Label({
  className,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn("text-xs font-medium uppercase tracking-wide text-grey", className)}
      {...props}
    />
  );
}

export function Field({
  label,
  hint,
  htmlFor,
  className,
  children,
}: {
  label?: string;
  hint?: string;
  htmlFor?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label ? <Label htmlFor={htmlFor}>{label}</Label> : null}
      {children}
      {hint ? <p className="text-xs text-grey/70">{hint}</p> : null}
    </div>
  );
}

/* ------------------------------------------------------------------- Cards */

export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-brand border border-hairline bg-base-elevated/60",
        className,
      )}
      {...props}
    />
  );
}

export function Badge({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-hairline px-2 py-0.5 text-[11px] text-grey",
        className,
      )}
      {...props}
    />
  );
}

/* ------------------------------------------------------------------ Switch */

export function Switch({
  checked,
  onCheckedChange,
  label,
  id,
}: {
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
  label?: string;
  id?: string;
}) {
  return (
    <button
      type="button"
      id={id}
      role="switch"
      aria-checked={checked}
      onClick={() => onCheckedChange(!checked)}
      className={cn(
        "inline-flex h-6 w-11 shrink-0 items-center rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50",
        checked ? "border-gold/50 bg-gold/80" : "border-hairline bg-base",
      )}
    >
      <span
        className={cn(
          "ml-0.5 h-4 w-4 rounded-full bg-ink transition-transform",
          checked ? "translate-x-5 bg-base" : "translate-x-0",
        )}
      />
      {label ? <span className="sr-only">{label}</span> : null}
    </button>
  );
}
