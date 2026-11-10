"use client";

import { X } from "lucide-react";
import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  closeLabel: string;
  size?: "sm" | "md" | "lg";
  position?: "center" | "top";
}

/** Diálogo modal acessível: foco preso, Esc fecha e foco volta ao gatilho. */
export function Modal({ open, onClose, title, description, children, footer, closeLabel, size = "md", position = "center" }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descId = useId();

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    const focusables = () =>
      Array.from(panel?.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])') ?? []);
    (panel?.querySelector<HTMLElement>("[data-autofocus]") ?? focusables()[0])?.focus();
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); onClose(); }
      if (e.key === "Tab") {
        const els = focusables();
        if (!els.length) return;
        const first = els[0];
        const last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previous?.focus?.();
    };
  }, [open, onClose]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div className={cn("fixed inset-0 z-[80] flex justify-center p-4", position === "top" ? "items-start pt-[10vh]" : "items-center")}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={onClose} aria-hidden />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descId : undefined}
        className={cn(
          "relative flex max-h-[85vh] w-full animate-fade-in flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-lift",
          { sm: "max-w-md", md: "max-w-lg", lg: "max-w-2xl" }[size],
        )}
      >
        <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4">
          <div>
            <h2 id={titleId} className="text-lg font-semibold">{title}</h2>
            {description && <p id={descId} className="mt-1 text-sm text-muted">{description}</p>}
          </div>
          <button type="button" onClick={onClose} className="rounded-lg p-1.5 text-muted hover:bg-surface-2 hover:text-fg" aria-label={closeLabel}>
            <X className="h-5 w-5" />
          </button>
        </div>
        {children && <div className="overflow-y-auto px-5 py-4">{children}</div>}
        {footer && <div className="flex justify-end gap-2 border-t border-border px-5 py-3">{footer}</div>}
      </div>
    </div>,
    document.body,
  );
}
