# Elias Neto — Portfólio

Landing page / portfólio pessoal em **Next.js 16**, com 3 idiomas (pt / en / es) detectados pelo navegador, tema claro/escuro, carta holográfica interativa e paleta de comandos (⌘K / Ctrl+K).

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de produção
npm run lint
```

---

## ✅ Checklist: dados que precisam ser atualizados

Quase todo o conteúdo do site ainda é **genérico** (provisório). Tudo o que precisa ser trocado está em **4 lugares**:

| # | Onde | O quê |
|---|------|-------|
| 1 | Variável de ambiente `NEXT_PUBLIC_SITE_URL` | Domínio real do site |
| 2 | [`app/data.ts`](app/data.ts) | Dados que não mudam com o idioma (contato, links, projetos, números…) |
| 3 | [`app/[lang]/dictionaries.ts`](app/[lang]/dictionaries.ts) | Todos os textos, **em 3 idiomas** (pt, en, es) |
| 4 | [`public/`](public) | Arquivos: CV em PDF e arte da carta |

Legenda: ⚠️ = provisório, precisa trocar · ✔️ = já é real · ❔ = confirmar

---

### 1. Domínio — `NEXT_PUBLIC_SITE_URL`

| Status | Item | Valor atual | Onde é usado |
|---|---|---|---|
| ⚠️ | Domínio do site | `https://eliasneto.dev` (padrão no código) | sitemap, robots, link canônico, imagem de compartilhamento, dados estruturados do Google |

Defina na plataforma de deploy (ex.: Vercel → Settings → Environment Variables) ou em um `.env.local`:

```bash
NEXT_PUBLIC_SITE_URL=https://seu-dominio.com
```

---

### 2. `app/data.ts`

#### Perfil (`profile`)

| Status | Campo | Valor atual | Observação |
|---|---|---|---|
| ✔️ | `name` | `Elias Neto` | Aparece no rodapé, carta, dados do Google |
| ❔ | `city` / `country` | `São Paulo` / `BR` | Usado nos dados estruturados do Google |
| ❔ | `location` | `São Paulo, BR` | Texto exibido no topo e no rodapé |
| ❔ | `timeZone` | `America/Sao_Paulo` | Fuso do relógio ao vivo ([lista de fusos](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)) |
| ❔ | `timeZoneLabel` | `BRT` | Sigla exibida ao lado do relógio |
| ⚠️ | `email` | `ola@eliasneto.dev` | Contato, botão "Copiar e-mail", paleta ⌘K |
| ✔️ | `cardArt` | `/elias-card.webp` | Arte full art da carta holográfica (proporção 63:88) |
| ⚠️ | `cv` | `/cv-elias-neto.pdf` | Ver item 4 — o PDF atual é provisório |
| ⚠️ | `calendar` | `https://cal.com/` | Link do botão "Agendar conversa" (Cal.com, Calendly…) |
| ⚠️ | `socials` | GitHub, LinkedIn, X, Read.cv apontando para as home pages | Trocar pelos **seus perfis**; pode adicionar/remover itens |

#### Stack (`stack`)

| Status | Valor atual | Onde aparece |
|---|---|---|
| ⚠️ | TypeScript, React, Next.js, Node.js, PostgreSQL, Tailwind CSS, GraphQL, Docker, AWS, Figma | Faixa rolando abaixo do topo e dados do Google |

#### Projetos (`projects`)

Os 4 projetos são **fictícios**: Orbita, Feira Livre, Pulso, Nômade.

| Status | Campo | O que é |
|---|---|---|
| ⚠️ | `id` | Identificador interno — liga o projeto à descrição traduzida em `dictionaries.ts` |
| ⚠️ | `title` | Nome do projeto |
| ⚠️ | `tags` | Tecnologias exibidas como etiquetas |
| ⚠️ | `year` | Ano |
| ⚠️ | `href` | Link do projeto (hoje todos são `#`) |
| ⚠️ | `palette` | 2 cores do card de prévia que aparece ao passar o mouse |
| ⚠️ | `glyph` | Símbolo grande do card de prévia |

> **Para adicionar/remover um projeto:** edite o array `projects`, atualize o tipo `ProjectId` (logo acima dele) e adicione/remova a descrição correspondente em `projects` nos **3 idiomas** do `dictionaries.ts`. O TypeScript avisa se faltar alguma.

#### Experiência e números

| Status | Campo | Valor atual | Observação |
|---|---|---|---|
| ⚠️ | `commits` | `a3f9c21`, `7be04d8`, `c51e9a0`, `0d2b7f3` | "Hashes" decorativos do `git log` — **um por item de experiência**, na mesma ordem |
| ⚠️ | `statValues` | `7+`, `40+`, `12k` | Números da seção Sobre (contam de 0 ao valor). Os rótulos ficam em `about.stats` no dicionário, na mesma ordem |

---

### 3. `app/[lang]/dictionaries.ts` — textos (pt, en, es)

O arquivo tem 3 blocos: `pt`, `en` e `es`. **Cada item abaixo precisa ser atualizado nos 3.** O TypeScript acusa erro se algum idioma ficar com campo faltando.

| Status | Chave | O que é | Conteúdo atual (pt) |
|---|---|---|---|
| ⚠️ | `meta.title` / `meta.description` | Título da aba e descrição para Google/compartilhamento | "Elias Neto — Desenvolvedor" / "Portfólio de Elias Neto, desenvolvedor full-stack…" |
| ⚠️ | `hero.availability` | Status no topo | "Disponível para novos projetos" |
| ⚠️ | `hero.role` | Cargo | "Desenvolvedor Full-Stack" |
| ⚠️ | `hero.before` / `em` / `middle` / `highlight` / `after` | Frase de apresentação, em partes (`em` = itálico, `highlight` = marca laranja) | "…que transforma ideias em *produtos digitais* rápidos, acessíveis e com **personalidade**." |
| ⚠️ | `hero.terminal.command` / `phrases` | Terminal que digita no topo (frases de até ~26 caracteres) | `elias --fazendo` → "construindo interfaces", "escrevendo APIs"… |
| ⚠️ | `work.hint` | Texto ao lado do título de trabalhos (inclui o **intervalo de anos**) | "Passe o mouse para espiar · 2024 — 2026" |
| ⚠️ | `projects.*` | Descrição de cada projeto (uma por `id`) | Textos fictícios |
| ⚠️ | `about.statement` | Parágrafo "Sobre" — alterna texto normal e trechos em itálico (posições ímpares = itálico) | "Oi, eu sou o Elias. Escrevo código como quem escreve um *bom texto*…" |
| ⚠️ | `about.stats` | Rótulos dos números (`statValues`) | "anos escrevendo código", "projetos entregues", "commits no último ano" |
| ✔️ | `about.card.alt` | Descrição da arte da carta (leitores de tela) | Já descreve a arte atual — atualizar só se trocar a imagem |
| ⚠️ | `services` | 4 serviços oferecidos (título + texto) | Produtos web, Interfaces, APIs & dados, Consultoria |
| ⚠️ | `experience.items` | Experiências: `period`, `role`, `company`, `note` (a primeira recebe o selo `HEAD -> main`) | Empresa Alfa, Startup Beta, Agência Gama, "git init" 2018 |
| ✔️ | `contact.*` | Títulos e botões de contato | Genéricos, servem como estão |

Os demais textos (`nav`, `palette`, `theme`, rótulos de seção) são da interface e já estão prontos nos 3 idiomas.

---

### 4. Arquivos em `public/`

| Status | Arquivo | O que fazer |
|---|---|---|
| ⚠️ | `public/cv-elias-neto.pdf` | **PDF provisório** ("CV provisório / Placeholder CV"). Substituir pelo currículo real, mantendo o nome (ou mudar `profile.cv`) |
| ✔️ | `public/elias-card.webp` | Arte da carta full art. Para trocar, use uma imagem na proporção **63:88** (ex.: 1061×1482) |

---

## Opcional (já funciona, mude só se quiser)

| Onde | O quê |
|---|---|
| `app/i18n.ts` → `defaultLocale` | Idioma usado quando o navegador está em uma língua não suportada (hoje: **inglês**) |
| `app/globals.css` → `:root` | Cores da marca: `--paper` (fundo), `--ink` (texto), `--signal` (laranja de destaque) e as versões do tema escuro |
| `app/brand.tsx` + `assets/fonts/` | Cores e fontes usadas para gerar o favicon e a imagem de compartilhamento |
| `app/globals.css` → `.hero-blob`, `.hero-depth-*` | Tamanho da bola que inverte cores e força do parallax no topo |

---

## Blog (em teste)

Fica em **`/pt/blog`**, **`/en/blog`** e **`/es/blog`** (acessar `/blog` redireciona pelo idioma do navegador). Por enquanto é independente: o portfólio não tem link para ele, o blog não tem link para o portfólio, ele não entra no `sitemap.xml` e as páginas pedem para não ser indexadas (`noindex`).

Os **4 posts atuais são exemplos** e podem ser apagados.

### Escrever um post

1. Crie uma pasta em `content/blog/<slug>/` (o slug vira a URL: `/pt/blog/<slug>`).
2. Dentro dela, um arquivo por idioma: `pt.mdx`, `en.mdx`, `es.mdx`. Cada um começa com:

   ```mdx
   export const meta = {
     title: "Título do post",
     excerpt: "Resumo de uma ou duas frases, usado na listagem e no compartilhamento.",
   };

   Primeiro parágrafo (ganha a letra capitular laranja)…

   ## Seção (entra automaticamente no índice "Neste post")
   ```

3. Registre o post em [`content/blog/posts.ts`](content/blog/posts.ts), **do mais novo para o mais antigo** (o primeiro da lista é o destaque):

   ```ts
   {
     slug: "meu-post",
     date: "2026-10-10",
     tags: ["nextjs", "css"],
     cover: { palette: ["#ff4d1c", "#ffb199"], glyph: "✳" },
   },
   ```

Dentro do MDX dá para usar Markdown normal (com tabelas e listas de tarefas), blocos de código com destaque de sintaxe (` ```ts `, ` ```css `, ` ```bash `…) e o componente `<Callout type="tip">` ou `<Callout type="warning">`.

Tags novas: adicione o nome ao tipo `PostTag` em `content/blog/posts.ts` e o rótulo traduzido em `tags` no [`app/[lang]/blog/dictionary.ts`](app/[lang]/blog/dictionary.ts), que também guarda todos os textos da interface do blog.

O tempo de leitura, a numeração (Nº), o índice, o agrupamento por mês e o feed RSS (`/<idioma>/blog/rss.xml`) são gerados sozinhos.

---

## Como as coisas funcionam

- **Idiomas:** rotas `/pt`, `/en`, `/es`. Ao acessar `/`, o [`proxy.ts`](proxy.ts) redireciona pelo idioma do navegador (`Accept-Language`). Se a pessoa escolher outro idioma no menu, a escolha fica salva em cookie.
- **Tema:** segue o tema do sistema até a pessoa escolher no rodapé ou na paleta ⌘K (salvo no `localStorage`).
- **Gerados automaticamente:** favicon (`app/icon.tsx`), ícone Apple (`app/apple-icon.tsx`), imagem de compartilhamento por idioma (`app/[lang]/opengraph-image.tsx`), `sitemap.xml` e `robots.txt` — todos leem os dados acima, não precisam ser editados.
