import { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Button } from "@/components/ui/Button";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Support AI For Human Good's mission to create accessible AI solutions that empower people with disabilities and underserved communities.",
};

export default function DonatePage() {
  return (
    <>
      <Hero
        subtitle="Support Our Mission"
        title="Help Us Build AI For Everyone"
        description="Your donation directly funds the development of accessible AI solutions that help people with disabilities and underserved communities thrive."
      />

      <section className="py-16 sm:py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
                Your Impact
              </h2>
              <p className="mt-6 text-lg text-foreground-secondary leading-relaxed">
                Every dollar you contribute goes directly toward building
                technology that changes lives. As a 501(c)(3) nonprofit, your
                donation is tax-deductible to the fullest extent allowed by law.
              </p>

              <div className="mt-8 space-y-6">
                {[
                  {
                    amount: "$25",
                    impact:
                      "Provides accessibility testing for one feature with a user who has disabilities",
                  },
                  {
                    amount: "$100",
                    impact:
                      "Funds one month of cloud computing for our AI processing",
                  },
                  {
                    amount: "$500",
                    impact:
                      "Sponsors development of a new accessibility feature",
                  },
                  {
                    amount: "$1,000",
                    impact:
                      "Supports a community workshop on AI accessibility",
                  },
                ].map((item) => (
                  <div
                    key={item.amount}
                    className="flex items-start gap-4 p-4 rounded-xl border border-line"
                  >
                    <span className="text-2xl font-bold text-primary">
                      {item.amount}
                    </span>
                    <p className="text-foreground-secondary">{item.impact}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Make a Donation
              </h2>

              <div className="space-y-6">
                <div>
                  <p className="text-sm font-medium text-foreground mb-3">
                    Select Amount
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    {["$25", "$50", "$100", "$250", "$500", "$1000"].map(
                      (amount) => (
                        <button
                          key={amount}
                          type="button"
                          className="rounded-lg border-2 border-line px-4 py-3 text-lg font-semibold text-foreground transition-all hover:border-primary hover:bg-primary/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                        >
                          {amount}
                        </button>
                      )
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="custom-amount"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Or enter a custom amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground-secondary">
                      $
                    </span>
                    <input
                      type="number"
                      id="custom-amount"
                      name="customAmount"
                      min="1"
                      className="block w-full rounded-lg border border-line-strong bg-surface pl-8 pr-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="Enter amount"
                    />
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-foreground mb-3">
                    Donation Type
                  </p>
                  <div className="flex gap-4">
                    <label className="flex-1">
                      <input
                        type="radio"
                        name="donationType"
                        value="one-time"
                        defaultChecked
                        className="peer sr-only"
                      />
                      <span className="block rounded-lg border-2 border-line px-4 py-3 text-center font-medium text-foreground transition-all peer-checked:border-primary peer-checked:bg-primary/5 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary cursor-pointer hover:border-line-strong">
                        One-time
                      </span>
                    </label>
                    <label className="flex-1">
                      <input
                        type="radio"
                        name="donationType"
                        value="monthly"
                        className="peer sr-only"
                      />
                      <span className="block rounded-lg border-2 border-line px-4 py-3 text-center font-medium text-foreground transition-all peer-checked:border-primary peer-checked:bg-primary/5 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary cursor-pointer hover:border-line-strong">
                        Monthly
                      </span>
                    </label>
                  </div>
                </div>

                <Button type="button" size="lg" fullWidth>
                  Continue to Payment
                </Button>

                <p className="text-sm text-foreground-secondary text-center">
                  Secure payment processing. Your donation is tax-deductible.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="py-16 sm:py-20 bg-background-secondary"
        aria-labelledby="transparency-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              id="transparency-heading"
              className="text-3xl font-bold text-foreground sm:text-4xl"
            >
              Transparency & Accountability
            </h2>
            <p className="mt-4 text-lg text-foreground-secondary max-w-2xl mx-auto">
              We believe you have the right to know exactly how your donation is
              used.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                percentage: "85%",
                label: "Programs",
                description:
                  "Goes directly to developing and maintaining our initiatives",
              },
              {
                percentage: "10%",
                label: "Operations",
                description:
                  "Supports essential operations and infrastructure",
              },
              {
                percentage: "5%",
                label: "Fundraising",
                description: "Invested in growing our community of supporters",
              },
            ].map((item) => (
              <div key={item.label} className="glass-card p-6 text-center">
                <p className="text-4xl font-bold text-primary">
                  {item.percentage}
                </p>
                <p className="mt-2 text-lg font-semibold text-foreground">
                  {item.label}
                </p>
                <p className="mt-2 text-foreground-secondary">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-foreground-secondary">
              AI For Human Good is a registered 501(c)(3) nonprofit organization.
              EIN: XX-XXXXXXX
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              Other Ways to Give
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Corporate Matching",
                description:
                  "Many employers match charitable donations. Check if your company participates in a matching program.",
              },
              {
                title: "Planned Giving",
                description:
                  "Include AI For Human Good in your estate planning to create a lasting legacy.",
              },
              {
                title: "Stock Donations",
                description:
                  "Donating appreciated stock can provide tax benefits while supporting our mission.",
              },
              {
                title: "Foundation Grants",
                description:
                  "We partner with foundations that share our commitment to accessibility and inclusion.",
              },
              {
                title: "In-Kind Donations",
                description:
                  "Donate technology, services, or expertise to support our initiatives.",
              },
              {
                title: "Fundraise for Us",
                description:
                  "Create your own fundraising campaign to support AI For Human Good.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-xl border border-line"
              >
                <h3 className="text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-foreground-secondary">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        variant="highlight"
        title="Questions About Donating?"
        description="Our team is happy to discuss how your contribution can make the biggest impact."
        primaryCta={{
          text: "Contact Us",
          href: "/contact",
        }}
        secondaryCta={{
          text: "Learn More About Our Work",
          href: "/initiatives",
        }}
      />
    </>
  );
}
