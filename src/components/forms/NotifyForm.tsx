"use client";

import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { config } from "@/lib/config";

export function NotifyForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append("_subject", "New Hearing App Launch Notification Signup");

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
      <div className="text-center py-6" role="status" aria-live="polite">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-success/10 text-success">
          <svg
            className="h-6 w-6"
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
        <h3 className="text-lg font-semibold text-foreground">
          You’re on the list!
        </h3>
        <p className="mt-2 text-foreground-secondary">
          We’ll notify you as soon as the app launches.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="notify-email" className="sr-only">
          Email address
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            id="notify-email"
            name="email"
            required
            placeholder="Enter your email"
            className="flex-1 rounded-lg border border-line-strong bg-surface px-4 py-3 text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <input type="hidden" name="source" value="hearing-app-notify" />
          <Button
            type="submit"
            size="lg"
            disabled={status === "submitting"}
          >
            {status === "submitting" ? "Signing up..." : "Notify Me"}
          </Button>
        </div>
      </div>

      {status === "error" && (
        <div
          className="p-3 rounded-lg bg-error/10 border border-error/20 text-error text-sm"
          role="alert"
        >
          {errorMessage}
        </div>
      )}

      <p className="text-sm text-foreground-secondary text-center">
        We’ll only email you about the app launch. No spam, ever.
      </p>
    </form>
  );
}
