import { cn } from "@/lib/utils";

export function Card({ className, as: As = "div", ...props }: React.HTMLAttributes<HTMLElement> & { as?: "div" | "article" | "section" | "li" | "aside" }) {
  return <As className={cn("rounded-2xl border border-border bg-surface shadow-card", className)} {...props} />;
}

export function CardHeader({ title, action, description, id }: { title: React.ReactNode; action?: React.ReactNode; description?: React.ReactNode; id?: string }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div>
        <h2 id={id} className="text-lg font-semibold">{title}</h2>
        {description && <p className="mt-0.5 text-sm text-muted">{description}</p>}
      </div>
      {action}
    </div>
  );
}
