import type {
  ChatMessage, Conversation, DestinationComment, ExperienceLevel, JobArea, LanguageCode,
  Post, PostComment, Priority, Region, TaskCategory, WorkType,
} from "@/data/types";

export type Stage = "remote" | "onsite" | "nomad" | "exploring";
export type Timeframe = "3m" | "6m" | "12m" | "later" | "undecided";
export type Concern = "work" | "income" | "housing" | "language" | "safety" | "visa" | "planning" | "community" | "other";
export type Visibility = "public" | "community" | "private";

export interface UserProfile {
  name: string;
  stage: Stage;
  area: JobArea | "other";
  areaOther?: string;
  workType: WorkType;
  workTypeOther?: string;
  destination: string;
  regions: Region[];
  timeframe: Timeframe;
  concerns: Concern[];
  concernOther?: string;
  languages: LanguageCode[];
  experience: ExperienceLevel;
  interests: string[]; // ids de destinos
  mentor: boolean;
  bio: string;
  avatar?: string; // data URL
  avatarColor: string;
  privacy: { visibility: Visibility; showLocation: boolean; allowMessages: boolean; showProgress: boolean };
  createdAt: string;
}

export interface PlannerTask {
  id: string;
  templateId?: string;
  title?: string; // usado em tarefas personalizadas
  category: TaskCategory;
  priority: Priority;
  done: boolean;
  notes: string;
  custom: boolean;
  doneAt?: string;
}

export type SavedType = "job" | "destination" | "post" | "guide";
export interface SavedItem {
  type: SavedType;
  id: string;
  savedAt: string;
}

export interface ReportRecord {
  code: string;
  type: string;
  createdAt: string;
}

export interface AppState {
  profile: UserProfile | null;
  planner: PlannerTask[];
  saved: SavedItem[];
  likes: string[];
  reported: string[];
  userPosts: Post[];
  postComments: Record<string, PostComment[]>;
  destComments: Record<string, DestinationComment[]>;
  messages: Record<string, ChatMessage[]>;
  newConversations: Conversation[];
  reports: ReportRecord[];
  prefs: { bannerDismissed: boolean; welcomePending: boolean };
}
