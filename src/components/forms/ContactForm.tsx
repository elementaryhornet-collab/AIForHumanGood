"use client";

import { useState, FormEvent } from "react";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { config } from "@/lib/config";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${config.contactEmail}`, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      const data = await response.json();

      if (data.success === "true" || data.success === true) {
        setStatus("success");
        form.reset();
      } else {
        setErrorMessage(data.message || "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch {
      setErrorMessage("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="text-center py-8" role="status" aria-live="polite">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-success">
          <svg
            className="h-8 w-8"
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
        </div>
        <h3 className="text-xl font-semibold text-foreground">
          Message Sent!
        </h3>
        <p className="mt-2 text-foreground-secondary">
          Thank you for reaching out. We'll get back to you within 2 business
          days.
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-6"
          onClick={() => setStatus("idle")}
        >
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Input
          label="First Name"
          name="firstName"
          type="text"
          autoComplete="given-name"
          required
          placeholder="Your first name"
        />
        <Input
          label="Last Name"
          name="lastName"
          type="text"
          autoComplete="family-name"
          required
          placeholder="Your last name"
        />
      </div>

      <Input
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        required
        placeholder="you@example.com"
      />

      <div className="space-y-2">
        <label
          htmlFor="subject"
          className="block text-base font-medium text-foreground"
        >
          Subject
          <span className="ml-1 text-error" aria-hidden="true">
            *
          </span>
          <span className="sr-only">(required)</span>
        </label>
        <select
          id="subject"
          name="subject"
          required
          className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <option value="">Select a subject</option>
          <option value="general">General Inquiry</option>
          <option value="partnership">Partnership Opportunity</option>
          <option value="volunteer">Volunteering</option>
          <option value="support">Technical Support</option>
          <option value="media">Media Inquiry</option>
          <option value="other">Other</option>
        </select>
      </div>

      <Textarea
        label="Message"
        name="message"
        required
        placeholder="How can we help you?"
        hint="Please provide as much detail as possible."
      />

      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="accessibility"
          name="accessibility"
          className="mt-1 h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
        />
        <label htmlFor="accessibility" className="text-sm text-foreground-secondary">
          I need accessibility accommodations for communication (we'll follow
          up to understand your needs)
        </label>
      </div>

      {status === "error" && (
        <div
          className="p-4 rounded-lg bg-error/10 border border-error/20 text-error"
          role="alert"
        >
          <p className="font-medium">Failed to send message</p>
          <p className="text-sm mt-1">{errorMessage}</p>
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        fullWidth
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "Sending..." : "Send Message"}
      </Button>

      <p className="text-sm text-foreground-secondary text-center">
        By submitting this form, you agree to our{" "}
        <a href="/privacy" className="text-primary hover:underline">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}
