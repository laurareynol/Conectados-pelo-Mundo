import { conversations } from "@/data/conversations";
import { destinations } from "@/data/destinations";
import { jobs } from "@/data/jobs";
import { posts } from "@/data/posts";
import { users } from "@/data/users";
import { sleep } from "@/lib/utils";
import type { DataSource } from "./types";

/** Latência simulada para exibir estados de carregamento de forma realista. */
const LATENCY = 350;
async function respond<T>(value: T): Promise<T> {
  await sleep(LATENCY);
  return structuredClone(value);
}

/** Fonte de dados local: dados de demonstração em memória. */
export const localDataSource: DataSource = {
  jobs: {
    list: () => respond(jobs),
    get: (id) => respond(jobs.find((j) => j.id === id)),
  },
  destinations: {
    list: () => respond(destinations),
    get: (id) => respond(destinations.find((d) => d.id === id)),
  },
  community: {
    listPosts: () => respond(posts),
    listUsers: () => respond(users),
    getUser: (id) => respond(users.find((u) => u.id === id)),
  },
  conversations: {
    list: () => respond(conversations),
  },
};
