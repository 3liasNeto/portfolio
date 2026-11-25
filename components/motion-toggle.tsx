"use client";

import { useSyncExternalStore } from "react";
import { setMotionPaused } from "@/lib/motion";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributeFilter: ["data-motion"] });
  return () => observer.disconnect();
}

// True when the visitor paused the looping animations (marquee, typing, blink)
export function useMotionPaused() {
  return useSyncExternalStore(
    subscribe,
    () => document.documentElement.dataset.motion === "paused",
    () => false,
  );
}

// Pause/play for content that moves on its own (WCAG 2.2.2)
export function MotionToggle({
  labels,
  className = "",
}: {
  labels: { pause: string; play: string };
  className?: string;
}) {
  const paused = useMotionPaused();
  const label = paused ? labels.play : labels.pause;
  return (
    <button
      type="button"
      aria-pressed={paused}
      aria-label={labels.pause}
      title={label}
      onClick={() => setMotionPaused(!paused)}
      className={`grid size-10 place-items-center rounded-full border border-chalk/40 bg-night text-sm text-chalk shadow-[0_0_0_10px_var(--night)] transition-colors hover:border-signal hover:text-signal ${className}`}
    >
      <span aria-hidden>{paused ? "▶" : "❚❚"}</span>
    </button>
  );
}
