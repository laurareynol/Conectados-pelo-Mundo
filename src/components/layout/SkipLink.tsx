"use client";

import { useI18n } from "@/i18n/I18nProvider";

export function SkipLink() {
  const { t } = useI18n();
  return <a href="#conteudo" className="skip-link">{t.nav.skipToContent}</a>;
}
