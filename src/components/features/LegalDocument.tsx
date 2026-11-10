"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Notice } from "@/components/ui/Notice";
import { PageHeader } from "@/components/ui/PageHeader";
import type { LegalDoc } from "@/data/safety";
import { useI18n } from "@/i18n/I18nProvider";

export function LegalDocument({ doc, title }: { doc: LegalDoc; title: string }) {
  const { t, l, fmt, formatDate } = useI18n();
  return (
    <div className="container max-w-4xl pb-10">
      <Link href="/seguranca" className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-fg"><ArrowLeft className="h-4 w-4" aria-hidden />{t.nav.safety}</Link>
      <PageHeader title={title} subtitle={fmt(t.safety.lastUpdated, { date: formatDate(doc.updatedAt) })} className="pt-4 sm:pt-4" />
      <Notice tone="demo">{t.safety.legalDemo}</Notice>
      <div className="mt-6 grid gap-6 md:grid-cols-[200px_1fr]">
        <nav aria-label={t.safety.contents} className="md:sticky md:top-24 md:self-start">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">{t.safety.contents}</p>
          <ol className="space-y-1 text-sm">
            {doc.sections.map((s, i) => <li key={i}><a href={`#sec-${i}`} className="block rounded-lg px-2 py-1 hover:bg-surface-2">{l(s.title)}</a></li>)}
          </ol>
        </nav>
        <Card as="article" className="space-y-8 p-6 sm:p-8">
          {doc.sections.map((s, i) => (
            <section key={i} id={`sec-${i}`} className="scroll-mt-24">
              <h2 className="text-lg font-semibold">{l(s.title)}</h2>
              <div className="prose-cpm mt-2">{s.paragraphs.map((p, j) => <p key={j}>{l(p)}</p>)}</div>
            </section>
          ))}
        </Card>
      </div>
    </div>
  );
}
