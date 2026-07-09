"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Renders the public Nav + Footer around page content, but hides them on the
 * /admin area (which supplies its own shell). Nav/Footer are passed as slots so
 * they can stay Server Components while the show/hide decision is client-side.
 */
export function PublicChrome({
  nav,
  footer,
  children,
}: {
  nav: ReactNode;
  footer: ReactNode;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return (
      <main id="main" className="flex-1">
        {children}
      </main>
    );
  }

  return (
    <>
      {nav}
      <main id="main" className="flex-1">
        {children}
      </main>
      {footer}
    </>
  );
}
