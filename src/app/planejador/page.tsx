"use client";

import { Check, ChevronDown, Pencil, Plus, RotateCcw, Scale, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { Field, Input, Select, Textarea } from "@/components/ui/Field";
import { Notice } from "@/components/ui/Notice";
import { PageHeader } from "@/components/ui/PageHeader";
import { Progress } from "@/components/ui/Progress";
import { EmptyState, Skeleton } from "@/components/ui/States";
import { useToast } from "@/components/ui/Toast";
import { getTemplate } from "@/data/planner";
import type { Priority, TaskCategory } from "@/data/types";
import { useI18n } from "@/i18n/I18nProvider";
import { taskTitle } from "@/lib/planner";
import { cn } from "@/lib/utils";
import { usePlannerProgress, useStore } from "@/store/AppStore";
import type { PlannerTask } from "@/store/types";

const priorities: Priority[] = ["high", "medium", "low"];
const categories: TaskCategory[] = ["work", "finance", "documents", "destination", "housing", "connectivity", "health", "equipment", "safety"];
const priorityTone = { high: "accent", medium: "sky", low: "neutral" } as const;

export default function PlannerPage() {
  const { t, fmt } = useI18n();
  const { state, hydrated, addTask, resetPlanner } = useStore();
  const progress = usePlannerProgress();
  const toast = useToast();
  const p = t.planner;

  const [status, setStatus] = useState<"all" | "pending" | "done">("all");
  const [priority, setPriority] = useState<Priority | "all">("all");
  const [category, setCategory] = useState<TaskCategory | "all">("all");
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState<TaskCategory>("destination");
  const [newPriority, setNewPriority] = useState<Priority>("medium");
  const [addError, setAddError] = useState<string | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    if (!hydrated) return;
    const hash = window.location.hash.replace("#task-", "");
    if (hash) {
      setOpenId(hash);
      setTimeout(() => document.getElementById(`task-${hash}`)?.scrollIntoView({ behavior: "smooth", block: "center" }), 50);
    }
  }, [hydrated]);

  const filtered = state.planner.filter(
    (x) =>
      (status === "all" || (status === "done" ? x.done : !x.done)) &&
      (priority === "all" || x.priority === priority) &&
      (category === "all" || x.category === category),
  );

  const submitNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTitle.trim().length < 3) { setAddError(p.addError); return; }
    const task = addTask(newTitle.trim(), newCategory, newPriority);
    setNewTitle("");
    setAddError(null);
    toast(p.addedToast);
    setOpenId(task.id);
  };

  return (
    <div className="container pb-10">
      <PageHeader
        title={p.title}
        subtitle={p.subtitle}
        actions={<Button variant="outline" size="sm" onClick={() => setConfirmReset(true)}><RotateCcw className="h-4 w-4" aria-hidden />{p.reset}</Button>}
      />

      <Notice tone="warning" title={t.common.important}>{p.disclaimer}</Notice>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="min-w-0">
          <Card className="p-5">
            {hydrated ? (
              <>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-display text-2xl font-bold">{fmt(p.progress, { percent: progress.percent })}</p>
                  <p className="text-sm text-muted">{fmt(t.dashboard.tasksDone, { done: progress.done, total: progress.total })}</p>
                </div>
                <Progress className="mt-3 h-3" value={progress.percent} label={fmt(p.progress, { percent: progress.percent })} tone={progress.percent === 100 ? "success" : "primary"} />
                {progress.percent === 100 && <p className="mt-3 text-sm font-medium text-success">{p.allDone}</p>}
              </>
            ) : (
              <Skeleton className="h-14" />
            )}
          </Card>

          <div className="mt-4 flex flex-wrap items-end gap-3" role="group" aria-label={t.common.filters}>
            <div role="radiogroup" aria-label={p.status} className="inline-flex rounded-xl border border-border bg-surface p-1">
              {(["all", "pending", "done"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  role="radio"
                  aria-checked={status === s}
                  onClick={() => setStatus(s)}
                  className={cn("rounded-lg px-3 py-1.5 text-sm font-medium", status === s ? "bg-primary text-primary-fg" : "text-muted hover:text-fg")}
                >
                  {s === "all" ? p.statusAll : s === "pending" ? p.statusPending : p.statusDone}
                </button>
              ))}
            </div>
            <div className="w-40">
              <label htmlFor="f-priority" className="mb-1 block text-xs font-medium text-muted">{p.priority}</label>
              <Select id="f-priority" value={priority} onChange={(e) => setPriority(e.target.value as Priority | "all")} className="h-10">
                <option value="all">{t.common.all}</option>
                {priorities.map((x) => <option key={x} value={x}>{t.labels.priority[x]}</option>)}
              </Select>
            </div>
            <div className="w-48">
              <label htmlFor="f-category" className="mb-1 block text-xs font-medium text-muted">{p.category}</label>
              <Select id="f-category" value={category} onChange={(e) => setCategory(e.target.value as TaskCategory | "all")} className="h-10">
                <option value="all">{t.common.all}</option>
                {categories.map((x) => <option key={x} value={x}>{t.labels.taskCategory[x]}</option>)}
              </Select>
            </div>
          </div>

          <div className="mt-4">
            {!hydrated ? (
              <div className="space-y-2">{Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-16" />)}</div>
            ) : filtered.length === 0 ? (
              <EmptyState title={p.emptyFiltered} text={p.emptyFilteredText} />
            ) : (
              <ul className="space-y-2">
                {filtered.map((task) => (
                  <TaskItem key={task.id} task={task} open={openId === task.id} onToggleOpen={() => setOpenId(openId === task.id ? null : task.id)} />
                ))}
              </ul>
            )}
          </div>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <Card as="section" aria-labelledby="add-title" className="p-5">
            <h2 id="add-title" className="font-semibold">{p.addTitle}</h2>
            <form onSubmit={submitNew} className="mt-3 space-y-3" noValidate>
              <Field label={p.addLabel} error={addError}>
                {(f) => <Input {...f} value={newTitle} onChange={(e) => { setNewTitle(e.target.value); setAddError(null); }} placeholder={p.addPlaceholder} maxLength={80} />}
              </Field>
              <div className="grid grid-cols-2 gap-2">
                <Field label={p.category}>
                  {(f) => (
                    <Select {...f} value={newCategory} onChange={(e) => setNewCategory(e.target.value as TaskCategory)}>
                      {categories.map((x) => <option key={x} value={x}>{t.labels.taskCategory[x]}</option>)}
                    </Select>
                  )}
                </Field>
                <Field label={p.priority}>
                  {(f) => (
                    <Select {...f} value={newPriority} onChange={(e) => setNewPriority(e.target.value as Priority)}>
                      {priorities.map((x) => <option key={x} value={x}>{t.labels.priority[x]}</option>)}
                    </Select>
                  )}
                </Field>
              </div>
              <Button type="submit" className="w-full"><Plus className="h-4 w-4" aria-hidden />{p.addButton}</Button>
            </form>
          </Card>
          <Notice tone="safety" title={t.common.tip}>{p.tip}</Notice>
          {hydrated && <p className="px-1 text-sm text-muted">{fmt(p.remaining, { n: progress.total - progress.done })}</p>}
        </aside>
      </div>

      <ConfirmDialog
        open={confirmReset}
        onClose={() => setConfirmReset(false)}
        title={p.resetConfirmTitle}
        text={p.resetConfirm}
        confirmLabel={p.reset}
        danger
        onConfirm={() => { resetPlanner(); toast(p.resetToast, "info"); }}
      />
    </div>
  );
}

function TaskItem({ task, open, onToggleOpen }: { task: PlannerTask; open: boolean; onToggleOpen: () => void }) {
  const { t, l, fmt } = useI18n();
  const { toggleTask, updateTask, removeTask } = useStore();
  const toast = useToast();
  const p = t.planner;
  const tpl = getTemplate(task.templateId);
  const title = taskTitle(task, l);
  const [notes, setNotes] = useState(task.notes);
  const [editing, setEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(title);
  const [savedHint, setSavedHint] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const panelId = `panel-${task.id}`;

  useEffect(() => setNotes(task.notes), [task.notes]);

  const onNotes = (value: string) => {
    setNotes(value);
    setSavedHint(false);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => { updateTask(task.id, { notes: value }); setSavedHint(true); }, 600);
  };

  return (
    <li id={`task-${task.id}`} className={cn("scroll-mt-24 rounded-2xl border bg-surface transition-colors", task.done ? "border-success/30" : "border-border")}>
      <div className="flex items-center gap-3 p-3 sm:p-4">
        <button
          type="button"
          role="checkbox"
          aria-checked={task.done}
          aria-label={fmt(p.markDone, { task: title })}
          onClick={() => { const d = toggleTask(task.id); toast(d ? p.completedToast : p.reopenedToast, d ? "success" : "info"); }}
          className={cn("flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border-2 transition-colors", task.done ? "border-success bg-success text-white dark:text-bg" : "border-border hover:border-primary")}
        >
          {task.done && <Check className="h-4 w-4" strokeWidth={3} aria-hidden />}
        </button>
        <div className="min-w-0 flex-1">
          <p className={cn("text-sm font-medium sm:text-[15px]", task.done && "text-muted line-through")}>{title}</p>
          <div className="mt-1 flex flex-wrap gap-1.5">
            <Badge tone={priorityTone[task.priority]}>{t.labels.priority[task.priority]}</Badge>
            <Badge>{t.labels.taskCategory[task.category]}</Badge>
            {task.custom && <Badge tone="primary">{p.customBadge}</Badge>}
            {tpl?.sensitive && <Badge tone="warning"><Scale className="h-3 w-3" aria-hidden />{t.common.important}</Badge>}
            {task.notes && <Badge tone="neutral">✎ {p.notes}</Badge>}
          </div>
        </div>
        <button type="button" onClick={onToggleOpen} aria-expanded={open} aria-controls={panelId} className="inline-flex h-9 items-center gap-1 rounded-lg px-2 text-sm text-muted hover:bg-surface-2 hover:text-fg">
          <span className="hidden sm:inline">{open ? p.hideDetails : p.showDetails}</span>
          <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} aria-hidden />
          <span className="sr-only sm:hidden">{open ? p.hideDetails : p.showDetails}</span>
        </button>
      </div>

      {open && (
        <div id={panelId} className="animate-fade-in space-y-4 border-t border-border p-4">
          {tpl && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">{p.whyMatters}</p>
              <p className="mt-1 text-sm leading-relaxed">{l(tpl.description)}</p>
              {tpl.sensitive && <Notice tone="warning" className="mt-3">{p.disclaimer}</Notice>}
            </div>
          )}

          {task.custom && (
            editing ? (
              <form
                className="flex gap-2"
                onSubmit={(e) => { e.preventDefault(); if (draftTitle.trim().length >= 3) { updateTask(task.id, { title: draftTitle.trim() }); setEditing(false); } }}
              >
                <label htmlFor={`title-${task.id}`} className="sr-only">{p.editTitle}</label>
                <Input id={`title-${task.id}`} value={draftTitle} onChange={(e) => setDraftTitle(e.target.value)} autoFocus maxLength={80} />
                <Button type="submit" size="md">{t.common.save}</Button>
              </form>
            ) : (
              <Button variant="ghost" size="sm" onClick={() => setEditing(true)}><Pencil className="h-4 w-4" aria-hidden />{p.editTitle}</Button>
            )
          )}

          <div className="grid gap-3 sm:grid-cols-[1fr_180px]">
            <Field label={p.notes} hint={savedHint ? p.notesSaved : undefined}>
              {(f) => <Textarea {...f} value={notes} onChange={(e) => onNotes(e.target.value)} placeholder={p.notesPlaceholder} maxLength={2000} />}
            </Field>
            <div className="space-y-3">
              <Field label={p.priority}>
                {(f) => (
                  <Select {...f} value={task.priority} onChange={(e) => updateTask(task.id, { priority: e.target.value as Priority })}>
                    {priorities.map((x) => <option key={x} value={x}>{t.labels.priority[x]}</option>)}
                  </Select>
                )}
              </Field>
              <Button variant="ghost" size="sm" className="w-full text-danger hover:bg-danger-soft" onClick={() => { removeTask(task.id); toast(p.deletedToast, "info"); }}>
                <Trash2 className="h-4 w-4" aria-hidden />{p.deleteTask}
              </Button>
            </div>
          </div>
        </div>
      )}
    </li>
  );
}
