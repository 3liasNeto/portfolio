import type { Locale } from "../i18n";
import type { ProjectId } from "../data";

const pt = {
  meta: {
    title: "Elias Neto — Desenvolvedor",
    description:
      "Portfólio de Elias Neto, desenvolvedor full-stack que constrói produtos digitais com código cuidadoso e interfaces com personalidade.",
  },
  nav: {
    home: "Início",
    work: "Trabalhos",
    about: "Sobre",
    experience: "Experiência",
    cta: "Vamos conversar",
    language: "Idioma",
  },
  hero: {
    availability: "Disponível para novos projetos",
    role: "Desenvolvedor Full-Stack",
    // Rendered as: role + before + <em> + middle + <mark> + after
    before: "que transforma ideias em",
    em: "produtos digitais",
    middle: "rápidos, acessíveis e com",
    highlight: "personalidade",
    after: ".",
    scroll: "Role para ver trabalhos",
    terminal: {
      command: "elias --fazendo",
      phrases: [
        "construindo interfaces",
        "escrevendo APIs",
        "refatorando sem medo",
        "revisando um PR",
        "passando um café",
      ],
    },
  },
  work: {
    label: "Trabalhos selecionados",
    titleA: "Coisas que eu",
    titleEm: "construí",
    titleB: "e gosto de mostrar.",
    hint: "Passe o mouse para espiar · 2024 — 2026",
  },
  projects: {
    orbita:
      "Plataforma SaaS de gestão financeira para pequenas empresas, com dashboards em tempo real.",
    feira:
      "Marketplace de produtores locais com checkout em um clique e logística integrada.",
    pulso:
      "Design system open-source com 60+ componentes acessíveis e tokens multi-marca.",
    nomade:
      "App de roteiros de viagem com sugestões geradas por IA e modo offline.",
  } satisfies Record<ProjectId, string>,
  about: {
    label: "Sobre",
    // Alternates plain text and <em> fragments
    statement: [
      "Oi, eu sou o Elias. Escrevo código como quem escreve um ",
      "bom texto",
      ": com clareza, ritmo e sem palavras sobrando. Gosto do ponto onde ",
      "design",
      " e ",
      "engenharia",
      " se encontram — é ali que os produtos ganham alma.",
    ],
    photo: "[ foto em breve ]",
    card: {
      hint: "Passe o mouse ou arraste · clique para virar",
      flip: "Virar carta",
      stage: "Básico",
      hp: "PS",
      kind: "Dev Full-Stack · Nº 001 · Habitat: São Paulo",
      abilityLabel: "Habilidade",
      ability: "Código com assinatura",
      abilityText: "Uma vez por turno, transforme um bug em feature documentada.",
      attacks: [
        {
          name: "Deploy de sexta",
          damage: "120",
          text: "Jogue uma moeda. Se sair coroa, este ataque derruba a produção.",
        },
        {
          name: "Code Review",
          damage: "30+",
          text: "Causa 10 de dano a mais para cada comentário “nit” no PR.",
        },
      ],
      weakness: "Fraqueza",
      weaknessValue: "Reuniões ×2",
      resistance: "Resistência",
      resistanceValue: "Bugs −30",
      retreat: "Recuo",
      flavor:
        "Visto com frequência perto de máquinas de café e terminais abertos às 2h da manhã.",
      back: "Carta de Dev",
    },
    stats: ["anos escrevendo código", "projetos entregues", "commits no último ano"],
  },
  services: [
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
  ],
  experience: {
    label: "Experiência",
    titleA: "O histórico de",
    titleEm: "commits",
    titleB: "da minha carreira.",
    terminal: "elias@neto: ~/carreira — git log --graph",
    items: [
      {
        period: "2024 — hoje",
        role: "Senior Software Engineer",
        company: "Empresa Alfa",
        note: "Liderando a reconstrução do front-end do produto principal.",
      },
      {
        period: "2021 — 2024",
        role: "Full-Stack Developer",
        company: "Startup Beta",
        note: "Do MVP à Série A: arquitetura, pagamentos e infraestrutura.",
      },
      {
        period: "2019 — 2021",
        role: "Front-End Developer",
        company: "Agência Gama",
        note: "Sites e campanhas para marcas nacionais.",
      },
      {
        period: "2018",
        role: "git init",
        company: "Primeiro commit",
        note: "Onde tudo começou: um HTML, um CSS e muita curiosidade.",
      },
    ],
  },
  contact: {
    label: "Contato",
    title: "Tem uma ideia?",
    titleEm: "Vamos construir juntos.",
    back: "Voltar ao topo ↑",
    madeWith: "Feito com Next.js & café",
    copy: "Copiar e-mail",
    copied: "E-mail copiado!",
    cv: "Baixar CV",
    schedule: "Agendar conversa",
  },
  palette: {
    open: "Abrir comandos",
    title: "comandos",
    placeholder: "Digite um comando ou busque…",
    empty: "Nenhum comando encontrado.",
    hints: { move: "navegar", run: "executar", close: "fechar" },
    groups: {
      navigate: "Navegar",
      preferences: "Preferências",
      contact: "Contato",
      social: "Redes",
    },
    commands: {
      top: "Ir para o início",
      work: "Ver trabalhos",
      about: "Sobre o Elias",
      experience: "Ver experiência",
      contact: "Ir para o contato",
      light: "Usar tema claro",
      dark: "Usar tema escuro",
      language: "Mudar idioma para",
    },
  },
  theme: {
    label: "Tema",
    light: "Claro",
    dark: "Escuro",
  },
};

export type Dictionary = typeof pt;

const en: Dictionary = {
  meta: {
    title: "Elias Neto — Developer",
    description:
      "Portfolio of Elias Neto, a full-stack developer building digital products with careful code and interfaces with personality.",
  },
  nav: {
    home: "Home",
    work: "Work",
    about: "About",
    experience: "Experience",
    cta: "Let's talk",
    language: "Language",
  },
  hero: {
    availability: "Available for new projects",
    role: "Full-Stack Developer",
    before: "turning ideas into",
    em: "digital products",
    middle: "that are fast, accessible and full of",
    highlight: "personality",
    after: ".",
    scroll: "Scroll to see work",
    terminal: {
      command: "elias --doing",
      phrases: [
        "building interfaces",
        "writing APIs",
        "refactoring fearlessly",
        "reviewing a PR",
        "brewing coffee",
      ],
    },
  },
  work: {
    label: "Selected work",
    titleA: "Things I",
    titleEm: "built",
    titleB: "and love to show.",
    hint: "Hover to peek · 2024 — 2026",
  },
  projects: {
    orbita: "Financial management SaaS for small businesses, with real-time dashboards.",
    feira: "Marketplace for local producers with one-click checkout and built-in logistics.",
    pulso: "Open-source design system with 60+ accessible components and multi-brand tokens.",
    nomade: "Travel itinerary app with AI-generated suggestions and offline mode.",
  },
  about: {
    label: "About",
    statement: [
      "Hi, I'm Elias. I write code the way you'd write a ",
      "good essay",
      ": clear, with rhythm and no wasted words. I love the spot where ",
      "design",
      " and ",
      "engineering",
      " meet — that's where products get a soul.",
    ],
    photo: "[ photo coming soon ]",
    card: {
      hint: "Hover or drag · click to flip",
      flip: "Flip card",
      stage: "Basic",
      hp: "HP",
      kind: "Full-Stack Dev · No. 001 · Habitat: São Paulo",
      abilityLabel: "Ability",
      ability: "Code with a signature",
      abilityText: "Once per turn, turn a bug into a documented feature.",
      attacks: [
        {
          name: "Friday Deploy",
          damage: "120",
          text: "Flip a coin. If tails, this attack takes production down.",
        },
        {
          name: "Code Review",
          damage: "30+",
          text: "Does 10 more damage for each “nit” comment on the PR.",
        },
      ],
      weakness: "Weakness",
      weaknessValue: "Meetings ×2",
      resistance: "Resistance",
      resistanceValue: "Bugs −30",
      retreat: "Retreat",
      flavor: "Often spotted near coffee machines and terminals left open at 2am.",
      back: "Dev Card",
    },
    stats: ["years writing code", "projects shipped", "commits last year"],
  },
  services: [
    {
      title: "Web products",
      body: "From prototype to deploy: fast, scalable apps that are easy to maintain.",
    },
    {
      title: "Interfaces",
      body: "Front-ends with care for micro-interactions, accessibility and performance.",
    },
    {
      title: "APIs & data",
      body: "Clean back-ends, data modeling and integrations that don't break at 3am.",
    },
    {
      title: "Consulting",
      body: "Architecture reviews, code review and mentoring for product teams.",
    },
  ],
  experience: {
    label: "Experience",
    titleA: "The",
    titleEm: "commit",
    titleB: "history of my career.",
    terminal: "elias@neto: ~/career — git log --graph",
    items: [
      {
        period: "2024 — now",
        role: "Senior Software Engineer",
        company: "Company Alpha",
        note: "Leading the front-end rebuild of the flagship product.",
      },
      {
        period: "2021 — 2024",
        role: "Full-Stack Developer",
        company: "Startup Beta",
        note: "From MVP to Series A: architecture, payments and infrastructure.",
      },
      {
        period: "2019 — 2021",
        role: "Front-End Developer",
        company: "Gamma Agency",
        note: "Websites and campaigns for national brands.",
      },
      {
        period: "2018",
        role: "git init",
        company: "First commit",
        note: "Where it all began: some HTML, some CSS and lots of curiosity.",
      },
    ],
  },
  contact: {
    label: "Contact",
    title: "Got an idea?",
    titleEm: "Let's build it together.",
    back: "Back to top ↑",
    madeWith: "Made with Next.js & coffee",
    copy: "Copy email",
    copied: "Email copied!",
    cv: "Download CV",
    schedule: "Book a call",
  },
  palette: {
    open: "Open commands",
    title: "commands",
    placeholder: "Type a command or search…",
    empty: "No commands found.",
    hints: { move: "navigate", run: "run", close: "close" },
    groups: {
      navigate: "Navigate",
      preferences: "Preferences",
      contact: "Contact",
      social: "Social",
    },
    commands: {
      top: "Go to top",
      work: "See work",
      about: "About Elias",
      experience: "See experience",
      contact: "Go to contact",
      light: "Use light theme",
      dark: "Use dark theme",
      language: "Switch language to",
    },
  },
  theme: {
    label: "Theme",
    light: "Light",
    dark: "Dark",
  },
};

const es: Dictionary = {
  meta: {
    title: "Elias Neto — Desarrollador",
    description:
      "Portafolio de Elias Neto, desarrollador full-stack que construye productos digitales con código cuidadoso e interfaces con personalidad.",
  },
  nav: {
    home: "Inicio",
    work: "Proyectos",
    about: "Sobre mí",
    experience: "Experiencia",
    cta: "Hablemos",
    language: "Idioma",
  },
  hero: {
    availability: "Disponible para nuevos proyectos",
    role: "Desarrollador Full-Stack",
    before: "que convierte ideas en",
    em: "productos digitales",
    middle: "rápidos, accesibles y con",
    highlight: "personalidad",
    after: ".",
    scroll: "Desliza para ver proyectos",
    terminal: {
      command: "elias --haciendo",
      phrases: [
        "construyendo interfaces",
        "escribiendo APIs",
        "refactorizando sin miedo",
        "revisando un PR",
        "preparando café",
      ],
    },
  },
  work: {
    label: "Proyectos seleccionados",
    titleA: "Cosas que",
    titleEm: "construí",
    titleB: "y me gusta mostrar.",
    hint: "Pasa el cursor para ver · 2024 — 2026",
  },
  projects: {
    orbita:
      "Plataforma SaaS de gestión financiera para pequeñas empresas, con dashboards en tiempo real.",
    feira:
      "Marketplace de productores locales con checkout en un clic y logística integrada.",
    pulso:
      "Design system open-source con 60+ componentes accesibles y tokens multimarca.",
    nomade: "App de itinerarios de viaje con sugerencias generadas por IA y modo offline.",
  },
  about: {
    label: "Sobre mí",
    statement: [
      "Hola, soy Elias. Escribo código como quien escribe un ",
      "buen texto",
      ": con claridad, ritmo y sin palabras de sobra. Me gusta el punto donde ",
      "diseño",
      " e ",
      "ingeniería",
      " se encuentran — ahí es donde los productos cobran alma.",
    ],
    photo: "[ foto próximamente ]",
    card: {
      hint: "Pasa el cursor o arrastra · clic para girar",
      flip: "Girar carta",
      stage: "Básico",
      hp: "PS",
      kind: "Dev Full-Stack · N.º 001 · Hábitat: São Paulo",
      abilityLabel: "Habilidad",
      ability: "Código con firma",
      abilityText: "Una vez por turno, convierte un bug en una feature documentada.",
      attacks: [
        {
          name: "Deploy del viernes",
          damage: "120",
          text: "Lanza una moneda. Si sale cruz, este ataque tumba producción.",
        },
        {
          name: "Code Review",
          damage: "30+",
          text: "Hace 10 de daño más por cada comentario “nit” en el PR.",
        },
      ],
      weakness: "Debilidad",
      weaknessValue: "Reuniones ×2",
      resistance: "Resistencia",
      resistanceValue: "Bugs −30",
      retreat: "Retirada",
      flavor: "Se le ve a menudo cerca de cafeteras y terminales abiertas a las 2 a. m.",
      back: "Carta de Dev",
    },
    stats: ["años escribiendo código", "proyectos entregados", "commits el último año"],
  },
  services: [
    {
      title: "Productos web",
      body: "Del prototipo al deploy: aplicaciones rápidas, escalables y fáciles de mantener.",
    },
    {
      title: "Interfaces",
      body: "Front-ends con atención a micro-interacciones, accesibilidad y rendimiento.",
    },
    {
      title: "APIs y datos",
      body: "Back-ends limpios, modelado de datos e integraciones que no fallan a las 3 a. m.",
    },
    {
      title: "Consultoría",
      body: "Revisión de arquitectura, code review y mentoría para equipos de producto.",
    },
  ],
  experience: {
    label: "Experiencia",
    titleA: "El historial de",
    titleEm: "commits",
    titleB: "de mi carrera.",
    terminal: "elias@neto: ~/carrera — git log --graph",
    items: [
      {
        period: "2024 — hoy",
        role: "Senior Software Engineer",
        company: "Empresa Alfa",
        note: "Liderando la reconstrucción del front-end del producto principal.",
      },
      {
        period: "2021 — 2024",
        role: "Full-Stack Developer",
        company: "Startup Beta",
        note: "Del MVP a la Serie A: arquitectura, pagos e infraestructura.",
      },
      {
        period: "2019 — 2021",
        role: "Front-End Developer",
        company: "Agencia Gama",
        note: "Sitios y campañas para marcas nacionales.",
      },
      {
        period: "2018",
        role: "git init",
        company: "Primer commit",
        note: "Donde todo empezó: un HTML, un CSS y mucha curiosidad.",
      },
    ],
  },
  contact: {
    label: "Contacto",
    title: "¿Tienes una idea?",
    titleEm: "Construyámosla juntos.",
    back: "Volver arriba ↑",
    madeWith: "Hecho con Next.js y café",
    copy: "Copiar e-mail",
    copied: "¡E-mail copiado!",
    cv: "Descargar CV",
    schedule: "Agendar una llamada",
  },
  palette: {
    open: "Abrir comandos",
    title: "comandos",
    placeholder: "Escribe un comando o busca…",
    empty: "No se encontraron comandos.",
    hints: { move: "navegar", run: "ejecutar", close: "cerrar" },
    groups: {
      navigate: "Navegar",
      preferences: "Preferencias",
      contact: "Contacto",
      social: "Redes",
    },
    commands: {
      top: "Ir al inicio",
      work: "Ver proyectos",
      about: "Sobre Elias",
      experience: "Ver experiencia",
      contact: "Ir al contacto",
      light: "Usar tema claro",
      dark: "Usar tema oscuro",
      language: "Cambiar idioma a",
    },
  },
  theme: {
    label: "Tema",
    light: "Claro",
    dark: "Oscuro",
  },
};

const dictionaries: Record<Locale, Dictionary> = { pt, en, es };

export const getDictionary = (locale: Locale) => dictionaries[locale];
