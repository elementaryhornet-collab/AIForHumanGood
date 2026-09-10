import { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about AI For Human Good's mission to create accessible AI solutions that empower people with disabilities and underserved communities.",
};

export default function AboutPage() {
  return (
    <>
      <Hero
        subtitle="About Us"
        title="AI With Purpose, Technology With Heart"
        description="We believe that artificial intelligence should serve everyone, especially those who have been left behind by technology. Our mission is to build AI solutions that break down barriers and create opportunities."
      />

      <section
        className="py-16 sm:py-20 bg-background"
        aria-labelledby="mission-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <h2
                id="mission-heading"
                className="text-3xl font-bold text-foreground sm:text-4xl"
              >
                Our Mission
              </h2>
              <p className="mt-6 text-lg text-foreground-secondary leading-relaxed">
                AI For Human Good exists to harness the power of artificial
                intelligence for the benefit of all people, with a special focus
                on those with disabilities and underserved communities.
              </p>
              <p className="mt-4 text-lg text-foreground-secondary leading-relaxed">
                We develop accessible technology solutions, advocate for
                inclusive AI practices, and educate communities about how AI can
                improve their lives. Every initiative we undertake is guided by
                our core belief: technology should empower, not exclude.
              </p>
            </div>
            <div className="glass-card p-8">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Our Vision
              </h3>
              <p className="text-foreground-secondary leading-relaxed">
                A world where AI technology is designed with everyone in mind,
                where disability is not a barrier to accessing the benefits of
                innovation, and where underserved communities have equal access
                to the tools that shape our future.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="py-16 sm:py-20 bg-background-secondary"
        aria-labelledby="founders-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              id="founders-heading"
              className="text-3xl font-bold text-foreground sm:text-4xl"
            >
              Meet Our Founders
            </h2>
            <p className="mt-4 text-lg text-foreground-secondary max-w-2xl mx-auto">
              AI For Human Good was founded by two siblings who believe
              technology should create opportunities for everyone.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
            <div className="glass-card p-8">
              <div className="text-center mb-6">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">SH</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  Shloak Hiremani
                </h3>
                <p className="text-primary font-medium">Co-Founder</p>
              </div>
              <p className="text-foreground-secondary leading-relaxed">
                Shloak Hiremani is a freshman at Irvington High School and
                co-founder of AI For Human Good. Outside of his work with the
                organization, he competes in table tennis at a competitive
                level. His journey into AI for social impact began when he
                started exploring how artificial intelligence could be used
                beyond corporate applications. He recognized that if large
                companies could leverage AI to enhance their products and
                advertising, everyday people could harness the same technology
                to create opportunities for equality. Shloak is passionate
                about ensuring that AI technology serves as a bridge to
                opportunity for all, especially those who have been
                historically underserved.
              </p>
            </div>

            <div className="glass-card p-8">
              <div className="text-center mb-6">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">SH</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  Swasti Hiremani
                </h3>
                <p className="text-primary font-medium">Co-Founder</p>
              </div>
              <p className="text-foreground-secondary leading-relaxed">
                Swasti Hiremani is a student at the University of Michigan and
                co-founder of AI For Human Good. She is pursuing studies in
                Urban Technology, exploring the intersection of technology and
                urban communities. Her academic focus gives her unique insight
                into how technological solutions can be designed to serve
                diverse populations. Swasti brings a perspective grounded in
                understanding how technology impacts communities and shapes the
                built environment. She is committed to ensuring that AI
                development prioritizes accessibility and serves the needs of
                all people.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="py-16 sm:py-20 bg-background"
        aria-labelledby="values-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              id="values-heading"
              className="text-3xl font-bold text-foreground sm:text-4xl"
            >
              Our Values
            </h2>
            <p className="mt-4 text-lg text-foreground-secondary max-w-2xl mx-auto">
              These principles guide everything we do, from the solutions we
              build to how we engage with communities.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Dignity",
                description:
                  "We respect the inherent worth of every person and design technology that honors their autonomy and independence.",
              },
              {
                title: "Inclusion",
                description:
                  "We actively involve the communities we serve in our design process, ensuring solutions meet real needs.",
              },
              {
                title: "Transparency",
                description:
                  "We are open about how our AI works, its limitations, and how we use data to build trust with users.",
              },
              {
                title: "Accountability",
                description:
                  "We take responsibility for the impact of our technology and continuously work to improve and address concerns.",
              },
            ].map((value) => (
              <div key={value.title} className="glass-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-foreground-secondary">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="py-16 sm:py-20 bg-background"
        aria-labelledby="ethics-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2
              id="ethics-heading"
              className="text-3xl font-bold text-foreground sm:text-4xl text-center mb-8"
            >
              Our Ethical AI Principles
            </h2>

            <div className="space-y-6">
              {[
                {
                  number: "01",
                  title: "Human Oversight",
                  description:
                    "AI should augment human capabilities, not replace human judgment. Our solutions keep humans in control of important decisions.",
                },
                {
                  number: "02",
                  title: "Bias Mitigation",
                  description:
                    "We actively work to identify and reduce bias in our AI systems, with particular attention to how they affect marginalized communities.",
                },
                {
                  number: "03",
                  title: "Privacy by Design",
                  description:
                    "We collect only the data necessary for our solutions to work, and we protect user privacy at every step.",
                },
                {
                  number: "04",
                  title: "Explainability",
                  description:
                    "Users have the right to understand how AI affects them. We design our systems to be explainable in plain language.",
                },
                {
                  number: "05",
                  title: "Continuous Improvement",
                  description:
                    "We regularly evaluate our AI systems for unintended consequences and continuously work to make them better and safer.",
                },
              ].map((principle) => (
                <div
                  key={principle.number}
                  className="flex gap-6 p-6 rounded-xl border border-gray-200 hover:border-primary/30 transition-colors"
                >
                  <span className="text-3xl font-bold text-primary/30">
                    {principle.number}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {principle.title}
                    </h3>
                    <p className="mt-1 text-foreground-secondary">
                      {principle.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        className="py-16 sm:py-20 bg-background-secondary"
        aria-labelledby="governance-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2
                id="governance-heading"
                className="text-3xl font-bold text-foreground sm:text-4xl"
              >
                Governance & Transparency
              </h2>
              <p className="mt-6 text-lg text-foreground-secondary leading-relaxed">
                As a 501(c)(3) nonprofit organization, we are committed to the
                highest standards of transparency and accountability. Our board
                of directors includes individuals with disabilities, technology
                experts, and community advocates.
              </p>
              <p className="mt-4 text-lg text-foreground-secondary leading-relaxed">
                We publish annual reports detailing our impact, finances, and
                goals. We believe that the communities we serve have a right to
                know how their support is being used.
              </p>
            </div>
            <div className="space-y-4">
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Board Composition
                </h3>
                <p className="text-foreground-secondary">
                  Our board includes people with lived experience of disability,
                  ensuring our direction is guided by those we serve.
                </p>
              </div>
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Financial Transparency
                </h3>
                <p className="text-foreground-secondary">
                  We publish detailed financial reports and maintain the highest
                  standards of nonprofit financial management.
                </p>
              </div>
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Community Input
                </h3>
                <p className="text-foreground-secondary">
                  We regularly seek feedback from users and communities to ensure
                  our work remains relevant and impactful.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        variant="highlight"
        title="Join Our Mission"
        description="Whether you want to volunteer, partner, or support our work, there are many ways to be part of AI For Human Good."
        primaryCta={{
          text: "Get Involved",
          href: "/get-involved",
        }}
        secondaryCta={{
          text: "Contact Us",
          href: "/contact",
        }}
      />
    </>
  );
}
