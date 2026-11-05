"use client";

import { useEffect, useState } from "react";

/**
 * Loads a list that depends on `key` (e.g. taluks of a district). Answers are stored with
 * the key they belong to, so a late answer for an old key is never shown and nothing has
 * to be reset by hand when the key changes. Empty key -> empty list, no request.
 */
export function useKeyedList<T>(key: string, load: () => Promise<T[]>) {
  const [state, setState] = useState<{ key: string; items: T[] }>({ key: "", items: [] });

  useEffect(() => {
    if (!key) return;
    let cancelled = false;
    load().then((items) => {
      if (!cancelled) setState({ key, items });
    });
    return () => {
      cancelled = true;
    };
    // `load` is rebuilt every render; the key is what decides a new request
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const ready = !key || state.key === key;
  return { items: ready && key ? state.items : [], loading: !ready };
}
