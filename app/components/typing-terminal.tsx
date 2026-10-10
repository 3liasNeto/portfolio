"use client";

import { useEffect, useState } from "react";

// Mini terminal that types a phrase, holds it, deletes it and moves to the next.
// Starts with the first phrase fully typed, so it reads fine without JS or motion.
export function TypingTerminal({
  command,
  phrases,
  className = "",
}: {
  command: string;
  phrases: string[];
  className?: string;
}) {
  const [text, setText] = useState(phrases[0]);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer: ReturnType<typeof setTimeout>;
    let index = 0;
    let shown = phrases[0].length;
    let deleting = true;

    const step = () => {
      const phrase = phrases[index];
      if (deleting) {
        shown--;
        setText(phrase.slice(0, shown));
        if (shown === 0) {
          deleting = false;
          index = (index + 1) % phrases.length;
          timer = setTimeout(step, 350);
        } else {
          timer = setTimeout(step, 28);
        }
      } else {
        const next = phrases[index];
        shown++;
        setText(next.slice(0, shown));
        if (shown === next.length) {
          deleting = true;
          timer = setTimeout(step, 1800);
        } else {
          // Slight jitter so it feels typed by a person
          timer = setTimeout(step, 45 + Math.random() * 60);
        }
      }
    };

    timer = setTimeout(step, 1800);
    return () => clearTimeout(timer);
  }, [phrases]);

  return (
    <div
      className={`w-[min(340px,100%)] overflow-hidden rounded-xl border border-ink/80 bg-[#181715] font-mono text-sm text-chalk shadow-[6px_6px_0_var(--signal)] ${className}`}
    >
      <div className="flex items-center gap-1.5 border-b border-chalk/10 px-3 py-2">
        <span className="size-2.5 rounded-full bg-signal" />
        <span className="size-2.5 rounded-full bg-chalk/30" />
        <span className="size-2.5 rounded-full bg-chalk/30" />
        <span className="ml-2 text-[11px] text-chalk/50">~/elias</span>
      </div>
      <div className="space-y-1 px-4 py-3.5">
        <p className="text-chalk/50">
          <span className="text-signal">$</span> {command}
        </p>
        <p className="flex items-center text-[15px]">
          <span className="mr-2 text-[#b9d77a]">&gt;</span>
          <span className="sr-only">{phrases.join(", ")}</span>
          <span aria-hidden className="whitespace-pre">{text}</span>
          <span aria-hidden className="animate-blink ml-0.5 inline-block h-4 w-2 bg-signal" />
        </p>
      </div>
    </div>
  );
}
