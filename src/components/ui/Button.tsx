import Link from "next/link";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline" | "danger" | "accent";
type Size = "sm" | "md" | "lg" | "icon";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 select-none";
const variants: Record<Variant, string> = {
  primary: "bg-primary text-primary-fg hover:bg-primary/90 shadow-sm",
  accent: "bg-accent text-accent-fg hover:bg-accent/90 shadow-sm",
  secondary: "bg-surface-2 text-fg hover:bg-border/70",
  outline: "border border-border bg-surface text-fg hover:bg-surface-2",
  ghost: "text-fg hover:bg-surface-2",
  danger: "bg-danger text-white hover:bg-danger/90 dark:text-bg",
};
const sizes: Record<Size, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-4 text-sm",
  lg: "h-12 px-6 text-base",
  icon: "h-10 w-10",
};

export function buttonClass(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", className, loading, children, disabled, type = "button", ...props },
  ref,
) {
  return (
    <button ref={ref} type={type} className={buttonClass(variant, size, className)} disabled={disabled || loading} aria-busy={loading || undefined} {...props}>
      {loading && <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" aria-hidden />}
      {children}
    </button>
  );
});

interface LinkButtonProps extends React.ComponentProps<typeof Link> {
  variant?: Variant;
  size?: Size;
}

export function LinkButton({ variant = "primary", size = "md", className, ...props }: LinkButtonProps) {
  return <Link className={buttonClass(variant, size, className)} {...props} />;
}
