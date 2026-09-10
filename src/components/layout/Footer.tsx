import Link from "next/link";

const footerNavigation = {
  initiatives: [
    { name: "Our Initiatives", href: "/initiatives" },
    { name: "Hearing Accessibility", href: "/initiatives/hearing-accessibility" },
    { name: "Weekly Hearing Check-in", href: "/hearing-check" },
    { name: "Impact Stories", href: "/impact" },
  ],
  organization: [
    { name: "About Us", href: "/about" },
    { name: "Accessibility & Ethics", href: "/accessibility-ethics" },
    { name: "Resources", href: "/resources" },
  ],
  getInvolved: [
    { name: "Volunteer", href: "/get-involved" },
    { name: "Partner With Us", href: "/get-involved#partnerships" },
    { name: "Donate", href: "/donate" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Accessibility Statement", href: "/accessibility-ethics#statement" },
    { name: "Contact", href: "/contact" },
  ],
};

export function Footer() {
  return (
    <footer
      className="border-t border-gray-200 bg-background-secondary"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-semibold text-primary"
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
            <p className="max-w-xs text-base text-foreground-secondary">
              Building accessible AI solutions that empower people and strengthen
              communities. Technology should work for everyone.
            </p>
            <p className="text-sm text-foreground-secondary">
              A 501(c)(3) nonprofit organization.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-base font-semibold text-foreground">
                  Our Work
                </h3>
                <ul role="list" className="mt-4 space-y-3">
                  {footerNavigation.initiatives.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-base text-foreground-secondary transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-base font-semibold text-foreground">
                  Organization
                </h3>
                <ul role="list" className="mt-4 space-y-3">
                  {footerNavigation.organization.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-base text-foreground-secondary transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-base font-semibold text-foreground">
                  Get Involved
                </h3>
                <ul role="list" className="mt-4 space-y-3">
                  {footerNavigation.getInvolved.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-base text-foreground-secondary transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-base font-semibold text-foreground">Legal</h3>
                <ul role="list" className="mt-4 space-y-3">
                  {footerNavigation.legal.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-base text-foreground-secondary transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-center text-sm text-foreground-secondary">
            &copy; {new Date().getFullYear()} AI For Human Good. All rights
            reserved. Built with accessibility at its core.
          </p>
        </div>
      </div>
    </footer>
  );
}
