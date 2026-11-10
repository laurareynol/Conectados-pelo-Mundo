"use client";

import { AlertTriangle } from "lucide-react";
import { Button, LinkButton } from "@/components/ui/Button";
import { useI18n } from "@/i18n/I18nProvider";

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  const { t } = useI18n();
  return (
    <div role="alert" className="container flex flex-col items-center py-24 text-center">
      <AlertTriangle className="h-10 w-10 text-danger" aria-hidden />
      <h1 className="mt-4 text-2xl font-bold">{t.states.errorTitle}</h1>
      <p className="mt-2 text-muted">{t.states.errorText}</p>
      <div className="mt-6 flex gap-2">
        <Button onClick={reset}>{t.common.retry}</Button>
        <LinkButton href="/" variant="outline">{t.states.goHome}</LinkButton>
      </div>
    </div>
  );
}
