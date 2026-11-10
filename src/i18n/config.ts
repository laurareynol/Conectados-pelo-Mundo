/**
 * Configuração de idiomas.
 * Para adicionar um novo idioma:
 *  1. Inclua o código em `locales` e os metadados em `localeMeta`.
 *  2. Crie `src/i18n/dictionaries/<código>.ts` tipado como `Dictionary`.
 *  3. Registre o dicionário em `src/i18n/dictionaries/index.ts`.
 *  4. (Opcional) Adicione traduções aos conteúdos `Localized` em `src/data`.
 *     Conteúdos sem tradução usam o idioma padrão como fallback.
 */
export const locales = ["pt", "en", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "pt";

export const localeMeta: Record<Locale, { label: string; short: string; htmlLang: string; intl: string }> = {
  pt: { label: "Português", short: "PT", htmlLang: "pt-BR", intl: "pt-BR" },
  en: { label: "English", short: "EN", htmlLang: "en", intl: "en-US" },
  es: { label: "Español", short: "ES", htmlLang: "es", intl: "es-ES" },
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}
