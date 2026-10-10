import type { PostEntry } from "@/content/blog/posts";

// Generative cover in the same spirit as the portfolio project previews
export function PostCover({
  cover,
  number,
  className = "",
  size = "md",
}: {
  cover: PostEntry["cover"];
  number: number;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const [a, b] = cover.palette;
  const glyph = { sm: "text-[5rem]", md: "text-[9rem]", lg: "text-[13rem] md:text-[18rem]" }[size];
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ background: `radial-gradient(circle at 30% 30%, ${b}, ${a} 70%)` }}
    >
      <span
        aria-hidden
        className={`absolute -right-[0.08em] -bottom-[0.2em] font-serif leading-none italic ${glyph}`}
        style={{ color: b, mixBlendMode: "difference" }}
      >
        {cover.glyph}
      </span>
      <span className="absolute top-3 left-3 rounded-full bg-paper/90 px-2.5 py-1 font-mono text-[10px] tracking-wider text-ink uppercase">
        Nº {String(number).padStart(2, "0")}
      </span>
    </div>
  );
}
