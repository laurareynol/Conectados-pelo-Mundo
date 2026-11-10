"use client";

import { Compass } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { useI18n } from "@/i18n/I18nProvider";

export default function NotFound() {
  const { t } = useI18n();
  return (
    <div className="container flex flex-col items-center py-24 text-center">
      <Compass className="h-10 w-10 text-primary" aria-hidden />
      <h1 className="mt-4 text-2xl font-bold">{t.states.notFoundTitle}</h1>
      <p className="mt-2 text-muted">{t.states.notFoundText}</p>
      <LinkButton href="/" className="mt-6">{t.states.goHome}</LinkButton>
    </div>
  );
}
