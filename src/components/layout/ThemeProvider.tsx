"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { storage } from "@/lib/storage";

type Theme = "light" | "dark";
const ThemeContext = createContext<{ theme: Theme; toggle: () => void } | null>(null);

/** Script executado antes da pintura para evitar "piscar" de tema. */
export const themeScript = `(function(){try{var t=JSON.parse(localStorage.getItem('cpm:v1:theme')||'null');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}if(t==='dark')document.documentElement.classList.add('dark')}catch(e){}})();`;

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
  }, []);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      document.documentElement.classList.toggle("dark", next === "dark");
      storage.set("theme", next);
      return next;
    });
  }, []);

  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme deve ser usado dentro de <ThemeProvider>");
  return ctx;
}
