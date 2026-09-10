import { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { Button } from "@/components/ui/Button";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Get Involved",
  description:
    "Join AI For Human Good as a volunteer, partner, or advocate. There are many ways to help us build accessible AI for everyone.",
};

export default function GetInvolvedPage() {
  return (
    <>
      <Hero
        subtitle="Get Involved"
        title="Join Us in Building AI For Good"
        description="Whether you're a developer, designer, advocate, or simply someone who cares, there's a place for you in our mission."
      />

      <section className="py-16 sm:py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              Ways to Contribute
            </h2>
            <p className="mt-4 text-lg text-foreground-secondary max-w-2xl mx-auto">
              Every contribution matters. Here are some ways you can help us
              create technology that works for everyone.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Volunteer Your Skills",
                description:
                  "We need developers, designers, writers, accessibility experts, and more. Share your expertise to help build better technology.",
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
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                ),
                cta: "Apply to Volunteer",
                href: "#volunteer",
              },
              {
                title: "Test Our Products",
                description:
                  "Help us improve by testing our apps and providing feedback. We especially value input from people with disabilities.",
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
                      d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
                    />
                  </svg>
                ),
                cta: "Become a Tester",
                href: "#testing",
              },
              {
                title: "Spread the Word",
                description:
                  "Help us reach more people who could benefit from our technology. Share our mission with your network.",
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
                      d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46"
                    />
                  </svg>
                ),
                cta: "Share Our Mission",
                href: "#advocate",
              },
              {
                title: "Research Collaboration",
                description:
                  "If you're a researcher in AI, accessibility, or related fields, let's collaborate to advance the science.",
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
                      d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342"
                    />
                  </svg>
                ),
                cta: "Research Partnerships",
                href: "#research",
              },
              {
                title: "Community Outreach",
                description:
                  "Help us connect with communities that could benefit from our technology but may not know about us yet.",
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
                      d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                    />
                  </svg>
                ),
                cta: "Join Outreach",
                href: "#outreach",
              },
              {
                title: "Donate",
                description:
                  "Financial contributions directly fund our development work and help us reach more people in need.",
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
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                ),
                cta: "Make a Donation",
                href: "/donate",
              },
            ].map((item) => (
              <div key={item.title} className="glass-card p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-foreground-secondary">
                  {item.description}
                </p>
                <Link
                  href={item.href}
                  className="mt-4 inline-flex items-center text-primary font-medium hover:underline"
                >
                  {item.cta}
                  <svg
                    className="ml-1 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="volunteer"
        className="py-16 sm:py-20 bg-background-secondary"
        aria-labelledby="volunteer-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <h2
                id="volunteer-heading"
                className="text-3xl font-bold text-foreground sm:text-4xl"
              >
                Volunteer With Us
              </h2>
              <p className="mt-6 text-lg text-foreground-secondary leading-relaxed">
                Our volunteers are the heart of our organization. Whether you
                can commit a few hours a month or want to take on a larger role,
                we have opportunities for you.
              </p>

              <div className="mt-8">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Skills We’re Looking For
                </h3>
                <ul className="space-y-3">
                  {[
                    "Software development (React, Python, mobile)",
                    "UX/UI design with accessibility expertise",
                    "Technical writing and documentation",
                    "Community management and outreach",
                    "Accessibility testing and consulting",
                    "Project management",
                    "Marketing and communications",
                  ].map((skill) => (
                    <li key={skill} className="flex items-center gap-3">
                      <svg
                        className="h-5 w-5 text-success shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                      <span className="text-foreground-secondary">{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button href="/contact" size="lg" className="mt-8">
                Apply to Volunteer
              </Button>
            </div>

            <div className="glass-card p-8">
              <h3 className="text-xl font-semibold text-foreground mb-6">
                Volunteer Benefits
              </h3>
              <ul className="space-y-4">
                {[
                  "Make a real difference in people's lives",
                  "Gain experience with accessible technology",
                  "Work with a passionate, inclusive team",
                  "Flexible remote opportunities",
                  "Build your portfolio with meaningful projects",
                  "Connect with accessibility and AI experts",
                ].map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <svg
                      className="h-6 w-6 text-primary shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-foreground-secondary">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section
        id="partnerships"
        className="py-16 sm:py-20 bg-background"
        aria-labelledby="partnerships-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              id="partnerships-heading"
              className="text-3xl font-bold text-foreground sm:text-4xl"
            >
              Partner With Us
            </h2>
            <p className="mt-4 text-lg text-foreground-secondary max-w-2xl mx-auto">
              We collaborate with organizations that share our commitment to
              accessibility and inclusion.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Corporate Partners",
                description:
                  "Align your brand with accessible technology. We offer sponsorship, employee engagement, and technology partnerships.",
              },
              {
                title: "Nonprofit Collaborations",
                description:
                  "Join forces with us to expand the reach and impact of accessible AI solutions in the communities you serve.",
              },
              {
                title: "Academic Partnerships",
                description:
                  "Collaborate on research, provide student opportunities, and help advance the science of accessible AI.",
              },
            ].map((partner) => (
              <div
                key={partner.title}
                className="p-6 rounded-xl border border-line text-center"
              >
                <h3 className="text-lg font-semibold text-foreground">
                  {partner.title}
                </h3>
                <p className="mt-2 text-foreground-secondary">
                  {partner.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button href="/contact" size="lg" variant="outline">
              Discuss a Partnership
            </Button>
          </div>
        </div>
      </section>

      <CTASection
        variant="highlight"
        title="Ready to Make a Difference?"
        description="Join our community of volunteers, partners, and supporters working to make AI accessible for everyone."
        primaryCta={{
          text: "Get Started",
          href: "/contact",
        }}
        secondaryCta={{
          text: "Donate",
          href: "/donate",
        }}
      />
    </>
  );
}
