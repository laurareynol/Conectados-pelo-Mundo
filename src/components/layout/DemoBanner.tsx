"use client";

import { FlaskConical, X } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import { useStore } from "@/store/AppStore";

export function DemoBanner() {
  const { t } = useI18n();
  const { state, hydrated, dismissBanner } = useStore();
  if (!hydrated || state.prefs.bannerDismissed) return null;
  return (
    <div className="border-b border-accent/20 bg-accent-soft text-sm">
      <div className="container flex items-center gap-3 py-2">
        <FlaskConical className="h-4 w-4 shrink-0 text-accent" aria-hidden />
        <p className="flex-1 text-fg/90">{t.banner.text}</p>
        <button type="button" onClick={dismissBanner} className="rounded-lg p-1 text-muted hover:bg-surface hover:text-fg" aria-label={t.banner.dismiss}>
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
