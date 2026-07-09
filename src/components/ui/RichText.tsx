import { cn } from "@/lib/utils";

/**
 * Renders admin-authored rich text (HTML from the TipTap editor). Content is
 * written only by the authenticated admin (RLS-gated), and the editor emits a
 * constrained tag set. Styled via `.prose-bnc` (see globals.css).
 */
export function RichText({
  html,
  className,
}: {
  html?: string | null;
  className?: string;
}) {
  const value = (html ?? "").trim();
  if (!value) return null;
  return (
    <div
      className={cn("prose-bnc", className)}
      dangerouslySetInnerHTML={{ __html: value }}
    />
  );
}
