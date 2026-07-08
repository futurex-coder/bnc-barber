import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Section";

/** Consistent hero header for inner pages. */
export function PageHeader({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <header className="relative overflow-hidden border-b border-hairline pt-36 pb-16 sm:pt-44 sm:pb-24">
      <div className="img-fallback-2 absolute inset-0 -z-10 opacity-60" aria-hidden />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-1/4 top-0 -z-10 h-full w-1/2 bg-[radial-gradient(circle,rgba(201,162,39,.1),transparent_60%)] blur-3xl"
      />
      <Container>
        <Reveal className="flex max-w-3xl flex-col gap-5">
          {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
          <h1 className="font-display text-5xl leading-[0.95] text-ink sm:text-6xl md:text-7xl text-balance">
            {title}
          </h1>
          {lead ? (
            <p className="max-w-xl text-lg leading-relaxed text-grey">{lead}</p>
          ) : null}
          {children ? <div className="mt-3">{children}</div> : null}
        </Reveal>
      </Container>
    </header>
  );
}
