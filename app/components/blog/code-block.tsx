import type { ReactElement } from "react";
import { highlight } from "sugar-high";
import { CopyCodeButton } from "./copy-code-button";

type CodeElement = ReactElement<{ className?: string; children?: string }>;

// Replaces MDX's <pre>: terminal-style window with syntax highlight and a copy button
export function CodeBlock({
  children,
  labels,
}: {
  children?: React.ReactNode;
  labels: { copy: string; copied: string };
}) {
  const code = (children as CodeElement)?.props;
  const source = String(code?.children ?? "").replace(/\n$/, "");
  const language = code?.className?.replace("language-", "") ?? "text";

  return (
    <figure className="code-block not-prose my-8 overflow-hidden rounded-xl border border-ink/80 bg-[#181715] text-chalk shadow-[6px_6px_0_var(--signal)]">
      <figcaption className="flex items-center gap-1.5 border-b border-chalk/10 px-3 py-2 font-mono text-[11px]">
        <span className="size-2.5 rounded-full bg-signal" />
        <span className="size-2.5 rounded-full bg-chalk/30" />
        <span className="size-2.5 rounded-full bg-chalk/30" />
        <span className="ml-2 text-chalk/50 uppercase">{language}</span>
        <CopyCodeButton code={source} labels={labels} />
      </figcaption>
      <pre className="overflow-x-auto p-5 font-mono text-[13.5px] leading-relaxed">
        <code dangerouslySetInnerHTML={{ __html: highlight(source) }} />
      </pre>
    </figure>
  );
}
