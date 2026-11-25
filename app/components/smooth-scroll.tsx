"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { useEffect } from "react";

let lenis: Lenis | null = null;

// Scrolls to an element, through Lenis when it's running
export function scrollToTarget(target: string | HTMLElement) {
  if (lenis) {
    lenis.scrollTo(target);
    return;
  }
  const el = typeof target === "string" ? document.querySelector(target) : target;
  el?.scrollIntoView({ behavior: "smooth" });
}

export function setScrollLocked(locked: boolean) {
  if (locked) lenis?.stop();
  else lenis?.start();
}

export function SmoothScroll() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    lenis = new Lenis({ autoRaf: true, anchors: true, lerp: 0.1 });
    return () => {
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  return null;
}
