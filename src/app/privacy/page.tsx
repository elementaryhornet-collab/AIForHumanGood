import { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/sections/Hero";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how AI For Human Good collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Hero
        subtitle="Legal"
        title="Privacy Policy"
        description="Your privacy matters to us. This policy explains how we collect, use, and protect your information."
      />

      <section className="py-16 sm:py-20 bg-background">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-foreground-secondary text-sm">
              Last updated: January 2, 2025
            </p>

            <div className="mt-8 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  1. Introduction
                </h2>
                <p className="mt-4 text-foreground-secondary leading-relaxed">
                  AI For Human Good ("we," "our," or "us") is committed to
                  protecting your privacy. This Privacy Policy explains how we
                  collect, use, disclose, and safeguard your information when
                  you visit our website or use our services.
                </p>
                <p className="mt-4 text-foreground-secondary leading-relaxed">
                  As a nonprofit organization focused on accessibility, we
                  believe privacy is a fundamental right. We collect only what
                  we need and are transparent about how we use your data.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  2. Information We Collect
                </h2>

                <h3 className="text-xl font-semibold text-foreground mt-6">
                  Information You Provide
                </h3>
                <ul className="mt-4 space-y-2 text-foreground-secondary">
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>
                      <strong>Contact Information:</strong> When you fill out
                      our contact form, we collect your name, email address, and
                      message content.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>
                      <strong>Donation Information:</strong> If you make a
                      donation, our payment processor collects payment details.
                      We do not store credit card numbers.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>
                      <strong>Volunteer Applications:</strong> If you apply to
                      volunteer, we collect information you provide in your
                      application.
                    </span>
                  </li>
                </ul>

                <h3 className="text-xl font-semibold text-foreground mt-6">
                  Information Collected Automatically
                </h3>
                <ul className="mt-4 space-y-2 text-foreground-secondary">
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>
                      <strong>Usage Data:</strong> We may collect information
                      about how you access and use our website, including your
                      IP address, browser type, and pages visited.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>
                      <strong>Cookies:</strong> We use essential cookies to make
                      our website function properly. We do not use tracking
                      cookies for advertising.
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  3. How We Use Your Information
                </h2>
                <p className="mt-4 text-foreground-secondary leading-relaxed">
                  We use the information we collect to:
                </p>
                <ul className="mt-4 space-y-2 text-foreground-secondary">
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Respond to your inquiries and provide support</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Process donations and send tax receipts</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>
                      Send updates about our initiatives (with your consent)
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Improve our website and services</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Comply with legal obligations</span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  4. Our Apps and Audio Data
                </h2>
                <p className="mt-4 text-foreground-secondary leading-relaxed">
                  Our Hearing Accessibility App is designed with privacy at its
                  core:
                </p>
                <ul className="mt-4 space-y-2 text-foreground-secondary">
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>
                      <strong>On-Device Processing:</strong> All audio
                      processing happens entirely on your device. Your
                      conversations never leave your phone.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>
                      <strong>No Audio Storage:</strong> We do not record,
                      store, or transmit any audio data.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>
                      <strong>No Account Required:</strong> You can use our apps
                      without creating an account or providing personal
                      information.
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  5. Information Sharing
                </h2>
                <p className="mt-4 text-foreground-secondary leading-relaxed">
                  We do not sell, trade, or rent your personal information. We
                  may share your information only in these circumstances:
                </p>
                <ul className="mt-4 space-y-2 text-foreground-secondary">
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>
                      <strong>Service Providers:</strong> With trusted partners
                      who help us operate our website and process donations
                      (e.g., payment processors, email services).
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>
                      <strong>Legal Requirements:</strong> When required by law
                      or to protect our rights and safety.
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  6. Data Security
                </h2>
                <p className="mt-4 text-foreground-secondary leading-relaxed">
                  We implement appropriate technical and organizational measures
                  to protect your personal information against unauthorized
                  access, alteration, disclosure, or destruction. However, no
                  method of transmission over the internet is 100% secure.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  7. Your Rights
                </h2>
                <p className="mt-4 text-foreground-secondary leading-relaxed">
                  You have the right to:
                </p>
                <ul className="mt-4 space-y-2 text-foreground-secondary">
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Access the personal information we hold about you</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Request correction of inaccurate information</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Request deletion of your information</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Opt out of marketing communications</span>
                  </li>
                </ul>
                <p className="mt-4 text-foreground-secondary leading-relaxed">
                  To exercise these rights, please{" "}
                  <Link href="/contact" className="text-primary hover:underline">
                    contact us
                  </Link>
                  .
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  8. Children's Privacy
                </h2>
                <p className="mt-4 text-foreground-secondary leading-relaxed">
                  Our website is not directed at children under 13. We do not
                  knowingly collect personal information from children under 13.
                  If you believe we have collected information from a child
                  under 13, please contact us immediately.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  9. Changes to This Policy
                </h2>
                <p className="mt-4 text-foreground-secondary leading-relaxed">
                  We may update this Privacy Policy from time to time. We will
                  notify you of any changes by posting the new policy on this
                  page and updating the "Last updated" date.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  10. Contact Us
                </h2>
                <p className="mt-4 text-foreground-secondary leading-relaxed">
                  If you have questions about this Privacy Policy or our
                  practices, please contact us:
                </p>
                <div className="mt-4 p-6 rounded-xl border border-gray-200 bg-background-secondary">
                  <p className="text-foreground font-semibold">
                    AI For Human Good
                  </p>
                  <p className="mt-2 text-foreground-secondary">
                    Email:{" "}
                    <a
                      href="mailto:contact@aiforhumangood.org"
                      className="text-primary hover:underline"
                    >
                      contact@aiforhumangood.org
                    </a>
                  </p>
                  <p className="mt-2">
                    <Link
                      href="/contact"
                      className="text-primary hover:underline"
                    >
                      Contact Form
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
