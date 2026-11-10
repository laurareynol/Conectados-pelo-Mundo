import { cn } from "@/lib/utils";

export function Progress({ value, label, className, tone = "primary" }: { value: number; label: string; className?: string; tone?: "primary" | "accent" | "success" }) {
  const v = Math.max(0, Math.min(100, value));
  const color = { primary: "bg-primary", accent: "bg-accent", success: "bg-success" }[tone];
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuenow={Math.round(v)}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn("h-2.5 w-full overflow-hidden rounded-full bg-surface-2", className)}
    >
      <div className={cn("h-full rounded-full transition-[width] duration-500", color)} style={{ width: `${v}%` }} />
    </div>
  );
}

export function ProgressRing({ value, size = 88, label }: { value: number; size?: number; label: string }) {
  const stroke = 8;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative" style={{ width: size, height: size }} role="img" aria-label={label}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} strokeWidth={stroke} className="fill-none stroke-surface-2" />
        <circle
          cx={size / 2} cy={size / 2} r={r} strokeWidth={stroke} strokeLinecap="round"
          className="fill-none stroke-primary transition-[stroke-dashoffset] duration-700"
          strokeDasharray={c} strokeDashoffset={c - (c * value) / 100}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center font-display text-lg font-semibold">{value}%</span>
    </div>
  );
}
