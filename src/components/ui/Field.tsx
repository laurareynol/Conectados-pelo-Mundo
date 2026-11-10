import { forwardRef, useId } from "react";
import { cn } from "@/lib/utils";

const control =
  "w-full rounded-xl border border-border bg-surface px-3.5 text-sm text-fg placeholder:text-muted/80 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25 aria-[invalid=true]:border-danger aria-[invalid=true]:ring-danger/20";

export const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(function Input({ className, ...props }, ref) {
  return <input ref={ref} className={cn(control, "h-11", className)} {...props} />;
});

export const Textarea = forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(function Textarea({ className, ...props }, ref) {
  return <textarea ref={ref} className={cn(control, !className?.includes("min-h-") && "min-h-[96px]", "py-2.5 leading-relaxed", className)} {...props} />;
});

export const Select = forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(function Select({ className, ...props }, ref) {
  return <select ref={ref} className={cn(control, "h-11 cursor-pointer pr-8", className)} {...props} />;
});

interface FieldProps {
  label: React.ReactNode;
  hint?: React.ReactNode;
  error?: string | null;
  optional?: string;
  className?: string;
  children: (props: { id: string; "aria-describedby"?: string; "aria-invalid"?: boolean }) => React.ReactNode;
}

/** Associa label, dica e erro a um controle de formulário de forma acessível. */
export function Field({ label, hint, error, optional, className, children }: FieldProps) {
  const id = useId();
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;
  return (
    <div className={cn("space-y-1.5", className)}>
      <label htmlFor={id} className="block text-sm font-medium">
        {label} {optional && <span className="font-normal text-muted">({optional})</span>}
      </label>
      {children({ id, "aria-describedby": describedBy, "aria-invalid": error ? true : undefined })}
      {hint && !error && <p id={hintId} className="text-xs text-muted">{hint}</p>}
      {error && <p id={errorId} role="alert" className="text-xs font-medium text-danger">{error}</p>}
    </div>
  );
}

export function Switch({ checked, onChange, label, description, id }: { checked: boolean; onChange: (v: boolean) => void; label: React.ReactNode; description?: React.ReactNode; id?: string }) {
  const auto = useId();
  const sid = id ?? auto;
  return (
    <div className="flex items-start justify-between gap-4 py-2">
      <div>
        <label htmlFor={sid} className="cursor-pointer text-sm font-medium">{label}</label>
        {description && <p className="text-xs text-muted">{description}</p>}
      </div>
      <button
        id={sid}
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn("relative mt-0.5 inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors", checked ? "bg-primary" : "bg-border")}
      >
        <span className={cn("inline-block h-5 w-5 rounded-full bg-white shadow transition-transform", checked ? "translate-x-[22px]" : "translate-x-0.5")} />
      </button>
    </div>
  );
}
