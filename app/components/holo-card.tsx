"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "../[lang]/dictionaries";

type CardText = Dictionary["about"]["card"];

// Full-art trading card: tilts in 3D toward the pointer, with a holo foil,
// sparkles and a glare that follow it. Click (or Enter/Space) flips it over.
export function HoloCard({ name, art, t }: { name: string; art: string; t: CardText }) {
  const ref = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Pointer position as 0…1 on each axis; 0.5/0.5 is the resting center
    const target = { x: 0.5, y: 0.5, active: 0 };
    const current = { x: 0.5, y: 0.5, active: 0 };
    let frame = 0;

    const tick = () => {
      current.x += (target.x - current.x) * 0.12;
      current.y += (target.y - current.y) * 0.12;
      current.active += (target.active - current.active) * 0.12;
      const dx = current.x - 0.5;
      const dy = current.y - 0.5;
      el.style.setProperty("--mx", `${current.x * 100}%`);
      el.style.setProperty("--my", `${current.y * 100}%`);
      el.style.setProperty("--rx", `${dx * 32 * current.active}deg`);
      el.style.setProperty("--ry", `${-dy * 32 * current.active}deg`);
      el.style.setProperty("--hyp", Math.min(Math.hypot(dx, dy) * 2, 1).toFixed(3));
      el.style.setProperty("--o", current.active.toFixed(3));
      const settled =
        Math.abs(target.x - current.x) < 0.001 &&
        Math.abs(target.y - current.y) < 0.001 &&
        Math.abs(target.active - current.active) < 0.001;
      frame = settled ? 0 : requestAnimationFrame(tick);
    };
    const kick = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      target.x = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
      target.y = Math.min(Math.max((e.clientY - rect.top) / rect.height, 0), 1);
      target.active = 1;
      kick();
    };
    const onLeave = () => {
      target.x = 0.5;
      target.y = 0.5;
      target.active = 0;
      kick();
    };

    // Touch has no "leave", so settle back when the finger lifts
    const onUp = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") onLeave();
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    el.addEventListener("pointercancel", onLeave);
    el.addEventListener("pointerup", onUp);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      el.removeEventListener("pointercancel", onLeave);
      el.removeEventListener("pointerup", onUp);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        ref={ref}
        role="button"
        tabIndex={0}
        aria-pressed={flipped}
        aria-label={`${t.flip}: ${name}`}
        onClick={() => setFlipped((f) => !f)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setFlipped((f) => !f);
          }
        }}
        className="holo-card w-full max-w-[340px] cursor-pointer outline-none"
        data-flipped={flipped || undefined}
      >
        <div className="holo-card-rotator">
          {/* ---------- Front ---------- */}
          <div className="holo-card-face holo-card-fullart" aria-hidden={flipped}>
            <Image src={art} alt={t.alt} fill sizes="(min-width: 768px) 340px, 90vw" className="object-cover" />
            <div aria-hidden className="holo-card-holo" />
            <div aria-hidden className="holo-card-foil" />
            <div aria-hidden className="holo-card-glare" />
          </div>

          {/* ---------- Back ---------- */}
          <div className="holo-card-face holo-card-back" aria-hidden={!flipped}>
            <div className="relative grid h-full place-items-center overflow-hidden rounded-[3.5cqw] bg-[radial-gradient(ellipse_at_center,#ff7a4d,#ff4d1c_30%,#7a1c05_65%,#121110)]">
              <div className="absolute inset-[6cqw] rounded-[50%] border-[1.2cqw] border-[#f1ece2]/80" />
              <div className="absolute inset-[12cqw] rounded-[50%] border-[0.5cqw] border-dashed border-[#f1ece2]/40" />
              <div className="relative flex flex-col items-center">
                <span className="text-[30cqw] leading-none font-extrabold tracking-tighter text-[#f1ece2]">
                  E<span className="font-serif font-normal italic">n</span>
                  <span className="text-[#121110]">.</span>
                </span>
                <span className="mt-[2cqw] rounded-full bg-[#121110] px-[3cqw] py-[1cqw] font-mono text-[3cqw] tracking-[0.3em] text-[#f1ece2] uppercase">
                  {t.back}
                </span>
              </div>
            </div>
            <div aria-hidden className="holo-card-foil" />
            <div aria-hidden className="holo-card-glare" />
          </div>
        </div>
      </div>
      <p className="font-mono text-[11px] tracking-wider text-chalk/50 uppercase">{t.hint}</p>
    </div>
  );
}
