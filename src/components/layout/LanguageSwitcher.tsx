"use client";

import { Languages } from "lucide-react";
import { locales, localeMeta, type Locale } from "@/i18n/config";
import { useI18n } from "@/i18n/I18nProvider";
import { dictionaries } from "@/i18n/dictionaries";
import { cn } from "@/lib/utils";
import { useToast } from "../ui/Toast";

export function LanguageSwitcher({ variant = "compact" }: { variant?: "compact" | "full" }) {
  const { locale, setLocale, t } = useI18n();
  const toast = useToast();
  const change = (l: Locale) => {
    if (l === locale) return;
    setLocale(l);
    toast(dictionaries[l].language.changed, "info");
  };

  if (variant === "full") {
    return (
      <fieldset>
        <legend className="mb-2 text-sm font-medium">{t.language.label}</legend>
        <div className="grid grid-cols-3 gap-2">
          {locales.map((l) => (
            <button
              key={l}
              type="button"
              lang={localeMeta[l].htmlLang}
              aria-pressed={l === locale}
              onClick={() => change(l)}
              className={cn("rounded-xl border px-3 py-2 text-sm", l === locale ? "border-primary bg-primary-soft font-semibold text-primary" : "border-border hover:bg-surface-2")}
            >
              {localeMeta[l].label}
            </button>
          ))}
        </div>
      </fieldset>
    );
  }

  return (
    <div className="relative flex items-center">
      <Languages className="pointer-events-none absolute left-2.5 h-4 w-4 text-muted" aria-hidden />
      <label htmlFor="lang-select" className="sr-only">{t.language.label}</label>
      <select
        id="lang-select"
        value={locale}
        onChange={(e) => change(e.target.value as Locale)}
        className="h-10 cursor-pointer appearance-none rounded-xl border border-transparent bg-transparent pl-8 pr-2 text-sm font-medium hover:bg-surface-2 focus:border-primary focus:outline-none"
      >
        {locales.map((l) => (
          <option key={l} value={l} lang={localeMeta[l].htmlLang}>
            {localeMeta[l].short} · {localeMeta[l].label}
          </option>
        ))}
      </select>
    </div>
  );
}
