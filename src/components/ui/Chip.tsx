import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

/** Botão de alternância usado em filtros e escolhas múltiplas. */
export function Chip({ selected, onClick, children, className }: { selected: boolean; onClick: () => void; children: React.ReactNode; className?: string }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm transition-colors",
        selected ? "border-primary bg-primary-soft font-medium text-primary" : "border-border bg-surface text-fg hover:bg-surface-2",
        className,
      )}
    >
      {selected && <Check className="h-3.5 w-3.5" aria-hidden />}
      {children}
    </button>
  );
}
