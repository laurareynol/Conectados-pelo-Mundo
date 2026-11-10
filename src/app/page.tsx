"use client";

import {
  ArrowRight, Briefcase, CheckCircle2, Circle, Clock, FileCheck2, HeartPulse, Home, Languages, ListChecks,
  MessagesSquare, Scale, ShieldCheck, Users, Wallet, Wifi, Globe2, TrendingDown,
} from "lucide-react";
import Link from "next/link";
import { LinkButton } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { testimonials } from "@/data/content";
import { useI18n } from "@/i18n/I18nProvider";
import { useStore } from "@/store/AppStore";

export default function HomePage() {
  const { t, l } = useI18n();
  const { state } = useStore();
  const h = t.home;
  const startHref = state.profile ? "/painel" : "/onboarding";

  const dimensions = [
    { icon: Briefcase, ...h.dimensions.work },
    { icon: Wallet, ...h.dimensions.income },
    { icon: Home, ...h.dimensions.housing },
    { icon: Wifi, ...h.dimensions.connectivity },
    { icon: FileCheck2, ...h.dimensions.documents },
    { icon: Users, ...h.dimensions.community },
  ];
  const pillars = [
    { icon: ListChecks, href: "/planejador", tone: "bg-primary-soft text-primary", ...h.pillars.planning },
    { icon: Briefcase, href: "/trabalho", tone: "bg-sky-soft text-sky", ...h.pillars.work },
    { icon: Home, href: "/moradia", tone: "bg-accent-soft text-accent", ...h.pillars.housing },
    { icon: MessagesSquare, href: "/comunidade", tone: "bg-success-soft text-success", ...h.pillars.community },
  ];
  const reality = [
    { icon: TrendingDown, ...h.realityPoints.costs },
    { icon: Scale, ...h.realityPoints.mobility },
    { icon: FileCheck2, ...h.realityPoints.visa },
    { icon: HeartPulse, ...h.realityPoints.health },
    { icon: Wallet, ...h.realityPoints.stability },
    { icon: Clock, ...h.realityPoints.work },
  ];

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border">
        <RoutePattern />
        <div className="container relative grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-[1.15fr_1fr] lg:py-24">
          <div className="animate-fade-in">
            <Badge tone="primary" className="mb-5 px-3 py-1 text-[13px]">{h.eyebrow}</Badge>
            <h1 className="text-[2.1rem] font-extrabold leading-[1.1] sm:text-5xl lg:text-[3.4rem]">{h.title}</h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">{h.subtitle}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <LinkButton href={startHref} size="lg">{h.ctaPrimary}<ArrowRight className="h-4 w-4" aria-hidden /></LinkButton>
              <LinkButton href="/trabalho" size="lg" variant="outline">{h.ctaSecondary}</LinkButton>
            </div>
          </div>
          <HeroPreview />
        </div>
      </section>

      {/* O QUE É */}
      <section className="container py-16 sm:py-20" aria-labelledby="what-title">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 id="what-title" className="text-2xl font-bold sm:text-3xl">{h.whatTitle}</h2>
            <p className="mt-4 leading-relaxed text-muted">{h.whatText1}</p>
            <p className="mt-3 leading-relaxed text-muted">{h.whatText2}</p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {dimensions.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex gap-3 rounded-2xl border border-border bg-surface p-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface-2 text-primary"><Icon className="h-5 w-5" aria-hidden /></span>
                <div>
                  <h3 className="text-sm font-semibold">{title}</h3>
                  <p className="mt-0.5 text-sm text-muted">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* PILARES */}
      <section className="border-y border-border bg-surface" aria-labelledby="pillars-title">
        <div className="container py-16 sm:py-20">
          <div className="max-w-2xl">
            <h2 id="pillars-title" className="text-2xl font-bold sm:text-3xl">{h.pillarsTitle}</h2>
            <p className="mt-3 text-muted">{h.pillarsText}</p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map(({ icon: Icon, href, tone, title, text, cta }) => (
              <Link key={href} href={href} className="group flex flex-col rounded-2xl border border-border bg-bg p-6 transition-shadow hover:shadow-lift">
                <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${tone}`}><Icon className="h-6 w-6" aria-hidden /></span>
                <h3 className="mt-5 text-lg font-semibold">{title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted">{text}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  {cta}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* REALIDADE */}
      <section className="container py-16 sm:py-20" aria-labelledby="reality-title">
        <div className="grid gap-10 rounded-[1.75rem] bg-[rgb(21_29_41)] p-6 text-white sm:p-10 lg:grid-cols-[1fr_1.3fr] lg:p-12 dark:bg-surface-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-[#F2B880]">{h.realityEyebrow}</p>
            <h2 id="reality-title" className="mt-3 text-2xl font-bold text-white sm:text-3xl">{h.realityTitle}</h2>
            <p className="mt-4 leading-relaxed text-white/75">{h.realityText}</p>
            <LinkButton href="/seguranca" variant="outline" className="mt-6 border-white/25 bg-transparent text-white hover:bg-white/10">
              <ShieldCheck className="h-4 w-4" aria-hidden />{h.realityCta}
            </LinkButton>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {reality.map(({ icon: Icon, title, text }) => (
              <li key={title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <Icon className="h-5 w-5 text-[#F2B880]" aria-hidden />
                <h3 className="mt-3 text-sm font-semibold text-white">{title}</h3>
                <p className="mt-1 text-sm text-white/70">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* COMO FUNCIONA + PÚBLICO */}
      <section className="container pb-16 sm:pb-20" aria-labelledby="steps-title">
        <h2 id="steps-title" className="text-2xl font-bold sm:text-3xl">{h.stepsTitle}</h2>
        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {[h.steps.one, h.steps.two, h.steps.three].map((step, i) => (
            <li key={step.title} className="relative rounded-2xl border border-border bg-surface p-6">
              <span className="font-display text-4xl font-extrabold text-primary/25" aria-hidden>0{i + 1}</span>
              <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
              <p className="mt-1.5 text-sm text-muted">{step.text}</p>
            </li>
          ))}
        </ol>

        <h2 className="mt-16 text-2xl font-bold sm:text-3xl">{h.audienceTitle}</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            { icon: Wifi, ...h.audience.remote, tone: "text-primary" },
            { icon: Briefcase, ...h.audience.onsite, tone: "text-sky" },
            { icon: Globe2, ...h.audience.nomad, tone: "text-accent" },
          ].map(({ icon: Icon, title, text, tone }) => (
            <div key={title} className="rounded-2xl border border-border bg-surface p-6">
              <Icon className={`h-6 w-6 ${tone}`} aria-hidden />
              <h3 className="mt-4 font-semibold">{title}</h3>
              <p className="mt-1.5 text-sm text-muted">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section className="border-y border-border bg-surface" aria-labelledby="stories-title">
        <div className="container py-16 sm:py-20">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <h2 id="stories-title" className="text-2xl font-bold sm:text-3xl">{h.storiesTitle}</h2>
            <Badge tone="accent">{h.storiesNote}</Badge>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {testimonials.map((item) => (
              <figure key={item.id} className="flex flex-col rounded-2xl border border-border bg-bg p-6">
                <blockquote className="flex-1 leading-relaxed">“{l(item.text)}”</blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <Avatar name={item.name} color={item.color} />
                  <div>
                    <p className="text-sm font-semibold">{item.name}</p>
                    <p className="text-xs text-muted">{l(item.role)}</p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="container py-16 sm:py-20">
        <div className="flex flex-col items-start gap-6 rounded-[1.75rem] border border-primary/20 bg-primary-soft p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <h2 className="text-2xl font-bold sm:text-3xl">{h.finalTitle}</h2>
            <p className="mt-2 text-muted">{h.finalText}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <LinkButton href={startHref} size="lg">{h.finalPrimary}</LinkButton>
            <LinkButton href="/comunidade" size="lg" variant="outline">{h.finalSecondary}</LinkButton>
          </div>
        </div>
      </section>
    </>
  );
}

/** Prévia ilustrativa da interface (sem imagens clichê de viagem). */
function HeroPreview() {
  const { t } = useI18n();
  const h = t.home;
  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none" aria-hidden>
      <Card className="relative z-10 p-5 shadow-lift sm:p-6">
        <div className="flex items-center justify-between">
          <p className="font-display font-semibold">{h.previewTitle}</p>
          <span className="rounded-full bg-primary-soft px-2.5 py-0.5 text-xs font-semibold text-primary">58%</span>
        </div>
        <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-surface-2"><div className="h-full w-[58%] rounded-full bg-primary" /></div>
        <p className="mt-2 text-xs text-muted">{h.previewTasks}</p>
        <ul className="mt-5 space-y-2.5">
          {[[h.previewItem1, true], [h.previewItem2, true], [h.previewItem3, false]].map(([label, done]) => (
            <li key={String(label)} className="flex items-center gap-3 rounded-xl border border-border px-3 py-2.5 text-sm">
              {done ? <CheckCircle2 className="h-5 w-5 text-success" /> : <Circle className="h-5 w-5 text-muted" />}
              <span className={done ? "text-muted line-through" : ""}>{label}</span>
            </li>
          ))}
        </ul>
      </Card>
      <div className="relative z-20 -mt-6 ml-auto mr-2 w-[85%] rounded-2xl border border-border bg-surface p-4 shadow-lift sm:-mr-6">
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#3858A5] text-xs font-semibold text-white">DF</span>
          <div className="min-w-0">
            <p className="text-sm">{h.previewChat}</p>
            <p className="mt-1.5 inline-flex items-center gap-1 text-xs text-muted"><Languages className="h-3.5 w-3.5" /> ES → PT</p>
          </div>
        </div>
      </div>
      <div className="absolute -left-4 -top-4 h-24 w-24 rounded-3xl bg-accent/15 blur-sm" />
      <div className="absolute -bottom-6 left-10 h-16 w-16 rounded-full bg-sky/15" />
    </div>
  );
}

/** Padrão abstrato de percursos e pontos de encontro. */
function RoutePattern() {
  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.55] dark:opacity-30" aria-hidden preserveAspectRatio="xMidYMid slice" viewBox="0 0 1200 600">
      <defs>
        <pattern id="dots" width="28" height="28" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.2" className="fill-border" />
        </pattern>
      </defs>
      <rect width="1200" height="600" fill="url(#dots)" />
      <path d="M-20 460 C 240 380, 360 520, 620 400 S 980 220, 1220 300" className="stroke-primary/25" strokeWidth="2" fill="none" strokeDasharray="6 8" />
      <path d="M-20 140 C 200 220, 420 80, 700 180 S 1040 420, 1220 360" className="stroke-accent/25" strokeWidth="2" fill="none" strokeDasharray="6 8" />
      <circle cx="620" cy="400" r="6" className="fill-primary/40" />
      <circle cx="700" cy="180" r="6" className="fill-accent/40" />
    </svg>
  );
}
