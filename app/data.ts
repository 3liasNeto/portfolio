// Placeholder content — swap for Elias's real data later.
// Language-independent data lives here; translated copy lives in app/[lang]/dictionaries.ts.

export const profile = {
  name: "Elias Neto",
  location: "São Paulo, BR",
  timeZone: "America/Sao_Paulo",
  email: "ola@eliasneto.dev",
  socials: [
    { label: "GitHub", href: "https://github.com/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "X / Twitter", href: "https://x.com/" },
    { label: "Read.cv", href: "https://read.cv/" },
  ],
};

export const stack = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "PostgreSQL",
  "Tailwind CSS",
  "GraphQL",
  "Docker",
  "AWS",
  "Figma",
];

export type ProjectId = "orbita" | "feira" | "pulso" | "nomade";

export type Project = {
  id: ProjectId;
  title: string;
  tags: string[];
  year: string;
  href: string;
  // Two colors used to paint the generative preview card
  palette: [string, string];
  glyph: string;
};

export const projects: Project[] = [
  {
    id: "orbita",
    title: "Orbita",
    tags: ["Next.js", "Postgres", "Stripe"],
    year: "2026",
    href: "#",
    palette: ["#ff4d1c", "#ffb199"],
    glyph: "◐",
  },
  {
    id: "feira",
    title: "Feira Livre",
    tags: ["React Native", "Node", "GraphQL"],
    year: "2025",
    href: "#",
    palette: ["#1f3d2b", "#b9d77a"],
    glyph: "✳",
  },
  {
    id: "pulso",
    title: "Pulso",
    tags: ["React", "Storybook", "a11y"],
    year: "2025",
    href: "#",
    palette: ["#2b2bff", "#c6c6ff"],
    glyph: "◆",
  },
  {
    id: "nomade",
    title: "Nômade",
    tags: ["TypeScript", "AI", "PWA"],
    year: "2024",
    href: "#",
    palette: ["#121110", "#f1ece2"],
    glyph: "↗",
  },
];

export const commits = ["a3f9c21", "7be04d8", "c51e9a0", "0d2b7f3"];

export const statValues = ["7+", "40+", "12k"];
