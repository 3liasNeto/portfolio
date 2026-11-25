// Server-side helpers for scroll reveals. Elements marked with data-reveal are
// shown by <RevealObserver /> once they enter the viewport (see globals.css).

type Segment = { text: string; className?: string };

// Splits text into words that slide up one after another
export function RevealWords({ segments }: { segments: Segment[] }) {
  let index = 0;
  return segments.map((segment, s) =>
    segment.text
      .split(" ")
      .filter(Boolean)
      .map((word, w) => {
        const i = index++;
        return (
          <span key={`${s}-${w}`}>
            {i > 0 && " "}
            <span className="reveal-mask">
              <span
                className={`reveal-word ${segment.className ?? ""}`}
                style={{ "--i": i } as React.CSSProperties}
              >
                {word}
              </span>
            </span>
          </span>
        );
      }),
  );
}
