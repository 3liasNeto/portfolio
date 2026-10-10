"use client";

import { useRef, useState } from "react";
import type { Project } from "../data";

type LocalizedProject = Project & { description: string };

function Preview({ project }: { project: LocalizedProject }) {
  const [a, b] = project.palette;
  return (
    <div
      className="relative h-full w-full overflow-hidden rounded-2xl"
      style={{ background: `radial-gradient(circle at 30% 30%, ${b}, ${a} 70%)` }}
    >
      <span
        className="absolute -right-6 -bottom-16 font-serif text-[16rem] leading-none italic"
        style={{ color: b, mixBlendMode: "difference" }}
      >
        {project.glyph}
      </span>
      <span className="absolute top-4 left-4 rounded-full bg-paper/90 px-3 py-1 font-mono text-[11px] tracking-wider text-ink uppercase">
        {project.title} · {project.year}
      </span>
    </div>
  );
}

export function WorkList({ projects }: { projects: LocalizedProject[] }) {
  const [active, setActive] = useState<number | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  function handleMove(e: React.MouseEvent) {
    const el = previewRef.current;
    if (!el) return;
    el.style.transform = `translate(${e.clientX + 24}px, ${e.clientY - 140}px)`;
  }

  return (
    <div onMouseMove={handleMove} onMouseLeave={() => setActive(null)}>
      <ul className="border-t border-ink">
        {projects.map((project, i) => (
          <li key={project.title} className="border-b border-ink">
            <a
              href={project.href}
              onMouseEnter={() => setActive(i)}
              className="group grid grid-cols-[3rem_1fr_auto] items-baseline gap-x-4 gap-y-3 py-7 transition-colors md:grid-cols-[4rem_1.2fr_1fr_auto] md:py-9"
            >
              <span className="font-mono text-xs text-muted">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-5xl font-extrabold tracking-[-0.04em] uppercase transition-[transform,color] duration-500 group-hover:translate-x-3 group-hover:text-signal md:text-7xl">
                {project.title}
              </span>
              <span className="col-span-3 col-start-2 max-w-md text-sm text-muted md:col-span-1 md:col-start-3 md:text-base">
                {project.description}
                <span className="mt-3 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[11px] text-ink"
                    >
                      {tag}
                    </span>
                  ))}
                </span>
              </span>
              <span className="col-start-3 row-start-1 flex items-center gap-3 font-mono text-xs md:col-start-4">
                {project.year}
                <span className="grid size-10 place-items-center rounded-full border border-ink transition-all duration-300 group-hover:rotate-45 group-hover:border-signal group-hover:bg-signal group-hover:text-paper">
                  ↗
                </span>
              </span>
              {/* Inline preview on touch screens */}
              <span className="col-span-3 col-start-1 mt-2 block aspect-[16/10] md:hidden">
                <Preview project={project} />
              </span>
            </a>
          </li>
        ))}
      </ul>

      {/* Cursor-following preview on desktop */}
      <div
        ref={previewRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-40 hidden md:block"
      >
        <div
          className={`h-[280px] w-[380px] transition-[opacity,scale,rotate] duration-300 ${
            active === null ? "scale-75 -rotate-6 opacity-0" : "scale-100 rotate-3 opacity-100"
          }`}
        >
          {active !== null && <Preview project={projects[active]} />}
        </div>
      </div>
    </div>
  );
}
