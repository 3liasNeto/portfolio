"use client";

import { useSyncExternalStore } from "react";
import type { Theme } from "../theme";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

const getTheme = () => (document.documentElement.dataset.theme as Theme) ?? "light";

// Current theme, or null during server render / before hydration
export function useTheme() {
  return useSyncExternalStore(subscribe, getTheme, () => null);
}
