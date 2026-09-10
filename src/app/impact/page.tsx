import { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { ImpactMetrics } from "@/components/sections/ImpactMetrics";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Impact & Stories",
  description:
    "See how AI For Human Good's initiatives are making a real difference in the lives of people with disabilities and underserved communities.",
};

const metrics = [
  {
    value: "1",
    label: "Initiative in Development",
    description: "Hearing accessibility app coming soon",
  },
  {
    value: "100%",
    label: "Accessibility Commitment",
    description: "WCAG 2.2 AA standards from day one",
  },
  {
    value: "Growing",
    label: "Community",
    description: "Building our network of supporters",
  },
  {
    value: "Global",
    label: "Vision",
    description: "Technology that works for everyone, everywhere",
  },
];

const testimonials = [
  {
    quote:
      "Too often, people with disabilities are an afterthought in technology. AI For Human Good is building something different—technology designed with us from the start.",
    author: "Accessibility Advocate",
    location: "Advisory Board",
    initiative: "Our Mission",
  },
  {
    quote:
      "The potential for AI to help people with hearing loss is enormous, but only if it's built accessibly. This organization understands that.",
    author: "Audiologist",
    location: "Medical Advisor",
    initiative: "Hearing Accessibility",
  },
  {
    quote:
      "I'm excited to see a nonprofit that puts ethical AI and accessibility at the center of everything they do. This is the future we need.",
    author: "Early Supporter",
    location: "Founding Donor",
    initiative: "Our Vision",
  },
];

export default function ImpactPage() {
  return (
    <>
      <Hero
        subtitle="Our Impact"
        title="Building Toward Real Change"
        description="We're just getting started, but our vision is clear: AI technology that empowers everyone. Here's where we are and where we're headed."
      />

      <ImpactMetrics
        title="Where We Are Today"
        subtitle="We're a new organization with big ambitions. Join us from the ground floor."
        metrics={metrics}
      />

      <section
        className="py-16 sm:py-20 bg-background"
        aria-labelledby="stories-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              id="stories-heading"
              className="text-3xl font-bold text-foreground sm:text-4xl"
            >
              Voices of Support
            </h2>
            <p className="mt-4 text-lg text-foreground-secondary max-w-2xl mx-auto">
              Hear from the advisors, experts, and early supporters who believe
              in our mission.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <blockquote
                key={index}
                className="glass-card p-6 flex flex-col"
              >
                <div className="flex-1">
                  <svg
                    className="h-8 w-8 text-primary/30 mb-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-foreground-secondary leading-relaxed">
                    {testimonial.quote}
                  </p>
                </div>
                <footer className="mt-6 pt-4 border-t border-line">
                  <p className="font-semibold text-foreground">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-foreground-secondary">
                    {testimonial.location}
                  </p>
                  <p className="text-sm text-primary mt-1">
                    {testimonial.initiative}
                  </p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section
        className="py-16 sm:py-20 bg-background-secondary"
        aria-labelledby="outcomes-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <h2
                id="outcomes-heading"
                className="text-3xl font-bold text-foreground sm:text-4xl"
              >
                How We’ll Measure Success
              </h2>
              <p className="mt-6 text-lg text-foreground-secondary leading-relaxed">
                We believe in accountability and transparency. As we grow,
                we’ll rigorously measure our impact to ensure we’re truly
                making a difference.
              </p>
              <p className="mt-4 text-lg text-foreground-secondary leading-relaxed">
                Our impact metrics will go beyond simple download counts. We’ll
                measure real outcomes: improved quality of life, increased
                independence, and genuine community benefit.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  metric: "Goal",
                  description:
                    "Improve daily communication for people with hearing loss",
                },
                {
                  metric: "Goal",
                  description:
                    "Increase independence through accessible technology",
                },
                {
                  metric: "Goal",
                  description:
                    "Achieve high user satisfaction with all initiatives",
                },
                {
                  metric: "Goal",
                  description:
                    "Reduce accessibility barriers in AI technology",
                },
              ].map((item) => (
                <div
                  key={item.description}
                  className="glass-card p-6 flex items-center gap-6"
                >
                  <span className="text-3xl font-bold text-primary shrink-0">
                    {item.metric}
                  </span>
                  <p className="text-foreground-secondary">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        className="py-16 sm:py-20 bg-background"
        aria-labelledby="reports-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              id="reports-heading"
              className="text-3xl font-bold text-foreground sm:text-4xl"
            >
              Annual Reports
            </h2>
            <p className="mt-4 text-lg text-foreground-secondary max-w-2xl mx-auto">
              We publish detailed annual reports covering our impact, finances,
              and goals. Transparency is fundamental to our mission.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 max-w-3xl mx-auto">
            {[2024, 2023, 2022].map((year) => (
              <a
                key={year}
                href="#"
                className="glass-card p-6 text-center hover:shadow-lg transition-shadow group"
              >
                <p className="text-2xl font-bold text-foreground">{year}</p>
                <p className="text-foreground-secondary">Annual Report</p>
                <span className="mt-4 inline-flex items-center text-primary font-medium group-hover:underline">
                  Download PDF
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
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                    />
                  </svg>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        variant="highlight"
        title="Be Part of Our Story"
        description="Your support helps us create more impact stories. Join us in building technology that changes lives."
        primaryCta={{
          text: "Donate Now",
          href: "/donate",
        }}
        secondaryCta={{
          text: "Get Involved",
          href: "/get-involved",
        }}
      />
    </>
  );
}
