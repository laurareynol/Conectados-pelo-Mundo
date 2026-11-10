/* eslint-disable @next/next/no-img-element */
import { cn, initials } from "@/lib/utils";

const sizes = { sm: "h-8 w-8 text-xs", md: "h-10 w-10 text-sm", lg: "h-14 w-14 text-lg", xl: "h-24 w-24 text-2xl" };

export function Avatar({ name, color, src, size = "md", className }: { name: string; color?: string; src?: string; size?: keyof typeof sizes; className?: string }) {
  if (src) {
    return <img src={src} alt={name} className={cn("shrink-0 rounded-full object-cover", sizes[size], className)} />;
  }
  return (
    <span
      role="img"
      aria-label={name}
      className={cn("inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-white", sizes[size], className)}
      style={{ backgroundColor: color ?? "#0E5E63" }}
    >
      <span aria-hidden>{initials(name)}</span>
    </span>
  );
}
