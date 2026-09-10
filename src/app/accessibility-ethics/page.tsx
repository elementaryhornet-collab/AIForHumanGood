import { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Accessibility & Ethics",
  description:
    "Learn about AI For Human Good's commitment to accessibility and ethical AI development. Read our accessibility statement and ethical framework.",
};

export default function AccessibilityEthicsPage() {
  return (
    <>
      <Hero
        subtitle="Accessibility & Ethics"
        title="Built on Principles That Matter"
        description="Accessibility and ethics aren't afterthoughts—they're the foundation of everything we do. Here's how we put these principles into practice."
      />

      <section
        id="statement"
        className="py-16 sm:py-20 bg-background"
        aria-labelledby="accessibility-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2
              id="accessibility-heading"
              className="text-3xl font-bold text-foreground sm:text-4xl"
            >
              Accessibility Statement
            </h2>

            <div className="mt-8 prose prose-lg max-w-none">
              <p className="text-lg text-foreground-secondary leading-relaxed">
                AI For Human Good is committed to ensuring digital accessibility
                for people with disabilities. We continually improve the user
                experience for everyone and apply the relevant accessibility
                standards.
              </p>

              <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">
                Our Standards
              </h3>
              <p className="text-foreground-secondary">
                We aim to conform to the Web Content Accessibility Guidelines
                (WCAG) 2.2 Level AA. These guidelines explain how to make web
                content more accessible for people with disabilities, including:
              </p>
              <ul className="mt-4 space-y-2 text-foreground-secondary">
                <li className="flex items-start gap-2">
                  <svg
                    className="h-6 w-6 text-success shrink-0 mt-0.5"
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
                  Visual impairments (blindness, low vision, color blindness)
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="h-6 w-6 text-success shrink-0 mt-0.5"
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
                  Hearing impairments (deafness, hard of hearing)
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="h-6 w-6 text-success shrink-0 mt-0.5"
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
                  Motor impairments (limited fine motor control)
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="h-6 w-6 text-success shrink-0 mt-0.5"
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
                  Cognitive impairments (learning disabilities, memory issues)
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">
                What We Do
              </h3>
              <ul className="space-y-3 text-foreground-secondary">
                {[
                  "Provide text alternatives for non-text content",
                  "Create content that can be presented in different ways without losing meaning",
                  "Make all functionality available from a keyboard",
                  "Give users enough time to read and use content",
                  "Avoid content that could cause seizures or physical reactions",
                  "Help users navigate, find content, and determine where they are",
                  "Make text content readable and understandable",
                  "Make content appear and operate in predictable ways",
                  "Help users avoid and correct mistakes",
                  "Maximize compatibility with assistive technologies",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <svg
                      className="h-6 w-6 text-primary shrink-0 mt-0.5"
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
                    {item}
                  </li>
                ))}
              </ul>

              <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">
                Feedback & Contact
              </h3>
              <p className="text-foreground-secondary">
                We welcome your feedback on the accessibility of our website and
                products. If you encounter accessibility barriers or have
                suggestions for improvement, please contact us:
              </p>
              <ul className="mt-4 space-y-2 text-foreground-secondary">
                <li>
                  Email:{" "}
                  <a
                    href="mailto:contact@aiforhumangood.org"
                    className="text-primary hover:underline"
                  >
                    contact@aiforhumangood.org
                  </a>
                </li>
                <li>
                  We aim to respond to accessibility feedback within 2 business
                  days.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section
        className="py-16 sm:py-20 bg-background-secondary"
        aria-labelledby="ethics-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              id="ethics-heading"
              className="text-3xl font-bold text-foreground sm:text-4xl"
            >
              Ethical AI Framework
            </h2>
            <p className="mt-4 text-lg text-foreground-secondary max-w-2xl mx-auto">
              We believe AI should be a force for good. These principles guide
              how we develop, deploy, and maintain our AI systems.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Human-Centered Design",
                description:
                  "AI should augment human capabilities and respect human autonomy. We design with users, not just for them, ensuring technology serves human needs.",
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
              },
              {
                title: "Fairness & Non-Discrimination",
                description:
                  "We actively work to prevent and mitigate bias in our AI systems, with particular attention to impacts on marginalized communities.",
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
                      d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z"
                    />
                  </svg>
                ),
              },
              {
                title: "Transparency & Explainability",
                description:
                  "Users have a right to understand how AI affects them. We design systems that can be explained in plain language.",
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
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                ),
              },
              {
                title: "Privacy & Security",
                description:
                  "We collect only the data necessary for our solutions to work, implement strong security measures, and never sell user data.",
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
                      d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                    />
                  </svg>
                ),
              },
              {
                title: "Accountability",
                description:
                  "We take responsibility for the systems we create and their impacts, with clear processes for addressing concerns and harms.",
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
                      d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                    />
                  </svg>
                ),
              },
              {
                title: "Continuous Improvement",
                description:
                  "We regularly evaluate our AI for unintended consequences and continuously work to make our systems better and safer.",
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
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                    />
                  </svg>
                ),
              },
            ].map((principle) => (
              <div key={principle.title} className="glass-card p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                  {principle.icon}
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {principle.title}
                </h3>
                <p className="mt-2 text-foreground-secondary">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="py-16 sm:py-20 bg-background"
        aria-labelledby="bias-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2
              id="bias-heading"
              className="text-3xl font-bold text-foreground sm:text-4xl text-center mb-8"
            >
              Bias Mitigation
            </h2>

            <div className="space-y-6">
              <p className="text-lg text-foreground-secondary leading-relaxed">
                AI systems can inherit and amplify biases present in training
                data and design decisions. We take this seriously and implement
                multiple strategies to identify and reduce bias:
              </p>

              {[
                {
                  title: "Diverse Development Teams",
                  description:
                    "We ensure our teams include people with diverse backgrounds, including people with disabilities, to catch blind spots in design.",
                },
                {
                  title: "Community-Driven Testing",
                  description:
                    "We test our systems with representative users from the communities we serve before and after deployment.",
                },
                {
                  title: "Regular Audits",
                  description:
                    "We conduct regular bias audits of our AI systems, examining outcomes across different demographic groups.",
                },
                {
                  title: "Transparent Reporting",
                  description:
                    "We publish reports on our bias mitigation efforts and any issues we've identified and addressed.",
                },
                {
                  title: "Feedback Channels",
                  description:
                    "We maintain open channels for users to report potential bias issues, and we respond to every report.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex gap-4 p-6 rounded-xl border border-line"
                >
                  <svg
                    className="h-6 w-6 text-primary shrink-0 mt-0.5"
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
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-foreground-secondary">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection
        variant="highlight"
        title="Questions About Our Practices?"
        description="We're committed to transparency. If you have questions about our accessibility or ethical practices, we're here to answer them."
        primaryCta={{
          text: "Contact Us",
          href: "/contact",
        }}
        secondaryCta={{
          text: "View Resources",
          href: "/resources",
        }}
      />
    </>
  );
}
