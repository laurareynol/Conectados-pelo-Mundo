"use client";

import { CheckCircle2, Info, TriangleAlert, X } from "lucide-react";
import { createContext, useCallback, useContext, useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { cn } from "@/lib/utils";

type ToastTone = "success" | "info" | "error";
interface ToastItem { id: number; message: string; tone: ToastTone }

const ToastContext = createContext<{ toast: (message: string, tone?: ToastTone) => void } | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const { t } = useI18n();
  const [items, setItems] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: number) => setItems((xs) => xs.filter((x) => x.id !== id)), []);
  const toast = useCallback((message: string, tone: ToastTone = "success") => {
    const id = Date.now() + Math.random();
    setItems((xs) => [...xs.slice(-2), { id, message, tone }]);
    setTimeout(() => dismiss(id), 4200);
  }, [dismiss]);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div aria-live="polite" role="status" className="pointer-events-none fixed inset-x-0 bottom-20 z-[90] flex flex-col items-center gap-2 px-4 lg:bottom-6 lg:items-end lg:pr-6">
        {items.map((item) => {
          const Icon = item.tone === "success" ? CheckCircle2 : item.tone === "error" ? TriangleAlert : Info;
          return (
            <div
              key={item.id}
              className={cn(
                "pointer-events-auto flex w-full max-w-sm animate-fade-in items-start gap-3 rounded-xl border bg-surface p-3.5 text-sm shadow-lift",
                item.tone === "error" ? "border-danger/40" : "border-border",
              )}
            >
              <Icon className={cn("mt-0.5 h-5 w-5 shrink-0", item.tone === "success" ? "text-success" : item.tone === "error" ? "text-danger" : "text-sky")} aria-hidden />
              <p className="flex-1">{item.message}</p>
              <button type="button" onClick={() => dismiss(item.id)} className="text-muted hover:text-fg" aria-label={t.common.close}>
                <X className="h-4 w-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast deve ser usado dentro de <ToastProvider>");
  return ctx.toast;
}
