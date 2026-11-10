import { localDataSource } from "./local";
import type { DataSource } from "./types";

/**
 * Seleciona a fonte de dados. Hoje apenas "local" está implementada.
 * Para integrar um backend, implemente `DataSource` (ver ./supabase.ts) e
 * selecione-o aqui com base em NEXT_PUBLIC_DATA_SOURCE.
 */
function resolveDataSource(): DataSource {
  const source = process.env.NEXT_PUBLIC_DATA_SOURCE ?? "local";
  switch (source) {
    case "local":
    default:
      return localDataSource;
  }
}

export const api = resolveDataSource();
export type { DataSource } from "./types";
