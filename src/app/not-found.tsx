import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FreshaButton } from "@/components/booking/FreshaButton";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70svh] items-center overflow-hidden">
      <div className="img-fallback absolute inset-0 -z-10 opacity-60" aria-hidden />
      <div className="grain absolute inset-0 -z-10" aria-hidden />
      <Container className="flex flex-col items-center gap-6 py-32 text-center">
        <p className="font-display text-[24vw] leading-none text-ink/10 sm:text-[12rem]">404</p>
        <h1 className="-mt-8 font-display text-4xl text-ink sm:text-5xl">
          Тази страница я <span className="accent text-gold-gradient">подстригахме.</span>
        </h1>
        <p className="max-w-md text-grey">
          Няма такъв адрес — но столът те чака. Върни се към началото или запази час.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="/" variant="primary" size="lg">
            Към началото
          </Button>
          <FreshaButton size="lg" variant="outline" label="Запази час" />
        </div>
      </Container>
    </section>
  );
}
