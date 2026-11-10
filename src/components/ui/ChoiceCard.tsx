import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

/** Opção grande para formulários (radio ou checkbox nativo, acessível por teclado). */
export function ChoiceCard({ type, name, checked, onChange, title, text, icon }: {
  type: "radio" | "checkbox"; name: string; checked: boolean; onChange: () => void; title: string; text?: string; icon?: React.ReactNode;
}) {
  return (
    <label
      className={cn(
        "relative flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary",
        checked ? "border-primary bg-primary-soft" : "border-border bg-surface hover:bg-surface-2",
      )}
    >
      <input type={type} name={name} checked={checked} onChange={onChange} className="sr-only" />
      {icon && <span className={cn("mt-0.5 shrink-0", checked ? "text-primary" : "text-muted")} aria-hidden>{icon}</span>}
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold">{title}</span>
        {text && <span className="mt-0.5 block text-sm text-muted">{text}</span>}
      </span>
      <span
        aria-hidden
        className={cn(
          "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border-2",
          type === "radio" ? "rounded-full" : "rounded-md",
          checked ? "border-primary bg-primary text-primary-fg" : "border-border",
        )}
      >
        {checked && <Check className="h-3 w-3" strokeWidth={3} />}
      </span>
    </label>
  );
}
