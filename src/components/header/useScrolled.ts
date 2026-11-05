"use client";

import { useSyncExternalStore } from "react";

const subscribe = (onChange: () => void) => {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
};

/** True once the page is scrolled past `offset`. False on the server (header starts transparent). */
export function useScrolled(offset = 24) {
  return useSyncExternalStore(
    subscribe,
    () => window.scrollY > offset,
    () => false
  );
}
