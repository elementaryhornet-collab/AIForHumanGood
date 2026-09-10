import { Button } from "@/components/ui/Button";

interface CTASectionProps {
  title: string;
  description: string;
  primaryCta?: {
    text: string;
    href: string;
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
  variant?: "default" | "highlight";
}

export function CTASection({
  title,
  description,
  primaryCta,
  secondaryCta,
  variant = "default",
}: CTASectionProps) {
  return (
    <section
      className={`py-16 sm:py-20 ${
        variant === "highlight"
          ? "bg-gradient-to-r from-ocean to-forest text-white"
          : "bg-background-secondary"
      }`}
      aria-labelledby="cta-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="cta-heading"
            className={`text-3xl font-bold sm:text-4xl ${
              variant === "highlight" ? "text-white" : "text-foreground"
            }`}
          >
            {title}
          </h2>
          <p
            className={`mt-4 text-lg ${
              variant === "highlight"
                ? "text-white/90"
                : "text-foreground-secondary"
            }`}
          >
            {description}
          </p>
          {(primaryCta || secondaryCta) && (
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              {primaryCta && (
                <Button
                  href={primaryCta.href}
                  variant={variant === "highlight" ? "accent" : "primary"}
                  size="lg"
                >
                  {primaryCta.text}
                </Button>
              )}
              {secondaryCta && (
                <Button
                  href={secondaryCta.href}
                  variant={variant === "highlight" ? "outline" : "ghost"}
                  size="lg"
                  className={
                    variant === "highlight"
                      ? "border-white text-white hover:bg-white/10"
                      : ""
                  }
                >
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
