"use client";

import { ArrowRight, CheckCircle2, Circle, Lightbulb, MapPin, MessageCircle, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { DestinationArt } from "@/components/features/DestinationArt";
import { JobCard } from "@/components/features/JobCard";
import { SavedList, useResolvedSaved } from "@/components/features/SavedList";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button, LinkButton } from "@/components/ui/Button";
import { Card, CardHeader } from "@/components/ui/Card";
import { Progress, ProgressRing } from "@/components/ui/Progress";
import { EmptyState, Skeleton } from "@/components/ui/States";
import { useToast } from "@/components/ui/Toast";
import type { TaskCategory } from "@/data/types";
import { useI18n } from "@/i18n/I18nProvider";
import { useFeed } from "@/lib/community";
import { taskTitle } from "@/lib/planner";
import { interestDestinations, nextTasks, personalSuggestions, recommendedJobs, recommendedPosts } from "@/lib/recommendations";
import { usePlannerProgress, useStore } from "@/store/AppStore";

const categoryOrder: TaskCategory[] = ["work", "finance", "documents", "destination", "housing", "connectivity", "health", "equipment", "safety"];

export default function DashboardPage() {
  const { t, l, fmt, formatList } = useI18n();
  const { state, hydrated, toggleTask, dismissWelcome } = useStore();
  const progress = usePlannerProgress();
  const feed = useFeed();
  const saved = useResolvedSaved();
  const toast = useToast();
  const d = t.dashboard;
  const profile = state.profile;

  const [hour, setHour] = useState<number | null>(null);
  useEffect(() => setHour(new Date().getHours()), []);
  const greeting = hour === null ? "" : hour < 12 ? d.greeting.morning : hour < 18 ? d.greeting.afternoon : d.greeting.evening;

  if (!hydrated) {
    return (
      <div className="container space-y-4 py-10" aria-busy="true">
        <span className="sr-only">{t.common.loading}</span>
        <Skeleton className="h-9 w-64" />
        <div className="grid gap-4 lg:grid-cols-3"><Skeleton className="h-48" /><Skeleton className="h-48" /><Skeleton className="h-48" /></div>
        <Skeleton className="h-64" />
      </div>
    );
  }

  const tasks = nextTasks(state.planner, profile);
  const suggestions = personalSuggestions(profile);
  const jobs = recommendedJobs(profile);
  const posts = recommendedPosts(profile, feed);
  const dests = interestDestinations(profile);

  const byCategory = categoryOrder
    .map((c) => {
      const list = state.planner.filter((x) => x.category === c);
      return { c, total: list.length, done: list.filter((x) => x.done).length };
    })
    .filter((x) => x.total > 0);

  return (
    <div className="container py-8 sm:py-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Avatar name={profile?.name || t.common.you} color={profile?.avatarColor} src={profile?.avatar} size="lg" />
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl" suppressHydrationWarning>
              {greeting}{profile?.name ? `, ${profile.name}` : ""}
            </h1>
            <p className="text-muted">{d.subtitle}</p>
          </div>
        </div>
        <LinkButton href="/planejador" variant="outline">{d.openPlanner}<ArrowRight className="h-4 w-4" aria-hidden /></LinkButton>
      </div>

      {!profile && (
        <Card className="mt-6 flex flex-col gap-4 border-primary/30 bg-primary-soft p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-semibold">{d.noProfileTitle}</h2>
            <p className="text-sm text-muted">{d.noProfileText}</p>
          </div>
          <LinkButton href="/onboarding">{d.noProfileCta}</LinkButton>
        </Card>
      )}

      {profile && state.prefs.welcomePending && (
        <Card as="section" aria-labelledby="welcome-title" className="relative mt-6 overflow-hidden border-primary/30 p-5 sm:p-6">
          <div className="absolute inset-y-0 left-0 w-1.5 bg-primary" aria-hidden />
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="flex items-center gap-2 text-sm font-semibold text-primary"><Sparkles className="h-4 w-4" aria-hidden />{d.welcomeTitle}</p>
              <h2 id="welcome-title" className="mt-1 text-lg font-semibold">{d.welcomeText}</h2>
              <p className="mt-1 text-sm text-muted">{fmt(d.suggestionsBasedOn, { items: formatList(profile.concerns.map((c) => c === "other" && profile.concernOther ? profile.concernOther : t.labels.concern[c])) })}</p>
            </div>
            <button type="button" onClick={dismissWelcome} className="rounded-lg p-1.5 text-muted hover:bg-surface-2" aria-label={d.dismiss}><X className="h-5 w-5" /></button>
          </div>
          <ol className="mt-4 grid gap-3 md:grid-cols-3">
            {tasks.slice(0, 3).map((task, i) => (
              <li key={task.id} className="rounded-xl bg-surface-2 p-3 text-sm">
                <span className="text-xs font-semibold text-primary">{i + 1}.</span> {taskTitle(task, l)}
              </li>
            ))}
          </ol>
          <Button variant="secondary" size="sm" className="mt-4" onClick={dismissWelcome}>{d.dismiss}</Button>
        </Card>
      )}

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {/* Progresso */}
        <Card as="section" aria-labelledby="progress-title" className="p-5">
          <CardHeader id="progress-title" title={d.progressTitle} />
          <div className="mt-4 flex items-center gap-5">
            <ProgressRing value={progress.percent} label={`${d.progressTitle}: ${progress.percent}%`} />
            <div>
              <p className="text-sm">{fmt(d.tasksDone, { done: progress.done, total: progress.total })}</p>
              <Link href="/planejador" className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
                {d.openPlanner}<ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            </div>
          </div>
        </Card>

        {/* Momento */}
        <Card as="section" aria-labelledby="moment-title" className="p-5">
          <CardHeader id="moment-title" title={d.profileTitle} action={<Link href="/perfil" className="text-sm font-medium text-primary hover:underline">{d.editProfile}</Link>} />
          <dl className="mt-4 space-y-2.5 text-sm">
            <div className="flex justify-between gap-3"><dt className="text-muted">{d.profileStage}</dt><dd className="text-right font-medium">{profile ? t.labels.stage[profile.stage].title : d.notDefined}</dd></div>
            <div className="flex justify-between gap-3"><dt className="text-muted">{d.profileTimeframe}</dt><dd className="text-right font-medium">{profile ? t.labels.timeframe[profile.timeframe] : d.notDefined}</dd></div>
            <div className="flex justify-between gap-3"><dt className="text-muted">{d.profileDestination}</dt><dd className="text-right font-medium">{profile?.destination || (profile?.regions.length ? profile.regions.map((r) => t.labels.region[r]).join(", ") : d.notDefined)}</dd></div>
          </dl>
        </Card>

        {/* Checklist por área */}
        <Card as="section" aria-labelledby="checklist-title" className="p-5">
          <CardHeader id="checklist-title" title={d.checklistTitle} description={d.checklistText} />
          <ul className="mt-4 space-y-2.5">
            {byCategory.map(({ c, done, total }) => (
              <li key={c}>
                <div className="mb-1 flex justify-between text-xs"><span>{t.labels.taskCategory[c]}</span><span className="tabular-nums text-muted">{done}/{total}</span></div>
                <Progress value={(done / total) * 100} label={`${t.labels.taskCategory[c]}: ${done}/${total}`} tone={done === total ? "success" : "primary"} className="h-1.5" />
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.3fr_1fr]">
        {/* Próximas tarefas */}
        <Card as="section" aria-labelledby="next-title" className="p-5">
          <CardHeader id="next-title" title={d.nextTasksTitle} action={<Link href="/planejador" className="text-sm font-medium text-primary hover:underline">{t.common.seeAll}</Link>} />
          {tasks.length === 0 ? (
            <p className="mt-4 flex items-center gap-2 rounded-xl bg-success-soft p-4 text-sm"><CheckCircle2 className="h-5 w-5 text-success" aria-hidden />{d.nextTasksEmpty}</p>
          ) : (
            <ul className="mt-3 divide-y divide-border">
              {tasks.map((task) => {
                const title = taskTitle(task, l);
                return (
                  <li key={task.id} className="flex items-center gap-3 py-3">
                    <button
                      type="button"
                      role="checkbox"
                      aria-checked={task.done}
                      aria-label={fmt(t.planner.markDone, { task: title })}
                      onClick={() => { const nowDone = toggleTask(task.id); toast(nowDone ? t.planner.completedToast : t.planner.reopenedToast); }}
                      className="text-muted hover:text-primary"
                    >
                      <Circle className="h-5 w-5" aria-hidden />
                    </button>
                    <span className="flex-1 text-sm font-medium">{title}</span>
                    <Badge tone={task.priority === "high" ? "accent" : task.priority === "medium" ? "sky" : "neutral"}>{fmt(d.priorityTag, { p: t.labels.priority[task.priority] })}</Badge>
                  </li>
                );
              })}
            </ul>
          )}
        </Card>

        {/* Sugestões */}
        <Card as="section" aria-labelledby="sugg-title" className="p-5">
          <CardHeader id="sugg-title" title={d.suggestionsTitle} />
          <ul className="mt-3 space-y-2.5">
            {suggestions.map((s) => (
              <li key={s.id}>
                <Link href={s.href} className="flex gap-3 rounded-xl border border-border p-3 hover:bg-surface-2">
                  <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
                  <span>
                    <span className="block text-sm font-semibold">{l(s.title)}</span>
                    <span className="block text-sm text-muted">{l(s.text)}</span>
                    <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-primary">{l(s.cta)}<ArrowRight className="h-3 w-3" aria-hidden /></span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Vagas */}
      <section aria-labelledby="jobs-title" className="mt-8">
        <div className="mb-3 flex items-end justify-between gap-3">
          <div>
            <h2 id="jobs-title" className="text-lg font-semibold">{d.jobsTitle}</h2>
            <p className="text-sm text-muted">{d.jobsReason}</p>
          </div>
          <Link href="/trabalho" className="text-sm font-medium text-primary hover:underline">{t.common.seeAll}</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">{jobs.map((j) => <JobCard key={j.id} job={j} />)}</div>
      </section>

      <div className="mt-8 grid gap-4 lg:grid-cols-[1.3fr_1fr]">
        {/* Conteúdos */}
        <Card as="section" aria-labelledby="content-title" className="p-5">
          <CardHeader id="content-title" title={d.contentTitle} action={<Link href="/comunidade" className="text-sm font-medium text-primary hover:underline">{t.common.seeAll}</Link>} />
          <ul className="mt-3 divide-y divide-border">
            {posts.map((p) => (
              <li key={p.id}>
                <Link href={`/comunidade?post=${p.id}`} className="flex gap-3 py-3 hover:opacity-80">
                  <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-sky" aria-hidden />
                  <span className="min-w-0">
                    <span className="block text-sm font-medium" lang={p.lang}>{p.title}</span>
                    <span className="text-xs text-muted">{t.labels.postCategory[p.category]} · {fmt(t.community.comments, { n: p.comments.length })}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {dests.map((dst) => (
              <Link key={dst.id} href={`/moradia/${dst.id}`} className="overflow-hidden rounded-xl border border-border hover:shadow-card">
                <DestinationArt palette={dst.palette} seed={dst.id} className="h-14" />
                <span className="flex items-center gap-1 px-3 py-2 text-sm font-medium"><MapPin className="h-3.5 w-3.5 text-muted" aria-hidden />{l(dst.city)}</span>
              </Link>
            ))}
          </div>
        </Card>

        {/* Salvos */}
        <Card as="section" aria-labelledby="saved-title" className="p-5">
          <CardHeader id="saved-title" title={d.savedTitle} action={saved.length > 0 ? <Link href="/salvos" className="text-sm font-medium text-primary hover:underline">{t.common.seeAll}</Link> : undefined} />
          {saved.length === 0 ? (
            <EmptyState className="mt-3 py-8" title={t.saved.emptyTitle} text={d.savedEmpty} />
          ) : (
            <div className="mt-2"><SavedList items={saved} limit={5} /></div>
          )}
        </Card>
      </div>
    </div>
  );
}
