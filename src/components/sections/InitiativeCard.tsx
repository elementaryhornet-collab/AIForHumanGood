import Link from "next/link";
import { cn } from "@/lib/utils";

interface InitiativeCardProps {
  title: string;
  description: string;
  status: "active" | "coming-soon" | "research";
  category: string;
  /** Omitted for initiatives that have no page of their own yet. */
  href?: string;
  icon?: React.ReactNode;
}

const statusConfig = {
  active: {
    label: "Active",
    className: "bg-success/10 text-success",
  },
  "coming-soon": {
    label: "Coming Soon",
    className: "bg-amber/10 text-warning-text",
  },
  research: {
    label: "In Research",
    className: "bg-info/10 text-info",
  },
};

export function InitiativeCard({
  title,
  description,
  status,
  category,
  href,
  icon,
}: InitiativeCardProps) {
  const statusInfo = statusConfig[status];

  return (
    <article
      className={cn(
        "group relative glass-card p-6 transition-all",
        href && "hover:shadow-lg hover:-translate-y-1"
      )}
    >
      {href && (
        <Link
          href={href}
          className="absolute inset-0 z-10 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          <span className="sr-only">Learn more about {title}</span>
        </Link>
      )}

      <div className="flex items-start gap-4">
        {icon && (
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            {icon}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-sm font-medium text-foreground-secondary">
              {category}
            </span>
            <span
              className={cn(
                "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                statusInfo.className
              )}
            >
              {statusInfo.label}
            </span>
          </div>
          <h3
            className={cn(
              "text-lg font-semibold text-foreground transition-colors",
              href && "group-hover:text-primary"
            )}
          >
            {title}
          </h3>
          {/* Without a page to read on, the description is all there is, so it
              is not truncated. */}
          <p
            className={cn(
              "mt-2 text-foreground-secondary",
              href && "line-clamp-2"
            )}
          >
            {description}
          </p>
        </div>
      </div>

      {href && (
        <div className="mt-4 flex items-center text-sm font-medium text-primary">
          <span>Learn more</span>
          <svg
            className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </div>
      )}
    </article>
  );
}
