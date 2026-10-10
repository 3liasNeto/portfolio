"use client";

import { useEffect, useState } from "react";
import type { Heading } from "@/app/[lang]/blog/posts";

// Sticky "in this post" list; highlights the section currently being read
export function TableOfContents({ headings, title }: { headings: Heading[]; title: string }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: "-15% 0px -70% 0px" },
    );
    for (const { id } of headings) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [headings]);

  if (!headings.length) return null;

  return (
    <nav aria-label={title}>
      <p className="mb-4 font-mono text-[11px] tracking-widest text-muted uppercase">{title}</p>
      <ol className="space-y-1 border-l border-ink/15">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              aria-current={active === heading.id ? "location" : undefined}
              className={`-ml-px block border-l-2 py-1.5 text-sm leading-snug transition-colors ${
                heading.level === 3 ? "pl-7" : "pl-4"
              } ${
                active === heading.id
                  ? "border-signal font-semibold text-ink"
                  : "border-transparent text-muted hover:text-ink"
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
