"use client";

import { Bookmark, Menu, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { cn } from "@/lib/utils";
import { useStore } from "@/store/AppStore";
import { Avatar } from "../ui/Avatar";
import { Modal } from "../ui/Modal";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Logo } from "./Logo";
import { isActive, navItems, secondaryNav } from "./nav";
import { SearchDialog } from "./SearchDialog";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const { t } = useI18n();
  const { state } = useStore();
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setSearchOpen(true); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  const profile = state.profile;

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-bg/85 backdrop-blur-md">
      <div className="container flex h-16 items-center gap-4">
        <Logo label={`${t.common.appName} — ${t.nav.home}`} />

        <nav aria-label={t.nav.mainNav} className="ml-4 hidden flex-1 lg:block">
          <ul className="flex items-center gap-1">
            {navItems(t).map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                  className={cn(
                    "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive(pathname, item.href) ? "bg-primary-soft text-primary" : "text-muted hover:bg-surface-2 hover:text-fg",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="hidden h-10 items-center gap-2 rounded-xl border border-border bg-surface px-3 text-sm text-muted hover:text-fg md:inline-flex"
            aria-label={t.search.open}
          >
            <Search className="h-4 w-4" aria-hidden />
            <span className="hidden xl:inline">{t.common.search}</span>
            <kbd className="hidden rounded border border-border px-1.5 text-[11px] xl:inline">Ctrl K</kbd>
          </button>
          <button type="button" onClick={() => setSearchOpen(true)} className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-muted hover:bg-surface-2 md:hidden" aria-label={t.search.open}>
            <Search className="h-5 w-5" aria-hidden />
          </button>
          <div className="hidden sm:block"><LanguageSwitcher /></div>
          <ThemeToggle />
          <Link href="/salvos" className="relative hidden h-10 w-10 items-center justify-center rounded-xl text-muted hover:bg-surface-2 hover:text-fg sm:inline-flex" aria-label={`${t.nav.saved} (${state.saved.length})`} title={t.nav.saved}>
            <Bookmark className="h-5 w-5" aria-hidden />
            {state.saved.length > 0 && (
              <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-accent-fg" aria-hidden>
                {state.saved.length}
              </span>
            )}
          </Link>
          <Link href="/perfil" className="hidden rounded-full sm:block" aria-label={t.nav.profile} title={t.nav.profile}>
            <Avatar name={profile?.name || t.common.you} color={profile?.avatarColor ?? "#6B7280"} src={profile?.avatar} size="sm" />
          </Link>
          <button type="button" onClick={() => setMenuOpen(true)} className="inline-flex h-10 w-10 items-center justify-center rounded-xl hover:bg-surface-2 lg:hidden" aria-label={t.nav.menu} aria-expanded={menuOpen}>
            <Menu className="h-5 w-5" aria-hidden />
          </button>
        </div>
      </div>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />

      <Modal open={menuOpen} onClose={() => setMenuOpen(false)} title={t.nav.menu} closeLabel={t.common.close} size="sm" position="top">
        <nav aria-label={t.nav.mainNav}>
          <ul className="space-y-1">
            {[{ href: "/", label: t.nav.home, icon: null }, ...navItems(t), ...secondaryNav(t)].map((item) => {
              const Icon = item.icon;
              const active = item.href === "/" ? pathname === "/" : isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link href={item.href} aria-current={active ? "page" : undefined} className={cn("flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium", active ? "bg-primary-soft text-primary" : "hover:bg-surface-2")}>
                    {Icon ? <Icon className="h-5 w-5" aria-hidden /> : <span className="h-5 w-5" />}
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="mt-4 border-t border-border pt-4"><LanguageSwitcher variant="full" /></div>
      </Modal>
    </header>
  );
}
