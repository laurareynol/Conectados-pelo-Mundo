"use client";

import { MessageSquarePlus, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import { FilterSelect } from "@/components/features/FilterSelect";
import { PostCard } from "@/components/features/PostCard";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Field, Input, Select, Textarea } from "@/components/ui/Field";
import { Modal } from "@/components/ui/Modal";
import { Notice } from "@/components/ui/Notice";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyState, Skeleton } from "@/components/ui/States";
import { useToast } from "@/components/ui/Toast";
import { destinations } from "@/data/destinations";
import { users } from "@/data/users";
import type { LanguageCode, PostCategory, PostType } from "@/data/types";
import { useI18n } from "@/i18n/I18nProvider";
import { needsModeration, useFeed } from "@/lib/community";
import { cn } from "@/lib/utils";
import { useStore } from "@/store/AppStore";

const categories: PostCategory[] = ["work", "housing", "planning", "destinations", "documents", "community", "wellbeing"];
const langs: LanguageCode[] = ["pt", "en", "es"];

function CommunityInner() {
  const { t, l, fmt } = useI18n();
  const { hydrated, startConversation } = useStore();
  const feed = useFeed();
  const router = useRouter();
  const params = useSearchParams();
  const focusPost = params.get("post");
  const c = t.community;

  const [type, setType] = useState<PostType | "all">("all");
  const [category, setCategory] = useState<PostCategory | "">("");
  const [lang, setLang] = useState<LanguageCode | "">("");
  const [dest, setDest] = useState<string>("");
  const [sort, setSort] = useState<"recent" | "popular">("recent");
  const [composerOpen, setComposerOpen] = useState(false);

  useEffect(() => {
    if (hydrated && focusPost) setTimeout(() => document.getElementById(`post-${focusPost}`)?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
  }, [hydrated, focusPost]);

  const results = useMemo(
    () =>
      feed
        .filter((p) =>
          (!p.pendingReview || p.authorId === "me") &&
          (type === "all" || p.type === type) &&
          (!category || p.category === category) &&
          (!lang || p.lang === lang) &&
          (!dest || p.destinationId === dest),
        )
        .sort((a, b) => (sort === "popular" ? b.likeCount - a.likeCount : b.createdAt.localeCompare(a.createdAt))),
    [feed, type, category, lang, dest, sort],
  );

  const clear = () => { setType("all"); setCategory(""); setLang(""); setDest(""); };
  const mentors = users.filter((u) => u.mentor).slice(0, 4);

  return (
    <div className="container pb-10">
      <PageHeader
        title={c.title}
        subtitle={c.subtitle}
        actions={<Button onClick={() => setComposerOpen(true)}><MessageSquarePlus className="h-4 w-4" aria-hidden />{c.newPost}</Button>}
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <div className="min-w-0">
          <div role="tablist" aria-label={c.filterType} className="flex gap-1 overflow-x-auto border-b border-border">
            {(["all", "question", "story"] as const).map((x) => (
              <button
                key={x}
                role="tab"
                type="button"
                aria-selected={type === x}
                onClick={() => setType(x)}
                className={cn("-mb-px whitespace-nowrap border-b-2 px-4 py-2.5 text-sm font-medium", type === x ? "border-primary text-primary" : "border-transparent text-muted hover:text-fg")}
              >
                {x === "all" ? t.common.all : t.labels.postType[x]}
              </button>
            ))}
          </div>

          <form role="search" aria-label={t.common.filters} onSubmit={(e) => e.preventDefault()} className="mt-4 grid gap-3 sm:grid-cols-4">
            <FilterSelect id="c-cat" label={c.filterCategory} value={category} onChange={setCategory} options={categories.map((x) => ({ value: x, label: t.labels.postCategory[x] }))} />
            <FilterSelect id="c-lang" label={c.filterLanguage} value={lang} onChange={setLang} options={langs.map((x) => ({ value: x, label: t.labels.lang[x] }))} />
            <FilterSelect id="c-dest" label={c.filterDestination} value={dest} onChange={setDest} options={destinations.map((d) => ({ value: d.id, label: l(d.city) }))} />
            <div>
              <label htmlFor="c-sort" className="mb-1 block text-xs font-medium text-muted">{t.common.sortBy}</label>
              <Select id="c-sort" value={sort} onChange={(e) => setSort(e.target.value as typeof sort)} className="h-10">
                <option value="recent">{c.sortRecent}</option>
                <option value="popular">{c.sortPopular}</option>
              </Select>
            </div>
          </form>

          <p className="mt-4 text-sm text-muted" aria-live="polite">{fmt(c.count, { n: results.length })}</p>

          <div className="mt-3 space-y-4">
            {!hydrated ? (
              Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-48" />)
            ) : results.length === 0 ? (
              <EmptyState
                title={c.emptyTitle}
                text={c.emptyText}
                action={<div className="flex gap-2"><Button variant="outline" onClick={clear}>{t.common.clearFilters}</Button><Button onClick={() => setComposerOpen(true)}>{c.newPost}</Button></div>}
              />
            ) : (
              results.map((p) => <PostCard key={p.id} post={p} defaultOpen={p.id === focusPost} highlight={p.id === focusPost} />)
            )}
          </div>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <Notice tone="safety" title={c.moderationTitle} action={<Link href="/seguranca#regras" className="text-sm font-semibold text-primary hover:underline">{c.rulesLink}</Link>}>
            {c.moderationText}
          </Notice>
          <Card as="section" aria-labelledby="people" className="p-5">
            <h2 id="people" className="font-semibold">{c.peopleTitle}</h2>
            <p className="text-xs text-muted">{c.peopleText}</p>
            <ul className="mt-3 space-y-3">
              {mentors.map((u) => (
                <li key={u.id} className="flex items-center gap-3">
                  <Avatar name={u.name} color={u.color} />
                  <div className="min-w-0 flex-1">
                    <Link href={`/pessoas/${u.id}`} className="block truncate text-sm font-semibold hover:underline">{u.name}</Link>
                    <p className="truncate text-xs text-muted">{t.labels.area[u.area]} · {u.base}</p>
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    aria-label={`${c.sendMessage}: ${u.name}`}
                    onClick={() => router.push(`/conversas?c=${startConversation(u.id)}`)}
                  >
                    {t.common.send}
                  </Button>
                </li>
              ))}
            </ul>
            <div className="mt-3"><Badge tone="primary">{c.mentor}</Badge></div>
          </Card>
        </aside>
      </div>

      <Composer open={composerOpen} onClose={() => setComposerOpen(false)} />
    </div>
  );
}

function Composer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t, l, locale } = useI18n();
  const { addPost } = useStore();
  const toast = useToast();
  const c = t.community;
  const [type, setType] = useState<PostType>("question");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState<PostCategory>("planning");
  const [lang, setLang] = useState<LanguageCode>(locale);
  const [dest, setDest] = useState("");
  const [errors, setErrors] = useState<{ title?: string; body?: string }>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => { if (open) setLang(locale); }, [open, locale]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = { title: title.trim().length < 8 ? c.errorTitle : undefined, body: body.trim().length < 20 ? c.errorBody : undefined };
    setErrors(errs);
    if (errs.title || errs.body) return;
    setLoading(true);
    const flagged = needsModeration(`${title} ${body}`);
    setTimeout(() => {
      addPost({ type, title: title.trim(), body: body.trim(), category, lang, destinationId: dest || undefined, pendingReview: flagged });
      toast(flagged ? c.moderation : c.published, flagged ? "info" : "success");
      setLoading(false);
      setTitle(""); setBody(""); setDest("");
      onClose();
    }, 400);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={c.formTitle}
      closeLabel={t.common.close}
      size="lg"
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>{t.common.cancel}</Button>
          <Button type="submit" form="composer" loading={loading}>{c.publish}</Button>
        </>
      }
    >
      <form id="composer" onSubmit={submit} className="space-y-4" noValidate>
        <fieldset>
          <legend className="mb-2 text-sm font-medium">{c.type}</legend>
          <div className="flex gap-2">
            {(["question", "story"] as const).map((x) => (
              <label key={x} className={cn("flex-1 cursor-pointer rounded-xl border px-3 py-2.5 text-center text-sm font-medium has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary", type === x ? "border-primary bg-primary-soft text-primary" : "border-border")}>
                <input type="radio" name="ptype" className="sr-only" checked={type === x} onChange={() => setType(x)} />
                {t.labels.postType[x]}
              </label>
            ))}
          </div>
        </fieldset>
        <Field label={c.postTitle} error={errors.title}>
          {(f) => <Input {...f} data-autofocus value={title} onChange={(e) => setTitle(e.target.value)} placeholder={c.postTitlePlaceholder} maxLength={120} />}
        </Field>
        <Field label={c.body} error={errors.body} hint={`${body.length}/1500 ${t.common.character}`}>
          {(f) => <Textarea {...f} value={body} onChange={(e) => setBody(e.target.value)} placeholder={c.bodyPlaceholder} maxLength={1500} className="min-h-[140px]" />}
        </Field>
        <div className="grid gap-3 sm:grid-cols-3">
          <Field label={c.category}>
            {(f) => <Select {...f} value={category} onChange={(e) => setCategory(e.target.value as PostCategory)}>{categories.map((x) => <option key={x} value={x}>{t.labels.postCategory[x]}</option>)}</Select>}
          </Field>
          <Field label={c.language}>
            {(f) => <Select {...f} value={lang} onChange={(e) => setLang(e.target.value as LanguageCode)}>{langs.map((x) => <option key={x} value={x}>{t.labels.lang[x]}</option>)}</Select>}
          </Field>
          <Field label={c.destination} optional={t.common.optional}>
            {(f) => (
              <Select {...f} value={dest} onChange={(e) => setDest(e.target.value)}>
                <option value="">{c.noDestination}</option>
                {destinations.map((d) => <option key={d.id} value={d.id}>{l(d.city)}</option>)}
              </Select>
            )}
          </Field>
        </div>
        <p className="flex items-center gap-1.5 text-xs text-muted">
          <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
          {c.rulesNote} <Link href="/seguranca#regras" className="font-medium text-primary hover:underline" onClick={onClose}>{c.rulesLink}</Link>.
        </p>
      </form>
    </Modal>
  );
}

export default function CommunityPage() {
  return <Suspense fallback={<div className="container py-10"><Skeleton className="h-64" /></div>}><CommunityInner /></Suspense>;
}
