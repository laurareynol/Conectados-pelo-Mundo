"use client";

import { ArrowLeft, Info, Languages, Search, Send, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Field";
import { Notice } from "@/components/ui/Notice";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyState, ErrorState, Skeleton } from "@/components/ui/States";
import { getUser } from "@/data/users";
import type { ChatMessage, Conversation } from "@/data/types";
import { localeMeta } from "@/i18n/config";
import { useI18n } from "@/i18n/I18nProvider";
import { useAsync } from "@/lib/useAsync";
import { cn, normalize } from "@/lib/utils";
import { api } from "@/services";
import { translationService, type TranslationResult } from "@/services/translation";
import { useStore } from "@/store/AppStore";

function ConversationsInner() {
  const { t } = useI18n();
  const { state, hydrated } = useStore();
  const params = useSearchParams();
  const router = useRouter();
  const selectedId = params.get("c");
  const m = t.messages;
  const [q, setQ] = useState("");
  const demo = useAsync(() => api.conversations.list(), []);

  const conversations: Conversation[] = useMemo(() => {
    if (demo.status !== "success") return [];
    const extra = state.newConversations.filter((n) => !demo.data.some((d) => d.participantId === n.participantId));
    return [...demo.data, ...extra].map((c) => ({ ...c, messages: [...c.messages, ...(state.messages[c.id] ?? [])] }));
  }, [demo, state.newConversations, state.messages]);

  const sorted = [...conversations].sort((a, b) => (b.messages.at(-1)?.createdAt ?? "9").localeCompare(a.messages.at(-1)?.createdAt ?? "9"));
  const filtered = sorted.filter((c) => !q || normalize(getUser(c.participantId)?.name ?? "").includes(normalize(q)));
  const selected = conversations.find((c) => c.id === selectedId);
  const loading = demo.status === "loading" || !hydrated;

  return (
    <div className="container pb-6">
      <PageHeader title={m.title} subtitle={m.subtitle} className={cn(selected && "hidden lg:flex")} />
      <div className={cn("grid overflow-hidden rounded-2xl border border-border bg-surface shadow-card lg:h-[calc(100vh-15rem)] lg:min-h-[520px] lg:grid-cols-[320px_1fr]", selected && "mt-4 lg:mt-0")}>
        {/* Lista */}
        <aside className={cn("flex min-h-0 flex-col border-border lg:border-r", selected && "hidden lg:flex")} aria-label={m.title}>
          <div className="border-b border-border p-3">
            <label htmlFor="conv-search" className="sr-only">{m.searchPlaceholder}</label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden />
              <Input id="conv-search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={m.searchPlaceholder} className="h-10 pl-9" />
            </div>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto scrollbar-thin">
            {loading ? (
              <div className="space-y-2 p-3">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-16" />)}</div>
            ) : demo.status === "error" ? (
              <div className="p-3"><ErrorState onRetry={demo.retry} /></div>
            ) : filtered.length === 0 ? (
              <p className="p-6 text-center text-sm text-muted">{m.noConversations}</p>
            ) : (
              <ul>
                {filtered.map((c) => {
                  const u = getUser(c.participantId);
                  const last = c.messages.at(-1);
                  const active = c.id === selectedId;
                  return (
                    <li key={c.id}>
                      <Link
                        href={`/conversas?c=${c.id}`}
                        aria-current={active ? "true" : undefined}
                        className={cn("flex items-center gap-3 border-b border-border/60 px-4 py-3 hover:bg-surface-2", active && "bg-primary-soft hover:bg-primary-soft")}
                      >
                        <Avatar name={u?.name ?? "?"} color={u?.color} />
                        <span className="min-w-0 flex-1">
                          <span className="flex items-center justify-between gap-2">
                            <span className="truncate text-sm font-semibold">{u?.name}</span>
                            <span className="shrink-0 rounded bg-surface-2 px-1.5 text-[10px] font-semibold uppercase text-muted">{u?.languages[0]}</span>
                          </span>
                          <span className="block truncate text-xs text-muted" lang={last?.lang}>{last ? `${last.from === "me" ? `${t.common.you}: ` : ""}${last.text}` : m.startHint}</span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </aside>

        {/* Conversa */}
        <section className={cn("flex min-h-[70vh] flex-col lg:min-h-0", !selected && "hidden lg:flex")} aria-label={selected ? getUser(selected.participantId)?.name : m.selectTitle}>
          {selected ? (
            <ChatPane conversation={selected} onBack={() => router.push("/conversas")} />
          ) : (
            <div className="flex flex-1 items-center justify-center p-6">
              <EmptyState className="border-0 bg-transparent" icon={<Languages className="h-6 w-6" />} title={m.selectTitle} text={m.selectText} />
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function ChatPane({ conversation, onBack }: { conversation: Conversation; onBack: () => void }) {
  const { t, fmt, locale, formatDate } = useI18n();
  const { sendMessage } = useStore();
  const m = t.messages;
  const user = getUser(conversation.participantId);
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ block: "end" }); }, [conversation.messages.length, conversation.id]);

  const submit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!text.trim()) { setError(m.emptyError); return; }
    sendMessage(conversation.id, text.trim(), locale);
    setText("");
    setError(null);
  };

  if (!user) return null;

  return (
    <>
      <header className="flex items-center gap-3 border-b border-border px-4 py-3">
        <button type="button" onClick={onBack} className="rounded-lg p-1.5 hover:bg-surface-2 lg:hidden" aria-label={m.back}><ArrowLeft className="h-5 w-5" /></button>
        <Avatar name={user.name} color={user.color} />
        <div className="min-w-0 flex-1">
          <Link href={`/pessoas/${user.id}`} className="font-semibold hover:underline">{user.name}</Link>
          <p className="flex flex-wrap items-center gap-x-2 text-xs text-muted">
            <span className="inline-flex items-center gap-1"><Languages className="h-3 w-3" aria-hidden />{fmt(m.speaks, { langs: user.languages.map((x) => t.labels.lang[x]).join(", ") })}</span>
            <span>· {fmt(m.online, { tz: user.timezone })}</span>
          </p>
        </div>
        {user.mentor && <Badge tone="primary" className="hidden sm:inline-flex">{t.community.mentor}</Badge>}
      </header>

      <div className="border-b border-border bg-sky-soft/60 px-4 py-2 text-xs text-fg/90">
        <p className="flex gap-2"><Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sky" aria-hidden />{m.translateNotice}</p>
      </div>

      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-5 scrollbar-thin" role="log" aria-live="polite" aria-label={user.name}>
        {conversation.messages.length === 0 && <p className="py-10 text-center text-sm text-muted">{m.startHint}</p>}
        {conversation.messages.map((msg, i) => {
          const prev = conversation.messages[i - 1];
          const showDate = !prev || prev.createdAt.slice(0, 10) !== msg.createdAt.slice(0, 10);
          return (
            <div key={msg.id}>
              {showDate && (
                <p className="mb-3 text-center text-[11px] font-medium uppercase tracking-wide text-muted" suppressHydrationWarning>
                  {formatDate(msg.createdAt, { day: "2-digit", month: "long" })}
                </p>
              )}
              <MessageBubble message={msg} mine={msg.from === "me"} />
            </div>
          );
        })}
        <div ref={endRef} />
      </div>

      <form onSubmit={submit} className="border-t border-border p-3" noValidate>
        <p className="mb-2 flex items-center gap-1.5 text-[11px] text-muted"><ShieldCheck className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />{m.safetyTip}</p>
        <div className="flex items-end gap-2">
          <div className="flex-1">
            <label htmlFor="msg" className="sr-only">{m.inputLabel}</label>
            <Textarea
              id="msg"
              rows={1}
              value={text}
              onChange={(e) => { setText(e.target.value); setError(null); }}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submit(); } }}
              placeholder={m.inputPlaceholder}
              className="max-h-32 min-h-[44px] resize-none"
              maxLength={1000}
              aria-invalid={!!error || undefined}
              aria-describedby={error ? "msg-error" : undefined}
            />
          </div>
          <Button type="submit" size="icon" className="h-11 w-11" aria-label={m.send}><Send className="h-4 w-4" aria-hidden /></Button>
        </div>
        {error && <p id="msg-error" role="alert" className="mt-1 text-xs font-medium text-danger">{error}</p>}
      </form>
    </>
  );
}

function MessageBubble({ message, mine }: { message: ChatMessage; mine: boolean }) {
  const { t, fmt, locale, formatDate } = useI18n();
  const m = t.messages;
  const [result, setResult] = useState<TranslationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [shown, setShown] = useState(false);
  const differentLang = message.lang !== locale;

  // Ao trocar o idioma da interface, a tradução exibida deixa de valer.
  useEffect(() => { setResult(null); setShown(false); }, [locale]);

  const toggle = async () => {
    if (shown) { setShown(false); return; }
    setShown(true);
    if (!result) {
      setLoading(true);
      setResult(await translationService.translate(message, locale));
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col", mine ? "items-end" : "items-start")}>
      <div className={cn("max-w-[85%] rounded-2xl px-4 py-2.5 text-sm sm:max-w-[70%]", mine ? "rounded-br-md bg-primary text-primary-fg" : "rounded-bl-md bg-surface-2")}>
        <p className="whitespace-pre-line" lang={message.lang}>{message.text}</p>
        <p className={cn("mt-1 flex items-center gap-1.5 text-[10px]", mine ? "text-primary-fg/75" : "text-muted")} suppressHydrationWarning>
          <span className="rounded border border-current px-1 font-semibold uppercase">{message.lang}</span>
          {fmt(m.writesIn, { lang: t.labels.lang[message.lang] })} · {formatDate(message.createdAt, { hour: "2-digit", minute: "2-digit" })}
        </p>
      </div>

      {differentLang && (
        <button type="button" onClick={toggle} aria-expanded={shown} className="mt-1 inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-xs font-medium text-primary hover:bg-primary-soft">
          <Languages className="h-3.5 w-3.5" aria-hidden />{shown ? m.hideTranslation : m.translate}
        </button>
      )}

      {shown && (
        <div className="mt-1 max-w-[85%] rounded-xl border border-dashed border-sky/40 bg-sky-soft/50 px-3 py-2 text-sm sm:max-w-[70%]" aria-live="polite">
          {loading ? (
            <p className="text-xs text-muted">{m.translating}</p>
          ) : result?.status === "ok" ? (
            <>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-sky">{fmt(m.translationLabel, { lang: t.labels.lang[locale] })}</p>
              <p className="mt-0.5" lang={localeMeta[locale].htmlLang}>{result.text}</p>
              <p className="mt-1 text-[10px] text-muted">{m.original}: {t.labels.lang[message.lang]}</p>
            </>
          ) : result?.status === "same-language" ? (
            <p className="text-xs text-muted">{m.sameLanguage}</p>
          ) : (
            <p className="text-xs text-muted">{m.translationUnavailable}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default function ConversationsPage() {
  return <Suspense fallback={<div className="container py-10"><Skeleton className="h-96" /></div>}><ConversationsInner /></Suspense>;
}
