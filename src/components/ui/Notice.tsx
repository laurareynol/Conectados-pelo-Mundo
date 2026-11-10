import { AlertCircle, FlaskConical, Info, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

type Tone = "info" | "warning" | "demo" | "safety";
const styles: Record<Tone, string> = {
  info: "border-sky/25 bg-sky-soft text-fg",
  warning: "border-warning/30 bg-warning-soft text-fg",
  demo: "border-accent/25 bg-accent-soft text-fg",
  safety: "border-primary/25 bg-primary-soft text-fg",
};
const icons = { info: Info, warning: AlertCircle, demo: FlaskConical, safety: ShieldCheck };
const iconColor: Record<Tone, string> = { info: "text-sky", warning: "text-warning", demo: "text-accent", safety: "text-primary" };

/** Aviso contextual (demonstração, alerta legal, dica de segurança). */
export function Notice({ tone = "info", title, children, className, action }: { tone?: Tone; title?: string; children: React.ReactNode; className?: string; action?: React.ReactNode }) {
  const Icon = icons[tone];
  return (
    <div className={cn("flex gap-3 rounded-2xl border p-4 text-sm", styles[tone], className)} role="note">
      <Icon className={cn("mt-0.5 h-5 w-5 shrink-0", iconColor[tone])} aria-hidden />
      <div className="min-w-0 flex-1">
        {title && <p className="font-semibold">{title}</p>}
        <div className={cn("leading-relaxed", title && "mt-0.5 text-muted")}>{children}</div>
        {action && <div className="mt-2">{action}</div>}
      </div>
    </div>
  );
}
