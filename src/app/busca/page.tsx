"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import { groupIcons, groupOrder } from "@/components/layout/SearchDialog";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Field";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyState, Skeleton } from "@/components/ui/States";
import { useI18n } from "@/i18n/I18nProvider";
import { globalSearch } from "@/lib/search";
import { useStore } from "@/store/AppStore";

function SearchInner() {
  const { t, fmt, locale } = useI18n();
  const { state } = useStore();
  const params = useSearchParams();
  const router = useRouter();
  const q = params.get("q") ?? "";
  const [value, setValue] = useState(q);
  useEffect(() => setValue(q), [q]);

  const results = useMemo(() => globalSearch(q, { locale, t, userPosts: state.userPosts, planner: state.planner }), [q, locale, t, state.userPosts, state.planner]);
  const groups = groupOrder.map((g) => ({ g, items: results.filter((r) => r.group === g) })).filter((x) => x.items.length);

  return (
    <div className="container max-w-3xl pb-10">
      <PageHeader title={q ? fmt(t.search.resultsFor, { q }) : t.search.title} subtitle={q ? fmt(t.common.results, { n: results.length }) : t.search.hint} />
      <form role="search" onSubmit={(e) => { e.preventDefault(); router.push(`/busca?q=${encodeURIComponent(value.trim())}`); }} className="flex gap-2">
        <label htmlFor="search-page" className="sr-only">{t.search.placeholder}</label>
        <Input id="search-page" value={value} onChange={(e) => setValue(e.target.value)} placeholder={t.search.placeholder} />
        <Button type="submit"><Search className="h-4 w-4" aria-hidden />{t.common.search}</Button>
      </form>
      <p className="mt-2 text-xs text-muted">{t.search.shortcut}</p>

      <div className="mt-6 space-y-6">
        {q.trim().length >= 2 && groups.length === 0 && <EmptyState title={fmt(t.search.noResults, { q })} text={t.search.noResultsHint} />}
        {groups.map(({ g, items }) => {
          const Icon = groupIcons[g];
          return (
            <section key={g} aria-labelledby={`g-${g}`}>
              <h2 id={`g-${g}`} className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted">{t.search.groups[g]} ({items.length})</h2>
              <Card className="divide-y divide-border">
                {items.map((r) => (
                  <Link key={`${r.group}-${r.id}`} href={r.href} className="flex items-center gap-3 px-4 py-3 hover:bg-surface-2">
                    <Icon className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                    <span className="min-w-0"><span className="block truncate text-sm font-medium">{r.title}</span>{r.subtitle && <span className="block truncate text-xs text-muted">{r.subtitle}</span>}</span>
                  </Link>
                ))}
              </Card>
            </section>
          );
        })}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return <Suspense fallback={<div className="container py-10"><Skeleton className="h-48" /></div>}><SearchInner /></Suspense>;
}
