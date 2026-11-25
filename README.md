# Elias Neto — Portfólio

Landing page / portfólio pessoal em **Next.js 16**, com 3 idiomas (pt / en / es) detectados pelo navegador, tema claro/escuro, carta holográfica interativa e paleta de comandos (⌘K / Ctrl+K).

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build de produção
npm run lint
npm run typecheck  # gera os tipos de rota do Next e roda o tsc
npm test           # Vitest: idiomas, índice dos posts, integridade do blog
```

Antes de enviar uma mudança, rode `typecheck`, `lint`, `test` e `build`.

---

## ✅ Dados do site

O conteúdo vem dos currículos (Full Stack e Frontend) e do GitHub [`3liasNeto`](https://github.com/3liasNeto). Tudo o que pode mudar está em **4 lugares**:

| # | Onde | O quê |
|---|------|-------|
| 1 | Variável de ambiente `NEXT_PUBLIC_SITE_URL` | Domínio real do site |
| 2 | [`app/data.ts`](app/data.ts) | Dados que não mudam com o idioma (contato, links, projetos, números…) |
| 3 | [`app/[lang]/dictionaries.ts`](app/[lang]/dictionaries.ts) | Todos os textos, **em 3 idiomas** (pt, en, es) |
| 4 | [`public/`](public) | Arquivos: CV em PDF e arte da carta |

Legenda: ✔️ = real · ⚠️ = falta definir

---

### 1. Domínio — `NEXT_PUBLIC_SITE_URL`

| Status | Item | Valor atual | Onde é usado |
|---|---|---|---|
| ✔️ | Domínio do site | `https://eliasneto.dev` (padrão no código) | sitemap, robots, link canônico, imagem de compartilhamento, dados estruturados do Google |

Defina na plataforma de deploy (ex.: Vercel → Settings → Environment Variables) ou em um `.env.local`:

```bash
NEXT_PUBLIC_SITE_URL=https://seu-dominio.com
```

---

### 2. `app/data.ts`

#### Perfil (`profile`)

| Status | Campo | Valor | Observação |
|---|---|---|---|
| ✔️ | `name` | `Elias Neto` | Rodapé, carta, dados do Google |
| ✔️ | `city` / `region` / `country` | `Uberlândia` / `MG` / `BR` | Dados estruturados do Google |
| ✔️ | `location` | `Uberlândia, MG` | Topo, rodapé e blog |
| ✔️ | `timeZone` / `timeZoneLabel` | `America/Sao_Paulo` / `BRT` | Relógio ao vivo |
| ✔️ | `email` | `3lias.neto@gmail.com` | Contato, botão "Copiar e-mail", paleta ⌘K |
| ✔️ | `cardArt` | `/elias-card.webp` | Arte full art da carta holográfica (proporção 63:88) |
| ✔️ | `cv` | `/cv-elias-neto.pdf` | Currículo Full Stack (inclui telefone) |
| ⚠️ | `calendar` | `null` | Link de agenda (Cal.com, Calendly…). Com `null`, o botão "Agendar conversa" e o comando da paleta ficam ocultos |
| ✔️ | `socials` | GitHub `3liasNeto`, LinkedIn `eliasnet0` | Pode adicionar/remover itens |

#### Stack (`stack`)

| Status | Valor | Onde aparece |
|---|---|---|
| ✔️ | TypeScript, React, Next.js, React Native, Expo, NestJS, Node.js, PostgreSQL, Prisma, Tailwind CSS, TanStack Query, Docker | Faixa rolando abaixo do topo e dados do Google |

#### Projetos (`projects`)

| Projeto | Origem | Link |
|---|---|---|
| Portal B2B, Banking VAN, Vendora, Niveela | Bornan | Privado (sem link, selo "Projeto privado") |
| Desafio Pokémon | Pessoal | [github.com/3liasNeto/desafio-pokemon](https://github.com/3liasNeto/desafio-pokemon) |
| Copa do Mundo (`Fifa_Game-JS`) | SENAC | Privado: o repositório é privado. Para linkar, deixe-o público e adicione `href` |
| Portfolio | Pessoal | [github.com/3liasNeto/portfolio](https://github.com/3liasNeto/portfolio) |

Campos: `id` (liga à descrição em `dictionaries.ts`), `title`, `tags`, `origin` (`bornan`, `senac` ou `personal`, mostrado ao lado do título), `href` (opcional: sem ele o projeto aparece como privado), `palette` e `glyph` (card de prévia).

> **Para adicionar/remover um projeto, experiência ou número:** edite o array em `data.ts` (`projects`, `experience` ou `stats`), atualize o tipo do id logo acima dele (`ProjectId`, `ExperienceId`, `StatId`) e adicione/remova o texto correspondente nos **3 idiomas** do `dictionaries.ts`. O TypeScript avisa se faltar algum.

#### Experiência e números

| Status | Campo | Valor | Observação |
|---|---|---|---|
| ✔️ | `experience` | Bornan (2023 — hoje), UNIUBE (2023 — 2028), SENAC (2021 — 2023), primeiro commit (2021) | Ordem da linha do tempo; textos em `experience.items[id]` |
| ✔️ | `stats` | `3+` anos de experiência, `3` frentes (mobile, web e API), `2021` escrevendo código desde | Rótulos em `about.stats[id]` |
| ✔️ | `sections` | `trabalhos`, `sobre`, `experiencia`, `contato` | Âncoras das seções, usadas pela página e pela paleta ⌘K |

---

### 3. `app/[lang]/dictionaries.ts`: textos (pt, en, es)

O arquivo tem 3 blocos: `pt`, `en` e `es`. **Ao mudar um texto, mude nos 3.** O TypeScript acusa erro se algum idioma ficar com campo faltando.

| Chave | O que é | Conteúdo atual (pt) |
|---|---|---|
| `meta` | Título da aba e descrição para Google/compartilhamento | "Elias Neto — Desenvolvedor Full Stack" |
| `hero` | Cargo, frase de apresentação (`em` = itálico, `highlight` = marca laranja) e frases do terminal (até ~26 caracteres) | "Desenvolvedor Full Stack que constrói *apps, painéis e APIs* de ponta a ponta…" |
| `work` | Título dos trabalhos, intervalo de anos e rótulos "Projeto privado" / "Pessoal" | "2023 — hoje" |
| `projects.*` | Descrição de cada projeto, por `id` | A partir dos currículos e dos READMEs |
| `about.statement` | Parágrafo "Sobre" (posições ímpares = itálico) | "Oi, eu sou o Elias, desenvolvedor full stack em Uberlândia…" |
| `services` | 4 serviços | Apps mobile, Web e Design Systems, APIs e back-end, Arquitetura e DevOps |
| `experience.items` | Textos de cada experiência, por `id` | Bornan, UNIUBE, SENAC, primeiro commit |

Os demais textos (`nav`, `contact`, `palette`, `theme`, `motion`) são da interface e já estão prontos nos 3 idiomas.

---

### 4. Arquivos em `public/`

| Status | Arquivo | O que fazer |
|---|---|---|
| ✔️ | `public/cv-elias-neto.pdf` | Currículo Full Stack. Para atualizar, substitua o arquivo mantendo o nome (ou mude `profile.cv`) |
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
