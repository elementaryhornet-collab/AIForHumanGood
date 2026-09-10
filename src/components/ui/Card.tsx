import { type HTMLAttributes } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "outlined";
  href?: string;
  as?: "div" | "article" | "section";
}

export function Card({
  variant = "default",
  href,
  as: Component = "div",
  className,
  children,
  ...props
}: CardProps) {
  const variantStyles = {
    default: "bg-white shadow-soft border border-gray-100",
    glass: "glass-card",
    outlined: "border-2 border-gray-200 bg-transparent",
  };

  const baseStyles = cn(
    "rounded-xl p-6 transition-all",
    variantStyles[variant],
    href && "hover:shadow-lg hover:-translate-y-1 cursor-pointer",
    className
  );

  if (href) {
    return (
      <Component className={baseStyles} {...props}>
        <Link
          href={href}
          className="absolute inset-0 z-10 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          aria-hidden="true"
          tabIndex={-1}
        />
        <div className="relative">{children}</div>
      </Component>
    );
  }

  return (
    <Component className={baseStyles} {...props}>
      {children}
    </Component>
  );
}

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {}

export function CardHeader({ className, ...props }: CardHeaderProps) {
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

interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}

export function CardDescription({ className, ...props }: CardDescriptionProps) {
  return (
    <p
      className={cn("text-foreground-secondary leading-relaxed", className)}
      {...props}
    />
  );
}

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {}

export function CardContent({ className, ...props }: CardContentProps) {
  return <div className={cn("", className)} {...props} />;
}

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {}

export function CardFooter({ className, ...props }: CardFooterProps) {
  return (
    <div
      className={cn("mt-6 flex items-center gap-4 pt-4 border-t border-gray-100", className)}
      {...props}
    />
  );
}
