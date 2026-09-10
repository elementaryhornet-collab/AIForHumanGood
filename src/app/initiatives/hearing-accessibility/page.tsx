import { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { CTASection } from "@/components/sections/CTASection";
import { NotifyForm } from "@/components/forms/NotifyForm";

export const metadata: Metadata = {
  title: "Hearing Accessibility App",
  description:
    "Our bone-conduction hearing assist app helps people with conductive hearing loss experience sound in new ways. Available for iOS and Android.",
};

export default function HearingAccessibilityPage() {
  return (
    <>
      <section
        className="relative overflow-hidden bg-gradient-to-br from-ocean/5 via-background to-teal/5 py-20 sm:py-28"
        aria-labelledby="hero-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex items-center rounded-full bg-amber/10 px-3 py-1 text-sm font-medium text-warning-text">
                  In Development
                </span>
                <span className="text-foreground-secondary">Accessibility</span>
              </div>
              <h1
                id="hero-heading"
                className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
              >
                Hearing Accessibility App
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-foreground-secondary">
                We’re building a bone-conduction hearing assist app that will use
                your smartphone to help people with conductive hearing loss
                experience sound in new ways. Designed with accessibility at its
                core, it will be completely free when launched.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button href="#notify" size="lg">
                  Get Notified at Launch
                </Button>
                <Button href="#how-it-works" variant="outline" size="lg">
                  Learn How It Works
                </Button>
              </div>
            </div>
            <div className="glass-card p-8 text-center">
              <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg
                  className="h-12 w-12"
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
              </div>
              <p className="text-3xl font-bold text-foreground">Coming Soon</p>
              <p className="text-foreground-secondary">In Development</p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="py-16 sm:py-20 bg-background-secondary"
        aria-labelledby="checkin-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl rounded-2xl border-2 border-primary bg-background p-8 sm:p-10">
            <span className="inline-flex items-center rounded-full bg-forest/10 px-3 py-1 text-sm font-medium text-success-text">
              Available now
            </span>
            <h2
              id="checkin-heading"
              className="mt-4 text-3xl font-bold text-foreground sm:text-4xl"
            >
              Start tracking your hearing today
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-foreground-secondary">
              The app is still in development, but you don&rsquo;t have to wait
              to start building a picture of your hearing. Our weekly check-in
              runs in this browser, takes about five minutes, and shows you
              whether your hearing is holding steady over the weeks and months.
              It&rsquo;s free, needs no account, and your results never leave
              your device.
            </p>
            <div className="mt-8">
              <Button href="/hearing-check" size="lg">
                Take a hearing check-in
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section
        className="py-16 sm:py-20 bg-background"
        aria-labelledby="problem-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2
                id="problem-heading"
                className="text-3xl font-bold text-foreground sm:text-4xl"
              >
                The Challenge
              </h2>
              <p className="mt-6 text-lg text-foreground-secondary leading-relaxed">
                People with conductive hearing loss often struggle with
                traditional hearing aids. Conductive hearing loss occurs when
                sound cannot efficiently travel through the outer or middle ear
                to the inner ear. This can be caused by ear infections, fluid
                buildup, or structural differences.
              </p>
              <p className="mt-4 text-lg text-foreground-secondary leading-relaxed">
                Traditional hearing aids amplify sound through the air, which
                doesn’t help if the problem is in how sound travels through the
                ear. Bone-conduction technology bypasses this problem entirely.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
                Who It Helps
              </h2>
              <ul className="mt-6 space-y-4">
                {[
                  "People with conductive hearing loss",
                  "Individuals with chronic ear infections",
                  "People with single-sided deafness",
                  "Those who cannot wear traditional hearing aids",
                  "Anyone seeking an affordable hearing assistance option",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg
                      className="h-6 w-6 shrink-0 text-success"
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
                    <span className="text-foreground-secondary">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section
        id="how-it-works"
        className="py-16 sm:py-20 bg-background-secondary"
        aria-labelledby="solution-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              id="solution-heading"
              className="text-3xl font-bold text-foreground sm:text-4xl"
            >
              How It Works
            </h2>
            <p className="mt-4 text-lg text-foreground-secondary max-w-2xl mx-auto">
              Our app uses AI to process sound and deliver it through
              bone-conduction headphones, bypassing damaged parts of the ear.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                step: "1",
                title: "Capture Sound",
                description:
                  "The app uses your phone's microphone to capture ambient sound in real-time with minimal delay.",
              },
              {
                step: "2",
                title: "AI Processing",
                description:
                  "Our AI enhances speech clarity, reduces background noise, and optimizes sound for your specific hearing profile.",
              },
              {
                step: "3",
                title: "Bone Conduction",
                description:
                  "Sound is transmitted through bone-conduction headphones directly to your inner ear, bypassing the middle ear.",
              },
            ].map((item) => (
              <div key={item.step} className="glass-card p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white text-xl font-bold">
                  {item.step}
                </div>
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

      <section
        className="py-16 sm:py-20 bg-background"
        aria-labelledby="features-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            id="features-heading"
            className="text-3xl font-bold text-foreground sm:text-4xl text-center mb-12"
          >
            Features
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Personalized Hearing Profile",
                description:
                  "Create a custom hearing profile based on your specific needs and preferences.",
              },
              {
                title: "Real-Time Processing",
                description:
                  "Minimal audio delay ensures natural conversation and interaction.",
              },
              {
                title: "Background Noise Reduction",
                description:
                  "AI-powered noise reduction helps you focus on what matters.",
              },
              {
                title: "Speech Enhancement",
                description:
                  "Automatically enhances speech clarity in noisy environments.",
              },
              {
                title: "Completely Free",
                description:
                  "No subscriptions, no hidden costs. Our mission is accessibility for all.",
              },
              {
                title: "Privacy First",
                description:
                  "All audio processing happens on your device. We never store or transmit your conversations.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-xl border border-line"
              >
                <h3 className="text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-foreground-secondary">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="notify"
        className="py-16 sm:py-20 bg-background-secondary"
        aria-labelledby="notify-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              id="notify-heading"
              className="text-3xl font-bold text-foreground sm:text-4xl"
            >
              Be the First to Know
            </h2>
            <p className="mt-4 text-lg text-foreground-secondary max-w-2xl mx-auto">
              We’re working hard to bring this app to you. Sign up to be
              notified when it launches—and get early access to beta testing.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="glass-card p-8">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Planned Platform Support
              </h3>
              <ul className="space-y-2 text-foreground-secondary mb-6">
                <li>iOS 14.0 or later (iPhone 8 and newer)</li>
                <li>Android 10.0 or later</li>
                <li>Any Bluetooth bone-conduction headphones</li>
              </ul>

              <NotifyForm />

              <div className="mt-6 pt-6 border-t border-line">
                <p className="text-sm text-foreground-secondary text-center mb-3">
                  Want to help shape the app?
                </p>
                <Button
                  href="/get-involved"
                  size="lg"
                  variant="secondary"
                  fullWidth
                  className="justify-center"
                >
                  <svg
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                  </svg>
                  <span>Become a Beta Tester</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="py-16 sm:py-20 bg-background"
        aria-labelledby="privacy-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2
              id="privacy-heading"
              className="text-3xl font-bold text-foreground sm:text-4xl text-center mb-8"
            >
              Privacy & Safety
            </h2>

            <div className="space-y-6">
              {[
                {
                  title: "On-Device Processing",
                  description:
                    "All audio processing happens entirely on your device. Your conversations never leave your phone.",
                },
                {
                  title: "No Data Collection",
                  description:
                    "We don't collect, store, or transmit any audio data. Your privacy is paramount.",
                },
                {
                  title: "No Account Required",
                  description:
                    "Use the app without creating an account or providing any personal information.",
                },
                {
                  title: "Open Source",
                  description:
                    "Our core processing algorithms are open source, so anyone can verify how we handle your data.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex gap-4 p-6 rounded-xl border border-line"
                >
                  <svg
                    className="h-6 w-6 shrink-0 text-success"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                    />
                  </svg>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
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
        title="Questions? We're Here to Help"
        description="If you have questions about the app or need assistance, our team is ready to help."
        primaryCta={{
          text: "Contact Support",
          href: "/contact",
        }}
        secondaryCta={{
          text: "View All Initiatives",
          href: "/initiatives",
        }}
      />
    </>
  );
}
