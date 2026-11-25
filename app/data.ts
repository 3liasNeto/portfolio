// Language-independent data; translated copy lives in app/[lang]/dictionaries.ts.
// Source: Elias's résumés (Full Stack and Frontend) and public GitHub (3liasNeto).

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://eliasneto.dev";

export const profile = {
  name: "Elias Neto",
  city: "Uberlândia",
  region: "MG",
  country: "BR",
  location: "Uberlândia, MG",
  // IANA zone for the live clock, plus the short label shown next to it
  timeZone: "America/Sao_Paulo",
  timeZoneLabel: "BRT",
  email: "contato@eliasneto.dev",
  // Full-art image on the front of the holographic card (63:88, in public/)
  cardArt: "/elias-card.webp",
  cv: "/cv-elias-neto.pdf",
  // Booking link (Cal.com, Calendly…); null hides the "book a call" button
  calendar: null as string | null,
  socials: [
    { label: "GitHub", href: "https://github.com/3liasNeto" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/eliasnet0/" },
  ],
};

export const stack = [
  "TypeScript",
  "React",
  "Next.js",
  "React Native",
  "Expo",
  "NestJS",
  "Node.js",
  "PostgreSQL",
  "Prisma",
  "Tailwind CSS",
  "TanStack Query",
  "Docker",
];

export type ProjectId =
  | "cartanoel"
  | "b2b"
  | "banking"
  | "vendora"
  | "niveela"
  | "pokemon"
  | "fifa"
  | "portfolio";

export type Project = {
  id: ProjectId;
  title: string;
  tags: string[];
  // Where it was built: shown next to the title ("Bornan", "SENAC" or a translated "personal")
  origin: "bornan" | "senac" | "personal";
  // Public link; without one (client work, private repos) the project is shown as private
  href?: string;
  // Live site shown inside the desktop hover preview (iframe). The site must allow being
  // framed by this one (no X-Frame-Options DENY / frame-ancestors 'none').
  site?: string;
  // Two colors used to paint the generative preview card
  palette: [string, string];
  glyph: string;
};

export const projects: Project[] = [
  {
    id: "cartanoel",
    title: "Carta Noel",
    tags: ["React 19", "Elysia", "Stripe"],
    origin: "personal",
    href: "https://cartanoel.com.br",
    site: "https://cartanoel.com.br",
    palette: ["#b3121f", "#ffe9d6"],
    glyph: "✉",
  },
  {
    id: "b2b",
    title: "Portal B2B",
    tags: ["Next.js", "NestJS", "PostgreSQL"],
    origin: "bornan",
    palette: ["#ff4d1c", "#ffb199"],
    glyph: "◐",
  },
  {
    id: "banking",
    title: "Banking VAN",
    tags: ["Microservices", "RabbitMQ", "OAuth"],
    origin: "bornan",
    palette: ["#2b2bff", "#c6c6ff"],
    glyph: "◆",
  },
  {
    id: "vendora",
    title: "Vendora",
    tags: ["React Native", "Expo", "API"],
    origin: "bornan",
    palette: ["#1f3d2b", "#b9d77a"],
    glyph: "✳",
  },
  {
    id: "niveela",
    title: "Niveela",
    tags: ["Design tokens", "CSS", "WCAG AA"],
    origin: "bornan",
    palette: ["#7a1c05", "#ffd2b8"],
    glyph: "≋",
  },
  {
    id: "pokemon",
    title: "Desafio Pokémon",
    tags: ["React", "Vite", "TypeScript"],
    origin: "personal",
    href: "https://batte.eliasneto.dev/",
    site: "https://batte.eliasneto.dev/",
    palette: ["#c3201a", "#ffe27a"],
    glyph: "◓",
  },
  {
    id: "fifa",
    title: "Copa do Mundo",
    tags: ["JavaScript", "Drag & drop", "Tailwind CSS"],
    origin: "senac",
    palette: ["#0a6e3a", "#ffdf2e"],
    glyph: "⚽",
  },
  {
    id: "portfolio",
    title: "Portfolio",
    tags: ["Next.js 16", "MDX", "Vitest"],
    origin: "personal",
    href: "https://github.com/3liasNeto/portfolio",
    palette: ["#ff4d1c", "#121110"],
    glyph: "En.",
  },
];

// Experience timeline, newest first. Texts live in dictionaries.ts under the same id;
// the hash is the decorative "commit" shown in the git-log window.
export type ExperienceId = "bornan" | "uniube" | "senac" | "start";

export const experience: { id: ExperienceId; hash: string }[] = [
  { id: "bornan", hash: "a3f9c21" },
  { id: "uniube", hash: "7be04d8" },
  { id: "senac", hash: "c51e9a0" },
  { id: "start", hash: "0d2b7f3" },
];

// Numbers in the About section; labels live in dictionaries.ts under the same id
export type StatId = "years" | "fronts" | "since";

export const stats: { id: StatId; value: string }[] = [
  { id: "years", value: "3+" },
  { id: "fronts", value: "3" },
  { id: "since", value: "2021" },
];

// Section anchors, shared by the page and the command palette
export const sections = {
  work: "trabalhos",
  about: "sobre",
  experience: "experiencia",
  contact: "contato",
} as const;
