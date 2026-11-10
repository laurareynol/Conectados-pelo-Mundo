"use client";

import { Moon, Sun } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const { t } = useI18n();
  const label = theme === "dark" ? t.theme.light : t.theme.dark;
  return (
    <button type="button" onClick={toggle} aria-label={`${t.theme.toggle}: ${label}`} title={label} className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-muted hover:bg-surface-2 hover:text-fg">
      {theme === "dark" ? <Sun className="h-5 w-5" aria-hidden /> : <Moon className="h-5 w-5" aria-hidden />}
    </button>
  );
}
