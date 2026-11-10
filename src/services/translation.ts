import type { Locale } from "@/i18n/config";
import type { ChatMessage } from "@/data/types";
import { sleep } from "@/lib/utils";

/**
 * Serviço de tradução de mensagens.
 *
 * TRANSPARÊNCIA: nesta versão NÃO existe tradução automática. O provedor de
 * demonstração apenas devolve traduções escritas previamente nos dados de exemplo
 * (`demoTranslations`). Mensagens novas retornam `unavailable`.
 *
 * A mensagem original nunca é alterada: a tradução é sempre retornada à parte.
 *
 * Para integrar uma API real (DeepL, Google Cloud Translation, etc.), implemente
 * `TranslationProvider` chamando uma rota de servidor (ex.: /api/translate) que
 * guarde a chave da API fora do navegador.
 */
export type TranslationResult =
  | { status: "ok"; text: string; source: "demo" | "api" }
  | { status: "same-language" }
  | { status: "unavailable" };

export interface TranslationProvider {
  translate(message: ChatMessage, target: Locale): Promise<TranslationResult>;
}

export const demoTranslationProvider: TranslationProvider = {
  async translate(message, target) {
    await sleep(500);
    if (message.lang === target) return { status: "same-language" };
    const text = message.demoTranslations?.[target];
    return text ? { status: "ok", text, source: "demo" } : { status: "unavailable" };
  },
};

export const translationService: TranslationProvider = demoTranslationProvider;
