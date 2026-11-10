"use client";

import { ArrowLeft, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PostCard } from "@/components/features/PostCard";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button, LinkButton } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Notice } from "@/components/ui/Notice";
import { EmptyState, ErrorState, Skeleton } from "@/components/ui/States";
import { useI18n } from "@/i18n/I18nProvider";
import { useFeed } from "@/lib/community";
import { useAsync } from "@/lib/useAsync";
import { api } from "@/services";
import { useStore } from "@/store/AppStore";

export function PersonProfile({ id }: { id: string }) {
  const { t, l } = useI18n();
  const { startConversation } = useStore();
  const router = useRouter();
  const feed = useFeed();
  const state = useAsync(() => api.community.getUser(id), [id]);
  const pp = t.people;

  return (
    <div className="container max-w-4xl py-8">
      <Link href="/comunidade" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-fg"><ArrowLeft className="h-4 w-4" aria-hidden />{t.nav.community}</Link>
      {state.status === "loading" && <div className="mt-6 space-y-3" aria-busy="true"><Skeleton className="h-24 w-24 rounded-full" /><Skeleton className="h-8 w-1/2" /><Skeleton className="h-32" /></div>}
      {state.status === "error" && <div className="mt-6"><ErrorState onRetry={state.retry} /></div>}
      {state.status === "success" && !state.data && <EmptyState className="mt-6" title={pp.notFound} action={<LinkButton href="/comunidade">{t.nav.community}</LinkButton>} />}
      {state.status === "success" && state.data && (() => {
        const u = state.data;
        const posts = feed.filter((p) => p.authorId === u.id);
        return (
          <>
            <Card className="mt-6 p-6">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                <Avatar name={u.name} color={u.color} size="xl" />
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-2xl font-bold">{u.name}</h1>
                    {u.mentor && <Badge tone="primary">{t.community.mentor}</Badge>}
                  </div>
                  <p className="mt-1 text-sm text-muted">{pp.demoProfile}</p>
                  <p className="mt-3 leading-relaxed">{l(u.bio)}</p>
                </div>
              </div>
              <dl className="mt-6 grid gap-3 border-t border-border pt-5 text-sm sm:grid-cols-2 lg:grid-cols-5">
                <div><dt className="text-muted">{pp.base}</dt><dd className="font-medium">{u.base} ({u.timezone})</dd></div>
                <div><dt className="text-muted">{pp.languages}</dt><dd className="font-medium">{u.languages.map((x) => t.labels.lang[x]).join(", ")}</dd></div>
                <div><dt className="text-muted">{pp.area}</dt><dd className="font-medium">{t.labels.area[u.area]}</dd></div>
                <div><dt className="text-muted">{pp.workType}</dt><dd className="font-medium">{t.labels.workType[u.workType]}</dd></div>
                <div><dt className="text-muted">{pp.experience}</dt><dd className="font-medium">{t.labels.experience[u.experience]}</dd></div>
              </dl>
              <div className="mt-5">
                {u.allowMessages ? (
                  <Button onClick={() => router.push(`/conversas?c=${startConversation(u.id)}`)}><MessageCircle className="h-4 w-4" aria-hidden />{t.community.sendMessage}</Button>
                ) : (
                  <Notice tone="info">{pp.messagesOff}</Notice>
                )}
              </div>
            </Card>
            <section aria-labelledby="pp-posts" className="mt-8">
              <h2 id="pp-posts" className="mb-3 text-lg font-semibold">{pp.posts}</h2>
              {posts.length === 0 ? <EmptyState title={pp.noPosts} /> : <div className="space-y-4">{posts.map((p) => <PostCard key={p.id} post={p} />)}</div>}
            </section>
          </>
        );
      })()}
    </div>
  );
}
