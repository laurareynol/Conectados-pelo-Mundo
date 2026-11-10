"use client";

import { Select } from "@/components/ui/Field";
import { useI18n } from "@/i18n/I18nProvider";

export function FilterSelect<T extends string>({ id, label, value, onChange, options, anyLabel }: {
  id: string; label: string; value: T | ""; onChange: (v: T | "") => void; options: { value: T; label: string }[]; anyLabel?: string;
}) {
  const { t } = useI18n();
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-xs font-medium text-muted">{label}</label>
      <Select id={id} value={value} onChange={(e) => onChange(e.target.value as T | "")} className="h-10">
        <option value="">{anyLabel ?? t.common.any}</option>
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </Select>
    </div>
  );
}
