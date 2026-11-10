import { destinations } from "@/data/destinations";
import { workGuides } from "@/data/guides";
import { jobs } from "@/data/jobs";
import { getTemplate } from "@/data/planner";
import { posts } from "@/data/posts";
import { safetySections } from "@/data/safety";
import type { Localized, Post } from "@/data/types";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { PlannerTask } from "@/store/types";
import { normalize } from "./utils";

export type SearchGroup = "pages" | "jobs" | "destinations" | "posts" | "guides" | "tasks";
export interface SearchResult {
  group: SearchGroup;
  id: string;
  title: string;
  subtitle?: string;
  href: string;
}

const pick = (v: Localized, locale: Locale) => v[locale] ?? v.pt;

/** Busca global local sobre vagas, destinos, publicações, guias, tarefas e páginas. */
export function globalSearch(query: string, ctx: { locale: Locale; t: Dictionary; userPosts: Post[]; planner: PlannerTask[] }): SearchResult[] {
  const q = normalize(query.trim());
  if (q.length < 2) return [];
  const terms = q.split(/\s+/);
  const match = (...fields: (string | undefined)[]) => {
    const hay = normalize(fields.filter(Boolean).join(" "));
    return terms.every((term) => hay.includes(term));
  };
  const { locale, t } = ctx;
  const results: SearchResult[] = [];

  const pages: [string, string][] = [
    [t.nav.dashboard, "/painel"], [t.nav.planner, "/planejador"], [t.nav.work, "/trabalho"], [t.nav.guide, "/trabalho/guia"],
    [t.nav.housing, "/moradia"], [t.nav.community, "/comunidade"], [t.nav.messages, "/conversas"], [t.nav.profile, "/perfil"],
    [t.nav.saved, "/salvos"], [t.nav.safety, "/seguranca"], [t.nav.terms, "/termos"], [t.nav.privacy, "/privacidade"],
  ];
  pages.forEach(([title, href]) => match(title) && results.push({ group: "pages", id: href, title, href }));

  jobs.forEach((j) => {
    const title = pick(j.title, locale);
    if (match(title, j.company, pick(j.description, locale), t.labels.area[j.area], t.labels.contract[j.contract]))
      results.push({ group: "jobs", id: j.id, title, subtitle: `${j.company} · ${t.labels.contract[j.contract]}`, href: `/trabalho/${j.id}` });
  });

  destinations.forEach((d) => {
    const city = pick(d.city, locale);
    const country = pick(d.country, locale);
    if (match(city, country, pick(d.summary, locale), ...d.housing.map((h) => t.labels.housingType[h]), ...d.coworkings.map((c) => c.name)))
      results.push({ group: "destinations", id: d.id, title: city, subtitle: country, href: `/moradia/${d.id}` });
  });

  [...ctx.userPosts.filter((p) => !p.pendingReview), ...posts].forEach((p) => {
    if (match(p.title, p.body, t.labels.postCategory[p.category]))
      results.push({ group: "posts", id: p.id, title: p.title, subtitle: t.labels.postCategory[p.category], href: `/comunidade?post=${p.id}` });
  });

  workGuides.forEach((g) => {
    if (match(pick(g.title, locale), pick(g.summary, locale), pick(g.whatIs, locale)))
      results.push({ group: "guides", id: g.id, title: pick(g.title, locale), subtitle: t.nav.guide, href: `/trabalho/guia#${g.id}` });
  });
  safetySections.forEach((s) => {
    if (match(pick(s.title, locale), pick(s.intro, locale), ...s.items.map((i) => pick(i, locale))))
      results.push({ group: "guides", id: s.id, title: pick(s.title, locale), subtitle: t.nav.safety, href: `/seguranca#${s.id}` });
  });

  ctx.planner.forEach((task) => {
    const tpl = getTemplate(task.templateId);
    const title = task.title ?? (tpl ? pick(tpl.title, locale) : "");
    if (match(title, tpl && pick(tpl.description, locale), task.notes))
      results.push({ group: "tasks", id: task.id, title, subtitle: t.labels.taskCategory[task.category], href: `/planejador#task-${task.id}` });
  });

  return results;
}
