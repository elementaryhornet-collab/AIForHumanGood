"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Our Initiatives", href: "/initiatives" },
  { name: "Impact", href: "/impact" },
  { name: "Get Involved", href: "/get-involved" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => {
    setMobileMenuOpen(false);
    toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // The panel declares aria-modal, which hides the rest of the page from
  // assistive tech. That is only honest if focus actually goes in, stays in,
  // and comes back out again — so escape closes it and tab wraps inside it.
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const panel = menuRef.current;
    panel?.querySelector<HTMLElement>("a, button")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        return;
      }
      if (event.key !== "Tab" || !panel) return;

      const focusable = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileMenuOpen, closeMenu]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-background/95 backdrop-blur-sm">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <div className="flex lg:flex-1">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-semibold text-primary transition-colors hover:text-primary-strong focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            <svg
              className="h-8 w-8"
              viewBox="0 0 32 32"
              fill="none"
              aria-hidden="true"
            >
              <circle cx="16" cy="16" r="14" fill="currentColor" opacity="0.1" />
              <path
                d="M16 6C10.477 6 6 10.477 6 16s4.477 10 10 10 10-4.477 10-10S21.523 6 16 6zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"
                fill="currentColor"
              />
              <path
                d="M16 10a6 6 0 100 12 6 6 0 000-12zm0 10a4 4 0 110-8 4 4 0 010 8z"
                fill="currentColor"
              />
              <circle cx="16" cy="16" r="2" fill="currentColor" />
            </svg>
            <span>AI For Human Good</span>
          </Link>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            ref={toggleRef}
            className="inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
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
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </button>
        </div>

        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-base font-medium transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary ${
                pathname === item.href
                  ? "text-primary"
                  : "text-foreground-secondary"
              }`}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link
            href="/donate"
            className="rounded-full bg-amber px-5 py-2.5 text-base font-semibold text-accent-foreground shadow-sm transition-all hover:bg-amber-dark hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber"
          >
            Donate
          </Link>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          ref={menuRef}
          className="fixed inset-x-0 top-[73px] bottom-0 z-50 overflow-y-auto bg-background lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
        >
          <div className="flex flex-col gap-2 px-4 py-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block rounded-lg px-4 py-3 text-lg font-medium transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                  pathname === item.href
                    ? "bg-primary/10 text-primary"
                    : "text-foreground"
                }`}
                aria-current={pathname === item.href ? "page" : undefined}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="mt-4 border-t border-line pt-4">
              <Link
                href="/donate"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full rounded-full bg-amber px-5 py-3 text-center text-lg font-semibold text-accent-foreground shadow-sm transition-all hover:bg-amber-dark"
              >
                Donate
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
