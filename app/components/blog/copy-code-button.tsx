"use client";

import { showToast } from "../toast";

export function CopyCodeButton({
  code,
  labels,
}: {
  code: string;
  labels: { copy: string; copied: string };
}) {
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(code);
          showToast(labels.copied);
        } catch {}
      }}
      className="ml-auto rounded-md px-2 py-1 text-chalk/60 uppercase transition-colors hover:bg-chalk/10 hover:text-chalk"
    >
      ⧉ {labels.copy}
    </button>
  );
}
