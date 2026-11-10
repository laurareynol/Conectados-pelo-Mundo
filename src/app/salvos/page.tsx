"use client";

import { Bookmark } from "lucide-react";
import { useState } from "react";
import { SavedList, useResolvedSaved } from "@/components/features/SavedList";
import { LinkButton } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyState, Skeleton } from "@/components/ui/States";
import { useI18n } from "@/i18n/I18nProvider";
import { cn } from "@/lib/utils";
import { useStore } from "@/store/AppStore";
import type { SavedType } from "@/store/types";

const types: SavedType[] = ["job", "destination", "post", "guide"];

export default function SavedPage() {
  const { t } = useI18n();
  const { hydrated } = useStore();
  const [tab, setTab] = useState<SavedType | "all">("all");
  const all = useResolvedSaved();
  const items = tab === "all" ? all : all.filter((x) => x.item.type === tab);

  return (
    <div className="container max-w-3xl pb-10">
      <PageHeader title={t.saved.title} subtitle={t.saved.subtitle} />
      <div role="tablist" aria-label={t.common.filters} className="flex gap-2 overflow-x-auto pb-1">
        {(["all", ...types] as const).map((x) => {
          const count = x === "all" ? all.length : all.filter((i) => i.item.type === x).length;
          return (
            <button key={x} role="tab" type="button" aria-selected={tab === x} onClick={() => setTab(x)}
              className={cn("whitespace-nowrap rounded-full border px-4 py-1.5 text-sm font-medium", tab === x ? "border-primary bg-primary-soft text-primary" : "border-border hover:bg-surface-2")}>
              {x === "all" ? t.common.all : t.labels.savedType[x]} <span className="text-muted">({count})</span>
            </button>
          );
        })}
      </div>
      <div className="mt-4">
        {!hydrated ? (
          <Skeleton className="h-48" />
        ) : items.length === 0 ? (
          <EmptyState icon={<Bookmark className="h-6 w-6" />} title={t.saved.emptyTitle} text={t.saved.emptyText} action={<LinkButton href="/trabalho">{t.saved.explore}</LinkButton>} />
        ) : (
          <Card className="px-5 py-2"><SavedList items={items} /></Card>
        )}
      </div>
    </div>
  );
}
