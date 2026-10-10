// Placeholder content — swap for Elias's real data later.

export const profile = {
  name: "Elias Neto",
  role: "Desenvolvedor Full-Stack",
  location: "São Paulo, BR",
  timeZone: "America/Sao_Paulo",
  email: "ola@eliasneto.dev",
  availability: "Disponível para novos projetos",
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

export type Project = {
  title: string;
  description: string;
  tags: string[];
  year: string;
  href: string;
  // Two colors used to paint the generative preview card
  palette: [string, string];
  glyph: string;
};

export const projects: Project[] = [
  {
    title: "Orbita",
    description:
      "Plataforma SaaS de gestão financeira para pequenas empresas, com dashboards em tempo real.",
    tags: ["Next.js", "Postgres", "Stripe"],
    year: "2026",
    href: "#",
    palette: ["#ff4d1c", "#ffb199"],
    glyph: "◐",
  },
  {
    title: "Feira Livre",
    description:
      "Marketplace de produtores locais com checkout em um clique e logística integrada.",
    tags: ["React Native", "Node", "GraphQL"],
    year: "2025",
    href: "#",
    palette: ["#1f3d2b", "#b9d77a"],
    glyph: "✳",
  },
  {
    title: "Pulso",
    description:
      "Design system open-source com 60+ componentes acessíveis e tokens multi-marca.",
    tags: ["React", "Storybook", "a11y"],
    year: "2025",
    href: "#",
    palette: ["#2b2bff", "#c6c6ff"],
    glyph: "◆",
  },
  {
    title: "Nômade",
    description:
      "App de roteiros de viagem com sugestões geradas por IA e modo offline.",
    tags: ["TypeScript", "AI", "PWA"],
    year: "2024",
    href: "#",
    palette: ["#121110", "#f1ece2"],
    glyph: "↗",
  },
];

export const services = [
  {
    title: "Produtos web",
    body: "Do protótipo ao deploy: aplicações rápidas, escaláveis e fáceis de manter.",
  },
  {
    title: "Interfaces",
    body: "Front-ends com atenção a micro-interações, acessibilidade e performance.",
  },
  {
    title: "APIs & dados",
    body: "Back-ends limpos, modelagem de dados e integrações que não quebram às 3h.",
  },
  {
    title: "Consultoria",
    body: "Revisão de arquitetura, code review e mentoria para times de produto.",
  },
];

export const experience = [
  {
    hash: "a3f9c21",
    period: "2024 — hoje",
    role: "Senior Software Engineer",
    company: "Empresa Alfa",
    note: "Liderando a reconstrução do front-end do produto principal.",
  },
  {
    hash: "7be04d8",
    period: "2021 — 2024",
    role: "Full-Stack Developer",
    company: "Startup Beta",
    note: "Do MVP à Série A: arquitetura, pagamentos e infraestrutura.",
  },
  {
    hash: "c51e9a0",
    period: "2019 — 2021",
    role: "Front-End Developer",
    company: "Agência Gama",
    note: "Sites e campanhas para marcas nacionais.",
  },
  {
    hash: "0d2b7f3",
    period: "2018",
    role: "git init",
    company: "Primeiro commit",
    note: "Onde tudo começou: um HTML, um CSS e muita curiosidade.",
  },
];

export const stats = [
  { value: "7+", label: "anos escrevendo código" },
  { value: "40+", label: "projetos entregues" },
  { value: "12k", label: "commits no último ano" },
];
