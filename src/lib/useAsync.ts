"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type AsyncState<T> =
  | { status: "loading"; data?: undefined; error?: undefined }
  | { status: "success"; data: T; error?: undefined }
  | { status: "error"; data?: undefined; error: Error };

/** Executa uma função assíncrona e expõe estados de carregamento, erro e sucesso. */
export function useAsync<T>(fn: () => Promise<T>, deps: unknown[] = []) {
  const [state, setState] = useState<AsyncState<T>>({ status: "loading" });
  const fnRef = useRef(fn);
  fnRef.current = fn;

  const run = useCallback(() => {
    let active = true;
    setState({ status: "loading" });
    fnRef.current()
      .then((data) => active && setState({ status: "success", data }))
      .catch((error: unknown) => active && setState({ status: "error", error: error instanceof Error ? error : new Error(String(error)) }));
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => run(), [run]);

  return { ...state, retry: run };
}
