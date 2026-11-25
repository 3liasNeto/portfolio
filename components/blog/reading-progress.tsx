"use client";

import { useEffect, useRef } from "react";

// Thin signal-colored bar at the top that fills as the article is read
export function ReadingProgress({ target }: { target: string }) {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const article = document.querySelector<HTMLElement>(target);
    if (!article || !bar.current) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const { top, height } = article.getBoundingClientRect();
      const progress = Math.min(Math.max(-top / (height - innerHeight), 0), 1);
      bar.current!.style.transform = `scaleX(${progress})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [target]);

  return (
    <div aria-hidden className="fixed inset-x-0 top-0 z-[60] h-1">
      <div ref={bar} className="h-full origin-left scale-x-0 bg-signal" />
    </div>
  );
}
