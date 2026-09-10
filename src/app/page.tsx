import { Hero } from "@/components/sections/Hero";
import { InitiativeCard } from "@/components/sections/InitiativeCard";
import { ImpactMetrics } from "@/components/sections/ImpactMetrics";
import { CTASection } from "@/components/sections/CTASection";

const initiatives = [
  {
    title: "Hearing Accessibility App",
    description:
      "A bone-conduction hearing assist mobile app in development that will help people with conductive hearing loss experience sound in new ways.",
    status: "coming-soon" as const,
    category: "Accessibility",
    href: "/initiatives/hearing-accessibility",
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
        />
      </svg>
    ),
  },
  {
    title: "AI Literacy Program",
    description:
      "Planned educational resources that will help communities understand and benefit from AI technology, with a focus on underserved populations.",
    status: "coming-soon" as const,
    category: "Education",
    href: "/initiatives/ai-literacy",
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
        />
      </svg>
    ),
  },
  {
    title: "Accessible Communication Tools",
    description:
      "Next-generation tools that make digital communication accessible for people with visual, hearing, and cognitive disabilities.",
    status: "research" as const,
    category: "Research",
    href: "/initiatives/communication-tools",
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
        />
      </svg>
    ),
  },
];

const impactMetrics = [
  {
    value: "1",
    label: "Flagship Initiative",
    description: "Hearing accessibility app in development",
  },
  {
    value: "100%",
    label: "Accessibility Focus",
    description: "All solutions meet WCAG standards",
  },
  {
    value: "Open",
    label: "To Partnerships",
    description: "Seeking collaborators and supporters",
  },
  {
    value: "You",
    label: "Can Help",
    description: "Join us from the ground floor",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero
        subtitle="AI For Human Good"
        title="Technology That Empowers Everyone"
        description="We build accessible AI solutions that help people with disabilities and underserved communities thrive. Because technology should work for everyone, not just some."
        primaryCta={{
          text: "Explore Our Work",
          href: "/initiatives",
        }}
        secondaryCta={{
          text: "Support the Mission",
          href: "/donate",
        }}
      />

      <section
        className="py-16 sm:py-20 bg-background"
        aria-labelledby="initiatives-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              id="initiatives-heading"
              className="text-3xl font-bold text-foreground sm:text-4xl"
            >
              Our Initiatives
            </h2>
            <p className="mt-4 text-lg text-foreground-secondary max-w-2xl mx-auto">
              We focus on projects that make real differences in peoples lives,
              using AI as a tool for inclusion and empowerment.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {initiatives.map((initiative) => (
              <InitiativeCard key={initiative.title} {...initiative} />
            ))}
          </div>
        </div>
      </section>

      <ImpactMetrics
        title="Making a Real Difference"
        subtitle="Our work is measured not in metrics, but in the lives we touch and the barriers we break down."
        metrics={impactMetrics}
      />

      <section
        className="py-16 sm:py-20 bg-background-secondary"
        aria-labelledby="values-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              id="values-heading"
              className="text-3xl font-bold text-foreground sm:text-4xl"
            >
              Our Guiding Principles
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                Human-Centered Design
              </h3>
              <p className="mt-2 text-foreground-secondary">
                We design with and for the communities we serve, ensuring our
                solutions meet real needs and respect human dignity.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-forest/10 text-forest">
                <svg
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                Ethical AI
              </h3>
              <p className="mt-2 text-foreground-secondary">
                We build AI that is transparent, fair, and accountable, with
                safeguards against bias and harm built in from the start.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber/10 text-warning-text">
                <svg
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                Universal Access
              </h3>
              <p className="mt-2 text-foreground-secondary">
                Every solution we create is accessible by design, meeting or
                exceeding WCAG 2.2 AA standards for all users.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        variant="highlight"
        title="Join Us in Making a Difference"
        description="Whether you volunteer, partner, or donate, your support helps us build technology that empowers everyone."
        primaryCta={{
          text: "Get Involved",
          href: "/get-involved",
        }}
        secondaryCta={{
          text: "Learn More",
          href: "/about",
        }}
      />
    </>
  );
}
