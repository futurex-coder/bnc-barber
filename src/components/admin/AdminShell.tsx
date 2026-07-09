"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Scissors,
  MapPin,
  GraduationCap,
  CalendarDays,
  Images,
  Info,
  Phone,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { SignOutButton } from "./SignOutButton";

const NAV = [
  { href: "/admin", label: "Табло", icon: LayoutDashboard, exact: true },
  { href: "/admin/team", label: "Екип", icon: Users },
  { href: "/admin/services", label: "Услуги", icon: Scissors },
  { href: "/admin/locations", label: "Локации", icon: MapPin },
  { href: "/admin/academy", label: "Академия", icon: GraduationCap },
  { href: "/admin/events", label: "Събития", icon: CalendarDays },
  { href: "/admin/gallery", label: "Галерия", icon: Images },
  { href: "/admin/about", label: "За нас", icon: Info },
  { href: "/admin/contacts", label: "Контакти", icon: Phone },
];

function isActive(pathname: string, href: string, exact?: boolean) {
  if (exact) return pathname === href;
  return pathname === href || pathname.startsWith(href + "/");
}

export function AdminShell({
  email,
  children,
}: {
  email: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname() || "";

  return (
    <div className="min-h-[100svh] lg:grid lg:grid-cols-[248px_1fr]">
      {/* Sidebar (desktop) */}
      <aside className="sticky top-0 hidden h-[100svh] flex-col border-r border-hairline bg-base-elevated/40 p-4 lg:flex">
        <Link href="/admin" className="mb-6 flex items-center gap-2 px-2">
          <span className="grid h-9 w-9 place-items-center rounded-full border border-gold/40 font-display text-sm text-gold">
            B&C
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-display text-sm uppercase tracking-wide text-ink">
              Админ
            </span>
            <span className="text-[11px] text-grey">Bonnie &amp; Clyde</span>
          </span>
        </Link>

        <nav className="flex flex-1 flex-col gap-1">
          {NAV.map((item) => {
            const active = isActive(pathname, item.href, item.exact);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  active
                    ? "bg-gold/10 text-gold-bright"
                    : "text-grey hover:bg-white/[0.04] hover:text-ink",
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-4 flex flex-col gap-2 border-t border-hairline pt-4">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-grey transition-colors hover:bg-white/[0.04] hover:text-ink"
          >
            <ExternalLink className="h-4 w-4" />
            Виж сайта
          </a>
          <SignOutButton />
          <p className="truncate px-3 pt-1 text-[11px] text-grey/60" title={email}>
            {email}
          </p>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="sticky top-0 z-20 flex flex-col border-b border-hairline bg-base/90 backdrop-blur lg:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/admin" className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-full border border-gold/40 font-display text-xs text-gold">
              B&C
            </span>
            <span className="font-display text-sm uppercase tracking-wide text-ink">
              Админ
            </span>
          </Link>
          <SignOutButton />
        </div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-3">
          {NAV.map((item) => {
            const active = isActive(pathname, item.href, item.exact);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "shrink-0 rounded-full border px-3 py-1.5 text-xs transition-colors",
                  active
                    ? "border-gold/40 bg-gold/10 text-gold-bright"
                    : "border-hairline text-grey",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Content */}
      <main className="min-w-0 px-4 py-6 sm:px-8 sm:py-10">{children}</main>
    </div>
  );
}
