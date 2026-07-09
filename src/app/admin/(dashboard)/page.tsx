import Link from "next/link";
import {
  Users,
  Scissors,
  MapPin,
  GraduationCap,
  CalendarDays,
  Images,
  Info,
  Phone,
  ArrowRight,
} from "lucide-react";
import { dashboardCounts } from "@/lib/admin/read";
import { Card } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const c = await dashboardCounts();

  const cards = [
    { href: "/admin/team", label: "Екип", count: c.barbers, unit: "бръснари", icon: Users },
    { href: "/admin/services", label: "Услуги", count: c.services, unit: "услуги", icon: Scissors },
    { href: "/admin/locations", label: "Локации", count: c.locations, unit: "адреса", icon: MapPin },
    { href: "/admin/academy", label: "Академия", count: c.academy_modules, unit: "модула", icon: GraduationCap },
    { href: "/admin/events", label: "Събития", count: c.events + c.guests, unit: "събития и гости", icon: CalendarDays },
    { href: "/admin/gallery", label: "Галерия", count: c.gallery, unit: "снимки", icon: Images },
    { href: "/admin/about", label: "За нас", count: null, unit: "описание", icon: Info },
    { href: "/admin/contacts", label: "Контакти", count: null, unit: "телефон, IG, локации", icon: Phone },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl uppercase tracking-wide text-ink sm:text-4xl">
          Табло
        </h1>
        <p className="mt-1 text-sm text-grey">
          Управлявай съдържанието на сайта. Промените се виждат веднага.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link key={card.href} href={card.href} className="group">
              <Card className="flex h-full items-center gap-4 p-5 transition-colors group-hover:border-gold/40">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-hairline bg-base text-gold">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-display text-lg uppercase tracking-wide text-ink">
                    {card.label}
                  </p>
                  <p className="text-sm text-grey">
                    {card.count !== null ? `${card.count} ${card.unit}` : card.unit}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-grey transition-transform group-hover:translate-x-0.5 group-hover:text-gold-bright" />
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
