import { Button } from "@/components/ui/Button";

interface HeroProps {
  title: string;
  subtitle?: string;
  description: string;
  primaryCta?: {
    text: string;
    href: string;
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
}

export function Hero({
  title,
  subtitle,
  description,
  primaryCta,
  secondaryCta,
}: HeroProps) {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-ocean/5 via-background to-forest/5 py-20 sm:py-28 lg:py-36"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute -left-1/4 top-0 h-96 w-96 rounded-full bg-ocean/10 blur-3xl" />
        <div className="absolute -right-1/4 bottom-0 h-96 w-96 rounded-full bg-forest/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {subtitle && (
            <p className="mb-4 text-base font-semibold uppercase tracking-wider text-primary">
              {subtitle}
            </p>
          )}
          <h1
            id="hero-heading"
            className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            {title}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-foreground-secondary sm:text-xl">
            {description}
          </p>
          {(primaryCta || secondaryCta) && (
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              {primaryCta && (
                <Button href={primaryCta.href} size="lg">
                  {primaryCta.text}
                </Button>
              )}
              {secondaryCta && (
                <Button href={secondaryCta.href} variant="outline" size="lg">
                  {secondaryCta.text}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
