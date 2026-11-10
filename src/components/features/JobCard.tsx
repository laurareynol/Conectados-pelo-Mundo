"use client";

import { BadgeCheck, Building2, Clock, Globe2, Languages } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { SaveButton } from "@/components/ui/SaveButton";
import type { Job } from "@/data/types";
import { useI18n } from "@/i18n/I18nProvider";
import { cn } from "@/lib/utils";

export function useSalary() {
  const { t, formatMoney } = useI18n();
  return (job: Job) =>
    job.salary
      ? `${formatMoney(job.salary.min, job.salary.currency)} – ${formatMoney(job.salary.max, job.salary.currency)}${t.labels.salaryPeriod[job.salary.period]}`
      : t.work.salaryNA;
}

export function VerifiedBadge() {
  const { t } = useI18n();
  return (
    <Badge tone="success" title={t.common.verifiedHint}>
      <BadgeCheck className="h-3.5 w-3.5" aria-hidden />
      {t.common.verified}
    </Badge>
  );
}

export function JobCard({ job, compact }: { job: Job; compact?: boolean }) {
  const { t, l, formatRelative, fmt } = useI18n();
  const salary = useSalary();
  const title = l(job.title);
  return (
    <article className={cn("group relative flex flex-col rounded-2xl border border-border bg-surface p-5 shadow-card transition-shadow hover:shadow-lift", compact && "p-4")}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="mb-2 flex flex-wrap gap-1.5">
            <Badge tone="sky">{t.labels.contract[job.contract]}</Badge>
            {job.verified && <VerifiedBadge />}
          </div>
          <h3 className="font-semibold leading-snug">
            <Link href={`/trabalho/${job.id}`} className="after:absolute after:inset-0 after:rounded-2xl focus:outline-none">
              {title}
            </Link>
          </h3>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
            <Building2 className="h-3.5 w-3.5 shrink-0" aria-hidden />{job.company}
          </p>
        </div>
        <SaveButton type="job" id={job.id} label={title} className="relative z-10 -mr-1 -mt-1" />
      </div>
      {!compact && (
        <dl className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2 text-sm">
          <div className="flex items-center gap-1.5"><Languages className="h-3.5 w-3.5 text-muted" aria-hidden /><dt className="sr-only">{t.work.language}</dt><dd>{job.languages.map((x) => t.labels.lang[x]).join(", ")}</dd></div>
          <div className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-muted" aria-hidden /><dt className="sr-only">{t.work.timezone}</dt><dd>{job.tzGroup === "flexible" ? t.labels.tzGroup.flexible : job.timezone}</dd></div>
          <div className="flex items-center gap-1.5"><Globe2 className="h-3.5 w-3.5 text-muted" aria-hidden /><dt className="sr-only">{t.work.region}</dt><dd>{t.labels.region[job.region]}</dd></div>
          <div><dt className="sr-only">{t.work.level}</dt><dd className="text-muted">{t.labels.level[job.level]} · {t.labels.area[job.area]}</dd></div>
        </dl>
      )}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-3 text-sm">
        <span className="font-semibold">{salary(job)}</span>
        <span className="text-xs text-muted" suppressHydrationWarning>{fmt(t.work.posted, { date: formatRelative(job.postedAt) })}</span>
      </div>
    </article>
  );
}
