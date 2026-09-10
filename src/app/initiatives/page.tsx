import { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { InitiativeCard } from "@/components/sections/InitiativeCard";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Our Initiatives",
  description:
    "Explore AI For Human Good's initiatives that use artificial intelligence to empower people with disabilities and underserved communities.",
};

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
  {
    title: "Visual Assistance AI",
    description:
      "AI-powered tools that help people who are blind or have low vision navigate their environment and access visual information.",
    status: "coming-soon" as const,
    category: "Accessibility",
    href: "/initiatives/visual-assistance",
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
    title: "Community Health AI",
    description:
      "AI solutions that help underserved communities access health information and resources in accessible, culturally appropriate ways.",
    status: "research" as const,
    category: "Healthcare",
    href: "/initiatives/community-health",
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
  },
  {
    title: "Accessible Employment Platform",
    description:
      "A job matching platform that uses AI to connect people with disabilities to employers committed to inclusive hiring practices.",
    status: "coming-soon" as const,
    category: "Employment",
    href: "/initiatives/employment-platform",
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
          d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
        />
      </svg>
    ),
  },
];

export default function InitiativesPage() {
  const flagshipInitiatives = initiatives.filter(
    (i) => i.status === "coming-soon"
  );
  const researchInitiatives = initiatives.filter(
    (i) => i.status === "research"
  );

  return (
    <>
      <Hero
        subtitle="Our Initiatives"
        title="AI Solutions in Development"
        description="We're building AI-powered solutions that address real challenges faced by people with disabilities and underserved communities. Each initiative is designed with accessibility at its core."
      />

      <section
        className="py-16 sm:py-20 bg-background"
        aria-labelledby="flagship-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2
              id="flagship-heading"
              className="text-3xl font-bold text-foreground sm:text-4xl"
            >
              Flagship Initiatives
            </h2>
            <p className="mt-4 text-lg text-foreground-secondary max-w-3xl">
              These are our priority initiatives currently in active development.
              We're working to bring them to life as soon as possible.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {flagshipInitiatives.map((initiative) => (
              <InitiativeCard key={initiative.title} {...initiative} />
            ))}
          </div>
        </div>
      </section>

      <section
        className="py-16 sm:py-20 bg-background-secondary"
        aria-labelledby="research-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2
              id="research-heading"
              className="text-3xl font-bold text-foreground sm:text-4xl"
            >
              In Research
            </h2>
            <p className="mt-4 text-lg text-foreground-secondary max-w-3xl">
              These initiatives are in early research stages. We're exploring
              their feasibility and seeking partners to help develop them.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {researchInitiatives.map((initiative) => (
              <InitiativeCard key={initiative.title} {...initiative} />
            ))}
          </div>
        </div>
      </section>

      <section
        className="py-16 sm:py-20 bg-background"
        aria-labelledby="approach-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              id="approach-heading"
              className="text-3xl font-bold text-foreground sm:text-4xl"
            >
              Our Approach
            </h2>
            <p className="mt-4 text-lg text-foreground-secondary max-w-2xl mx-auto">
              Every initiative follows a rigorous process that puts community
              needs and accessibility first.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "1",
                title: "Listen",
                description:
                  "We start by deeply understanding the challenges faced by the communities we aim to serve.",
              },
              {
                step: "2",
                title: "Co-Design",
                description:
                  "We involve community members in the design process from day one, ensuring solutions meet real needs.",
              },
              {
                step: "3",
                title: "Build Accessibly",
                description:
                  "Accessibility is built in from the start, not added later. We test with real users continuously.",
              },
              {
                step: "4",
                title: "Iterate & Improve",
                description:
                  "We gather feedback, measure impact, and continuously improve our solutions.",
              },
            ].map((step) => (
              <div key={step.step} className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white text-xl font-bold">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-foreground-secondary">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        variant="highlight"
        title="Have an Idea for an Initiative?"
        description="We're always looking for new ways to use AI for good. If you have an idea or want to collaborate, we'd love to hear from you."
        primaryCta={{
          text: "Contact Us",
          href: "/contact",
        }}
        secondaryCta={{
          text: "Partner With Us",
          href: "/get-involved#partnerships",
        }}
      />
    </>
  );
}
