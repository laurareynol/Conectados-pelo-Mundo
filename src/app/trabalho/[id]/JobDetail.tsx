"use client";

import { ArrowLeft, Building2, CheckCircle2, ExternalLink, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { JobCard, useSalary, VerifiedBadge } from "@/components/features/JobCard";
import { Badge } from "@/components/ui/Badge";
import { buttonClass, LinkButton } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Notice } from "@/components/ui/Notice";
import { SaveButton } from "@/components/ui/SaveButton";
import { EmptyState, ErrorState, Skeleton } from "@/components/ui/States";
import { jobs } from "@/data/jobs";
import { useI18n } from "@/i18n/I18nProvider";
import { useAsync } from "@/lib/useAsync";
import { api } from "@/services";

export function JobDetail({ id }: { id: string }) {
  const { t, l, fmt, formatDate } = useI18n();
  const w = t.work;
  const salary = useSalary();
  const state = useAsync(() => api.jobs.get(id), [id]);

  return (
    <div className="container max-w-5xl py-8">
      <Link href="/trabalho" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-fg">
        <ArrowLeft className="h-4 w-4" aria-hidden />{w.backToList}
      </Link>

      {state.status === "loading" && (
        <div className="mt-6 space-y-4" aria-busy="true"><span className="sr-only">{t.common.loading}</span><Skeleton className="h-10 w-2/3" /><Skeleton className="h-5 w-1/3" /><Skeleton className="h-48" /></div>
      )}
      {state.status === "error" && <div className="mt-6"><ErrorState onRetry={state.retry} /></div>}
      {state.status === "success" && !state.data && (
        <EmptyState className="mt-6" title={w.notFound} text={w.notFoundText} action={<LinkButton href="/trabalho">{w.backToList}</LinkButton>} />
      )}
      {state.status === "success" && state.data && (() => {
        const job = state.data;
        const title = l(job.title);
        const similar = jobs.filter((j) => j.id !== job.id && (j.area === job.area || j.contract === job.contract)).slice(0, 2);
        const details: [string, string][] = [
          [w.contract, t.labels.contract[job.contract]],
          [w.area, t.labels.area[job.area]],
          [w.language, job.languages.map((x) => t.labels.lang[x]).join(", ")],
          [w.salary, salary(job)],
          [w.level, t.labels.level[job.level]],
          [w.timezone, job.tzGroup === "flexible" ? t.labels.tzGroup.flexible : job.timezone],
          [w.region, t.labels.region[job.region]],
          [w.modality, t.labels.modality[job.modality]],
        ];
        return (
          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
            <div className="min-w-0">
              <div className="flex flex-wrap gap-1.5">
                <Badge tone="sky">{t.labels.contract[job.contract]}</Badge>
                {job.verified && <VerifiedBadge />}
                <Badge tone="accent">{t.common.demo}</Badge>
              </div>
              <h1 className="mt-3 text-2xl font-bold sm:text-3xl">{title}</h1>
              <p className="mt-2 flex items-center gap-2 text-muted"><Building2 className="h-4 w-4" aria-hidden />{job.company} <span className="text-xs">({w.exampleCompany})</span></p>
              <p className="mt-1 text-sm text-muted">{fmt(w.posted, { date: formatDate(job.postedAt) })}</p>

              <Card as="section" aria-labelledby="about" className="mt-6 p-5">
                <h2 id="about" className="font-semibold">{w.about}</h2>
                <p className="mt-2 leading-relaxed text-muted">{l(job.description)}</p>
                <h3 className="mt-5 font-semibold">{w.requirements}</h3>
                <ul className="mt-2 space-y-2">
                  {job.requirements.map((r, i) => (
                    <li key={i} className="flex gap-2 text-sm"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />{l(r)}</li>
                  ))}
                </ul>
              </Card>

              <Notice tone="safety" title={w.safetyTitle} className="mt-4" action={<Link href="/seguranca#vagas-suspeitas" className="text-sm font-semibold text-primary hover:underline">{w.safetyLink}</Link>}>
                {w.safetyText}
              </Notice>

              {similar.length > 0 && (
                <section aria-labelledby="similar" className="mt-8">
                  <h2 id="similar" className="mb-3 text-lg font-semibold">{w.similar}</h2>
                  <div className="grid gap-4 sm:grid-cols-2">{similar.map((j) => <JobCard key={j.id} job={j} />)}</div>
                </section>
              )}
            </div>

            <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
              <Card className="p-5">
                <h2 className="font-semibold">{w.details}</h2>
                <dl className="mt-3 divide-y divide-border text-sm">
                  {details.map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-3 py-2"><dt className="text-muted">{k}</dt><dd className="text-right font-medium">{v}</dd></div>
                  ))}
                </dl>
                <a href={job.url} target="_blank" rel="noopener noreferrer" className={buttonClass("primary", "md", "mt-4 w-full")}>
                  {w.apply}<ExternalLink className="h-4 w-4" aria-hidden /><span className="sr-only">{t.common.opensNewTab}</span>
                </a>
                <p className="mt-2 flex gap-1.5 text-xs text-muted"><ShieldAlert className="h-3.5 w-3.5 shrink-0" aria-hidden />{w.applyNote}</p>
                <div className="mt-3"><SaveButton type="job" id={job.id} label={title} withText className="w-full justify-center" /></div>
              </Card>
            </aside>
          </div>
        );
      })()}
    </div>
  );
}
