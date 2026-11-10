"use client";

import { Download, ImagePlus, RefreshCw, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SavedList, useResolvedSaved } from "@/components/features/SavedList";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { Avatar } from "@/components/ui/Avatar";
import { Button, LinkButton } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { Field, Input, Select, Switch, Textarea } from "@/components/ui/Field";
import { PageHeader } from "@/components/ui/PageHeader";
import { Progress } from "@/components/ui/Progress";
import { EmptyState, Skeleton } from "@/components/ui/States";
import { useToast } from "@/components/ui/Toast";
import { destinations } from "@/data/destinations";
import type { ExperienceLevel, JobArea, LanguageCode, WorkType } from "@/data/types";
import { useI18n } from "@/i18n/I18nProvider";
import { storage } from "@/lib/storage";
import { cn } from "@/lib/utils";
import { usePlannerProgress, useStore } from "@/store/AppStore";
import type { Stage, UserProfile, Visibility } from "@/store/types";

const languages: LanguageCode[] = ["pt", "en", "es", "fr", "de", "it"];
const areas: (JobArea | "other")[] = ["design", "development", "marketing", "data", "support", "education", "product", "writing", "finance", "other"];
const workTypes: WorkType[] = ["clt", "pj", "freelancer", "autonomous", "entrepreneur", "other"];
const stages: Stage[] = ["remote", "onsite", "nomad", "exploring"];
const experiences: ExperienceLevel[] = ["none", "first", "some", "experienced"];
const colors = ["#0E5E63", "#3858A5", "#BE5436", "#157A4A", "#6B4FA0", "#925806", "#B82630", "#1E6F8A"];

function defaultProfile(locale: LanguageCode): UserProfile {
  return {
    name: "", stage: "exploring", area: "other", workType: "other", destination: "", regions: [], timeframe: "undecided", concerns: [],
    languages: [locale], experience: "none", interests: [], mentor: false, bio: "", avatarColor: colors[0],
    privacy: { visibility: "community", showLocation: true, allowMessages: true, showProgress: false }, createdAt: new Date().toISOString(),
  };
}

/** Redimensiona a imagem para no máximo 256px e retorna um data URL compacto. */
function resizeImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("read"));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("decode"));
      img.onload = () => {
        const size = 256;
        const canvas = document.createElement("canvas");
        canvas.width = size; canvas.height = size;
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("canvas"));
        const s = Math.min(img.width, img.height);
        ctx.drawImage(img, (img.width - s) / 2, (img.height - s) / 2, s, s, 0, 0, size, size);
        resolve(canvas.toDataURL("image/jpeg", 0.85));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}

export default function ProfilePage() {
  const { t, fmt, l, locale } = useI18n();
  const { state, hydrated, setProfile, resetAll } = useStore();
  const progress = usePlannerProgress();
  const saved = useResolvedSaved();
  const toast = useToast();
  const pr = t.profile;
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<UserProfile>(() => defaultProfile(locale));
  const [dirty, setDirty] = useState(false);
  const [nameError, setNameError] = useState<string | null>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  useEffect(() => {
    if (hydrated) setForm(state.profile ?? defaultProfile(locale));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated, state.profile]);

  const set = <K extends keyof UserProfile>(k: K, v: UserProfile[K]) => { setForm((f) => ({ ...f, [k]: v })); setDirty(true); };
  const setPrivacy = <K extends keyof UserProfile["privacy"]>(k: K, v: UserProfile["privacy"][K]) => set("privacy", { ...form.privacy, [k]: v });
  const toggle = <T,>(list: T[], v: T) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  const onPhoto = async (file?: File) => {
    setPhotoError(null);
    if (!file) return;
    if (!/^image\/(jpeg|png|webp)$/.test(file.type) || file.size > 2 * 1024 * 1024) { setPhotoError(pr.photoError); return; }
    try { set("avatar", await resizeImage(file)); } catch { setPhotoError(pr.photoError); }
  };

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name.trim().length < 2) { setNameError(pr.errorName); document.getElementById("p-name")?.focus(); return; }
    setSaving(true);
    setTimeout(() => {
      setProfile({ ...form, name: form.name.trim() });
      setSaving(false);
      setDirty(false);
      toast(pr.savedToast);
    }, 300);
  };

  const exportData = () => {
    const blob = new Blob([JSON.stringify(storage.dump(), null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "conectados-pelo-mundo-dados.json"; a.click();
    URL.revokeObjectURL(url);
    toast(pr.exported);
  };

  if (!hydrated) {
    return <div className="container space-y-4 py-10" aria-busy="true"><span className="sr-only">{t.common.loading}</span><Skeleton className="h-9 w-48" /><Skeleton className="h-96" /></div>;
  }

  return (
    <div className="container pb-10">
      <PageHeader title={pr.title} subtitle={pr.subtitle} actions={<LinkButton href="/onboarding" variant="outline" size="sm"><RefreshCw className="h-4 w-4" aria-hidden />{pr.redoOnboarding}</LinkButton>} />

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <form onSubmit={save} className="min-w-0 space-y-4" noValidate>
          <Card as="section" aria-labelledby="sec-about" className="p-5 sm:p-6">
            <h2 id="sec-about" className="text-lg font-semibold">{pr.about}</h2>

            <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-center">
              <Avatar name={form.name || t.common.you} color={form.avatarColor} src={form.avatar} size="xl" />
              <div className="space-y-3">
                <p className="text-sm font-medium">{pr.photo}</p>
                <div className="flex flex-wrap gap-2">
                  <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" id="p-photo" onChange={(e) => onPhoto(e.target.files?.[0])} aria-describedby="p-photo-hint" />
                  <Button variant="outline" size="sm" onClick={() => fileRef.current?.click()}><ImagePlus className="h-4 w-4" aria-hidden />{pr.upload}</Button>
                  {form.avatar && <Button variant="ghost" size="sm" onClick={() => set("avatar", undefined)}><Trash2 className="h-4 w-4" aria-hidden />{pr.removePhoto}</Button>}
                </div>
                <p id="p-photo-hint" className="text-xs text-muted">{pr.photoHint}</p>
                {photoError && <p role="alert" className="text-xs font-medium text-danger">{photoError}</p>}
                {!form.avatar && (
                  <fieldset>
                    <legend className="mb-1.5 text-xs font-medium text-muted">{pr.avatarColor}</legend>
                    <div className="flex flex-wrap gap-2">
                      {colors.map((c) => (
                        <label key={c} className={cn("h-8 w-8 cursor-pointer rounded-full ring-offset-2 ring-offset-surface has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-fg", form.avatarColor === c && "ring-2 ring-fg")} style={{ backgroundColor: c }}>
                          <input type="radio" name="color" value={c} checked={form.avatarColor === c} onChange={() => set("avatarColor", c)} className="sr-only" aria-label={c} />
                        </label>
                      ))}
                    </div>
                  </fieldset>
                )}
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field label={pr.name} error={nameError}>
                {(f) => <Input {...f} id="p-name" value={form.name} onChange={(e) => { set("name", e.target.value); setNameError(null); }} maxLength={40} autoComplete="name" />}
              </Field>
              <Field label={pr.stage}>
                {(f) => <Select {...f} value={form.stage} onChange={(e) => set("stage", e.target.value as Stage)}>{stages.map((s) => <option key={s} value={s}>{t.labels.stage[s].title}</option>)}</Select>}
              </Field>
              <Field label={pr.bio} optional={t.common.optional} className="sm:col-span-2" hint={`${form.bio.length}/280`}>
                {(f) => <Textarea {...f} value={form.bio} onChange={(e) => set("bio", e.target.value)} placeholder={pr.bioPlaceholder} maxLength={280} />}
              </Field>
              <Field label={pr.area}>
                {(f) => <Select {...f} value={form.area} onChange={(e) => set("area", e.target.value as JobArea | "other")}>{areas.map((a) => <option key={a} value={a}>{t.labels.area[a]}</option>)}</Select>}
              </Field>
              <Field label={pr.workType}>
                {(f) => <Select {...f} value={form.workType} onChange={(e) => set("workType", e.target.value as WorkType)}>{workTypes.map((w) => <option key={w} value={w}>{t.labels.workType[w]}</option>)}</Select>}
              </Field>
              <Field label={pr.experience} className="sm:col-span-2">
                {(f) => <Select {...f} value={form.experience} onChange={(e) => set("experience", e.target.value as ExperienceLevel)}>{experiences.map((x) => <option key={x} value={x}>{t.labels.experience[x]}</option>)}</Select>}
              </Field>
            </div>

            <div role="group" aria-labelledby="p-langs" className="mt-5">
              <p id="p-langs" className="mb-2 text-sm font-medium">{pr.languages}</p>
              <div className="flex flex-wrap gap-2">
                {languages.map((x) => <Chip key={x} selected={form.languages.includes(x)} onClick={() => set("languages", toggle(form.languages, x))}>{t.labels.lang[x]}</Chip>)}
              </div>
            </div>

            <div role="group" aria-labelledby="p-dest" className="mt-5">
              <p id="p-dest" className="text-sm font-medium">{pr.destinations}</p>
              <p className="mb-2 text-xs text-muted">{pr.destinationsHint}</p>
              <div className="flex flex-wrap gap-2">
                {destinations.map((d) => <Chip key={d.id} selected={form.interests.includes(d.id)} onClick={() => set("interests", toggle(form.interests, d.id))}>{l(d.city)}</Chip>)}
              </div>
            </div>

            <div className="mt-5 border-t border-border pt-3">
              <Switch checked={form.mentor} onChange={(v) => set("mentor", v)} label={pr.mentor} description={pr.mentorHint} />
            </div>
          </Card>

          <Card as="section" aria-labelledby="sec-privacy" className="p-5 sm:p-6">
            <h2 id="sec-privacy" className="text-lg font-semibold">{pr.privacy}</h2>
            <fieldset className="mt-4">
              <legend className="mb-2 text-sm font-medium">{pr.visibility}</legend>
              <div className="grid gap-2 sm:grid-cols-3">
                {([["public", pr.visibilityPublic], ["community", pr.visibilityCommunity], ["private", pr.visibilityPrivate]] as [Visibility, string][]).map(([v, label]) => (
                  <label key={v} className={cn("cursor-pointer rounded-xl border px-3 py-2.5 text-sm has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary", form.privacy.visibility === v ? "border-primary bg-primary-soft font-medium text-primary" : "border-border")}>
                    <input type="radio" name="visibility" className="sr-only" checked={form.privacy.visibility === v} onChange={() => setPrivacy("visibility", v)} />
                    {label}
                  </label>
                ))}
              </div>
            </fieldset>
            <div className="mt-3 divide-y divide-border">
              <Switch checked={form.privacy.showLocation} onChange={(v) => setPrivacy("showLocation", v)} label={pr.showLocation} />
              <Switch checked={form.privacy.allowMessages} onChange={(v) => setPrivacy("allowMessages", v)} label={pr.allowMessages} />
              <Switch checked={form.privacy.showProgress} onChange={(v) => setPrivacy("showProgress", v)} label={pr.showProgress} />
            </div>
          </Card>

          <div className="sticky bottom-20 z-10 flex items-center justify-end gap-3 rounded-2xl border border-border bg-surface/95 p-3 shadow-lift backdrop-blur lg:bottom-4">
            {dirty && <p className="mr-auto text-sm text-warning" role="status">{pr.unsaved}</p>}
            <Button type="submit" loading={saving}>{pr.saveProfile}</Button>
          </div>
        </form>

        <aside className="space-y-4">
          <Card as="section" aria-labelledby="sec-plan" className="p-5">
            <h2 id="sec-plan" className="font-semibold">{pr.planning}</h2>
            <p className="mt-2 text-sm text-muted">{fmt(t.dashboard.tasksDone, { done: progress.done, total: progress.total })}</p>
            <Progress className="mt-2" value={progress.percent} label={`${pr.planning}: ${progress.percent}%`} />
            <Link href="/planejador" className="mt-3 inline-block text-sm font-semibold text-primary hover:underline">{t.dashboard.openPlanner}</Link>
          </Card>

          <Card as="section" aria-labelledby="sec-saved" className="p-5">
            <div className="flex items-center justify-between">
              <h2 id="sec-saved" className="font-semibold">{pr.savedItems}</h2>
              {saved.length > 0 && <Link href="/salvos" className="text-sm font-medium text-primary hover:underline">{t.common.seeAll}</Link>}
            </div>
            {saved.length === 0 ? <EmptyState className="mt-3 py-6" title={t.saved.emptyTitle} text={t.saved.emptyText} /> : <SavedList items={saved} limit={5} />}
          </Card>

          <Card as="section" className="p-5"><LanguageSwitcher variant="full" /></Card>

          <Card as="section" aria-labelledby="sec-data" className="p-5">
            <h2 id="sec-data" className="font-semibold">{pr.dataTitle}</h2>
            <p className="mt-1 text-sm text-muted">{pr.dataText}</p>
            <div className="mt-4 flex flex-col gap-2">
              <Button variant="outline" onClick={exportData}><Download className="h-4 w-4" aria-hidden />{pr.export}</Button>
              <Button variant="ghost" className="text-danger hover:bg-danger-soft" onClick={() => setConfirmReset(true)}><Trash2 className="h-4 w-4" aria-hidden />{pr.resetData}</Button>
            </div>
          </Card>
        </aside>
      </div>

      <ConfirmDialog
        open={confirmReset}
        onClose={() => setConfirmReset(false)}
        title={pr.resetConfirmTitle}
        text={pr.resetConfirm}
        confirmLabel={pr.resetData}
        danger
        onConfirm={() => { resetAll(); setForm(defaultProfile(locale)); setDirty(false); toast(pr.resetDone, "info"); }}
      />
    </div>
  );
}
