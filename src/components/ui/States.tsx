"use client";

import { AlertTriangle, Inbox } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n/I18nProvider";
import { Button } from "./Button";

export function EmptyState({ title, text, action, icon, className }: { title: string; text?: string; action?: React.ReactNode; icon?: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex flex-col items-center rounded-2xl border border-dashed border-border bg-surface/60 px-6 py-12 text-center", className)}>
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-2 text-muted" aria-hidden>
        {icon ?? <Inbox className="h-6 w-6" />}
      </div>
      <h3 className="text-base font-semibold">{title}</h3>
      {text && <p className="mt-1 max-w-sm text-sm text-muted">{text}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function ErrorState({ onRetry, title, text }: { onRetry?: () => void; title?: string; text?: string }) {
  const { t } = useI18n();
  return (
    <div role="alert" className="flex flex-col items-center rounded-2xl border border-danger/30 bg-danger-soft px-6 py-10 text-center">
      <AlertTriangle className="mb-3 h-7 w-7 text-danger" aria-hidden />
      <h3 className="font-semibold">{title ?? t.common.errorTitle}</h3>
      <p className="mt-1 max-w-sm text-sm text-muted">{text ?? t.common.errorText}</p>
      {onRetry && (
        <Button variant="outline" size="sm" className="mt-4" onClick={onRetry}>
          {t.common.retry}
        </Button>
      )}
    </div>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("relative overflow-hidden rounded-xl bg-surface-2", "after:absolute after:inset-0 after:-translate-x-full after:animate-[shimmer_1.4s_infinite] after:bg-gradient-to-r after:from-transparent after:via-white/40 after:to-transparent dark:after:via-white/5", className)} />;
}

export function CardSkeletonGrid({ count = 6, className }: { count?: number; className?: string }) {
  const { t } = useI18n();
  return (
    <div className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-3", className)} aria-busy="true" aria-live="polite">
      <span className="sr-only">{t.common.loading}</span>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="space-y-3 rounded-2xl border border-border bg-surface p-5">
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-16 w-full" />
          <div className="flex gap-2"><Skeleton className="h-6 w-16" /><Skeleton className="h-6 w-20" /></div>
        </div>
      ))}
    </div>
  );
}
