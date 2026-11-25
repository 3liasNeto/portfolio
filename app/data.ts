// Placeholder content — swap for Elias's real data later.
// Language-independent data lives here; translated copy lives in app/[lang]/dictionaries.ts.

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://eliasneto.dev";

export const profile = {
  name: "Elias Neto",
  city: "São Paulo",
  country: "BR",
  location: "São Paulo, BR",
  // IANA zone for the live clock, plus the short label shown next to it
  timeZone: "America/Sao_Paulo",
  timeZoneLabel: "BRT",
  email: "ola@eliasneto.dev",
  // Full-art image on the front of the holographic card (63:88, in public/)
  cardArt: "/elias-card.webp",
  cv: "/cv-elias-neto.pdf",
  calendar: "https://cal.com/",
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

// Experience timeline, newest first. Texts live in dictionaries.ts under the same id;
// the hash is the decorative "commit" shown in the git-log window.
export type ExperienceId = "alpha" | "beta" | "gamma" | "start";

export const experience: { id: ExperienceId; hash: string }[] = [
  { id: "alpha", hash: "a3f9c21" },
  { id: "beta", hash: "7be04d8" },
  { id: "gamma", hash: "c51e9a0" },
  { id: "start", hash: "0d2b7f3" },
];

// Numbers in the About section; labels live in dictionaries.ts under the same id
export type StatId = "years" | "projects" | "commits";

export const stats: { id: StatId; value: string }[] = [
  { id: "years", value: "7+" },
  { id: "projects", value: "40+" },
  { id: "commits", value: "12k" },
];

// Section anchors, shared by the page and the command palette
export const sections = {
  work: "trabalhos",
  about: "sobre",
  experience: "experiencia",
  contact: "contato",
} as const;
