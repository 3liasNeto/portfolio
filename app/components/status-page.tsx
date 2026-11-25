import Link from "next/link";

// Shared layout for the 404 and error pages
export function StatusPage({
  code,
  title,
  body,
  children,
}: {
  code: string;
  title: string;
  body: string;
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto flex min-h-svh w-full max-w-[1600px] flex-col justify-center px-4 py-24 md:px-8">
      <p className="font-mono text-sm text-muted">
        <span className="text-signal-text">~/</span>portfolio <span className="text-ink">$ cd …</span>
      </p>
      <p
        aria-hidden
        className="mt-4 text-[34vw] leading-[0.8] font-black tracking-[-0.06em] md:text-[22vw]"
      >
        {code}
        <span className="text-signal">.</span>
      </p>
      <h1 className="mt-8 text-4xl font-extrabold tracking-[-0.04em] md:text-6xl">{title}</h1>
      <p className="mt-4 max-w-xl text-xl leading-snug text-muted">{body}</p>
      <div className="mt-10 flex flex-wrap gap-3">{children}</div>
    </main>
  );
}

export const statusButton =
  "inline-flex items-center gap-2 rounded-full border-2 border-ink px-5 py-3 font-mono text-xs tracking-wider uppercase transition-colors hover:bg-ink hover:text-paper";

export function StatusLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className={statusButton}>
      {children} →
    </Link>
  );
}
