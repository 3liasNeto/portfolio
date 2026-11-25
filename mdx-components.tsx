import type { MDXComponents } from "mdx/types";

// Global MDX elements. Locale-aware pieces (code blocks, callouts) are passed by
// the blog post page through the `components` prop.

function Heading({ as: Tag, id, children }: { as: "h2" | "h3"; id?: string; children?: React.ReactNode }) {
  return (
    <Tag id={id} className="group scroll-mt-28">
      {children}
      {id && (
        <a
          href={`#${id}`}
          aria-hidden
          tabIndex={-1}
          className="ml-2 text-signal no-underline opacity-0 transition-opacity group-hover:opacity-100"
        >
          #
        </a>
      )}
    </Tag>
  );
}

const components: MDXComponents = {
  h2: (props) => <Heading as="h2" {...props} />,
  h3: (props) => <Heading as="h3" {...props} />,
  a: ({ href = "", ...props }) =>
    href.startsWith("http") ? (
      <a href={href} target="_blank" rel="noreferrer" {...props} />
    ) : (
      <a href={href} {...props} />
    ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
