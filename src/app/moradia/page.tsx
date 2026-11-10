"use client";

import { BedDouble, Building, Coins, Handshake, Home, Laptop, ShieldCheck, Users, Wifi } from "lucide-react";
import { useMemo, useState } from "react";
import { DestinationCard } from "@/components/features/DestinationCard";
import { FilterSelect } from "@/components/features/FilterSelect";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Field";
import { Notice } from "@/components/ui/Notice";
import { PageHeader } from "@/components/ui/PageHeader";
import { CardSkeletonGrid, EmptyState, ErrorState } from "@/components/ui/States";
import { housingTopics, type HousingTopic } from "@/data/content";
import type { HousingType, Region } from "@/data/types";
import { useI18n } from "@/i18n/I18nProvider";
import { useAsync } from "@/lib/useAsync";
import { api } from "@/services";

const topicIcons: Record<HousingTopic["icon"], typeof Home> = {
  coliving: Users, coworking: Laptop, longStay: BedDouble, workExchange: Handshake, temporary: Building,
  internet: Wifi, safety: ShieldCheck, cost: Coins, community: Home,
};
const regions: Region[] = ["brazil", "latam", "europe", "asia"];
const housingTypes: HousingType[] = ["coliving", "longStay", "workExchange", "temporary", "apartment"];
const costSteps = [1000, 1500, 2000, 2500];
const connSteps = [70, 80, 85];

export default function HousingPage() {
  const { t, l, fmt, formatMoney } = useI18n();
  const hs = t.housing;
  const state = useAsync(() => api.destinations.list(), []);
  const [region, setRegion] = useState<Region | "">("");
  const [maxCost, setMaxCost] = useState<string>("");
  const [minConn, setMinConn] = useState<string>("");
  const [type, setType] = useState<HousingType | "">("");
  const [sort, setSort] = useState<"cost" | "connectivity" | "name">("cost");

  const results = useMemo(() => {
    if (state.status !== "success") return [];
    return state.data
      .filter((d) =>
        (!region || d.region === region) &&
        (!maxCost || d.monthlyCost.min <= Number(maxCost)) &&
        (!minConn || d.connectivity >= Number(minConn)) &&
        (!type || d.housing.includes(type)),
      )
      .sort((a, b) =>
        sort === "cost" ? a.monthlyCost.min - b.monthlyCost.min : sort === "connectivity" ? b.connectivity - a.connectivity : l(a.city).localeCompare(l(b.city)),
      );
  }, [state, region, maxCost, minConn, type, sort, l]);

  const clear = () => { setRegion(""); setMaxCost(""); setMinConn(""); setType(""); };
  const active = [region, maxCost, minConn, type].filter(Boolean).length;

  return (
    <div className="container pb-10">
      <PageHeader title={hs.title} subtitle={hs.subtitle} />

      <section aria-labelledby="topics-title">
        <h2 id="topics-title" className="text-lg font-semibold">{hs.topicsTitle}</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {housingTopics.map((topic) => {
            const Icon = topicIcons[topic.icon];
            return (
              <li key={topic.id} className="rounded-2xl border border-border bg-surface p-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent"><Icon className="h-5 w-5" aria-hidden /></span>
                  <h3 className="font-semibold">{l(topic.title)}</h3>
                </div>
                <p className="mt-2 text-sm text-muted">{l(topic.text)}</p>
                <p className="mt-2 border-t border-border pt-2 text-xs"><span className="font-semibold">{t.common.tip}:</span> {l(topic.check)}</p>
              </li>
            );
          })}
        </ul>
      </section>

      <section aria-labelledby="dest-title" className="mt-12">
        <h2 id="dest-title" className="text-lg font-semibold">{hs.destinationsTitle}</h2>
        <p className="text-sm text-muted">{hs.destinationsText}</p>
        <Notice tone="demo" title={t.common.demoData} className="mt-4">{hs.demoNotice}</Notice>

        <form role="search" aria-label={t.common.filters} onSubmit={(e) => e.preventDefault()} className="mt-4 grid gap-3 rounded-2xl border border-border bg-surface p-4 sm:grid-cols-2 lg:grid-cols-5">
          <FilterSelect id="h-region" label={hs.filters.region} value={region} onChange={setRegion} options={regions.map((r) => ({ value: r, label: t.labels.region[r] }))} />
          <FilterSelect id="h-cost" label={hs.filters.maxCost} value={maxCost} onChange={setMaxCost} anyLabel={hs.filters.noLimit} options={costSteps.map((c) => ({ value: String(c), label: formatMoney(c, "USD") }))} />
          <FilterSelect id="h-conn" label={hs.filters.minConnectivity} value={minConn} onChange={setMinConn} options={connSteps.map((c) => ({ value: String(c), label: `${c}+` }))} />
          <FilterSelect id="h-type" label={hs.filters.housingType} value={type} onChange={setType} options={housingTypes.map((h) => ({ value: h, label: t.labels.housingType[h] }))} />
          <div>
            <label htmlFor="h-sort" className="mb-1 block text-xs font-medium text-muted">{t.common.sortBy}</label>
            <Select id="h-sort" value={sort} onChange={(e) => setSort(e.target.value as typeof sort)} className="h-10">
              <option value="cost">{hs.sortCost}</option>
              <option value="connectivity">{hs.sortConnectivity}</option>
              <option value="name">{hs.sortName}</option>
            </Select>
          </div>
        </form>

        <div className="mb-4 mt-4 flex items-center justify-between">
          <p className="text-sm text-muted" aria-live="polite">{state.status === "success" ? fmt(hs.count, { n: results.length }) : t.common.loading}</p>
          {active > 0 && <Button variant="ghost" size="sm" onClick={clear}>{t.common.clearFilters}</Button>}
        </div>

        {state.status === "loading" && <CardSkeletonGrid count={6} />}
        {state.status === "error" && <ErrorState onRetry={state.retry} />}
        {state.status === "success" && (results.length === 0 ? (
          <EmptyState title={hs.emptyTitle} text={hs.emptyText} action={<Button variant="outline" onClick={clear}>{t.common.clearFilters}</Button>} />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{results.map((d) => <DestinationCard key={d.id} destination={d} />)}</div>
        ))}
      </section>
    </div>
  );
}
