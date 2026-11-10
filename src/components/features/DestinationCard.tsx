"use client";

import { Clock, Languages, Wifi } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { SaveButton } from "@/components/ui/SaveButton";
import type { Destination } from "@/data/types";
import { useI18n } from "@/i18n/I18nProvider";
import { DestinationArt } from "./DestinationArt";

export function ConnectivityMeter({ value }: { value: number }) {
  const { t } = useI18n();
  return (
    <div className="flex items-center gap-2" title={t.housing.connectivityHint}>
      <div className="h-1.5 w-20 overflow-hidden rounded-full bg-surface-2" role="meter" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100} aria-label={`${t.housing.connectivity} (${t.common.illustrative})`}>
        <div className="h-full rounded-full bg-sky" style={{ width: `${value}%` }} />
      </div>
      <span className="text-xs font-semibold tabular-nums">{value}</span>
    </div>
  );
}

export function DestinationCard({ destination: d }: { destination: Destination }) {
  const { t, l, formatMoney } = useI18n();
  const city = l(d.city);
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-card transition-shadow hover:shadow-lift">
      <div className="relative">
        <DestinationArt palette={d.palette} seed={d.id} />
        <Badge tone="accent" className="absolute left-3 top-3 bg-surface/90">{t.common.demo}</Badge>
        <div className="absolute right-2 top-2 z-10 rounded-xl bg-surface/90"><SaveButton type="destination" id={d.id} label={city} /></div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold">
          <Link href={`/moradia/${d.id}`} className="after:absolute after:inset-0 focus:outline-none">{city}</Link>
        </h3>
        <p className="text-sm text-muted">{l(d.country)}</p>
        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex items-center justify-between gap-2">
            <dt className="text-muted">{t.housing.monthlyCost}</dt>
            <dd className="font-semibold">{formatMoney(d.monthlyCost.min, "USD")}–{formatMoney(d.monthlyCost.max, "USD")}</dd>
          </div>
          <div className="flex items-center justify-between gap-2">
            <dt className="flex items-center gap-1.5 text-muted"><Wifi className="h-3.5 w-3.5" aria-hidden />{t.housing.connectivity}</dt>
            <dd><ConnectivityMeter value={d.connectivity} /></dd>
          </div>
          <div className="flex items-center justify-between gap-2">
            <dt className="flex items-center gap-1.5 text-muted"><Clock className="h-3.5 w-3.5" aria-hidden />{t.housing.timezone}</dt>
            <dd>{d.timezone}</dd>
          </div>
          <div className="flex items-center justify-between gap-2">
            <dt className="flex items-center gap-1.5 text-muted"><Languages className="h-3.5 w-3.5" aria-hidden />{t.housing.languages}</dt>
            <dd>{d.languages.map((x) => t.labels.lang[x]).join(", ")}</dd>
          </div>
        </dl>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {d.housing.map((h) => <Badge key={h}>{t.labels.housingType[h]}</Badge>)}
        </div>
      </div>
    </article>
  );
}
