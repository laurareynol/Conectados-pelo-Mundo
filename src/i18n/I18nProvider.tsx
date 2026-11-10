"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { defaultLocale, isLocale, localeMeta, type Locale } from "./config";
import { dictionaries, type Dictionary } from "./dictionaries";
import { fmt } from "./format";
import type { Localized } from "@/data/types";
import { storage } from "@/lib/storage";

interface I18nValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Dictionary;
  /** Resolve um conteúdo `Localized` no idioma atual, com fallback para português. */
  l: (value: Localized | undefined) => string;
  fmt: typeof fmt;
  formatDate: (iso: string, opts?: Intl.DateTimeFormatOptions) => string;
  formatRelative: (iso: string) => string;
  formatMoney: (value: number, currency: string) => string;
  formatList: (items: string[]) => string;
}

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  useEffect(() => {
    const stored = storage.get<string | null>("locale", null);
    if (isLocale(stored)) setLocaleState(stored);
    else {
      // Português é o idioma inicial; a escolha do usuário é respeitada depois.
      setLocaleState(defaultLocale);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = localeMeta[locale].htmlLang;
  }, [locale]);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    storage.set("locale", l);
  }, []);

  const value = useMemo<I18nValue>(() => {
    const intl = localeMeta[locale].intl;
    const rtf = new Intl.RelativeTimeFormat(intl, { numeric: "auto" });
    return {
      locale,
      setLocale,
      t: dictionaries[locale],
      fmt,
      l: (v) => (v ? v[locale] ?? v.pt : ""),
      formatDate: (iso, opts) =>
        new Intl.DateTimeFormat(intl, opts ?? { day: "2-digit", month: "short", year: "numeric" }).format(new Date(iso)),
      formatRelative: (iso) => {
        const diff = (new Date(iso).getTime() - Date.now()) / 1000;
        const abs = Math.abs(diff);
        if (abs < 60) return dictionaries[locale].time.justNow;
        const units: [Intl.RelativeTimeFormatUnit, number][] = [
          ["minute", 60], ["hour", 3600], ["day", 86400], ["week", 604800], ["month", 2592000], ["year", 31536000],
        ];
        let unit: Intl.RelativeTimeFormatUnit = "minute";
        let size = 60;
        for (const [u, s] of units) if (abs >= s) { unit = u; size = s; }
        return rtf.format(Math.round(diff / size), unit);
      },
      formatMoney: (n, currency) =>
        new Intl.NumberFormat(intl, { style: "currency", currency, maximumFractionDigits: 0 }).format(n),
      formatList: (items) => new Intl.ListFormat(intl, { style: "long", type: "conjunction" }).format(items),
    };
  }, [locale, setLocale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n deve ser usado dentro de <I18nProvider>");
  return ctx;
}
