"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "../[lang]/dictionaries";

type CardText = Dictionary["about"]["card"];

// Fire-type energy symbol, drawn in the brand signal color
function Energy({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`inline-grid aspect-square place-items-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#ffb08f,#ff4d1c_55%,#b52c06)] text-white shadow-[0_0_0_0.4cqw_#fff,0_0.3cqw_0.8cqw_rgba(0,0,0,0.35)] ${className}`}
    >
      ✳
    </span>
  );
}

function Coffee() {
  return (
    <span
      aria-hidden
      className="inline-grid size-[5cqw] place-items-center rounded-full bg-[#f4efe6] text-[3cqw] shadow-[0_0_0_0.3cqw_#fff,0_0.2cqw_0.6cqw_rgba(0,0,0,0.3)]"
    >
      ☕
    </span>
  );
}

// Trading-card style portrait: tilts in 3D toward the pointer, with a holo foil,
// sparkles and a glare that follow it. Click (or Enter/Space) flips it over.
export function HoloCard({
  name,
  photo,
  placeholder,
  t,
}: {
  name: string;
  photo: string | null;
  placeholder: string;
  t: CardText;
}) {
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
          <div className="holo-card-face" aria-hidden={flipped}>
            <div className="flex h-full flex-col rounded-[3.5cqw] bg-[linear-gradient(160deg,#ffd2b8,#ff8a5c_35%,#f0602f_70%,#d9481c)] p-[3.2cqw] text-[#1b120c]">
              {/* Header */}
              <div className="flex items-end justify-between gap-[2cqw] px-[1cqw]">
                <div className="flex min-w-0 items-end gap-[2cqw]">
                  <span className="mb-[0.8cqw] shrink-0 rounded-[1cqw] bg-[linear-gradient(#f4f4f4,#bdbdbd)] px-[1.6cqw] py-[0.3cqw] text-[2.6cqw] font-bold italic">
                    {t.stage}
                  </span>
                  <span className="truncate text-[6.4cqw] leading-none font-extrabold tracking-tight">
                    {name}
                  </span>
                </div>
                <span className="flex shrink-0 items-center gap-[1.2cqw]">
                  <span className="text-[2.8cqw] font-bold">{t.hp}</span>
                  <span className="text-[6cqw] leading-none font-extrabold">120</span>
                  <Energy className="size-[6.4cqw] text-[3.4cqw]" />
                </span>
              </div>

              {/* Art window */}
              <div className="relative mt-[2cqw] aspect-[4/3] overflow-hidden border-[1.2cqw] border-[#e9c46a] bg-[#1b120c] shadow-[inset_0_0_0_0.4cqw_#b8862b,0_0.6cqw_1.2cqw_rgba(0,0,0,0.3)] [border-image:linear-gradient(135deg,#fbe7a1,#c8962f,#fff3c4,#b07d22)_1]">
                {photo ? (
                  <Image src={photo} alt={name} fill sizes="340px" className="object-cover" />
                ) : (
                  <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_30%_25%,#ff9a73,var(--signal)_45%,#5c1603)]">
                    <span className="text-[24cqw] leading-none font-extrabold tracking-tighter text-[#f1ece2]">
                      E<span className="font-serif font-normal italic">n</span>
                      <span className="text-[#121110]">.</span>
                    </span>
                    <span className="absolute bottom-[2cqw] left-[2.5cqw] font-mono text-[2.4cqw] tracking-wider text-[#f1ece2] uppercase">
                      {placeholder}
                    </span>
                  </div>
                )}
                <div aria-hidden className="holo-card-holo" />
              </div>

              {/* Info strip */}
              <p className="mx-[4cqw] -mt-[0.4cqw] bg-[linear-gradient(90deg,#c8962f,#fbe7a1,#c8962f)] py-[0.5cqw] text-center text-[2.3cqw] font-semibold italic">
                {t.kind}
              </p>

              {/* Ability */}
              <div className="mt-[2.4cqw] px-[1.5cqw]">
                <p className="flex items-baseline gap-[2cqw]">
                  <span className="rounded-[1cqw] bg-[#c3201a] px-[1.4cqw] py-[0.2cqw] text-[2.6cqw] font-extrabold text-white italic">
                    {t.abilityLabel}
                  </span>
                  <span className="text-[4.2cqw] font-extrabold text-[#c3201a]">{t.ability}</span>
                </p>
                <p className="mt-[0.8cqw] text-[2.8cqw] leading-snug">{t.abilityText}</p>
              </div>

              {/* Attacks */}
              {t.attacks.map((attack, i) => (
                <div key={attack.name} className="mt-[2cqw] border-t-[0.3cqw] border-[#1b120c]/25 px-[1.5cqw] pt-[1.6cqw]">
                  <p className="flex items-center gap-[2cqw]">
                    <span className="flex gap-[0.8cqw]">
                      {Array.from({ length: i + 1 }, (_, n) => (
                        <Energy key={n} className="size-[5cqw] text-[2.6cqw]" />
                      ))}
                    </span>
                    <span className="flex-1 text-[4.4cqw] font-extrabold">{attack.name}</span>
                    <span className="text-[5.2cqw] font-extrabold">{attack.damage}</span>
                  </p>
                  <p className="mt-[0.6cqw] text-[2.6cqw] leading-snug">{attack.text}</p>
                </div>
              ))}

              {/* Weakness / resistance / retreat */}
              <div className="mt-auto grid grid-cols-3 gap-[1cqw] border-t-[0.3cqw] border-[#1b120c]/25 px-[1.5cqw] pt-[1.4cqw] text-center text-[2.2cqw]">
                <p className="flex flex-col items-center gap-[0.4cqw]">
                  <span className="font-bold">{t.weakness}</span>
                  <span>{t.weaknessValue}</span>
                </p>
                <p className="flex flex-col items-center gap-[0.4cqw]">
                  <span className="font-bold">{t.resistance}</span>
                  <span>{t.resistanceValue}</span>
                </p>
                <p className="flex flex-col items-center gap-[0.4cqw]">
                  <span className="font-bold">{t.retreat}</span>
                  <span className="flex gap-[0.6cqw]">
                    <Coffee />
                    <Coffee />
                  </span>
                </p>
              </div>

              {/* Flavor text */}
              <p className="mt-[1.6cqw] rounded-[1cqw] border-[0.3cqw] border-[#c8962f] bg-[#fff3e6]/60 px-[2cqw] py-[1cqw] font-serif text-[2.6cqw] leading-snug italic">
                {t.flavor}
              </p>
              <p className="mt-[1cqw] flex justify-between px-[1cqw] text-[2cqw] font-semibold">
                <span>Illus. {name}</span>
                <span>001/151 ★</span>
              </p>
            </div>
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
