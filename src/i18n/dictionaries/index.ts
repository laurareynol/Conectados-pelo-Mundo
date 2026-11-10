import type { Locale } from "../config";
import pt, { type Dictionary } from "./pt";
import en from "./en";
import es from "./es";

export const dictionaries: Record<Locale, Dictionary> = { pt, en, es };
export type { Dictionary };
