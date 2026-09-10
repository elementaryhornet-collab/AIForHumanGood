import { type HTMLAttributes } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "outlined";
  href?: string;
  as?: "div" | "article" | "section";
}

const variantStyles = {
  default: "bg-surface shadow-soft border border-line",
  glass: "glass-card",
  outlined: "border-2 border-line bg-transparent",
} as const;

export function Card({
  variant = "default",
  href,
  as: Component = "div",
  className,
  children,
  ...props
}: CardProps) {
  const baseStyles = cn(
    "rounded-xl p-6 transition-all",
    variantStyles[variant],
    href && "hover:shadow-lg hover:-translate-y-1",
    className
  );

  // A linked card is the link, rather than a bare overlay stretched across one.
  // The previous version hid that overlay from assistive tech and pulled it out
  // of the tab order, which left the card unreachable without a mouse.
  if (href) {
    return (
      <Link
        href={href}
        className={cn(
          baseStyles,
          "block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        )}
      >
        {children}
      </Link>
    );
  }

  return (
    <Component className={baseStyles} {...props}>
      {children}
    </Component>
  );
}

export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mb-4", className)} {...props} />;
}

interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: "h2" | "h3" | "h4";
}

export function CardTitle({
  as: Component = "h3",
  className,
  ...props
}: CardTitleProps) {
  return (
    <Component
      className={cn("text-xl font-semibold text-foreground", className)}
      {...props}
    />
  );
}

export function CardDescription({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-foreground-secondary leading-relaxed", className)}
      {...props}
    />
  );
}

export function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn(className)} {...props} />;
}

export function CardFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "mt-6 flex items-center gap-4 pt-4 border-t border-line",
        className
      )}
      {...props}
    />
  );
}
