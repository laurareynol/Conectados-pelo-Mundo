"use client";

import { BriefcaseBusiness, CheckCircle2, FileText, Handshake, Home, Lock, Scale, ShieldCheck, Users } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Field, Input, Select, Textarea } from "@/components/ui/Field";
import { Notice } from "@/components/ui/Notice";
import { PageHeader } from "@/components/ui/PageHeader";
import { useToast } from "@/components/ui/Toast";
import { safetySections, transparencyItems } from "@/data/safety";
import { useI18n } from "@/i18n/I18nProvider";
import { useStore } from "@/store/AppStore";

const sectionIcons: Record<string, typeof ShieldCheck> = {
  "vagas-suspeitas": BriefcaseBusiness, moradia: Home, "dados-pessoais": Lock, negociacoes: Handshake, regras: Users,
};
const reportTypes = ["job", "housing", "harassment", "scam", "privacy", "other"] as const;

export default function SafetyPage() {
  const { t, l } = useI18n();
  const s = t.safety;

  return (
    <div className="container pb-10">
      <PageHeader title={s.title} subtitle={s.subtitle} />

      <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
        <nav aria-label={s.onThisPage} className="lg:sticky lg:top-24 lg:self-start">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">{s.onThisPage}</p>
          <ul className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
            {safetySections.map((x) => <li key={x.id}><a href={`#${x.id}`} className="block rounded-lg px-3 py-1.5 text-sm hover:bg-surface-2">{l(x.title)}</a></li>)}
            <li><a href="#transparencia" className="block rounded-lg px-3 py-1.5 text-sm hover:bg-surface-2">{s.transparencyTitle}</a></li>
            <li><a href="#denuncia" className="block rounded-lg px-3 py-1.5 text-sm hover:bg-surface-2">{s.reportTitle}</a></li>
            <li><a href="#documentos" className="block rounded-lg px-3 py-1.5 text-sm hover:bg-surface-2">{s.legalTitle}</a></li>
          </ul>
        </nav>

        <div className="min-w-0 space-y-5">
          {safetySections.map((x) => {
            const Icon = sectionIcons[x.id] ?? ShieldCheck;
            return (
              <Card as="section" key={x.id} id={x.id} aria-labelledby={`${x.id}-t`} className="scroll-mt-24 p-5 sm:p-6">
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary"><Icon className="h-5 w-5" aria-hidden /></span>
                  <div>
                    <h2 id={`${x.id}-t`} className="text-lg font-semibold">{l(x.title)}</h2>
                    <p className="mt-0.5 text-sm text-muted">{l(x.intro)}</p>
                  </div>
                </div>
                <ul className="mt-4 space-y-2.5">
                  {x.items.map((item, i) => (
                    <li key={i} className="flex gap-2.5 text-sm leading-relaxed"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />{l(item)}</li>
                  ))}
                </ul>
              </Card>
            );
          })}

          <section id="transparencia" aria-labelledby="tr-t" className="scroll-mt-24">
            <h2 id="tr-t" className="mb-3 text-lg font-semibold">{s.transparencyTitle}</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {transparencyItems.map((item, i) => (
                <div key={i} className="rounded-2xl border border-border bg-surface p-4">
                  <h3 className="flex items-center gap-2 text-sm font-semibold"><Scale className="h-4 w-4 text-sky" aria-hidden />{l(item.title)}</h3>
                  <p className="mt-1.5 text-sm text-muted">{l(item.text)}</p>
                </div>
              ))}
            </div>
          </section>

          <ReportForm />

          <section id="documentos" aria-labelledby="docs-t" className="scroll-mt-24">
            <h2 id="docs-t" className="text-lg font-semibold">{s.legalTitle}</h2>
            <p className="text-sm text-muted">{s.legalDemo}</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {[["/termos", s.terms], ["/privacidade", s.privacy]].map(([href, label]) => (
                <Link key={href} href={href} className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-4 hover:shadow-card">
                  <FileText className="h-5 w-5 text-primary" aria-hidden /><span className="font-medium">{label}</span>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function ReportForm() {
  const { t, fmt, formatDate } = useI18n();
  const { state, addReport } = useStore();
  const toast = useToast();
  const s = t.safety;
  const [type, setType] = useState<(typeof reportTypes)[number]>("job");
  const [link, setLink] = useState("");
  const [desc, setDesc] = useState("");
  const [anon, setAnon] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState<string | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (desc.trim().length < 20) { setError(s.reportError); return; }
    setLoading(true);
    setTimeout(() => {
      const c = addReport(type);
      setCode(c);
      setLoading(false);
      setLink(""); setDesc(""); setAnon(false);
      toast(s.reportSuccessTitle);
    }, 600);
  };

  return (
    <Card as="section" id="denuncia" aria-labelledby="rep-t" className="scroll-mt-24 p-5 sm:p-6">
      <h2 id="rep-t" className="text-lg font-semibold">{s.reportTitle}</h2>
      <p className="mt-1 text-sm text-muted">{s.reportText}</p>
      <Notice tone="demo" className="mt-4">{s.reportDemo}</Notice>

      {code ? (
        <div role="status" className="mt-5 rounded-2xl border border-success/30 bg-success-soft p-5">
          <p className="flex items-center gap-2 font-semibold"><CheckCircle2 className="h-5 w-5 text-success" aria-hidden />{s.reportSuccessTitle}</p>
          <p className="mt-1 text-sm">{fmt(s.reportSuccess, { code })}</p>
          <Button variant="outline" size="sm" className="mt-4" onClick={() => setCode(null)}>{s.reportAnother}</Button>
        </div>
      ) : (
        <form onSubmit={submit} className="mt-5 space-y-4" noValidate>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={s.reportType}>
              {(f) => <Select {...f} value={type} onChange={(e) => setType(e.target.value as typeof type)}>{reportTypes.map((x) => <option key={x} value={x}>{s.reportTypes[x]}</option>)}</Select>}
            </Field>
            <Field label={s.reportLink} optional={t.common.optional}>
              {(f) => <Input {...f} value={link} onChange={(e) => setLink(e.target.value)} placeholder={s.reportLinkPlaceholder} maxLength={200} />}
            </Field>
          </div>
          <Field label={s.reportDescription} error={error} hint={`${desc.length}/1000`}>
            {(f) => <Textarea {...f} value={desc} onChange={(e) => { setDesc(e.target.value); setError(null); }} placeholder={s.reportDescriptionPlaceholder} maxLength={1000} className="min-h-[120px]" />}
          </Field>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={anon} onChange={(e) => setAnon(e.target.checked)} className="h-4 w-4 rounded border-border accent-[rgb(var(--primary))]" />
            {s.reportAnonymous}
          </label>
          <Button type="submit" loading={loading}>{s.reportSubmit}</Button>
        </form>
      )}

      {state.reports.length > 0 && (
        <div className="mt-6 border-t border-border pt-4">
          <h3 className="text-sm font-semibold">{s.reportHistory}</h3>
          <ul className="mt-2 space-y-1.5 text-sm">
            {state.reports.slice(0, 5).map((r) => (
              <li key={r.code} className="flex flex-wrap justify-between gap-2 rounded-lg bg-surface-2 px-3 py-2">
                <span className="font-mono text-xs">{r.code}</span>
                <span className="text-xs text-muted">{s.reportTypes[r.type as keyof typeof s.reportTypes] ?? r.type} · {formatDate(r.createdAt)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
}
