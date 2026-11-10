"use client";

import Link from "next/link";
import { useI18n } from "@/i18n/I18nProvider";
import { LogoMark } from "./Logo";

export function Footer() {
  const { t } = useI18n();
  const cols = [
    { title: t.footer.platform, links: [["/planejador", t.nav.planner], ["/trabalho", t.nav.work], ["/moradia", t.nav.housing], ["/comunidade", t.nav.community]] },
    { title: t.footer.support, links: [["/trabalho/guia", t.nav.guide], ["/seguranca", t.nav.safety], ["/seguranca#denuncia", t.safety.reportTitle], ["/perfil", t.nav.profile]] },
    { title: t.footer.legal, links: [["/termos", t.nav.terms], ["/privacidade", t.nav.privacy]] },
  ];
  return (
    <footer className="mt-16 border-t border-border bg-surface pb-24 lg:pb-0">
      <div className="container grid gap-8 py-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="max-w-xs">
          <div className="flex items-center gap-2.5"><LogoMark /><span className="font-display font-bold">{t.common.appName}</span></div>
          <p className="mt-3 text-sm text-muted">{t.footer.about}</p>
        </div>
        {cols.map((col) => (
          <div key={col.title}>
            <h2 className="text-sm font-semibold">{col.title}</h2>
            <ul className="mt-3 space-y-2">
              {col.links.map(([href, label]) => (
                <li key={href}><Link href={href} className="text-sm text-muted hover:text-fg">{label}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="container flex flex-col gap-1 py-4 text-xs text-muted sm:flex-row sm:justify-between">
          <span>{t.footer.rights}</span>
          <span>{t.footer.demo}</span>
        </div>
      </div>
    </footer>
  );
}
