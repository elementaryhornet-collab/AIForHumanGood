import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, hint, className, id, required, ...props },
  ref
) {
  const inputId = id || label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="space-y-2">
      <label
        htmlFor={inputId}
        className="block text-base font-medium text-foreground"
      >
        {label}
        {required && (
          <span className="ml-1 text-error" aria-hidden="true">
            *
          </span>
        )}
        {required && <span className="sr-only">(required)</span>}
      </label>
      {hint && (
        <p id={`${inputId}-hint`} className="text-sm text-foreground-secondary">
          {hint}
        </p>
      )}
      <input
        ref={ref}
        id={inputId}
        required={required}
        aria-describedby={
          error
            ? `${inputId}-error`
            : hint
            ? `${inputId}-hint`
            : undefined
        }
        aria-invalid={error ? "true" : undefined}
        className={cn(
          "block w-full rounded-lg border border-gray-300 bg-white px-4 py-3",
          "text-foreground placeholder:text-gray-400",
          "transition-colors",
          "focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
          "disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500",
          error && "border-error focus:border-error focus:ring-error/20",
          className
        )}
        {...props}
      />
      {error && (
        <p id={`${inputId}-error`} className="text-sm text-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  hint?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ label, error, hint, className, id, required, ...props }, ref) {
    const inputId = id || label.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="space-y-2">
        <label
          htmlFor={inputId}
          className="block text-base font-medium text-foreground"
        >
          {label}
          {required && (
            <span className="ml-1 text-error" aria-hidden="true">
              *
            </span>
          )}
          {required && <span className="sr-only">(required)</span>}
        </label>
        {hint && (
          <p id={`${inputId}-hint`} className="text-sm text-foreground-secondary">
            {hint}
          </p>
        )}
        <textarea
          ref={ref}
          id={inputId}
          required={required}
          aria-describedby={
            error
              ? `${inputId}-error`
              : hint
              ? `${inputId}-hint`
              : undefined
          }
          aria-invalid={error ? "true" : undefined}
          className={cn(
            "block w-full rounded-lg border border-gray-300 bg-white px-4 py-3",
            "text-foreground placeholder:text-gray-400",
            "transition-colors resize-y min-h-[120px]",
            "focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
            "disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500",
            error && "border-error focus:border-error focus:ring-error/20",
            className
          )}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="text-sm text-error" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);
