"use client";

import { ArrowLeft, ArrowRight, Briefcase, Compass, Globe2, PartyPopper, Wifi } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { ChoiceCard } from "@/components/ui/ChoiceCard";
import { Field, Input } from "@/components/ui/Field";
import { Progress } from "@/components/ui/Progress";
import { useToast } from "@/components/ui/Toast";
import { destinations } from "@/data/destinations";
import type { ExperienceLevel, JobArea, Region, WorkType } from "@/data/types";
import { useI18n } from "@/i18n/I18nProvider";
import { useStore } from "@/store/AppStore";
import type { Concern, Stage, Timeframe, UserProfile } from "@/store/types";

const stages: Stage[] = ["remote", "onsite", "nomad", "exploring"];
const areas: (JobArea | "other")[] = ["design", "development", "marketing", "data", "support", "education", "product", "writing", "finance", "other"];
const workTypes: WorkType[] = ["clt", "pj", "freelancer", "autonomous", "entrepreneur", "other"];
const regions: Region[] = ["brazil", "latam", "europe", "northAmerica", "asia"];
const timeframes: Timeframe[] = ["3m", "6m", "12m", "later", "undecided"];
const concerns: Concern[] = ["work", "income", "housing", "language", "safety", "visa", "planning", "community", "other"];
const stageIcons = { remote: Wifi, onsite: Briefcase, nomad: Globe2, exploring: Compass };
const experienceByStage: Record<Stage, ExperienceLevel> = { remote: "first", onsite: "none", nomad: "experienced", exploring: "none" };

type Draft = Pick<UserProfile, "name" | "stage" | "area" | "areaOther" | "workType" | "workTypeOther" | "destination" | "regions" | "timeframe" | "concerns" | "concernOther">;

const TOTAL = 7;

export default function OnboardingPage() {
  const { t, fmt, locale } = useI18n();
  const { state, hydrated, completeOnboarding } = useStore();
  const toast = useToast();
  const router = useRouter();
  const o = t.onboarding;

  const [step, setStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [draft, setDraft] = useState<Partial<Draft>>({ regions: [], concerns: [], destination: "" });

  // Preenche com respostas anteriores quando a pessoa refaz o onboarding.
  useEffect(() => {
    if (hydrated && state.profile) {
      const p = state.profile;
      setDraft({ name: p.name, stage: p.stage, area: p.area, areaOther: p.areaOther, workType: p.workType, workTypeOther: p.workTypeOther, destination: p.destination, regions: p.regions, timeframe: p.timeframe, concerns: p.concerns, concernOther: p.concernOther });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated]);

  const set = <K extends keyof Draft>(k: K, v: Draft[K]) => { setDraft((d) => ({ ...d, [k]: v })); setError(null); };
  const toggleIn = <T,>(list: T[] = [], v: T) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  const validate = (): string | null => {
    switch (step) {
      case 0: return (draft.name ?? "").trim().length >= 2 ? null : o.errorName;
      case 1: return draft.stage ? null : o.errorChoose;
      case 2: return !draft.area ? o.errorChoose : draft.area === "other" && !(draft.areaOther ?? "").trim() ? o.errorOther : null;
      case 3: return !draft.workType ? o.errorChoose : draft.workType === "other" && !(draft.workTypeOther ?? "").trim() ? o.errorOther : null;
      case 4: return null;
      case 5: return draft.timeframe ? null : o.errorChoose;
      case 6: return !draft.concerns?.length ? o.errorChooseMany : draft.concerns.includes("other") && !(draft.concernOther ?? "").trim() ? o.errorOther : null;
      default: return null;
    }
  };

  const next = () => {
    const err = validate();
    if (err) { setError(err); return; }
    if (step < TOTAL - 1) { setStep(step + 1); return; }
    finish();
  };

  const finish = () => {
    const d = draft as Draft;
    const prev = state.profile;
    const interests = prev?.interests?.length ? prev.interests : destinations.filter((x) => d.regions.includes(x.region)).slice(0, 3).map((x) => x.id);
    const profile: UserProfile = {
      name: d.name.trim(),
      stage: d.stage, area: d.area, areaOther: d.areaOther, workType: d.workType, workTypeOther: d.workTypeOther,
      destination: d.destination?.trim() ?? "", regions: d.regions, timeframe: d.timeframe, concerns: d.concerns, concernOther: d.concernOther,
      languages: prev?.languages ?? [locale],
      experience: prev?.experience ?? experienceByStage[d.stage],
      interests,
      mentor: prev?.mentor ?? d.stage === "nomad",
      bio: prev?.bio ?? "",
      avatar: prev?.avatar,
      avatarColor: prev?.avatarColor ?? "#0E5E63",
      privacy: prev?.privacy ?? { visibility: "community", showLocation: true, allowMessages: true, showProgress: false },
      createdAt: prev?.createdAt ?? new Date().toISOString(),
    };
    completeOnboarding(profile);
    toast(o.successToast);
    setDone(true);
  };

  if (done) {
    return (
      <div className="container max-w-2xl py-12 sm:py-16">
        <Card className="p-6 text-center sm:p-10">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-success-soft text-success"><PartyPopper className="h-7 w-7" aria-hidden /></span>
          <h1 className="mt-5 text-2xl font-bold">{fmt(o.resultTitle, { name: draft.name ?? "" })}</h1>
          <p className="mt-2 text-muted">{o.resultText}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {(draft.concerns ?? []).map((c) => <span key={c} className="rounded-full bg-surface-2 px-3 py-1 text-sm">{t.labels.concern[c]}</span>)}
          </div>
          <Button size="lg" className="mt-8" onClick={() => router.push("/painel")}>{o.resultCta}<ArrowRight className="h-4 w-4" aria-hidden /></Button>
        </Card>
      </div>
    );
  }

  const questions = [o.nameQuestion, o.stageQuestion, o.areaQuestion, o.workTypeQuestion, o.destinationQuestion, o.timeframeQuestion, o.concernsQuestion];

  return (
    <div className="container max-w-2xl py-10 sm:py-14">
      <p className="text-sm font-medium text-primary">{o.title}</p>
      <p className="mt-1 text-sm text-muted">{o.subtitle}</p>
      <div className="mt-6 flex items-center gap-3">
        <Progress value={((step + 1) / TOTAL) * 100} label={fmt(o.stepOf, { current: step + 1, total: TOTAL })} />
        <span className="shrink-0 text-xs font-medium text-muted">{fmt(o.stepOf, { current: step + 1, total: TOTAL })}</span>
      </div>

      <form
        className="mt-8"
        onSubmit={(e) => { e.preventDefault(); next(); }}
        noValidate
      >
        <fieldset key={step} className="animate-fade-in">
          <legend className="font-display text-2xl font-bold sm:text-[1.7rem]">{questions[step]}</legend>
          {step === 6 && <p className="mt-1 text-sm text-muted">{o.concernsHint}</p>}

          <div className="mt-6 space-y-3">
            {step === 0 && (
              <Field label={o.nameLabel} hint={o.localNote} error={error}>
                {(p) => <Input {...p} autoFocus value={draft.name ?? ""} onChange={(e) => set("name", e.target.value)} placeholder={o.namePlaceholder} autoComplete="given-name" maxLength={40} />}
              </Field>
            )}

            {step === 1 && stages.map((s) => {
              const Icon = stageIcons[s];
              return <ChoiceCard key={s} type="radio" name="stage" checked={draft.stage === s} onChange={() => set("stage", s)} title={t.labels.stage[s].title} text={t.labels.stage[s].text} icon={<Icon className="h-5 w-5" />} />;
            })}

            {step === 2 && (
              <>
                <div className="grid gap-3 sm:grid-cols-2">
                  {areas.map((a) => <ChoiceCard key={a} type="radio" name="area" checked={draft.area === a} onChange={() => set("area", a)} title={t.labels.area[a]} />)}
                </div>
                {draft.area === "other" && (
                  <Field label={o.areaOtherLabel}>{(p) => <Input {...p} value={draft.areaOther ?? ""} onChange={(e) => set("areaOther", e.target.value)} maxLength={60} />}</Field>
                )}
              </>
            )}

            {step === 3 && (
              <>
                <div className="grid gap-3 sm:grid-cols-2">
                  {workTypes.map((w) => <ChoiceCard key={w} type="radio" name="workType" checked={draft.workType === w} onChange={() => set("workType", w)} title={t.labels.workType[w]} />)}
                </div>
                {draft.workType === "other" && (
                  <Field label={o.workTypeOtherLabel}>{(p) => <Input {...p} value={draft.workTypeOther ?? ""} onChange={(e) => set("workTypeOther", e.target.value)} maxLength={60} />}</Field>
                )}
              </>
            )}

            {step === 4 && (
              <>
                <Field label={o.destinationLabel} optional={t.common.optional}>
                  {(p) => <Input {...p} value={draft.destination ?? ""} onChange={(e) => set("destination", e.target.value)} placeholder={o.destinationPlaceholder} maxLength={60} />}
                </Field>
                <div role="group" aria-labelledby="regions-label" className="pt-2">
                  <p id="regions-label" className="mb-2 text-sm font-medium">{o.regionsLabel} <span className="font-normal text-muted">({t.common.optional})</span></p>
                  <div className="flex flex-wrap gap-2">
                    {regions.map((r) => <Chip key={r} selected={!!draft.regions?.includes(r)} onClick={() => set("regions", toggleIn(draft.regions, r))}>{t.labels.region[r]}</Chip>)}
                  </div>
                </div>
              </>
            )}

            {step === 5 && timeframes.map((tf) => (
              <ChoiceCard key={tf} type="radio" name="timeframe" checked={draft.timeframe === tf} onChange={() => set("timeframe", tf)} title={t.labels.timeframe[tf]} />
            ))}

            {step === 6 && (
              <>
                <div className="grid gap-3 sm:grid-cols-3">
                  {concerns.map((c) => <ChoiceCard key={c} type="checkbox" name="concerns" checked={!!draft.concerns?.includes(c)} onChange={() => set("concerns", toggleIn(draft.concerns, c))} title={t.labels.concern[c]} />)}
                </div>
                {draft.concerns?.includes("other") && (
                  <Field label={o.concernOtherLabel}>{(p) => <Input {...p} value={draft.concernOther ?? ""} onChange={(e) => set("concernOther", e.target.value)} maxLength={80} />}</Field>
                )}
              </>
            )}

            {step !== 0 && error && <p role="alert" className="text-sm font-medium text-danger">{error}</p>}
          </div>
        </fieldset>

        <div className="mt-8 flex items-center justify-between gap-3">
          <Button variant="ghost" onClick={() => { setError(null); setStep(Math.max(0, step - 1)); }} disabled={step === 0}>
            <ArrowLeft className="h-4 w-4" aria-hidden />{t.common.previous}
          </Button>
          <Button type="submit" size="lg">
            {step === TOTAL - 1 ? t.common.finish : t.common.next}<ArrowRight className="h-4 w-4" aria-hidden />
          </Button>
        </div>
      </form>
    </div>
  );
}
