"use client";

import { ArrowLeft, CircleMinus, CirclePlus, Clock, Coins, Languages, Laptop, ListPlus, ShieldCheck, Wifi } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { DestinationArt } from "@/components/features/DestinationArt";
import { ConnectivityMeter } from "@/components/features/DestinationCard";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button, LinkButton } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Field, Textarea } from "@/components/ui/Field";
import { Notice } from "@/components/ui/Notice";
import { SaveButton } from "@/components/ui/SaveButton";
import { EmptyState, ErrorState, Skeleton } from "@/components/ui/States";
import { useToast } from "@/components/ui/Toast";
import type { Destination } from "@/data/types";
import { useI18n } from "@/i18n/I18nProvider";
import { resolveAuthor, useFeed } from "@/lib/community";
import { useAsync } from "@/lib/useAsync";
import { cn } from "@/lib/utils";
import { api } from "@/services";
import { useStore } from "@/store/AppStore";

export function DestinationDetail({ id }: { id: string }) {
  const { t } = useI18n();
  const state = useAsync(() => api.destinations.get(id), [id]);
  return (
    <div className="container max-w-6xl py-8">
      <Link href="/moradia" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-fg"><ArrowLeft className="h-4 w-4" aria-hidden />{t.housing.backToList}</Link>
      {state.status === "loading" && <div className="mt-6 space-y-4" aria-busy="true"><span className="sr-only">{t.common.loading}</span><Skeleton className="h-40" /><Skeleton className="h-10 w-1/2" /><Skeleton className="h-48" /></div>}
      {state.status === "error" && <div className="mt-6"><ErrorState onRetry={state.retry} /></div>}
      {state.status === "success" && !state.data && <EmptyState className="mt-6" title={t.housing.notFound} action={<LinkButton href="/moradia">{t.housing.backToList}</LinkButton>} />}
      {state.status === "success" && state.data && <Content d={state.data} />}
    </div>
  );
}

function Content({ d }: { d: Destination }) {
  const { t, l, fmt, formatMoney, formatRelative, locale } = useI18n();
  const { state, addDestComment, addTask } = useStore();
  const feed = useFeed();
  const toast = useToast();
  const hs = t.housing;
  const city = l(d.city);
  const [comment, setComment] = useState("");
  const [error, setError] = useState<string | null>(null);

  const comments = [...(state.destComments[d.id] ?? []), ...d.comments];
  const related = feed.filter((p) => p.destinationId === d.id && !p.pendingReview).slice(0, 3);
  const taskName = fmt(hs.researchTask, { city });
  const inPlanner = state.planner.some((x) => x.title === taskName);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim().length < 10) { setError(hs.commentError); return; }
    addDestComment(d.id, comment.trim(), locale);
    setComment("");
    setError(null);
    toast(hs.commentPosted);
  };

  const stats = [
    { icon: Coins, label: hs.monthlyCost, value: `${formatMoney(d.monthlyCost.min, "USD")} – ${formatMoney(d.monthlyCost.max, "USD")}`, hint: hs.monthlyCostHint },
    { icon: Wifi, label: hs.connectivity, value: <ConnectivityMeter value={d.connectivity} />, hint: hs.connectivityHint },
    {
      icon: ShieldCheck, label: hs.safetyIndex,
      value: <span className="flex gap-1" role="img" aria-label={`${d.safety}/5`}>{[1, 2, 3, 4, 5].map((n) => <span key={n} className={cn("h-2 w-4 rounded-full", n <= d.safety ? "bg-success" : "bg-surface-2")} />)}</span>,
      hint: t.common.illustrative,
    },
    { icon: Clock, label: hs.timezone, value: d.timezone },
    { icon: Languages, label: hs.languages, value: d.languages.map((x) => t.labels.lang[x]).join(", ") },
  ];

  return (
    <>
      <div className="relative mt-6 overflow-hidden rounded-2xl border border-border">
        <DestinationArt palette={d.palette} seed={d.id} className="h-36 sm:h-48" />
      </div>
      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Badge tone="accent">{t.common.demoData}</Badge>
          <h1 className="mt-2 text-3xl font-bold">{city}</h1>
          <p className="text-muted">{l(d.country)}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <SaveButton type="destination" id={d.id} label={city} withText />
          <Button
            variant="outline"
            className="h-10"
            disabled={inPlanner}
            onClick={() => { addTask(taskName, "destination", "medium"); toast(fmt(hs.addedToPlanner, { city })); }}
          >
            <ListPlus className="h-4 w-4" aria-hidden />{inPlanner ? hs.alreadyInPlanner : hs.addToPlanner}
          </Button>
        </div>
      </div>

      <Notice tone="demo" className="mt-5">{hs.demoNotice}</Notice>

      <dl className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {stats.map(({ icon: Icon, label, value, hint }) => (
          <div key={label} className="rounded-2xl border border-border bg-surface p-4">
            <dt className="flex items-center gap-1.5 text-xs font-medium text-muted"><Icon className="h-3.5 w-3.5" aria-hidden />{label}</dt>
            <dd className="mt-2 text-sm font-semibold">{value}</dd>
            {hint && <dd className="mt-1 text-[11px] text-muted">{hint}</dd>}
          </div>
        ))}
      </dl>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="min-w-0 space-y-4">
          <Card as="section" aria-labelledby="ov" className="p-5">
            <h2 id="ov" className="font-semibold">{hs.overview}</h2>
            <p className="mt-2 leading-relaxed text-muted">{l(d.summary)}</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-success-soft p-4">
                <h3 className="flex items-center gap-1.5 text-sm font-semibold"><CirclePlus className="h-4 w-4 text-success" aria-hidden />{hs.highlights}</h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">{d.highlights.map((x, i) => <li key={i}>{l(x)}</li>)}</ul>
              </div>
              <div className="rounded-xl bg-warning-soft p-4">
                <h3 className="flex items-center gap-1.5 text-sm font-semibold"><CircleMinus className="h-4 w-4 text-warning" aria-hidden />{hs.considerations}</h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">{d.considerations.map((x, i) => <li key={i}>{l(x)}</li>)}</ul>
              </div>
            </div>
          </Card>

          <Card as="section" aria-labelledby="cm" className="p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 id="cm" className="font-semibold">{hs.community}</h2>
              <span className="text-xs text-muted">{hs.communityNote}</span>
            </div>
            <form onSubmit={submit} className="mt-4 space-y-2" noValidate>
              <Field label={hs.addComment} error={error}>
                {(f) => <Textarea {...f} value={comment} onChange={(e) => { setComment(e.target.value); setError(null); }} placeholder={hs.commentPlaceholder} maxLength={600} className="min-h-[72px]" />}
              </Field>
              <Button type="submit" size="sm">{t.common.send}</Button>
            </form>
            {comments.length === 0 ? (
              <p className="mt-4 text-sm text-muted">{hs.noComments}</p>
            ) : (
              <ul className="mt-5 space-y-4">
                {comments.map((c) => {
                  const a = resolveAuthor(c.authorId, state.profile, t.common.you);
                  return (
                    <li key={c.id} className="flex gap-3">
                      <Avatar name={a.name} color={a.color} src={a.avatar} size="sm" />
                      <div className="min-w-0">
                        <p className="text-xs"><span className="font-semibold">{a.name}</span> <span className="text-muted" suppressHydrationWarning>· {formatRelative(c.createdAt)} · {t.labels.lang[c.lang]}</span></p>
                        <p className="mt-0.5 text-sm" lang={c.lang}>{c.text}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </Card>
        </div>

        <aside className="space-y-4">
          <Card className="p-5">
            <h2 className="font-semibold">{hs.housingTypes}</h2>
            <div className="mt-3 flex flex-wrap gap-1.5">{d.housing.map((h) => <Badge key={h}>{t.labels.housingType[h]}</Badge>)}</div>
            <h2 className="mt-5 font-semibold">{hs.coworkings}</h2>
            <p className="text-xs text-muted">{hs.coworkingsNote}</p>
            <ul className="mt-3 space-y-2.5">
              {d.coworkings.map((c) => (
                <li key={c.name} className="flex gap-3 rounded-xl bg-surface-2 p-3">
                  <Laptop className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                  <div><p className="text-sm font-medium">{c.name}</p><p className="text-xs text-muted">{l(c.note)}</p></div>
                </li>
              ))}
            </ul>
          </Card>
          <Notice tone="safety" title={hs.beforeDeciding}>{hs.beforeDecidingText}</Notice>
          {related.length > 0 && (
            <Card className="p-5">
              <h2 className="font-semibold">{hs.relatedPosts}</h2>
              <ul className="mt-2 divide-y divide-border">
                {related.map((p) => (
                  <li key={p.id}><Link href={`/comunidade?post=${p.id}`} className="block py-2.5 text-sm font-medium hover:underline" lang={p.lang}>{p.title}</Link></li>
                ))}
              </ul>
            </Card>
          )}
        </aside>
      </div>
    </>
  );
}
