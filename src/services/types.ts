import type { Conversation, DemoUser, Destination, Job, Post } from "@/data/types";

/**
 * Contratos da camada de dados. A interface usa apenas estas funções,
 * então trocar a fonte (local → Supabase/API) não exige mudar componentes.
 */
export interface JobsRepository {
  list(): Promise<Job[]>;
  get(id: string): Promise<Job | undefined>;
}

export interface DestinationsRepository {
  list(): Promise<Destination[]>;
  get(id: string): Promise<Destination | undefined>;
}

export interface CommunityRepository {
  listPosts(): Promise<Post[]>;
  listUsers(): Promise<DemoUser[]>;
  getUser(id: string): Promise<DemoUser | undefined>;
}

export interface ConversationsRepository {
  list(): Promise<Conversation[]>;
}

export interface DataSource {
  jobs: JobsRepository;
  destinations: DestinationsRepository;
  community: CommunityRepository;
  conversations: ConversationsRepository;
}
