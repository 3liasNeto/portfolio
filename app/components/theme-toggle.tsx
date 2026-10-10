"use client";

import { useSyncExternalStore } from "react";
import { applyTheme, type Theme } from "../theme";

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

export function ThemeToggle({
  labels,
}: {
  labels: { label: string; light: string; dark: string };
}) {
  const theme = useTheme();

  return (
    <div role="radiogroup" aria-label={labels.label} className="flex items-center gap-3">
      <span>{labels.label}</span>
      <span className="flex rounded-full border border-current p-0.5">
        {(["light", "dark"] as const).map((option) => (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={theme === option}
            onClick={() => applyTheme(option)}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 uppercase transition-colors ${
              theme === option ? "bg-on-signal text-signal" : ""
            }`}
          >
            <span aria-hidden>{option === "light" ? "☀" : "☾"}</span>
            {labels[option]}
          </button>
        ))}
      </span>
    </div>
  );
}
