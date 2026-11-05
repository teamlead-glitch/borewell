"use client";

import { useMemo, useSyncExternalStore } from "react";

const noSubscribe = () => () => {};

/** What the API answered on submit, saved in sessionStorage by the form. Null on the server,
 *  when the page is opened directly, or when storage is blocked. */
export function useStoredResult<T>(key: string): T | null {
  const raw = useSyncExternalStore(
    noSubscribe,
    () => {
      try {
        return sessionStorage.getItem(key);
      } catch {
        return null;
      }
    },
    () => null
  );
  return useMemo(() => {
    if (!raw) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  }, [raw]);
}
