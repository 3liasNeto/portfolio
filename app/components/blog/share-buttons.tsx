"use client";

import { copyText } from "../toast";

export function ShareButtons({
  title,
  labels,
}: {
  title: string;
  labels: { share: string; copyLink: string; linkCopied: string; copyFailed: string };
}) {
  const open = (build: (url: string) => string) => () =>
    window.open(build(encodeURIComponent(location.href)), "_blank", "noopener,noreferrer");
  const text = encodeURIComponent(title);
  const button =
    "grid size-10 place-items-center rounded-full border border-ink/20 font-mono text-xs transition-colors hover:border-signal hover:bg-signal hover:text-on-signal";

  return (
    <div className="flex items-center gap-2">
      <span className="mr-1 font-mono text-[11px] tracking-widest text-muted uppercase">
        {labels.share}
      </span>
      <button
        type="button"
        aria-label={labels.copyLink}
        title={labels.copyLink}
        className={button}
        onClick={() => copyText(location.href, { copied: labels.linkCopied, copyFailed: labels.copyFailed })}
      >
        ⧉
      </button>
      <button
        type="button"
        aria-label="X / Twitter"
        title="X / Twitter"
        className={button}
        onClick={open((url) => `https://x.com/intent/post?url=${url}&text=${text}`)}
      >
        𝕏
      </button>
      <button
        type="button"
        aria-label="LinkedIn"
        title="LinkedIn"
        className={button}
        onClick={open((url) => `https://www.linkedin.com/sharing/share-offsite/?url=${url}`)}
      >
        in
      </button>
    </div>
  );
}
