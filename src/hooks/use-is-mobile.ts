"use client";

import { useSyncExternalStore } from "react";

export function useIsMobile(breakpoint = 768): boolean {
  return useSyncExternalStore(
    (callback) => {
      const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
      mql.addEventListener("change", callback);
      return () => mql.removeEventListener("change", callback);
    },
    () => {
      if (typeof window === "undefined") return false;
      return window.matchMedia(`(max-width: ${breakpoint - 1}px)`).matches;
    },
    () => false,
  );
}
