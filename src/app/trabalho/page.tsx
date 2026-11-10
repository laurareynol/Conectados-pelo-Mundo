"use client";

import { BookOpen, SlidersHorizontal } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";
import { FilterSelect } from "@/components/features/FilterSelect";
import { JobCard } from "@/components/features/JobCard";
import { Button, LinkButton } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input, Select } from "@/components/ui/Field";
import { Notice } from "@/components/ui/Notice";
import { PageHeader } from "@/components/ui/PageHeader";
import { CardSkeletonGrid, EmptyState, ErrorState } from "@/components/ui/States";
import { monthlyUsd } from "@/data/jobs";
import type { ContractType, JobArea, JobLevel, LanguageCode, Modality, Region, TzGroup } from "@/data/types";
import { useI18n } from "@/i18n/I18nProvider";
import { useAsync } from "@/lib/useAsync";
import { cn, normalize } from "@/lib/utils";
import { api } from "@/services";

const areas: JobArea[] = ["design", "development", "marketing", "data", "support", "education", "product", "writing", "finance"];
const contracts: ContractType[] = ["clt", "pj", "freelancer", "international", "autonomous"];
const langs: LanguageCode[] = ["pt", "en", "es"];
const tzs: TzGroup[] = ["americas", "europeAfrica", "asiaPacific", "flexible"];
const levels: JobLevel[] = ["junior", "mid", "senior"];
const modalities: Modality[] = ["anywhere", "timezone", "async", "country"];
const regions: Region[] = ["brazil", "latam", "northAmerica", "europe", "asia", "global"];

interface Filters { q: string; area: JobArea | ""; contract: ContractType | ""; language: LanguageCode | ""; tz: TzGroup | ""; level: JobLevel | ""; modality: Modality | ""; region: Region | "" }
const empty: Filters = { q: "", area: "", contract: "", language: "", tz: "", level: "", modality: "", region: "" };

function WorkPageInner() {
  const { t, l, fmt } = useI18n();
  const params = useSearchParams();
  const w = t.work;
  const initialContract = params.get("vinculo") as ContractType | null;
  const [filters, setFilters] = useState<Filters>({ ...empty, contract: initialContract && contracts.includes(initialContract) ? initialContract : "" });
  const [sort, setSort] = useState<"recent" | "salary">("recent");
  const [showFilters, setShowFilters] = useState(false);
  const jobsState = useAsync(() => api.jobs.list(), []);

  const set = <K extends keyof Filters>(k: K, v: Filters[K]) => setFilters((f) => ({ ...f, [k]: v }));
  const activeCount = Object.entries(filters).filter(([, v]) => v).length;

  const results = useMemo(() => {
    if (jobsState.status !== "success") return [];
    const q = normalize(filters.q);
    return jobsState.data
      .filter((j) =>
        (!q || normalize(`${l(j.title)} ${j.company}`).includes(q)) &&
        (!filters.area || j.area === filters.area) &&
        (!filters.contract || j.contract === filters.contract) &&
        (!filters.language || j.languages.includes(filters.language)) &&
        (!filters.tz || j.tzGroup === filters.tz) &&
        (!filters.level || j.level === filters.level) &&
        (!filters.modality || j.modality === filters.modality) &&
        (!filters.region || j.region === filters.region || (filters.region !== "global" && j.region === "global")),
      )
      .sort((a, b) => (sort === "salary" ? monthlyUsd(b) - monthlyUsd(a) : b.postedAt.localeCompare(a.postedAt)));
  }, [jobsState, filters, sort, l]);

  const opts = <T extends string>(values: T[], labels: Record<T, string>) => values.map((v) => ({ value: v, label: labels[v] }));

  return (
    <div className="container pb-10">
      <PageHeader title={w.title} subtitle={w.subtitle} />
      <Notice tone="demo" title={t.common.demoData}>{w.demoNotice}</Notice>

      <Card className="mt-4 flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-soft text-sky"><BookOpen className="h-5 w-5" aria-hidden /></span>
          <div>
            <h2 className="font-semibold">{w.guideTitle}</h2>
            <p className="text-sm text-muted">{w.guideText}</p>
          </div>
        </div>
        <LinkButton href="/trabalho/guia" variant="outline">{w.guideCta}</LinkButton>
      </Card>

      <div className="mt-6 grid gap-6 lg:grid-cols-[280px_1fr]">
        <div>
          <Button variant="outline" className="w-full lg:hidden" aria-expanded={showFilters} aria-controls="job-filters" onClick={() => setShowFilters(!showFilters)}>
            <SlidersHorizontal className="h-4 w-4" aria-hidden />
            {showFilters ? t.common.hideFilters : t.common.showFilters}{activeCount > 0 && ` (${activeCount})`}
          </Button>
          <form
            id="job-filters"
            role="search"
            aria-label={t.common.filters}
            onSubmit={(e) => e.preventDefault()}
            className={cn("mt-3 space-y-3 rounded-2xl border border-border bg-surface p-4 lg:sticky lg:top-24 lg:mt-0 lg:block", !showFilters && "hidden")}
          >
            <div>
              <label htmlFor="f-q" className="mb-1 block text-xs font-medium text-muted">{w.filters.keyword}</label>
              <Input id="f-q" value={filters.q} onChange={(e) => set("q", e.target.value)} placeholder={w.filters.keywordPlaceholder} className="h-10" />
            </div>
            <FilterSelect id="f-area" label={w.filters.area} value={filters.area} onChange={(v) => set("area", v)} options={opts(areas, t.labels.area)} />
            <FilterSelect id="f-contract" label={w.filters.contract} value={filters.contract} onChange={(v) => set("contract", v)} options={opts(contracts, t.labels.contract)} />
            <FilterSelect id="f-lang" label={w.filters.language} value={filters.language} onChange={(v) => set("language", v)} options={opts(langs, t.labels.lang)} />
            <FilterSelect id="f-tz" label={w.filters.timezone} value={filters.tz} onChange={(v) => set("tz", v)} options={opts(tzs, t.labels.tzGroup)} />
            <FilterSelect id="f-level" label={w.filters.level} value={filters.level} onChange={(v) => set("level", v)} options={opts(levels, t.labels.level)} />
            <FilterSelect id="f-mod" label={w.filters.modality} value={filters.modality} onChange={(v) => set("modality", v)} options={opts(modalities, t.labels.modality)} />
            <FilterSelect id="f-region" label={w.filters.region} value={filters.region} onChange={(v) => set("region", v)} options={opts(regions, t.labels.region)} />
            <Button variant="ghost" size="sm" className="w-full" onClick={() => setFilters(empty)} disabled={activeCount === 0}>{t.common.clearFilters}</Button>
          </form>
        </div>

        <div className="min-w-0">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted" aria-live="polite">{jobsState.status === "success" ? fmt(w.count, { n: results.length }) : t.common.loading}</p>
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-sm text-muted">{t.common.sortBy}</label>
              <Select id="sort" value={sort} onChange={(e) => setSort(e.target.value as "recent" | "salary")} className="h-9 w-auto">
                <option value="recent">{w.sortRecent}</option>
                <option value="salary">{w.sortSalary}</option>
              </Select>
            </div>
          </div>

          {jobsState.status === "loading" && <CardSkeletonGrid count={4} className="lg:grid-cols-2" />}
          {jobsState.status === "error" && <ErrorState onRetry={jobsState.retry} />}
          {jobsState.status === "success" && (results.length === 0 ? (
            <EmptyState title={w.emptyTitle} text={w.emptyText} action={<Button variant="outline" onClick={() => setFilters(empty)}>{t.common.clearFilters}</Button>} />
          ) : (
            <div className="grid gap-4 md:grid-cols-2">{results.map((j) => <JobCard key={j.id} job={j} />)}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function WorkPage() {
  return <Suspense fallback={<div className="container py-10"><CardSkeletonGrid count={4} /></div>}><WorkPageInner /></Suspense>;
}
