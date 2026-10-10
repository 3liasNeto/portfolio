"use client";

import { applyTheme } from "../../theme";
import { useTheme } from "../theme-toggle";

// Compact sun/moon button for the blog header
export function ThemeSwitch({ labels }: { labels: { light: string; dark: string } }) {
  const theme = useTheme();
  const next = theme === "dark" ? "light" : "dark";
  return (
    <button
      type="button"
      onClick={() => applyTheme(next)}
      aria-label={labels[next]}
      title={labels[next]}
      className="grid size-9 place-items-center rounded-full border border-ink/15 transition-colors hover:border-signal hover:text-signal"
    >
      <span aria-hidden>{theme === "dark" ? "☀" : "☾"}</span>
    </button>
  );
}
