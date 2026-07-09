import Link from "next/link";
import { Plus, ArrowLeft } from "lucide-react";

export function PageHeading({
  title,
  description,
  action,
  back,
}: {
  title: string;
  description?: string;
  action?: { href: string; label: string };
  back?: { href: string; label: string };
}) {
  return (
    <div className="mb-8 flex flex-col gap-4">
      {back ? (
        <Link
          href={back.href}
          className="inline-flex w-fit items-center gap-1.5 text-sm text-grey transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" />
          {back.label}
        </Link>
      ) : null}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl uppercase tracking-wide text-ink sm:text-4xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-1 max-w-2xl text-sm text-grey">{description}</p>
          ) : null}
        </div>
        {action ? (
          <Link
            href={action.href}
            className="inline-flex items-center gap-2 rounded-lg bg-gold px-4 py-2 text-sm font-medium text-base transition-colors hover:bg-gold-bright"
          >
            <Plus className="h-4 w-4" />
            {action.label}
          </Link>
        ) : null}
      </div>
    </div>
  );
}
