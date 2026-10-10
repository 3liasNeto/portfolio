"use client";

import { useEffect, useRef } from "react";

// Wraps the hero and feeds pointer position into CSS variables:
//   --x / --y   pointer position inside the section (px), eased
//   --px / --py pointer position normalised to -0.5…0.5, for parallax
// All visuals live in globals.css (.hero-*), so React never re-renders on move.
export function InteractiveHero({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const finePointer = matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reducedMotion.matches) return;

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let frame = 0;

    const tick = () => {
      current.x += (target.x - current.x) * 0.14;
      current.y += (target.y - current.y) * 0.14;
      const { width, height } = el.getBoundingClientRect();
      el.style.setProperty("--x", `${current.x}px`);
      el.style.setProperty("--y", `${current.y}px`);
      el.style.setProperty("--px", (current.x / width - 0.5).toFixed(4));
      el.style.setProperty("--py", (current.y / height - 0.5).toFixed(4));
      const settled =
        Math.abs(target.x - current.x) < 0.5 && Math.abs(target.y - current.y) < 0.5;
      frame = settled ? 0 : requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      target.x = e.clientX - rect.left;
      target.y = e.clientY - rect.top;
      if (!el.dataset.pointer) {
        // Start the blob where the pointer enters instead of sliding in from a corner
        current.x = target.x;
        current.y = target.y;
        el.dataset.pointer = "on";
      }
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onLeave = () => {
      delete el.dataset.pointer;
      const { width, height } = el.getBoundingClientRect();
      target.x = width / 2;
      target.y = height / 2;
      if (!frame) frame = requestAnimationFrame(tick);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section ref={ref} id={id} className={`hero ${className ?? ""}`}>
      <div aria-hidden className="hero-spotlight" />
      {children}
      <div aria-hidden className="hero-blob" />
    </section>
  );
}
