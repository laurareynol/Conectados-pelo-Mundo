import type { Locale } from "@/i18n/config";

/** Texto com traduções. `pt` é obrigatório e usado como fallback. */
export type Localized = { pt: string } & Partial<Record<Locale, string>>;

export type LanguageCode = "pt" | "en" | "es" | "fr" | "de" | "it";

export type JobArea =
  | "design" | "development" | "marketing" | "data" | "support"
  | "education" | "product" | "writing" | "finance";
export type ContractType = "clt" | "pj" | "freelancer" | "international" | "autonomous" | "other";
export type JobLevel = "junior" | "mid" | "senior";
export type Modality = "anywhere" | "timezone" | "async" | "country";
export type Region = "brazil" | "latam" | "northAmerica" | "europe" | "asia" | "global";
export type TzGroup = "americas" | "europeAfrica" | "asiaPacific" | "flexible";

export interface Job {
  id: string;
  title: Localized;
  company: string;
  contract: ContractType;
  area: JobArea;
  languages: LanguageCode[];
  salary?: { min: number; max: number; currency: "BRL" | "USD" | "EUR"; period: "month" | "hour" | "year" };
  level: JobLevel;
  timezone: string;
  tzGroup: TzGroup;
  region: Region;
  modality: Modality;
  description: Localized;
  requirements: Localized[];
  url: string;
  verified: boolean;
  postedAt: string;
}

export type HousingType = "coliving" | "longStay" | "workExchange" | "temporary" | "apartment";

export interface DestinationComment {
  id: string;
  authorId: string;
  lang: LanguageCode;
  text: string;
  createdAt: string;
}

export interface Destination {
  id: string;
  city: Localized;
  country: Localized;
  region: Region;
  languages: LanguageCode[];
  timezone: string;
  monthlyCost: { min: number; max: number };
  connectivity: number;
  safety: number; // 1–5, ilustrativo
  housing: HousingType[];
  coworkings: { name: string; note: Localized }[];
  summary: Localized;
  highlights: Localized[];
  considerations: Localized[];
  comments: DestinationComment[];
  palette: [string, string, string];
}

export type ExperienceLevel = "none" | "first" | "some" | "experienced";
export type WorkType = "clt" | "pj" | "freelancer" | "autonomous" | "entrepreneur" | "other";

export interface DemoUser {
  id: string;
  name: string;
  languages: LanguageCode[];
  area: JobArea;
  workType: WorkType;
  experience: ExperienceLevel;
  base: string;
  timezone: string;
  bio: Localized;
  mentor: boolean;
  allowMessages: boolean;
  color: string;
}

export type PostCategory = "work" | "housing" | "planning" | "destinations" | "documents" | "community" | "wellbeing";
export type PostType = "question" | "story";

export interface PostComment {
  id: string;
  authorId: string; // "me" para o usuário local
  text: string;
  lang: LanguageCode;
  createdAt: string;
}

export interface Post {
  id: string;
  authorId: string;
  type: PostType;
  category: PostCategory;
  lang: LanguageCode;
  destinationId?: string;
  title: string;
  body: string;
  createdAt: string;
  likes: number;
  comments: PostComment[];
  pendingReview?: boolean;
}

export interface ChatMessage {
  id: string;
  from: string; // "me" ou id do participante
  text: string;
  lang: LanguageCode;
  createdAt: string;
  /** Traduções pré-definidas de demonstração (não são geradas automaticamente). */
  demoTranslations?: Partial<Record<Locale, string>>;
}

export interface Conversation {
  id: string;
  participantId: string;
  messages: ChatMessage[];
}

export type TaskCategory =
  | "work" | "finance" | "documents" | "destination" | "housing"
  | "connectivity" | "health" | "equipment" | "safety";
export type Priority = "high" | "medium" | "low";

export interface PlannerTaskTemplate {
  id: string;
  title: Localized;
  description: Localized;
  category: TaskCategory;
  priority: Priority;
  sensitive?: boolean; // requer consulta a fontes especializadas
}

export interface Testimonial {
  id: string;
  name: string;
  role: Localized;
  text: Localized;
  color: string;
}

export interface GuideSection {
  id: string;
  title: Localized;
  intro: Localized;
  items: Localized[];
}
