/**
 * Camada fina sobre o localStorage, com namespace, versão e tolerância a falhas
 * (modo privado, cota cheia, SSR). Toda a persistência local passa por aqui.
 */
const NAMESPACE = "cpm";
const VERSION = 1;

const key = (name: string) => `${NAMESPACE}:v${VERSION}:${name}`;

export const storage = {
  get<T>(name: string, fallback: T): T {
    if (typeof window === "undefined") return fallback;
    try {
      const raw = window.localStorage.getItem(key(name));
      return raw === null ? fallback : (JSON.parse(raw) as T);
    } catch {
      return fallback;
    }
  },
  set<T>(name: string, value: T): boolean {
    if (typeof window === "undefined") return false;
    try {
      window.localStorage.setItem(key(name), JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  },
  remove(name: string) {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.removeItem(key(name));
    } catch {
      /* ignora */
    }
  },
  /** Remove todas as chaves da aplicação. */
  clearAll() {
    if (typeof window === "undefined") return;
    try {
      Object.keys(window.localStorage)
        .filter((k) => k.startsWith(`${NAMESPACE}:`))
        .forEach((k) => window.localStorage.removeItem(k));
    } catch {
      /* ignora */
    }
  },
  /** Exporta todas as chaves da aplicação como objeto. */
  dump(): Record<string, unknown> {
    const out: Record<string, unknown> = {};
    if (typeof window === "undefined") return out;
    try {
      Object.keys(window.localStorage)
        .filter((k) => k.startsWith(`${NAMESPACE}:`))
        .forEach((k) => {
          try {
            out[k] = JSON.parse(window.localStorage.getItem(k) ?? "null");
          } catch {
            out[k] = window.localStorage.getItem(k);
          }
        });
    } catch {
      /* ignora */
    }
    return out;
  },
};
