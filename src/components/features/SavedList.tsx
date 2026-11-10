"use client";

import { Briefcase, FileText, MapPin, MessageCircle } from "lucide-react";
import Link from "next/link";
import { getDestination } from "@/data/destinations";
import { workGuides } from "@/data/guides";
import { getJob } from "@/data/jobs";
import { useI18n } from "@/i18n/I18nProvider";
import { useFeed } from "@/lib/community";
import { useStore } from "@/store/AppStore";
import type { SavedItem, SavedType } from "@/store/types";
import { SaveButton } from "../ui/SaveButton";

const icons: Record<SavedType, typeof Briefcase> = { job: Briefcase, destination: MapPin, post: MessageCircle, guide: FileText };

export interface ResolvedSaved { item: SavedItem; title: string; subtitle: string; href: string }

/** Converte itens salvos (tipo + id) em título e link. Itens inexistentes são ignorados. */
export function useResolvedSaved(filter?: SavedType): ResolvedSaved[] {
  const { state } = useStore();
  const { t, l } = useI18n();
  const feed = useFeed();
  return state.saved
    .filter((s) => !filter || s.type === filter)
    .map((item): ResolvedSaved | null => {
      if (item.type === "job") {
        const j = getJob(item.id);
        return j ? { item, title: l(j.title), subtitle: j.company, href: `/trabalho/${j.id}` } : null;
      }
      if (item.type === "destination") {
        const d = getDestination(item.id);
        return d ? { item, title: l(d.city), subtitle: l(d.country), href: `/moradia/${d.id}` } : null;
      }
      if (item.type === "post") {
        const p = feed.find((x) => x.id === item.id);
        return p ? { item, title: p.title, subtitle: t.labels.postCategory[p.category], href: `/comunidade?post=${p.id}` } : null;
      }
      const g = workGuides.find((x) => x.id === item.id);
      return g ? { item, title: l(g.title), subtitle: t.nav.guide, href: `/trabalho/guia#${g.id}` } : null;
    })
    .filter((x): x is ResolvedSaved => x !== null);
}

export function SavedList({ items, limit }: { items: ResolvedSaved[]; limit?: number }) {
  const { t } = useI18n();
  return (
    <ul className="divide-y divide-border">
      {items.slice(0, limit ?? items.length).map(({ item, title, subtitle, href }) => {
        const Icon = icons[item.type];
        return (
          <li key={`${item.type}-${item.id}`} className="flex items-center gap-3 py-2.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-surface-2 text-primary"><Icon className="h-4 w-4" aria-hidden /></span>
            <Link href={href} className="min-w-0 flex-1 hover:underline">
              <span className="block truncate text-sm font-medium">{title}</span>
              <span className="block truncate text-xs text-muted">{t.labels.savedType[item.type]} · {subtitle}</span>
            </Link>
            <SaveButton type={item.type} id={item.id} label={title} />
          </li>
        );
      })}
    </ul>
  );
}
