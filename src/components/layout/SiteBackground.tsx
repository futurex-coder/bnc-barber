/**
 * Fixed atmospheric background behind all content. Pure CSS (no JS), so it
 * costs nothing at runtime and animates via compositor-only transforms.
 * Reduced-motion users get the same look, frozen.
 */
export function SiteBackground() {
  return (
    <div className="site-bg" aria-hidden>
      <div className="site-bg__aurora site-bg__aurora--gold" />
      <div className="site-bg__aurora site-bg__aurora--ox" />
      <div className="site-bg__aurora site-bg__aurora--gold2" />
      <div className="site-bg__grid" />
      <div className="grain absolute inset-0 opacity-[0.4]" />
      <div className="site-bg__vignette" />
    </div>
  );
}
