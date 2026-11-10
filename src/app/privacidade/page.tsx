"use client";

import { LegalDocument } from "@/components/features/LegalDocument";
import { legalDocs } from "@/data/safety";
import { useI18n } from "@/i18n/I18nProvider";

export default function PrivacyPage() {
  const { t } = useI18n();
  return <LegalDocument doc={legalDocs.privacy} title={t.safety.privacy} />;
}
