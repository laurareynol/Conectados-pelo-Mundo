"use client";

import { useI18n } from "@/i18n/I18nProvider";
import { Button } from "./Button";
import { Modal } from "./Modal";

export function ConfirmDialog({ open, onClose, onConfirm, title, text, confirmLabel, danger }: {
  open: boolean; onClose: () => void; onConfirm: () => void; title: string; text: string; confirmLabel?: string; danger?: boolean;
}) {
  const { t } = useI18n();
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      description={text}
      size="sm"
      closeLabel={t.common.close}
      footer={
        <>
          <Button variant="ghost" onClick={onClose} data-autofocus>{t.common.cancel}</Button>
          <Button variant={danger ? "danger" : "primary"} onClick={() => { onConfirm(); onClose(); }}>{confirmLabel ?? t.common.confirm}</Button>
        </>
      }
    />
  );
}
