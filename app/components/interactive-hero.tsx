"use client";

import { useEffect, useRef } from "react";

// Wraps the hero and feeds pointer position into CSS variables:
//   --x / --y   pointer position inside the section (px), eased  -> blob and spotlight
//   --px / --py pointer position normalised to -0.5…0.5          -> parallax layers
// All visuals live in globals.css (.hero-*), so React never re-renders on move.
// The variables are written only on the elements that read them, not on the section,
// so a frame doesn't invalidate the style of the whole hero.
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

    const followers = [...el.querySelectorAll<HTMLElement>(".hero-blob, .hero-spotlight")];
    const layers = [...el.querySelectorAll<HTMLElement>(".hero-depth-1, .hero-depth-2, .hero-depth-3")];

    // Section size, cached so the animation loop never reads layout
    const size = { width: el.offsetWidth, height: el.offsetHeight };
    const resize = new ResizeObserver(([entry]) => {
      size.width = entry.contentRect.width;
      size.height = entry.contentRect.height;
    });
    resize.observe(el);

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let frame = 0;

    const tick = () => {
      current.x += (target.x - current.x) * 0.14;
      current.y += (target.y - current.y) * 0.14;
      for (const node of followers) {
        node.style.setProperty("--x", `${current.x}px`);
        node.style.setProperty("--y", `${current.y}px`);
      }
      const px = (current.x / size.width - 0.5).toFixed(4);
      const py = (current.y / size.height - 0.5).toFixed(4);
      for (const node of layers) {
        node.style.setProperty("--px", px);
        node.style.setProperty("--py", py);
      }
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
      target.x = size.width / 2;
      target.y = size.height / 2;
      if (!frame) frame = requestAnimationFrame(tick);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      resize.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section ref={ref} id={id} className={`hero ${className ?? ""}`}>
      <div aria-hidden className="hero-spotlight-clip">
        <div className="hero-spotlight" />
      </div>
      {children}
      <div aria-hidden className="hero-blob" />
    </section>
  );
}
