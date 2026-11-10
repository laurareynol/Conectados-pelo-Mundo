"use client";

import { Briefcase, FileText, ListChecks, MapPin, MessageCircle, Navigation, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { globalSearch, type SearchGroup } from "@/lib/search";
import { useStore } from "@/store/AppStore";
import { Modal } from "../ui/Modal";

export const groupIcons: Record<SearchGroup, typeof Search> = {
  pages: Navigation, jobs: Briefcase, destinations: MapPin, posts: MessageCircle, guides: FileText, tasks: ListChecks,
};
export const groupOrder: SearchGroup[] = ["pages", "jobs", "destinations", "posts", "guides", "tasks"];

export function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t, fmt, locale } = useI18n();
  const { state } = useStore();
  const router = useRouter();
  const [q, setQ] = useState("");

  useEffect(() => { if (!open) setQ(""); }, [open]);

  const results = useMemo(
    () => globalSearch(q, { locale, t, userPosts: state.userPosts, planner: state.planner }),
    [q, locale, t, state.userPosts, state.planner],
  );

  const grouped = groupOrder
    .map((g) => ({ group: g, items: results.filter((r) => r.group === g).slice(0, 4) }))
    .filter((g) => g.items.length);

  return (
    <Modal open={open} onClose={onClose} title={t.search.title} closeLabel={t.common.close} size="lg" position="top">
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          if (q.trim().length >= 2) { router.push(`/busca?q=${encodeURIComponent(q.trim())}`); onClose(); }
        }}
      >
        <label htmlFor="global-search" className="sr-only">{t.search.placeholder}</label>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" aria-hidden />
          <input
            id="global-search"
            data-autofocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t.search.placeholder}
            autoComplete="off"
            className="h-12 w-full rounded-xl border border-border bg-surface-2 pl-11 pr-3 text-base focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25"
          />
        </div>
      </form>

      <div className="mt-4 min-h-[120px]" aria-live="polite">
        {q.trim().length < 2 ? (
          <p className="py-6 text-center text-sm text-muted">{t.search.hint}</p>
        ) : grouped.length === 0 ? (
          <div className="py-6 text-center">
            <p className="font-medium">{fmt(t.search.noResults, { q })}</p>
            <p className="mt-1 text-sm text-muted">{t.search.noResultsHint}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {grouped.map(({ group, items }) => {
              const Icon = groupIcons[group];
              return (
                <section key={group} aria-label={t.search.groups[group]}>
                  <h3 className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-muted">{t.search.groups[group]}</h3>
                  <ul className="space-y-1">
                    {items.map((r) => (
                      <li key={`${r.group}-${r.id}`}>
                        <Link href={r.href} onClick={onClose} className="flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-surface-2">
                          <Icon className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm font-medium">{r.title}</span>
                            {r.subtitle && <span className="block truncate text-xs text-muted">{r.subtitle}</span>}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}
            <Link href={`/busca?q=${encodeURIComponent(q.trim())}`} onClick={onClose} className="block rounded-xl border border-border px-3 py-2.5 text-center text-sm font-medium text-primary hover:bg-surface-2">
              {t.search.viewAll} ({results.length})
            </Link>
          </div>
        )}
      </div>
    </Modal>
  );
}
