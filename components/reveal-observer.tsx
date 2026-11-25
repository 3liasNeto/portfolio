"use client";

import { useEffect } from "react";

// One observer for the whole page: flags [data-reveal] elements as they scroll in.
// Content is only hidden once html[data-reveal-ready] is set, after the first batch
// has been processed: what's already on screen never blinks, and if this script
// never runs (slow network, failed chunk) everything simply stays visible.
export function RevealObserver() {
  useEffect(() => {
    const root = document.documentElement;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.inview = "";
          observer.unobserve(entry.target);
        }
        root.dataset.revealReady = "";
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));
    return () => {
      observer.disconnect();
      delete root.dataset.revealReady;
    };
  }, []);

  return null;
}
