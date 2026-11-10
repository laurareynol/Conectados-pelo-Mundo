import { concernToCategory, concernToTasks, suggestions } from "@/data/content";
import { destinations } from "@/data/destinations";
import { jobs } from "@/data/jobs";
import { getTemplate } from "@/data/planner";
import type { Job, Post } from "@/data/types";
import type { PlannerTask, UserProfile } from "@/store/types";

const priorityWeight = { high: 0, medium: 1, low: 2 } as const;

export function recommendedJobs(profile: UserProfile | null, limit = 3): Job[] {
  const scored = jobs.map((j) => {
    let score = 0;
    if (profile) {
      if (j.area === profile.area) score += 5;
      if (profile.regions.includes(j.region) || j.region === "global") score += 2;
      if (profile.workType === j.contract) score += 1;
      if (profile.stage === "onsite" && j.modality === "country") score += 1;
    }
    if (j.verified) score += 1;
    return { j, score };
  });
  return scored.sort((a, b) => b.score - a.score || b.j.postedAt.localeCompare(a.j.postedAt)).slice(0, limit).map((x) => x.j);
}

export function recommendedPosts(profile: UserProfile | null, feed: Post[], limit = 3): Post[] {
  const cats = new Set((profile?.concerns ?? ["planning"]).flatMap((c) => concernToCategory[c]));
  const interests = new Set(profile?.interests ?? []);
  return [...feed]
    .filter((p) => !p.pendingReview && p.authorId !== "me")
    .map((p) => ({ p, score: (cats.has(p.category) ? 3 : 0) + (p.destinationId && interests.has(p.destinationId) ? 2 : 0) + p.likes / 50 }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.p);
}

export function personalSuggestions(profile: UserProfile | null, limit = 3) {
  const concerns = profile?.concerns?.length ? profile.concerns : (["planning", "work", "safety"] as const);
  const list = suggestions.filter((s) => (concerns as readonly string[]).includes(s.concern));
  return (list.length ? list : suggestions).slice(0, limit);
}

/** Próximas tarefas: pendentes, priorizando as ligadas às preocupações e à prioridade. */
export function nextTasks(planner: PlannerTask[], profile: UserProfile | null, limit = 4) {
  const related = new Set((profile?.concerns ?? []).flatMap((c) => concernToTasks[c]));
  return planner
    .filter((t) => !t.done)
    .sort((a, b) =>
      (related.has(b.templateId ?? "") ? 1 : 0) - (related.has(a.templateId ?? "") ? 1 : 0) ||
      priorityWeight[a.priority] - priorityWeight[b.priority],
    )
    .slice(0, limit);
}

export function interestDestinations(profile: UserProfile | null) {
  if (!profile) return destinations.slice(0, 3);
  const ids = profile.interests.length ? profile.interests : destinations.filter((d) => profile.regions.includes(d.region)).map((d) => d.id);
  const list = destinations.filter((d) => ids.includes(d.id));
  return list.length ? list.slice(0, 3) : destinations.slice(0, 3);
}

export { getTemplate };
