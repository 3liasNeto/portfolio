"use client";

import { copyText } from "./toast";

const pill =
  "group inline-flex items-center gap-2 rounded-full border-2 border-on-signal px-5 py-3 font-mono text-xs tracking-wider uppercase transition-colors hover:bg-on-signal hover:text-signal";

export function ContactActions({
  email,
  cv,
  calendar,
  labels,
}: {
  email: string;
  cv: string;
  calendar: string | null;
  labels: { copy: string; copied: string; copyFailed: string; cv: string; schedule: string };
}) {
  return (
    <div className="mt-10 flex flex-wrap gap-3">
      <button type="button" onClick={() => copyText(email, labels)} className={pill}>
        <span aria-hidden>⧉</span>
        {labels.copy}
      </button>
      <a href={cv} download className={pill}>
        <span aria-hidden className="transition-transform group-hover:translate-y-0.5">↓</span>
        {labels.cv}
      </a>
      {calendar && (
        <a href={calendar} target="_blank" rel="noreferrer" className={pill}>
          <span aria-hidden>◷</span>
          {labels.schedule}
          <span aria-hidden>↗</span>
        </a>
      )}
    </div>
  );
}
