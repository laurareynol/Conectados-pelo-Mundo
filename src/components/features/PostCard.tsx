"use client";

import { Flag, Heart, MapPin, MessageCircle, Send, ShieldAlert, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { Textarea } from "@/components/ui/Field";
import { SaveButton } from "@/components/ui/SaveButton";
import { useToast } from "@/components/ui/Toast";
import { getDestination } from "@/data/destinations";
import { useI18n } from "@/i18n/I18nProvider";
import { resolveAuthor, type FeedPost } from "@/lib/community";
import { cn } from "@/lib/utils";
import { useStore } from "@/store/AppStore";

export function PostCard({ post, defaultOpen = false, highlight = false }: { post: FeedPost; defaultOpen?: boolean; highlight?: boolean }) {
  const { t, l, fmt, formatRelative, locale } = useI18n();
  const { state, toggleLike, reportPost, removePost, addPostComment } = useStore();
  const toast = useToast();
  const [open, setOpen] = useState(defaultOpen);
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState<string | null>(null);
  const [confirm, setConfirm] = useState<"report" | "delete" | null>(null);
  const c = t.community;

  const author = resolveAuthor(post.authorId, state.profile, t.common.you);
  const destination = post.destinationId ? getDestination(post.destinationId) : undefined;
  const commentsId = `comments-${post.id}`;

  const submitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim().length < 3) { setCommentError(c.commentError); return; }
    addPostComment(post.id, comment.trim(), locale);
    setComment("");
    setCommentError(null);
    toast(c.commentSent);
  };

  return (
    <article id={`post-${post.id}`} className={cn("scroll-mt-24 rounded-2xl border bg-surface p-5 shadow-card", highlight ? "border-primary ring-2 ring-primary/20" : "border-border")}>
      <header className="flex items-start gap-3">
        <Avatar name={author.name} color={author.color} src={author.avatar} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            {author.isMe ? (
              <span className="text-sm font-semibold">{author.name}</span>
            ) : (
              <Link href={`/pessoas/${author.id}`} className="text-sm font-semibold hover:underline">{author.name}</Link>
            )}
            {author.mentor && <Badge tone="primary">{c.mentor}</Badge>}
          </div>
          <p className="text-xs text-muted" suppressHydrationWarning>
            {formatRelative(post.createdAt)} · {fmt(c.writtenIn, { lang: t.labels.lang[post.lang] })}
          </p>
        </div>
        <SaveButton type="post" id={post.id} label={post.title} />
      </header>

      <div className="mt-3 flex flex-wrap gap-1.5">
        <Badge tone={post.type === "question" ? "sky" : "accent"}>{t.labels.postType[post.type]}</Badge>
        <Badge>{t.labels.postCategory[post.category]}</Badge>
        {destination && (
          <Link href={`/moradia/${destination.id}`} className="inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-0.5 text-xs font-medium hover:bg-surface-2">
            <MapPin className="h-3 w-3" aria-hidden />{l(destination.city)}
          </Link>
        )}
        {post.pendingReview && <Badge tone="warning"><ShieldAlert className="h-3 w-3" aria-hidden />{c.pendingReview}</Badge>}
      </div>

      <h3 className="mt-3 text-base font-semibold leading-snug" lang={post.lang}>{post.title}</h3>
      <p className="mt-1.5 whitespace-pre-line text-sm leading-relaxed text-muted" lang={post.lang}>{post.body}</p>

      <footer className="mt-4 flex flex-wrap items-center gap-1 border-t border-border pt-3">
        <Button
          variant="ghost"
          size="sm"
          aria-pressed={post.liked}
          onClick={() => toggleLike(post.id)}
          className={cn(post.liked && "text-accent")}
          aria-label={`${post.liked ? t.common.liked : t.common.like} · ${fmt(c.likesCount, { n: post.likeCount })}`}
        >
          <Heart className={cn("h-4 w-4", post.liked && "fill-current")} aria-hidden />
          <span className="tabular-nums">{post.likeCount}</span>
        </Button>
        <Button variant="ghost" size="sm" aria-expanded={open} aria-controls={commentsId} onClick={() => setOpen(!open)}>
          <MessageCircle className="h-4 w-4" aria-hidden />
          <span>{fmt(c.comments, { n: post.comments.length })}</span>
        </Button>
        <div className="ml-auto">
          {author.isMe ? (
            <Button variant="ghost" size="sm" onClick={() => setConfirm("delete")} className="text-muted">
              <Trash2 className="h-4 w-4" aria-hidden /><span className="sr-only sm:not-sr-only">{c.deletePost}</span>
            </Button>
          ) : (
            <Button variant="ghost" size="sm" onClick={() => setConfirm("report")} disabled={post.reported} className="text-muted">
              <Flag className="h-4 w-4" aria-hidden /><span className="sr-only sm:not-sr-only">{post.reported ? "✓" : t.common.report}</span>
            </Button>
          )}
        </div>
      </footer>

      {open && (
        <section id={commentsId} aria-label={c.showComments} className="mt-3 space-y-3">
          {post.comments.length === 0 && <p className="text-sm text-muted">{c.noComments}</p>}
          {post.comments.map((cm) => {
            const a = resolveAuthor(cm.authorId, state.profile, t.common.you);
            return (
              <div key={cm.id} className="flex gap-2.5">
                <Avatar name={a.name} color={a.color} src={a.avatar} size="sm" />
                <div className="min-w-0 flex-1 rounded-xl bg-surface-2 px-3 py-2">
                  <p className="text-xs"><span className="font-semibold">{a.name}</span> <span className="text-muted" suppressHydrationWarning>· {formatRelative(cm.createdAt)} · {t.labels.lang[cm.lang]}</span></p>
                  <p className="mt-0.5 text-sm" lang={cm.lang}>{cm.text}</p>
                </div>
              </div>
            );
          })}
          <form onSubmit={submitComment} className="flex items-start gap-2" noValidate>
            <div className="flex-1">
              <label htmlFor={`c-${post.id}`} className="sr-only">{c.addComment}</label>
              <Textarea
                id={`c-${post.id}`}
                value={comment}
                onChange={(e) => { setComment(e.target.value); setCommentError(null); }}
                placeholder={c.commentPlaceholder}
                className="min-h-[44px]"
                rows={1}
                maxLength={600}
                aria-invalid={!!commentError || undefined}
                aria-describedby={commentError ? `ce-${post.id}` : undefined}
              />
              {commentError && <p id={`ce-${post.id}`} role="alert" className="mt-1 text-xs font-medium text-danger">{commentError}</p>}
            </div>
            <Button type="submit" size="icon" aria-label={t.common.send}><Send className="h-4 w-4" aria-hidden /></Button>
          </form>
        </section>
      )}

      <ConfirmDialog
        open={confirm === "report"}
        onClose={() => setConfirm(null)}
        title={c.reportConfirmTitle}
        text={c.reportConfirmText}
        confirmLabel={t.common.report}
        onConfirm={() => { reportPost(post.id); toast(t.common.reportToast, "info"); }}
      />
      <ConfirmDialog
        open={confirm === "delete"}
        onClose={() => setConfirm(null)}
        title={c.deletePost}
        text={post.title}
        confirmLabel={t.common.delete}
        danger
        onConfirm={() => { removePost(post.id); toast(c.deletedToast, "info"); }}
      />
    </article>
  );
}
