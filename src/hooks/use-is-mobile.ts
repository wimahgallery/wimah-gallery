"use client";

import { useSyncExternalStore } from "react";

function getMediaQuery(breakpoint: number) {
  return `(max-width: ${breakpoint - 1}px)`;
}

export function useIsMobile(breakpoint = 768): boolean {
  return useSyncExternalStore(
    (callback) => {
      const mql = window.matchMedia(getMediaQuery(breakpoint));
      mql.addEventListener("change", callback);
      return () => mql.removeEventListener("change", callback);
    },
    () => window.matchMedia(getMediaQuery(breakpoint)).matches,
    () => true,
  );
}
