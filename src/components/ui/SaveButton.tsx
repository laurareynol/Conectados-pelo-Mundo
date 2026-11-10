"use client";

import { Bookmark, BookmarkCheck } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import { cn } from "@/lib/utils";
import { useStore } from "@/store/AppStore";
import type { SavedType } from "@/store/types";
import { useToast } from "./Toast";

/** Botão de salvar/remover dos favoritos com feedback visual. */
export function SaveButton({ type, id, label, withText, className }: { type: SavedType; id: string; label: string; withText?: boolean; className?: string }) {
  const { t } = useI18n();
  const { isSaved, toggleSaved } = useStore();
  const toast = useToast();
  const saved = isSaved(type, id);
  const Icon = saved ? BookmarkCheck : Bookmark;
  const a11y = saved ? `${t.common.removeSaved}: ${label}` : `${t.common.saveItem}: ${label}`;

  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={a11y}
      title={saved ? t.common.removeSaved : t.common.saveItem}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        const nowSaved = toggleSaved(type, id);
        toast(nowSaved ? t.common.savedToast : t.common.removedToast, nowSaved ? "success" : "info");
      }}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-xl text-sm font-medium transition-colors",
        withText ? "h-10 border border-border px-3" : "h-9 w-9 justify-center",
        saved ? "bg-primary-soft text-primary" : "text-muted hover:bg-surface-2 hover:text-fg",
        className,
      )}
    >
      <Icon className={cn("h-[18px] w-[18px]", saved && "fill-primary/20")} aria-hidden />
      {withText && <span>{saved ? t.common.saved : t.common.save}</span>}
    </button>
  );
}
