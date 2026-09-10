import { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Access AI For Human Good's educational resources on AI ethics, accessibility guides, and downloadable materials.",
};

const resources = [
  {
    category: "AI Ethics",
    items: [
      {
        title: "Introduction to Ethical AI",
        description:
          "A beginner-friendly guide to understanding what makes AI ethical and why it matters.",
        type: "Guide",
        href: "#",
      },
      {
        title: "Bias in AI Systems",
        description:
          "Learn how bias enters AI systems and what can be done to prevent and mitigate it.",
        type: "Article",
        href: "#",
      },
      {
        title: "AI Ethics Framework Template",
        description:
          "A downloadable template for organizations to develop their own AI ethics guidelines.",
        type: "PDF",
        href: "#",
      },
    ],
  },
  {
    category: "Accessibility Guides",
    items: [
      {
        title: "Web Accessibility Basics",
        description:
          "An introduction to web accessibility and WCAG guidelines for developers and designers.",
        type: "Guide",
        href: "#",
      },
      {
        title: "Testing for Accessibility",
        description:
          "Practical guide to testing websites and apps for accessibility issues.",
        type: "Tutorial",
        href: "#",
      },
      {
        title: "Accessible Design Patterns",
        description:
          "Common UI patterns implemented with accessibility in mind, with code examples.",
        type: "Resource",
        href: "#",
      },
    ],
  },
  {
    category: "Community Resources",
    items: [
      {
        title: "AI Literacy Curriculum",
        description:
          "Educational materials for teaching AI concepts to diverse communities.",
        type: "Curriculum",
        href: "#",
      },
      {
        title: "Advocacy Toolkit",
        description:
          "Resources for advocating for accessible technology in your community or organization.",
        type: "Toolkit",
        href: "#",
      },
      {
        title: "Partner Organization Directory",
        description:
          "A list of organizations working on accessibility and ethical AI that we recommend.",
        type: "Directory",
        href: "#",
      },
    ],
  },
];

const typeColors: Record<string, string> = {
  Guide: "bg-ocean/10 text-ocean",
  Article: "bg-forest/10 text-forest",
  PDF: "bg-amber/10 text-amber-dark",
  Tutorial: "bg-teal/10 text-teal-dark",
  Resource: "bg-primary/10 text-primary",
  Curriculum: "bg-success/10 text-success",
  Toolkit: "bg-info/10 text-info",
  Directory: "bg-gray-100 text-gray-600",
};

export default function ResourcesPage() {
  return (
    <>
      <Hero
        subtitle="Resources"
        title="Learn, Grow, Advocate"
        description="Free resources to help you understand AI ethics, build accessible technology, and advocate for inclusive design."
      />

      <section className="py-16 sm:py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {resources.map((category) => (
            <div key={category.category} className="mb-16 last:mb-0">
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl mb-8">
                {category.category}
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {category.items.map((item) => (
                  <article
                    key={item.title}
                    className="glass-card p-6 hover:shadow-lg transition-shadow group"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          typeColors[item.type] || "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {item.type}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      <Link href={item.href} className="hover:underline">
                        {item.title}
                      </Link>
                    </h3>
                    <p className="mt-2 text-foreground-secondary">
                      {item.description}
                    </p>
                    <Link
                      href={item.href}
                      className="mt-4 inline-flex items-center text-primary font-medium hover:underline"
                    >
                      {item.type === "PDF" ? "Download" : "Read more"}
                      <svg
                        className="ml-1 h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        {item.type === "PDF" ? (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                          />
                        ) : (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                          />
                        )}
                      </svg>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        className="py-16 sm:py-20 bg-background-secondary"
        aria-labelledby="external-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              id="external-heading"
              className="text-3xl font-bold text-foreground sm:text-4xl"
            >
              External Resources
            </h2>
            <p className="mt-4 text-lg text-foreground-secondary max-w-2xl mx-auto">
              These external organizations and resources share our commitment to
              accessible, ethical technology.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "W3C Web Accessibility Initiative",
                description:
                  "The definitive source for web accessibility standards and guidelines.",
                url: "https://www.w3.org/WAI/",
              },
              {
                name: "A11y Project",
                description:
                  "A community-driven effort to make digital accessibility easier.",
                url: "https://www.a11yproject.com/",
              },
              {
                name: "Partnership on AI",
                description:
                  "Multi-stakeholder organization addressing AI's most important questions.",
                url: "https://partnershiponai.org/",
              },
              {
                name: "AI Now Institute",
                description:
                  "Research institute studying the social implications of artificial intelligence.",
                url: "https://ainowinstitute.org/",
              },
              {
                name: "Disability Rights Education",
                description:
                  "Resources for understanding disability rights in the digital age.",
                url: "#",
              },
              {
                name: "Ethical AI Consortium",
                description:
                  "Coalition of organizations working on ethical AI development.",
                url: "#",
              },
            ].map((resource) => (
              <a
                key={resource.name}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 rounded-xl border border-gray-200 hover:border-primary/30 transition-colors group"
              >
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {resource.name}
                </h3>
                <p className="mt-2 text-foreground-secondary">
                  {resource.description}
                </p>
                <span className="mt-4 inline-flex items-center text-sm text-primary">
                  Visit site
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
                      d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                    />
                  </svg>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-8 md:p-12 text-center">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              Need Custom Training or Resources?
            </h2>
            <p className="mt-4 text-lg text-foreground-secondary max-w-2xl mx-auto">
              We offer customized training sessions and resources for
              organizations looking to improve their accessibility and AI ethics
              practices.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-semibold text-white transition-all hover:bg-ocean-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Request Training
              </Link>
              <Link
                href="/get-involved#partnerships"
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-primary bg-transparent px-6 py-3 text-base font-semibold text-primary transition-all hover:bg-primary/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Partner With Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        variant="highlight"
        title="Have Resources to Share?"
        description="If you've created resources on accessibility or AI ethics that you'd like us to feature, we'd love to hear from you."
        primaryCta={{
          text: "Submit a Resource",
          href: "/contact",
        }}
        secondaryCta={{
          text: "Join Our Mission",
          href: "/get-involved",
        }}
      />
    </>
  );
}
