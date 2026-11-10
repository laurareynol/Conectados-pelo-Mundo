"use client";

import { ArrowLeft, ArrowRight, CircleMinus, CirclePlus, Route } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Notice } from "@/components/ui/Notice";
import { PageHeader } from "@/components/ui/PageHeader";
import { SaveButton } from "@/components/ui/SaveButton";
import { workGuides } from "@/data/guides";
import { useI18n } from "@/i18n/I18nProvider";
import { cn } from "@/lib/utils";

const levelDots = { low: 1, medium: 2, high: 3 } as const;

export default function GuidePage() {
  const { t, l } = useI18n();
  const g = t.guide;
  const levelLabel = { low: g.low, medium: g.medium, high: g.high };

  return (
    <div className="container pb-10">
      <Link href="/trabalho" className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-fg"><ArrowLeft className="h-4 w-4" aria-hidden />{t.work.backToList}</Link>
      <PageHeader title={g.title} subtitle={g.subtitle} className="pt-4 sm:pt-4" />
      <Notice tone="warning" title={t.common.important}>{g.disclaimer}</Notice>

      <div className="mt-8 grid gap-8 lg:grid-cols-[220px_1fr]">
        <nav aria-label={g.onThisPage} className="lg:sticky lg:top-24 lg:self-start">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">{g.onThisPage}</p>
          <ul className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
            {workGuides.map((x) => (
              <li key={x.id}><a href={`#${x.id}`} className="block rounded-lg px-3 py-1.5 text-sm hover:bg-surface-2">{l(x.title)}</a></li>
            ))}
            <li><a href="#comparativo" className="block rounded-lg px-3 py-1.5 text-sm hover:bg-surface-2">{g.compareTitle}</a></li>
          </ul>
        </nav>

        <div className="min-w-0 space-y-5">
          {workGuides.map((x) => (
            <Card as="section" key={x.id} id={x.id} aria-labelledby={`${x.id}-t`} className="scroll-mt-24 p-5 sm:p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 id={`${x.id}-t`} className="text-xl font-bold">{l(x.title)}</h2>
                  <p className="mt-1 text-muted">{l(x.summary)}</p>
                </div>
                <SaveButton type="guide" id={x.id} label={l(x.title)} />
              </div>
              <h3 className="mt-5 text-sm font-semibold uppercase tracking-wide text-muted">{g.whatIs}</h3>
              <p className="mt-1.5 leading-relaxed">{l(x.whatIs)}</p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl bg-success-soft p-4">
                  <h3 className="flex items-center gap-1.5 text-sm font-semibold"><CirclePlus className="h-4 w-4 text-success" aria-hidden />{g.pros}</h3>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">{x.pros.map((p, i) => <li key={i}>{l(p)}</li>)}</ul>
                </div>
                <div className="rounded-xl bg-warning-soft p-4">
                  <h3 className="flex items-center gap-1.5 text-sm font-semibold"><CircleMinus className="h-4 w-4 text-warning" aria-hidden />{g.cons}</h3>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">{x.cons.map((p, i) => <li key={i}>{l(p)}</li>)}</ul>
                </div>
              </div>
              <div className="mt-4 flex gap-3 rounded-xl border border-border p-4">
                <Route className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                <div>
                  <h3 className="text-sm font-semibold">{g.forNomads}</h3>
                  <p className="mt-0.5 text-sm text-muted">{l(x.forNomads)}</p>
                </div>
              </div>
              <Link href={`/trabalho?vinculo=${x.contract}`} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
                {g.seeJobs}<ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </Card>
          ))}

          <Card as="section" id="comparativo" aria-labelledby="cmp-t" className="scroll-mt-24 overflow-hidden">
            <h2 id="cmp-t" className="p-5 pb-3 text-xl font-bold">{g.compareTitle}</h2>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[520px] text-sm">
                <thead className="bg-surface-2 text-left">
                  <tr>
                    <th scope="col" className="px-5 py-3 font-semibold">{g.compareModel}</th>
                    <th scope="col" className="px-5 py-3 font-semibold">{g.compareStability}</th>
                    <th scope="col" className="px-5 py-3 font-semibold">{g.compareAutonomy}</th>
                    <th scope="col" className="px-5 py-3 font-semibold">{g.compareBureaucracy}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {workGuides.map((x) => (
                    <tr key={x.id}>
                      <th scope="row" className="px-5 py-3 text-left font-medium">{l(x.title)}</th>
                      {([x.stability, x.autonomy, x.bureaucracy] as const).map((v, i) => (
                        <td key={i} className="px-5 py-3">
                          <span className="inline-flex items-center gap-2">
                            <span className="flex gap-0.5" aria-hidden>
                              {[1, 2, 3].map((n) => <span key={n} className={cn("h-2 w-4 rounded-full", n <= levelDots[v] ? "bg-primary" : "bg-surface-2")} />)}
                            </span>
                            {levelLabel[v]}
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="px-5 py-3 text-xs text-muted">{g.disclaimer}</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
