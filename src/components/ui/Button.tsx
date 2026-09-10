import { forwardRef, type ButtonHTMLAttributes } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "accent" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

interface ButtonAsButton
  extends ButtonBaseProps,
    ButtonHTMLAttributes<HTMLButtonElement> {
  href?: never;
}

interface ButtonAsLink extends ButtonBaseProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-primary-foreground hover:bg-ocean-dark focus-visible:outline-primary",
  secondary:
    "bg-forest text-white hover:bg-forest-dark focus-visible:outline-forest",
  accent:
    "bg-amber text-accent-foreground hover:bg-amber-dark focus-visible:outline-amber",
  outline:
    "border-2 border-primary text-primary bg-transparent hover:bg-primary/10 focus-visible:outline-primary",
  ghost:
    "text-foreground hover:bg-gray-100 focus-visible:outline-primary",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(function Button(props, ref) {
  const {
    variant = "primary",
    size = "md",
    fullWidth = false,
    className,
    ...rest
  } = props;

  const baseStyles = cn(
    "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all",
    "focus-visible:outline-2 focus-visible:outline-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    variantStyles[variant],
    sizeStyles[size],
    fullWidth && "w-full",
    className
  );

  if ("href" in props && props.href) {
    const { href, children, target, rel, ...linkRest } = rest as ButtonAsLink;
    return (
      <Link
        href={href}
        className={baseStyles}
        ref={ref as React.Ref<HTMLAnchorElement>}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : rel}
        {...linkRest}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={baseStyles}
      ref={ref as React.Ref<HTMLButtonElement>}
      {...(rest as ButtonAsButton)}
    />
  );
});
