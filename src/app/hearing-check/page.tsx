import { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { CTASection } from "@/components/sections/CTASection";
import { HearingCheckIn } from "@/components/hearing/HearingCheckIn";

export const metadata: Metadata = {
  title: "Weekly Hearing Check-in",
  description:
    "A free weekly hearing self-check that runs in your browser and tracks whether your hearing is holding steady over time. Your results never leave your device.",
};

export default function HearingCheckPage() {
  return (
    <>
      <Hero
        subtitle="Hearing Accessibility"
        title="Weekly Hearing Check-in"
        description="Five minutes a week, in your browser, with headphones on. It will not tell you how well you hear — no web page can — but it will tell you whether that is changing."
      />

      <section
        className="bg-background py-12"
        aria-labelledby="disclaimer-heading"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-4 rounded-xl border-2 border-amber p-6">
            <svg
              className="h-7 w-7 shrink-0 text-warning-text"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
              />
            </svg>
            <div>
              <h2
                id="disclaimer-heading"
                className="text-xl font-semibold text-foreground"
              >
                This is not a hearing test
              </h2>
              <p className="mt-2 text-foreground-secondary">
                A real audiogram is measured on calibrated equipment in a
                sound-treated booth. A web page cannot know how loud your
                headphones actually are, so the numbers here are not decibels of
                hearing loss and cannot be compared to anyone else&rsquo;s — or
                to a clinical result.
              </p>
              <p className="mt-3 text-foreground-secondary">
                What it can do is compare you to <em>yourself</em>, on the same
                headphones at the same volume, week after week. That trend is the
                whole point. It is a screening aid, never a diagnosis, and it
                does not replace an audiologist.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="bg-background pb-16 sm:pb-20"
        aria-labelledby="tool-heading"
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 id="tool-heading" className="sr-only">
            Your hearing check-in
          </h2>
          <HearingCheckIn />
        </div>
      </section>

      <section
        className="bg-background-secondary py-16 sm:py-20"
        aria-labelledby="how-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2
              id="how-heading"
              className="text-3xl font-bold text-foreground sm:text-4xl"
            >
              How the check-in works
            </h2>
            <p className="mt-4 text-lg text-foreground-secondary">
              It borrows the method audiologists use, minus the calibrated
              hardware.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                step: "1",
                title: "Set up the same way",
                description:
                  "Same headphones, same volume, somewhere quiet. We check your left and right channels are not swapped, and record which setup you used so a mismatch can be flagged later.",
              },
              {
                step: "2",
                title: "Find your quietest tone",
                description:
                  "Six pitches in each ear, from 250 Hz to 8 kHz. Each one drops 10 steps after you respond and rises 5 after you miss, closing in on the softest level you can hear twice.",
              },
              {
                step: "3",
                title: "Compare to your baseline",
                description:
                  "Your first check-in sets the line. Every result after that is plotted against it, and anything that moves further than normal week-to-week variation gets called out.",
              },
            ].map((item) => (
              <div key={item.step} className="glass-card p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-white">
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

          <div className="mx-auto mt-12 max-w-3xl rounded-xl border border-line bg-background p-6">
            <h3 className="text-lg font-semibold text-foreground">
              Why some tones are silent
            </h3>
            <p className="mt-2 text-foreground-secondary">
              Roughly one in seven presentations plays nothing at all. If you
              answer those, you are guessing rather than hearing, and the
              check-in says so instead of quietly recording hearing you do not
              have. Answering nothing during a silent trial is the correct
              result.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-background py-16 sm:py-20" aria-labelledby="care-heading">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2
            id="care-heading"
            className="text-3xl font-bold text-foreground sm:text-4xl"
          >
            When to see someone, regardless of what this says
          </h2>
          <p className="mt-4 text-lg text-foreground-secondary">
            A weekly trend is slow by design. These are the things that should
            not wait for it.
          </p>

          <div className="mt-8 rounded-xl border-2 border-error p-6">
            <h3 className="text-lg font-semibold text-foreground">
              Sudden hearing loss is urgent
            </h3>
            <p className="mt-2 text-foreground-secondary">
              Hearing that drops noticeably over hours or a few days, especially
              in one ear, is treated as a medical emergency. Treatment works far
              better when it starts within a few days, so contact a doctor
              straight away rather than waiting to see what next week&rsquo;s
              check-in shows.
            </p>
          </div>

          <ul className="mt-8 space-y-4">
            {[
              "Hearing that is clearly worse in one ear than the other",
              "Pain, discharge, or a blocked feeling that does not clear",
              "Ringing or buzzing that is new, or that changes",
              "Dizziness or balance problems alongside hearing changes",
              "Any change that worries you, whatever the numbers say",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <svg
                  className="mt-1 h-5 w-5 shrink-0 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
                <span className="text-foreground-secondary">{item}</span>
              </li>
            ))}
          </ul>

          <p className="mt-8 text-foreground-secondary">
            Bring your history with you — the check-in exports a CSV of every
            reading, which is more useful to a clinician than a description from
            memory.
          </p>
        </div>
      </section>

      <section
        className="bg-background-secondary py-16 sm:py-20"
        aria-labelledby="privacy-heading"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2
            id="privacy-heading"
            className="text-3xl font-bold text-foreground sm:text-4xl"
          >
            Where your results live
          </h2>
          <div className="mt-8 space-y-6">
            {[
              {
                title: "On your device, nowhere else",
                description:
                  "Results are written to this browser's local storage. There is no account, no upload, and no server holding a copy — this site is a set of static files.",
              },
              {
                title: "Which means they are not backed up",
                description:
                  "Clearing your browser data, or switching to another browser or device, loses your history. Download the CSV if it matters to you.",
              },
              {
                title: "Yours to delete",
                description:
                  "One button erases everything, immediately and permanently. We could not recover it if we wanted to.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex gap-4 rounded-xl border border-line bg-background p-6"
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
      </section>

      <CTASection
        variant="highlight"
        title="Built alongside our hearing app"
        description="The check-in is a first piece of the bone-conduction hearing assist project. If it is useful to you, help us shape what comes next."
        primaryCta={{
          text: "About the hearing app",
          href: "/initiatives/hearing-accessibility",
        }}
        secondaryCta={{
          text: "Become a Beta Tester",
          href: "/get-involved",
        }}
      />
    </>
  );
}
