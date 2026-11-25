const styles = {
  tip: { icon: "✳", className: "border-signal bg-signal/10" },
  warning: { icon: "!", className: "border-[#e0a100] bg-[#e0a100]/12" },
};

export function Callout({
  type = "tip",
  label,
  children,
}: {
  type?: keyof typeof styles;
  label: string;
  children?: React.ReactNode;
}) {
  const style = styles[type];
  return (
    <aside className={`callout my-8 flex gap-4 rounded-xl border-l-4 px-5 py-4 ${style.className}`}>
      <span
        aria-hidden
        className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-ink font-mono text-sm text-paper"
      >
        {style.icon}
      </span>
      <div>
        <p className="font-mono text-[11px] tracking-widest uppercase">{label}</p>
        <div className="mt-1 [&>p]:m-0">{children}</div>
      </div>
    </aside>
  );
}
