import { cn } from "@/lib/utils";

export function PageHeader({ eyebrow, title, subtitle, actions, className }: { eyebrow?: React.ReactNode; title: React.ReactNode; subtitle?: React.ReactNode; actions?: React.ReactNode; className?: string }) {
  return (
    <header className={cn("flex flex-col gap-4 pb-6 pt-8 sm:flex-row sm:items-end sm:justify-between sm:pt-10", className)}>
      <div className="max-w-2xl">
        {eyebrow && <p className="mb-2 text-sm font-medium text-primary">{eyebrow}</p>}
        <h1 className="text-2xl font-bold sm:text-3xl">{title}</h1>
        {subtitle && <p className="mt-2 text-muted">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </header>
  );
}
