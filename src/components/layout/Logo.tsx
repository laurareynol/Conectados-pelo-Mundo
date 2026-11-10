import Link from "next/link";

/** Marca: dois percursos que se cruzam e um ponto de encontro — conexão e movimento. */
export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <rect width="32" height="32" rx="9" className="fill-primary" />
      <path d="M8 21c3-8 9-11 16-10" className="stroke-primary-fg" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <path d="M8 13c4 1 7 4 9 9" className="stroke-primary-fg/60" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <circle cx="24" cy="11" r="3" className="fill-accent" />
    </svg>
  );
}

export function Logo({ label }: { label: string }) {
  return (
    <Link href="/" className="flex items-center gap-2.5 rounded-lg" aria-label={label}>
      <LogoMark />
      <span className="font-display text-[15px] font-bold leading-tight tracking-tight">
        Conectados<span className="block text-xs font-medium text-muted">pelo Mundo</span>
      </span>
    </Link>
  );
}
