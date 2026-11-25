"use client";

import { useRef, useState } from "react";
import type { Project } from "@/lib/data";

// Description and origin label ("Bornan", "Pessoal"…) come translated from the page
type LocalizedProject = Project & { description: string; originLabel: string };

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
      <span className="absolute top-4 left-4 z-20 rounded-full bg-paper/90 px-3 py-1 font-mono text-[11px] tracking-wider text-ink uppercase">
        {project.title} · {project.originLabel}
      </span>
    </div>
  );
}

// The floating preview is 380×280; the site renders as a 1280px-wide desktop, scaled down
const frameWidth = 1280;
const frameScale = 380 / frameWidth;

// Live site inside the floating preview. Purely visual: no pointer, no focus, no tab stop.
function SiteFrame({ url, title, visible }: { url: string; title: string; visible: boolean }) {
  const [ready, setReady] = useState(false);
  return (
    <div
      className={`absolute inset-0 z-10 overflow-hidden rounded-2xl bg-paper transition-opacity duration-500 ${
        visible && ready ? "opacity-100" : "opacity-0"
      }`}
    >
      <iframe
        src={url}
        title={title}
        tabIndex={-1}
        loading="lazy"
        referrerPolicy="no-referrer"
        sandbox="allow-scripts allow-same-origin"
        onLoad={() => setReady(true)}
        className="pointer-events-none origin-top-left border-0"
        style={{
          width: frameWidth,
          height: 280 / frameScale,
          transform: `scale(${frameScale})`,
        }}
      />
    </div>
  );
}

function ProjectRow({
  project,
  index,
  privateLabel,
  onActivate,
  onDeactivate,
}: {
  project: LocalizedProject;
  index: number;
  privateLabel: string;
  onActivate: (row?: HTMLElement) => void;
  onDeactivate: () => void;
}) {
  const linked = Boolean(project.href);
  // Mobile: number | title, then description and meta under the title.
  // Desktop: number | title | description | meta on one row.
  const className =
    "group grid grid-cols-[2.5rem_1fr] items-baseline gap-x-4 gap-y-3 py-7 transition-colors md:grid-cols-[4rem_1.2fr_1fr_auto] md:py-9";

  const content = (
    <>
      <span className="font-mono text-xs text-muted">{String(index + 1).padStart(2, "0")}</span>
      <span className="text-5xl font-extrabold tracking-[-0.04em] uppercase transition-[transform,color] duration-500 group-hover:translate-x-3 group-hover:text-signal-text md:text-7xl">
        {project.title}
      </span>
      <span className="col-start-2 max-w-md text-sm text-muted md:col-start-3 md:row-start-1 md:text-base">
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
      <span className="col-start-2 flex flex-wrap items-center gap-3 font-mono text-xs md:col-start-4 md:row-start-1">
        {project.originLabel}
        {linked ? (
          <span
            aria-hidden
            className="grid size-10 place-items-center rounded-full border border-ink transition-all duration-300 group-hover:rotate-45 group-hover:border-signal group-hover:bg-signal group-hover:text-on-signal"
          >
            ↗
          </span>
        ) : (
          <span className="rounded-full border border-ink/30 px-3 py-1.5 text-[11px] tracking-wider text-muted uppercase">
            {privateLabel}
          </span>
        )}
      </span>
      {/* Inline preview where the floating one isn't used (touch or small screens) */}
      <span className="col-span-2 col-start-1 mt-2 block aspect-[16/10] [@media(hover:hover)_and_(min-width:48rem)]:hidden">
        <Preview project={project} />
      </span>
    </>
  );

  return linked ? (
    <a
      href={project.href}
      target="_blank"
      rel="noreferrer"
      onMouseEnter={() => onActivate()}
      onFocus={(e) => onActivate(e.currentTarget)}
      onBlur={onDeactivate}
      className={className}
    >
      {content}
    </a>
  ) : (
    <div onMouseEnter={() => onActivate()} className={className}>
      {content}
    </div>
  );
}

export function WorkList({
  projects,
  privateLabel,
}: {
  projects: LocalizedProject[];
  privateLabel: string;
}) {
  const [active, setActive] = useState<number | null>(null);
  // Projects whose live site was already requested: their iframe stays mounted so a
  // second hover doesn't reload the whole site
  const [framed, setFramed] = useState<string[]>([]);
  const previewRef = useRef<HTMLDivElement>(null);

  function activate(i: number) {
    setActive(i);
    const { id, site } = projects[i];
    // Only where the floating preview exists (real hover, wide screen): no iframes on touch
    const floating = matchMedia("(hover: hover) and (min-width: 48rem)").matches;
    if (site && floating && !framed.includes(id)) setFramed((list) => [...list, id]);
  }

  function moveTo(x: number, y: number) {
    const el = previewRef.current;
    if (el) el.style.transform = `translate(${x}px, ${y}px)`;
  }

  return (
    <div
      onMouseMove={(e) => moveTo(e.clientX + 24, e.clientY - 140)}
      onMouseLeave={() => setActive(null)}
    >
      <ul className="border-t border-ink">
        {projects.map((project, i) => (
          <li
            key={project.id}
            data-reveal="up"
            style={{ "--i": i } as React.CSSProperties}
            className="border-b border-ink"
          >
            <ProjectRow
              project={project}
              index={i}
              privateLabel={privateLabel}
              onActivate={(row) => {
                // Keyboard focus has no pointer: park the preview at the row's right end
                if (row) {
                  const rect = row.getBoundingClientRect();
                  moveTo(Math.max(rect.right - 420, 0), Math.max(rect.top - 40, 0));
                }
                activate(i);
              }}
              onDeactivate={() => setActive(null)}
            />
          </li>
        ))}
      </ul>

      {/* Floating preview, only with a real hover and room for it */}
      <div
        ref={previewRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-40 hidden [@media(hover:hover)_and_(min-width:48rem)]:block"
      >
        <div
          className={`relative h-[280px] w-[380px] transition-[opacity,scale,rotate] duration-300 ${
            active === null ? "scale-75 -rotate-6 opacity-0" : "scale-100 rotate-3 opacity-100"
          }`}
        >
          {/* Generative card first; a live site fades in over it once loaded */}
          {active !== null && <Preview project={projects[active]} />}
          {projects.map(
            ({ id, site, title }) =>
              site &&
              framed.includes(id) && (
                <SiteFrame
                  key={id}
                  url={site}
                  title={title}
                  visible={active !== null && projects[active].id === id}
                />
              ),
          )}
        </div>
      </div>
    </div>
  );
}
