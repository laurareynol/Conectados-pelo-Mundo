"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/i18n/I18nProvider";
import { cn } from "@/lib/utils";
import { isActive, navItems } from "./nav";

/** Barra de navegação inferior para telas pequenas. */
export function MobileNav() {
  const { t } = useI18n();
  const pathname = usePathname();
  const items = navItems(t).filter((i) => i.href !== "/moradia");
  return (
    <nav aria-label={t.nav.mobileNav} className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
      <ul className="grid grid-cols-5">
        {items.map(({ href, label, icon: Icon }) => {
          const active = isActive(pathname, href);
          return (
            <li key={href}>
              <Link href={href} aria-current={active ? "page" : undefined} className={cn("flex flex-col items-center gap-0.5 py-2 text-[11px] font-medium", active ? "text-primary" : "text-muted")}>
                <span className={cn("flex h-7 w-12 items-center justify-center rounded-full", active && "bg-primary-soft")}>
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <span className="max-w-full truncate px-1">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
