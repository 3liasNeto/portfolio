import type { Locale } from "../i18n";
import type { ExperienceId, ProjectId, StatId } from "../data";

const pt = {
  meta: {
    title: "Elias Neto — Desenvolvedor Full Stack",
    description:
      "Portfólio de Elias Neto, desenvolvedor full stack em Uberlândia (MG) que constrói apps mobile, painéis web e APIs com TypeScript, React Native, Next.js e NestJS.",
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
    role: "Desenvolvedor Full Stack",
    // Rendered as: role + before + <em> + middle + <mark> + after
    before: "que constrói",
    em: "apps, painéis e APIs",
    middle: "de ponta a ponta — rápidos, acessíveis e com",
    highlight: "personalidade",
    after: ".",
    scroll: "Role para ver trabalhos",
    terminal: {
      command: "elias --fazendo",
      phrases: [
        "construindo apps em Expo",
        "escrevendo APIs em NestJS",
        "desenhando design systems",
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
    // Shown only on devices with a mouse
    hint: "Passe o mouse para espiar",
    years: "2023 — hoje",
    private: "Projeto privado",
    personal: "Pessoal",
  },
  projects: {
    cartanoel:
      "Produto no ar: a pessoa conta o nome e alguns detalhes da criança e recebe uma carta do Papai Noel escrita por IA, com kit em PDF e certificado para compartilhar. React 19 e Vite no front; Bun, Elysia e PostgreSQL no back; better-auth, Stripe (cartão e Pix) e LLM via OpenRouter.",
    b2b: "Portal B2B construído de ponta a ponta com Next.js, NestJS, TypeORM e PostgreSQL, integrado ao ERP Senior.",
    banking:
      "Plataforma de VAN bancária multi-tenant com microsserviços, RabbitMQ e MongoDB. Fiz as telas de autenticação: 2FA, passkeys, magic link e login social.",
    vendora:
      "App mobile em React Native com Expo e Expo Router, com API própria, autenticação e credenciais guardadas no SecureStore.",
    niveela:
      "Design System de uma plataforma de agendamento: tokens em CSS, tema responsivo e WCAG AA (contraste validado, alvos de 44px, foco visível, movimento reduzido).",
    pokemon:
      "Jogo de desafio Pokémon: sorteie o time, monte golpes, itens e EVs e vença uma sequência de treinadores. Batalhas no simulador do Showdown e IA que calcula o dano real com a calculadora do Smogon.",
    fifa: "Monte a escalação do Brasil com os melhores jogadores de cada Copa do Mundo: arrastar e soltar, formações e filtros por posição. Projeto do curso técnico no SENAC.",
    portfolio:
      "Este site: Next.js 16 em três idiomas, tema sem piscar, carta holográfica e blog em MDX, com testes e auditoria de acessibilidade.",
  } satisfies Record<ProjectId, string>,
  about: {
    label: "Sobre",
    // Alternates plain text and <em> fragments
    statement: [
      "Oi, eu sou o Elias, desenvolvedor full stack em Uberlândia. Desde 2023, na Bornan, levo produtos do ",
      "app mobile",
      " à ",
      "API",
      " em TypeScript — e gosto do ponto onde ",
      "design e engenharia",
      " se encontram: é ali que os produtos ganham alma.",
    ],
    card: {
      hint: "Passe o mouse ou arraste · clique para virar",
      flip: "Virar carta",
      alt: "Carta holográfica full art: Elias como treinador em uma cidade futurista, com hologramas e um tablet.",
      back: "Carta de Dev",
    },
    stats: {
      years: "anos de experiência",
      fronts: "frentes: mobile, web e API",
      since: "escrevendo código desde",
    } satisfies Record<StatId, string>,
  },
  services: [
    {
      title: "Apps mobile",
      body: "React Native com Expo: navegação com Expo Router, autenticação, notificações e armazenamento seguro.",
    },
    {
      title: "Web e Design Systems",
      body: "Next.js e React com componentes acessíveis, design tokens e interfaces responsivas.",
    },
    {
      title: "APIs e back-end",
      body: "NestJS e Node.js com PostgreSQL, Prisma ou TypeORM, JWT com refresh token, 2FA e RBAC.",
    },
    {
      title: "Arquitetura e DevOps",
      body: "Monólito modular, multi-tenant e microsserviços, com Docker e CI/CD no GitHub Actions.",
    },
  ],
  experience: {
    label: "Experiência",
    titleA: "O histórico de",
    titleEm: "commits",
    titleB: "da minha carreira.",
    terminal: "elias@neto: ~/carreira — git log --graph",
    items: {
      bornan: {
        period: "2023 — hoje",
        role: "Desenvolvedor Full Stack",
        company: "Bornan",
        note: "Apps integrados em TypeScript num monorepo Nx: React Native (Expo), Next.js e NestJS, auth com 2FA e passkeys, Docker e CI/CD.",
      },
      uniube: {
        period: "2023 — 2028",
        role: "Engenharia da Computação",
        company: "UNIUBE",
        note: "Bacharelado em andamento.",
      },
      senac: {
        period: "2021 — 2023",
        role: "Técnico em Desenvolvimento de Sistemas",
        company: "SENAC",
        note: "A base: lógica, banco de dados e desenvolvimento web.",
      },
      start: {
        period: "2021",
        role: "git init",
        company: "Primeiro commit",
        note: "Onde tudo começou: muita curiosidade e um terminal aberto.",
      },
    } satisfies Record<ExperienceId, { period: string; role: string; company: string; note: string }>,
  },
  contact: {
    label: "Contato",
    title: "Tem uma ideia?",
    titleEm: "Vamos construir juntos.",
    back: "Voltar ao topo ↑",
    madeWith: "Feito com Next.js & café",
    copy: "Copiar e-mail",
    copied: "E-mail copiado!",
    copyFailed: "Não foi possível copiar",
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
  motion: {
    pause: "Pausar animações",
    play: "Retomar animações",
  },
};

export type Dictionary = typeof pt;

const en: Dictionary = {
  meta: {
    title: "Elias Neto — Full Stack Developer",
    description:
      "Portfolio of Elias Neto, a full stack developer in Uberlândia, Brazil, building mobile apps, web dashboards and APIs with TypeScript, React Native, Next.js and NestJS.",
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
    role: "Full Stack Developer",
    before: "building",
    em: "apps, dashboards and APIs",
    middle: "end to end — fast, accessible and full of",
    highlight: "personality",
    after: ".",
    scroll: "Scroll to see work",
    terminal: {
      command: "elias --doing",
      phrases: [
        "building apps with Expo",
        "writing APIs in NestJS",
        "crafting design systems",
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
    hint: "Hover to peek",
    years: "2023 — now",
    private: "Private project",
    personal: "Personal",
  },
  projects: {
    cartanoel:
      "Live product: you share a child's name and a few details and get a letter from Santa written by AI, with a PDF kit and a certificate to share. React 19 and Vite on the front; Bun, Elysia and PostgreSQL on the back; better-auth, Stripe (card and Pix) and an LLM via OpenRouter.",
    b2b: "B2B portal built end to end with Next.js, NestJS, TypeORM and PostgreSQL, integrated with the Senior ERP.",
    banking:
      "Multi-tenant banking VAN platform with microservices, RabbitMQ and MongoDB. I built the sign-in screens: 2FA, passkeys, magic link and social login.",
    vendora:
      "React Native mobile app with Expo and Expo Router, its own API, authentication and credentials kept in SecureStore.",
    niveela:
      "Design System for a scheduling platform: CSS design tokens, responsive theme and WCAG AA (checked contrast, 44px targets, visible focus, reduced motion).",
    pokemon:
      "Pokémon challenge game: draft your team, build moves, items and EVs and beat a run of trainers. Battles run on the Showdown simulator, with an AI that computes real damage using the Smogon calculator.",
    fifa: "Build Brazil's line-up with the best players from every World Cup: drag and drop, formations and position filters. A project from my technical course at SENAC.",
    portfolio:
      "This site: Next.js 16 in three languages, flash-free theming, a holographic card and an MDX blog, with tests and an accessibility audit.",
  },
  about: {
    label: "About",
    statement: [
      "Hi, I'm Elias, a full stack developer in Uberlândia, Brazil. Since 2023, at Bornan, I take products from the ",
      "mobile app",
      " to the ",
      "API",
      " in TypeScript — and I love the spot where ",
      "design and engineering",
      " meet: that's where products get a soul.",
    ],
    card: {
      hint: "Hover or drag · click to flip",
      flip: "Flip card",
      alt: "Full-art holographic card: Elias as a trainer in a futuristic city, with holograms and a tablet.",
      back: "Dev Card",
    },
    stats: {
      years: "years of experience",
      fronts: "fronts: mobile, web and API",
      since: "writing code since",
    },
  },
  services: [
    {
      title: "Mobile apps",
      body: "React Native with Expo: Expo Router navigation, authentication, notifications and secure storage.",
    },
    {
      title: "Web & Design Systems",
      body: "Next.js and React with accessible components, design tokens and responsive interfaces.",
    },
    {
      title: "APIs & back end",
      body: "NestJS and Node.js with PostgreSQL, Prisma or TypeORM, JWT with refresh tokens, 2FA and RBAC.",
    },
    {
      title: "Architecture & DevOps",
      body: "Modular monoliths, multi-tenancy and microservices, with Docker and CI/CD on GitHub Actions.",
    },
  ],
  experience: {
    label: "Experience",
    titleA: "The",
    titleEm: "commit",
    titleB: "history of my career.",
    terminal: "elias@neto: ~/career — git log --graph",
    items: {
      bornan: {
        period: "2023 — now",
        role: "Full Stack Developer",
        company: "Bornan",
        note: "Integrated TypeScript apps in an Nx monorepo: React Native (Expo), Next.js and NestJS, auth with 2FA and passkeys, Docker and CI/CD.",
      },
      uniube: {
        period: "2023 — 2028",
        role: "Computer Engineering",
        company: "UNIUBE",
        note: "Bachelor's degree in progress.",
      },
      senac: {
        period: "2021 — 2023",
        role: "Systems Development Technician",
        company: "SENAC",
        note: "The foundation: logic, databases and web development.",
      },
      start: {
        period: "2021",
        role: "git init",
        company: "First commit",
        note: "Where it all began: lots of curiosity and an open terminal.",
      },
    },
  },
  contact: {
    label: "Contact",
    title: "Got an idea?",
    titleEm: "Let's build it together.",
    back: "Back to top ↑",
    madeWith: "Made with Next.js & coffee",
    copy: "Copy email",
    copied: "Email copied!",
    copyFailed: "Couldn't copy",
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
  motion: {
    pause: "Pause animations",
    play: "Resume animations",
  },
};

const es: Dictionary = {
  meta: {
    title: "Elias Neto — Desarrollador Full Stack",
    description:
      "Portafolio de Elias Neto, desarrollador full stack en Uberlândia (Brasil) que construye apps móviles, paneles web y APIs con TypeScript, React Native, Next.js y NestJS.",
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
    role: "Desarrollador Full Stack",
    before: "que construye",
    em: "apps, paneles y APIs",
    middle: "de punta a punta — rápidos, accesibles y con",
    highlight: "personalidad",
    after: ".",
    scroll: "Desliza para ver proyectos",
    terminal: {
      command: "elias --haciendo",
      phrases: [
        "construyendo apps en Expo",
        "escribiendo APIs en NestJS",
        "diseñando design systems",
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
    hint: "Pasa el cursor para ver",
    years: "2023 — hoy",
    private: "Proyecto privado",
    personal: "Personal",
  },
  projects: {
    cartanoel:
      "Producto en línea: cuentas el nombre y algunos detalles del niño y recibes una carta de Papá Noel escrita por IA, con kit en PDF y certificado para compartir. React 19 y Vite en el front; Bun, Elysia y PostgreSQL en el back; better-auth, Stripe (tarjeta y Pix) y LLM vía OpenRouter.",
    b2b: "Portal B2B construido de punta a punta con Next.js, NestJS, TypeORM y PostgreSQL, integrado con el ERP Senior.",
    banking:
      "Plataforma de VAN bancaria multi-tenant con microservicios, RabbitMQ y MongoDB. Hice las pantallas de autenticación: 2FA, passkeys, magic link y login social.",
    vendora:
      "App móvil en React Native con Expo y Expo Router, con API propia, autenticación y credenciales guardadas en SecureStore.",
    niveela:
      "Design System de una plataforma de agendamiento: tokens en CSS, tema responsivo y WCAG AA (contraste validado, objetivos de 44px, foco visible, movimiento reducido).",
    pokemon:
      "Juego de desafío Pokémon: sortea tu equipo, arma movimientos, objetos y EVs y vence a una serie de entrenadores. Batallas en el simulador de Showdown e IA que calcula el daño real con la calculadora de Smogon.",
    fifa: "Arma la alineación de Brasil con los mejores jugadores de cada Mundial: arrastrar y soltar, formaciones y filtros por posición. Proyecto del curso técnico en el SENAC.",
    portfolio:
      "Este sitio: Next.js 16 en tres idiomas, tema sin parpadeo, carta holográfica y blog en MDX, con tests y auditoría de accesibilidad.",
  },
  about: {
    label: "Sobre mí",
    statement: [
      "Hola, soy Elias, desarrollador full stack en Uberlândia (Brasil). Desde 2023, en Bornan, llevo productos de la ",
      "app móvil",
      " a la ",
      "API",
      " en TypeScript — y me gusta el punto donde ",
      "diseño e ingeniería",
      " se encuentran: ahí es donde los productos cobran alma.",
    ],
    card: {
      hint: "Pasa el cursor o arrastra · clic para girar",
      flip: "Girar carta",
      alt: "Carta holográfica full art: Elias como entrenador en una ciudad futurista, con hologramas y una tableta.",
      back: "Carta de Dev",
    },
    stats: {
      years: "años de experiencia",
      fronts: "frentes: móvil, web y API",
      since: "escribiendo código desde",
    },
  },
  services: [
    {
      title: "Apps móviles",
      body: "React Native con Expo: navegación con Expo Router, autenticación, notificaciones y almacenamiento seguro.",
    },
    {
      title: "Web y Design Systems",
      body: "Next.js y React con componentes accesibles, design tokens e interfaces responsivas.",
    },
    {
      title: "APIs y back-end",
      body: "NestJS y Node.js con PostgreSQL, Prisma o TypeORM, JWT con refresh token, 2FA y RBAC.",
    },
    {
      title: "Arquitectura y DevOps",
      body: "Monolito modular, multi-tenant y microservicios, con Docker y CI/CD en GitHub Actions.",
    },
  ],
  experience: {
    label: "Experiencia",
    titleA: "El historial de",
    titleEm: "commits",
    titleB: "de mi carrera.",
    terminal: "elias@neto: ~/carrera — git log --graph",
    items: {
      bornan: {
        period: "2023 — hoy",
        role: "Desarrollador Full Stack",
        company: "Bornan",
        note: "Apps integradas en TypeScript en un monorepo Nx: React Native (Expo), Next.js y NestJS, auth con 2FA y passkeys, Docker y CI/CD.",
      },
      uniube: {
        period: "2023 — 2028",
        role: "Ingeniería de Computación",
        company: "UNIUBE",
        note: "Licenciatura en curso.",
      },
      senac: {
        period: "2021 — 2023",
        role: "Técnico en Desarrollo de Sistemas",
        company: "SENAC",
        note: "La base: lógica, bases de datos y desarrollo web.",
      },
      start: {
        period: "2021",
        role: "git init",
        company: "Primer commit",
        note: "Donde todo empezó: mucha curiosidad y una terminal abierta.",
      },
    },
  },
  contact: {
    label: "Contacto",
    title: "¿Tienes una idea?",
    titleEm: "Construyámosla juntos.",
    back: "Volver arriba ↑",
    madeWith: "Hecho con Next.js y café",
    copy: "Copiar e-mail",
    copied: "¡E-mail copiado!",
    copyFailed: "No se pudo copiar",
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
  motion: {
    pause: "Pausar animaciones",
    play: "Reanudar animaciones",
  },
};

const dictionaries: Record<Locale, Dictionary> = { pt, en, es };

export const getDictionary = (locale: Locale) => dictionaries[locale];
