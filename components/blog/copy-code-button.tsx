"use client";

import { copyText } from "../toast";

export function CopyCodeButton({
  code,
  labels,
}: {
  code: string;
  labels: { copy: string; copied: string; copyFailed: string };
}) {
  return (
    <button
      type="button"
      onClick={() => copyText(code, labels)}
      className="ml-auto rounded-md px-2 py-1 text-chalk/60 uppercase transition-colors hover:bg-chalk/10 hover:text-chalk"
    >
      ⧉ {labels.copy}
    </button>
  );
}
