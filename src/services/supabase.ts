import type { DataSource } from "./types";

/**
 * PONTO DE INTEGRAÇÃO FUTURA.
 * Exemplo de como implementar a mesma interface com Supabase:
 *
 *   import { createClient } from "@supabase/supabase-js";
 *   const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
 *   jobs: {
 *     list: async () => (await supabase.from("jobs").select("*")).data ?? [],
 *     get: async (id) => (await supabase.from("jobs").select("*").eq("id", id).single()).data ?? undefined,
 *   }
 *
 * Enquanto não houver backend configurado, este módulo apenas sinaliza o erro.
 */
export function createSupabaseDataSource(): DataSource {
  throw new Error("Supabase ainda não configurado. Use NEXT_PUBLIC_DATA_SOURCE=local.");
}
