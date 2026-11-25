# Análise inicial do repositório — 2026-11-25

Escopo: repositório inteiro (`app/`, `proxy.ts`, `mdx-components.tsx`, `next.config.ts`, `content/`, `public/`, configuração e histórico git), branch `claude/funny-lovelace-6g7duj` no commit `42329bb`. Auditoria somente leitura em cinco dimensões, feita por auditores em paralelo e consolidada aqui.

## Status das correções (atualizado em 2026-11-25)

Os itens P1 e P2 foram tratados na branch `claude/funny-lovelace-6g7duj`, um commit por grupo, cada um validado com `typecheck`, `lint`, `test`, `build`, um smoke test das rotas e testes no navegador (Playwright).

| Achados | Status | Commit |
|---|---|---|
| P2-1 `next` vulnerável | ✅ Next 16.4.6 e `npm audit fix`: `npm audit --omit=dev` mostra **0 vulnerabilidades**. Novo script `typecheck` (o `tsc` falhava num clone limpo sem os tipos de rota gerados) | `c2c75cb` |
| P1-1, P2-9, P2-10 contraste | ✅ `--muted` #635e55 (5,5:1), novo `--signal-text` #c2330a (4,7:1), `text-on-signal` sobre laranja, piso `chalk/60` nos terminais e comentários de código #958d80 | `33ec801` |
| P2-8 testes e P2-4 índice dos posts | ✅ Vitest com 15 testes. O teste comparando com o `rehype-slug` reproduziu os bugs (CRLF, link, `##` final, cerca `~~~`) antes da correção | `457c82f` |
| P2-2 Open Graph do blog | ✅ `openGraph` próprio (posts com `type: article`) e imagens de compartilhamento do índice e de cada post | `86144fb` |
| P2-3 copiar | ✅ `copyText()` único, com aviso de erro | `ef88c4b` |
| P2-12, P2-14, P2-15, P2-16, P2-17 acessibilidade, e P1-2 (parte de código) | ✅ Títulos, paleta, preview por tipo de ponteiro e teclado, botão de pausar animações, foco visível. Projetos com `#` deixam de ser links mortos ("Em breve") | `6a6087b` |
| P2-11 404 e erro | ✅ `not-found` e `error` localizados. Rota curinga `[lang]/[...missing]`, porque o layout raiz em `[lang]` impede o `not-found` de pegar URLs sem rota | `3d03330` |
| P2-13 reveal sem JS | ✅ Conteúdo só é escondido depois que o script das animações roda, e a impressão mostra tudo | `fa0b63a` |
| P2-5, P2-6, P2-7 refatorações | ✅ Blog desacoplado do portfólio, `experience` e `stats` com ids, constante `sections` | `16f65d6` |
| P2-18, P2-19, P2-20 performance | ✅ Medido com trace do Chrome (CPU 4x, 60 movimentos no hero). Rasterização de 1.091 para 200 ms, recálculo de estilo de 655 para 477 ms, layout de 433 para 337 ms. Preloads de fonte de 4 para 3. Lenis fora do blog | `5b060e8` |
| P2-21 LCP do h1 | ➖ Medido, sem ação: o LCP é igual ao FCP (~1 s em perfil mobile) e o elemento de LCP é o parágrafo de apresentação | — |
| P1-2 conteúdo real | ⏳ Depende do dono do projeto: links dos projetos, CV, agenda e redes (ver README) | — |

**P3 corrigidos de carona:**
- `#3`: `noopener` no CV;
- `#9`: cast `as Locale` do proxy removido;
- `#14`: `padStart` nos números dos serviços;
- `#29`: rótulo do botão de tema do blog;
- `#11`: em parte, o `.mdx` sem `meta` agora é pego pelo teste de integridade.

Os demais P3 seguem como backlog.

---

## 1. Resumo

**Estado geral.** É um projeto pequeno (cerca de 50 arquivos e 3,4 mil linhas de TS/TSX/CSS), estático (SSG) e bem construído:
- Não há vulnerabilidade explorável, segredo commitado, ciclo de dependência, `any` nem vazamento de listener.
- Os efeitos visuais escrevem em variáveis CSS sem re-render do React e respeitam `prefers-reduced-motion`.

Os problemas reais são:
- **Acessibilidade no tema claro:** o texto secundário e o laranja usado como texto reprovam no contraste WCAG.
- **Conteúdo provisório que bloqueia o lançamento:** projetos sem link, CV de exemplo, redes sociais genéricas.
- **Next.js com CVEs publicadas.**
- **Ausência total de testes.**
- **Blog:** herda os metadados de compartilhamento do portfólio.
- **Pontos de sincronização silenciosos** entre arquivos: arrays pareados por índice e âncoras duplicadas.

**Stack encontrada.**
- Next.js 16.2.10 (App Router, Turbopack, `proxy.ts`), React 19.2.4 e TypeScript 5 com `strict`.
- Tailwind CSS v4 (PostCSS) e MDX via `@next/mdx` 16.2.10 (remark-gfm, rehype-slug).
- sugar-high, github-slugger, Lenis e `next/font` (3 famílias).
- i18n próprio (pt/en/es), npm e ESLint (eslint-config-next).
- Não tem back-end, banco, testes nem monorepo.

**As cinco coisas para atacar primeiro:**
1. Corrigir o contraste do tema claro: escurecer `--muted`, criar `--signal-text` e usar `text-on-signal` nos hovers laranja.
2. Atualizar `next`, `@next/mdx` e `eslint-config-next` para 16.4.6 e rodar `npm audit fix`.
3. Preencher o conteúdo real que hoje bloqueia o uso: links dos projetos, CV, agenda e redes. Até lá, esconder o ↗ dos projetos sem link.
4. Dar ao blog o seu próprio `openGraph` (título, URL e `type: article`), para que compartilhar um post não leve à home.
5. Instalar Vitest e cobrir a lógica pura que quebra em silêncio: `negotiate`, `extractHeadings` contra o `rehype-slug` e a integridade do conteúdo do blog.

---

## 2. Nota por dimensão

| Dimensão | Nota | Por quê |
|---|---|---|
| Lógica e simplicidade | **Bom** | Sem corridas nem async solto, e com cleanup correto. Há 3 P2 pontuais: OG herdado, erro de clipboard engolido e TOC frágil com CRLF. O resto é duplicação de marcação. |
| Arquitetura e design de código | **Atenção** | Não tem ciclos e separa bem dados de textos. Mas o blog "desacoplado" depende do dicionário do portfólio, há arrays e âncoras sincronizados só por convenção e não existe nenhum teste. |
| Segurança | **Bom** | Nada explorável. O `next` tem CVEs publicadas (fix sem major). Faltam headers de defesa em profundidade. |
| Banco e performance do back | **N/A** | Não há banco, API nem serviço: só um proxy de idioma e uma rota de RSS estática. |
| Performance do web | **Bom (hipóteses)** | Arquitetura de efeitos correta. Os custos prováveis são pintura por frame no hero, Lenis em todas as páginas, 4 preloads de fonte e animação no h1 que pode atrasar o LCP. Nada foi medido. |
| Design e UX | **Atenção** | Identidade forte e tema escuro completo. O tema claro reprova em contraste em mais de 20 lugares, não há 404 nem página de erro próprias e há lacunas de acessibilidade (títulos, foco, paleta, preview só com mouse). |

---

## 3. Achados

Legenda: **P0** = quebrado ou explorável agora · **P1** = grave, corrigir antes de lançar · **P2** = importante · **P3** = melhoria.
Cada achado indica a confiança (alta/média/baixa), se foi confirmado ou é hipótese e a dimensão (Lóg, Arq, Seg, Perf, UX).

Não houve **P0**.

### P1

#### P1-1 · Texto secundário (`text-muted`) reprova o contraste no tema claro (UX)
- **Onde:** `app/globals.css:7`. O par `--muted #7a746a` sobre `--paper #f1ece2` dá **3,93:1**, e o mínimo para texto normal é 4,5:1. São 20 usos em 9 arquivos, quase todos em texto pequeno:
  - portfólio: `app/components/work-list.tsx:53,59`, `app/[lang]/page.tsx:138,227`;
  - blog: `app/components/blog/post-explorer.tsx:97,113,118,119`, `app/[lang]/blog/page.tsx:91`, `app/[lang]/blog/[slug]/page.tsx:47,93,149`, `app/components/blog/table-of-contents.tsx:41`, `app/components/blog/share-buttons.tsx:20`.
- **Impacto:** descrições de projetos, metadados e resumos ficam difíceis de ler para quem tem baixa visão e em telas com muito brilho. Viola WCAG 1.4.3 (AA).
- **Correção:** trocar só o `--muted` do tema claro para algo próximo de `#635e55` (5,47:1). O tema escuro já passa, com 5,49:1.
- **Confiança:** alta, confirmado (recalculado nesta consolidação).

#### P1-2 · Conteúdo provisório no caminho principal: projetos sem destino, CV de exemplo, links genéricos (UX)
- **Onde:**
  - `app/data.ts:59,68,77,86`: `href: "#"` nos 4 projetos, e `work-list.tsx:48-76` mostra o ícone ↗, que promete link externo;
  - `app/data.ts`: `calendar: "https://cal.com/"` e `socials` apontando para as home pages;
  - `public/cv-elias-neto.pdf`: PDF de exemplo.
- **Impacto:** a função principal de um portfólio (ver os trabalhos e entrar em contato) não funciona. Clicar num projeto volta ao topo, e "Agendar", as redes e o CV levam a páginas genéricas. Já está listado no checklist do README, mas é bloqueador de lançamento.
- **Correção:** preencher os dados reais. Enquanto um projeto não tiver URL, renderizar a linha sem link e sem ↗, com "em breve".
- **Confiança:** alta, confirmado.

### P2

**Segurança**

#### P2-1 · `next` 16.2.10 com advisories críticos e altos (Seg)
- **Onde:** `package.json` fixa exatamente `"next": "16.2.10"`, e `eslint-config-next` e `@next/mdx` estão na mesma versão.
- **Advisories:**
  - **crítico:** bypass do Proxy com Turbopack e locale único; DoS e SSRF em Server Actions;
  - **alto, transitivas:** postcss, sharp, nanoid e source-map-js.
- **Exploração neste projeto:**
  - o proxy só faz redirect de idioma e o site tem 3 locales;
  - não há Server Actions;
  - o `next/image` só otimiza a imagem local, sem `remotePatterns`.
- **Correção:** subir os três pacotes para 16.4.6 (não é major) e rodar `npm audit fix`. Validar com `npm audit --omit=dev`, `npm run build` e `npm run lint`.
- **Confiança:** alta que a versão é vulnerável, **hipótese** de que não há exploração.

**Lógica / Arquitetura**

#### P2-2 · O blog herda o `openGraph` do portfólio (Lóg + Arq)
- **Onde:** `app/[lang]/layout.tsx:45-52` define `openGraph` com `url: /${lang}` e o título da home. `app/[lang]/blog/page.tsx:17-27` e `app/[lang]/blog/[slug]/page.tsx:28-37` não definem o seu. A imagem de `app/[lang]/opengraph-image.tsx` também vale para o blog.
- **Impacto:** compartilhar um post pelos próprios botões do post (X e LinkedIn) gera um card com o título e a URL da home e `og:type` "website". O impacto é menor enquanto o blog estiver em teste com `noindex`.
- **Correção:** acrescentar `openGraph: { type: "article", url, title, description, publishedTime }` no `generateMetadata` do post, e o equivalente no índice do blog.
- **Confiança:** alta pelo código e pela regra de merge de metadata do Next; o HTML gerado não foi inspecionado.

#### P2-3 · Copiar para a área de transferência implementado 3 vezes, com erro engolido em 2 delas (Lóg)
- **Onde:** `app/components/contact-actions.tsx:5-12` (tem fallback), `app/components/blog/copy-code-button.tsx:15-20` e `app/components/blog/share-buttons.tsx:28-33` (`catch {}`).
- **Impacto:** quando o clipboard falha (contexto inseguro ou permissão negada), "Copiar código" e "Copiar link" não dão nenhum retorno.
- **Correção:** criar uma única função `copyText(text, okMsg, failMsg)` em `toast.tsx` que também mostra um toast quando dá erro.
- **Confiança:** alta, confirmado.

#### P2-4 · O índice dos posts (TOC) reimplementa o `rehype-slug` de forma frágil (Lóg + Arq)
- **Onde:** `app/[lang]/blog/posts.ts:41-46`, com `source.split("\n")` e `/^(##|###)\s+(.+)$/`, removendo só as crases.
- **Impacto:**
  - com CRLF, a TOC fica vazia;
  - headings com `**negrito**`, `[link](…)` ou `## x ##` geram slugs diferentes dos do `rehype-slug`, e os links da TOC quebram;
  - cercas de código com `~~~` não são reconhecidas.
  
  Os `.mdx` atuais usam LF e batem com os ids, então hoje está funcionando.
- **Correção:** usar `split(/\r?\n/)` e limpar o markdown inline antes de gerar o slug. Alternativa mais simples: a TOC, que já é client, ler `#article :is(h2,h3)[id]` do DOM.
- **Confiança:** alta no mecanismo, **hipótese** quanto à ocorrência.

#### P2-5 · O blog "independente" depende de peças do portfólio (Arq)
- **Onde:**
  - `app/[lang]/blog/layout.tsx:8,16,41-42` usa o dicionário do portfólio para os rótulos de idioma e tema;
  - `app/components/blog/theme-switch.tsx:4` importa `useTheme` de `theme-toggle` (o componente do rodapé do portfólio);
  - o evento de toast se chama `portfolio:toast` (`app/components/toast.tsx:5`).
- **Impacto:** renomear chaves do dicionário do portfólio quebra o blog, o que contraria o README e o comentário do layout.
- **Correção:**
  - acrescentar `language` e `theme` em `app/[lang]/blog/dictionary.ts`;
  - mover `useTheme` para `app/components/use-theme.ts`;
  - renomear o evento para `app:toast`.
- **Confiança:** alta, confirmado.

#### P2-6 · Arrays pareados por índice entre `data.ts` e os 3 dicionários (Arq + Lóg)
- **Onde:** `app/data.ts:92-94` (`commits`, `statValues`) usados com `t.experience.items[i]` e `t.about.stats[i]` em `app/[lang]/page.tsx:262-268,324-345`.
- **Impacto:** acrescentar uma experiência sem o "hash" gera `key={undefined}` e um hash vazio, e reordenar troca os rótulos dos números. Nada disso dá erro de compilação. São seis pontos que precisam continuar alinhados.
- **Correção:** levar o hash para dentro de cada item de `experience.items`, e tipar `stats` como tupla (ou juntar valor e rótulo num registro só).
- **Confiança:** alta, confirmado.

#### P2-7 · Ids das seções repetidos como texto solto na página e na paleta ⌘K (Arq + Lóg)
- **Onde:** `app/[lang]/page.tsx:91-93,109,181,212,235,298,363` e `app/components/command-palette.tsx:49-53` (`"trabalhos"`, `"sobre"`…).
- **Impacto:** renomear uma seção quebra o comando da paleta sem nenhum erro.
- **Correção:** `export const sections = { work: "trabalhos", … } as const` em `app/data.ts`, usado nos dois arquivos.
- **Confiança:** alta, confirmado.

#### P2-8 · Zero testes, e a lógica pura mais valiosa não está exportada (Arq)
- **Onde:** `proxy.ts:6-19` (`negotiate`), `app/[lang]/blog/posts.ts:31-50` (`readingMinutes`, `extractHeadings`), `app/[lang]/blog/rss.xml/route.ts:11` (`escape`), e `package.json` sem script de teste.
- **Impacto:** as invariantes que quebram em silêncio (ordem do Accept-Language, ids da TOC, `.mdx` sem `meta` derrubando o RSS, ordem das datas do blog) não têm proteção nenhuma.
- **Correção:** adicionar Vitest e mover as funções puras para módulos sem I/O. Testes por ordem de valor:
  1. `extractHeadings` comparado com o `rehype-slug`;
  2. `negotiate`;
  3. integridade do conteúdo (cada post tem pt, en e es com `meta`, e as datas estão em ordem decrescente);
  4. `escape` e `fill`.
- **Confiança:** alta, confirmado.

**Design e UX**

#### P2-9 · Laranja usado como texto e texto claro sobre fundo laranja (UX)
- **Contraste:** `--signal` sobre `--paper` dá **2,82:1**, abaixo até dos 3:1 exigidos para texto grande.
- **Onde, texto pequeno informativo em laranja:** `app/[lang]/page.tsx:45` (índice "(01)"), `:139`, `app/[lang]/blog/layout.tsx:30` (badge "beta"), `app/components/blog/post-explorer.tsx:105` (mês), mais 16 `hover:text-signal`.
- **Onde, texto claro sobre laranja (2,82:1):** `app/[lang]/page.tsx:110` (CTA da nav no hover), `:282-288` (cards de serviço no hover: o título e o corpo continuam claros), `app/components/work-list.tsx:74` e `app/globals.css:51-54` (`::selection`).
- **Correção:**
  - criar um token `--signal-text`, um laranja mais escuro perto de `#c2330a` (cerca de 4,6:1), só para texto no tema claro;
  - nos 4 pontos de fundo laranja, usar o token `text-on-signal`, que já existe (5,69:1).
- **Confiança:** alta, confirmado.

#### P2-10 · Texto apagado dentro das janelas de terminal (UX)
- **Onde:**
  - `app/components/command-palette.tsx:205`: cabeçalhos de grupo em `chalk/40`, 3,43:1;
  - `:238`: dicas em `chalk/45`, 4,0:1;
  - `:193`: placeholder em `chalk/35`, 2,92:1;
  - `app/globals.css:580`: comentários de código em `--sh-comment #6f685e`, 3,26:1. Num blog técnico, comentário é conteúdo.
- **Correção:** usar no mínimo `chalk/60` e trocar a cor de comentário para algo perto de `#958d80`.
- **Confiança:** alta, confirmado.

#### P2-11 · Não há 404 nem página de erro próprias (UX)
- **Onde:** não existe `not-found.tsx` nem `error.tsx` em `app/`. O `notFound()` é chamado em `app/[lang]/layout.tsx:59`, `app/[lang]/page.tsx:54` e `app/[lang]/blog/[slug]/page.tsx:59`.
- **Impacto:** URLs inválidas mostram o 404 padrão do Next, em inglês, sem a marca, sem tema e sem caminho de volta.
- **Correção:** criar `app/[lang]/not-found.tsx` com textos do dicionário e links para o início e o blog, e `app/[lang]/error.tsx` com um botão "tentar de novo".
- **Confiança:** alta que estão ausentes; **hipótese** quanto à renderização exata.

#### P2-12 · A estrutura de títulos não ajuda a navegar com leitor de tela (UX)
- **Onde:**
  - a seção Sobre não tem título (`app/[lang]/page.tsx:235-246`), e o título do Contato é um `<p>` (`:373`);
  - os h3 dos serviços ficam, na prática, sob o h2 de Trabalhos (`:287`);
  - nas estatísticas, `<dt>` e `<dd>` estão invertidos (`:264-268`).
- **Correção:** h2 em Sobre e em Contato, e inverter `dt` e `dd`.
- **Confiança:** alta, confirmado.

#### P2-13 · As animações ao rolar escondem o conteúdo até o JS hidratar (UX + Perf)
- **Onde:** `app/theme.ts:8` adiciona `html.js` antes da hidratação, e `app/globals.css:211-232` aplica `opacity:0` ou `clip-path` até o `RevealObserver` rodar (`app/components/reveal-observer.tsx`).
- **Impacto:**
  - com rede lenta ou um chunk que falha, as seções abaixo da dobra ficam invisíveis;
  - abrir um link direto como `/pt#contato` pode mostrar um bloco vazio, e o LCP passa a depender do JS;
  - a impressão sai em branco.
- **Correção:** o `RevealObserver` marca `html[data-reveal-ready]` quando monta e o CSS passa a usar esse seletor em vez de `.js`. Somar uma regra `@media print` que mostra tudo.
- **Confiança:** média, **hipótese**.

#### P2-14 · Acessibilidade da paleta ⌘K (UX + Lóg)
- **Onde:** `app/components/command-palette.tsx`:
  - `:178-194`: o nome acessível do campo vira "~/ $";
  - `aria-expanded="true"` está fixo;
  - há `<p>` e um `<li>` de estado vazio dentro do `role="listbox"`;
  - `:73`: o id `cmd-X / Twitter` tem espaços, o que é inválido para `aria-activedescendant`.
- **Correção:**
  - `aria-label={t.placeholder}` no input;
  - grupos com `role="group"`;
  - estado vazio fora do listbox;
  - `id: social-${i}`.
- **Confiança:** alta pelo código; não foi testado com leitor de tela.

#### P2-15 · O preview dos projetos depende de mouse e de breakpoint (UX)
- **Onde:** `app/components/work-list.tsx:79` (`md:hidden`) e `:91` (só aparece com `onMouseEnter`).
- **Impacto:** tablets com toque a partir de 768px e quem navega por teclado nunca veem o preview. A dica "Passe o mouse" também aparece em telas de toque.
- **Correção:**
  - decidir pelo tipo de ponteiro, com `@media (hover:none)`, em vez do breakpoint;
  - acrescentar `onFocus={() => setActive(i)}`;
  - adaptar a dica conforme o ponteiro.
- **Confiança:** alta, confirmado.

#### P2-16 · Controle de movimento incompleto (UX)
- **Onde:**
  - o marquee (`app/[lang]/page.tsx:194`) e o terminal digitando rodam sem parar e não têm como pausar (WCAG 2.2.2);
  - `animate-ping` (`:126`) e `scroll-behavior: smooth` (`app/globals.css:41`) estão fora do bloco de `reduced-motion`.
- **Correção:**
  - `motion-safe:animate-ping`;
  - `scroll-behavior` dentro de `@media (prefers-reduced-motion: no-preference)`;
  - pausar o marquee em `:hover` e `:focus-within`.
- **Confiança:** alta, confirmado.

#### P2-17 · Foco visível depende do padrão do navegador (UX)
- **Onde:** não há nenhum `focus-visible:` nos `.tsx`. Os inputs usam `outline-none` (`app/components/blog/post-explorer.tsx:92`), e na busca do blog o único sinal de foco é a borda laranja, a 2,82:1.
- **Correção:** um estilo global `:focus-visible { outline: 2px solid var(--ink); outline-offset: 2px }`, com variante para o rodapé laranja, e tirar o `outline-none` da busca.
- **Confiança:** média, **hipótese**: não foi testado com teclado.

**Performance do web** (nada foi medido; todos os achados são hipóteses)

#### P2-18 · O spotlight do hero repinta a seção inteira a cada frame (Perf)
- **Onde:** `app/globals.css:119-131` (`radial-gradient(... at var(--x) var(--y))` com `inset:0`) e `app/components/interactive-hero.tsx:34-38`, que grava 4 variáveis no `<section>`, o que invalida o estilo de toda a subárvore.
- **Correção:**
  - transformar o spotlight num elemento de tamanho fixo movido por `translate`, como o blob já faz;
  - gravar cada variável só nos elementos que a usam.
- **Como medir:** DevTools, com Paint flashing e o Performance panel em CPU 4x passando o mouse sobre o hero.
- **Confiança:** média, hipótese.

#### P2-19 · Lenis em todas as páginas (Perf)
- **Onde:** `app/components/smooth-scroll.tsx:27` (`autoRaf: true`), montado no portfólio e no blog (`app/[lang]/blog/layout.tsx:20`).
- **Impacto:** um loop de rAF permanente, o scroll da roda passa pela main thread, e o blog paga esse custo sem ganho estético.
- **Correção:** tirar o Lenis do blog, ou trocar por scroll nativo.
- **Como medir:** Performance panel, 10 s com a página ociosa e rolagem com CPU 4x.
- **Confiança:** média, hipótese.

#### P2-20 · Fontes: 4 preloads por página, e um estilo provavelmente sem uso (Perf)
- **Onde:** `app/[lang]/layout.tsx:15-20` carrega a Instrument Serif nos estilos `["normal", "italic"]`, mas só o itálico é usado.
- **Correção:** `style: ["italic"]`, e avaliar `preload: false` na JetBrains Mono.
- **Como medir:** contar os `<link rel="preload" as="font">` no HTML do build.
- **Confiança:** alta que o estilo não é usado, média quanto ao impacto.

#### P2-21 · LCP do hero preso à animação `rise` (Perf)
- **Onde:** `app/globals.css:79-99` e `app/[lang]/page.tsx:145-161`. O h1 começa recortado (`translateY(105%)`, 0,9 s).
- **Correção:** só se a medição confirmar: começar a animação já parcialmente visível ou encurtá-la.
- **Como medir:** `web-vitals` `onLCP` com attribution, em 4G emulado.
- **Confiança:** baixa, hipótese.

### P3 (backlog de melhorias)

| # | Dim. | Onde | Achado → correção mais simples |
|---|---|---|---|
| 1 | Seg | `next.config.ts:4` | Sem headers de segurança e com `X-Powered-By`. → `headers()` com `nosniff`, `Referrer-Policy` e `frame-ancestors 'none'`, mais `poweredByHeader: false`. |
| 2 | Seg | `proxy.ts:33-34` | O redirect usa o `Host` da requisição (risco de envenenamento de cache fora da Vercel). → Montar o destino com `siteUrl`, só se o deploy não for na Vercel. |
| 3 | Seg | `app/components/command-palette.tsx:70` | `window.open(cv, "_blank")` sem `noopener` (destino do próprio site). → Passar `"noopener"`. |
| 4 | Seg | `app/i18n.ts:26` | Cookie de idioma sem `secure`. → Acrescentar `secure` em https. |
| 5 | Lóg | `app/components/blog/reading-progress.tsx:16-17` | Artigo menor que a tela dá divisor ≤ 0 e `NaN`. → `range <= 0 ? 1 : clamp(...)`. |
| 6 | Lóg | `app/components/count-up.tsx:18,27,36` | `textContent` sobrescreve o nó de texto do React. → Escrever num `<span>` interno. |
| 7 | Lóg | `app/components/command-palette.tsx:95-99` | `openRef` mais um efeito sem necessidade. → Chamar a abertura direto no handler. |
| 8 | Lóg/Perf | `app/[lang]/blog/posts.ts:69-76` | `getPost` reimporta todos os posts, e a rota faz isso 2 vezes (só custo de build). → Derivar de `getAllPosts` e usar `cache()`. |
| 9 | Lóg | `app/components/language-switcher.tsx:9`, `proxy.ts:18`, `app/[lang]/opengraph-image.tsx:17` | Regex `[a-z]{2}`, cast `as Locale` e `"en"` fixo. → Derivar de `locales` e `defaultLocale`. |
| 10 | Lóg | `app/[lang]/blog/page.tsx:53,111-112` | `replace(".")` e `split(" ")` sobre textos traduzidos. → Separar as chaves no dicionário. |
| 11 | Lóg | `app/[lang]/blog/posts.ts:24,47`, `app/[lang]/blog/[slug]/page.tsx:113` | Casts sem validação: `.mdx` sem `meta` quebra o RSS e `<Callout type="info">` quebra o build. → Um guard que lança erro com o nome do arquivo. |
| 12 | Lóg/Arq | `app/[lang]/blog/page.tsx:35` | `featured` pode ser `undefined` sem aviso (lista vazia). → `if (!featured) notFound()`, ou o teste de integridade. |
| 13 | Lóg/Arq | `rss.xml/route.ts:29` e `format.ts:4`; 4× mapa de hreflang | Conhecimento duplicado. → Exportar `toDate` e criar `languageAlternates(path)` em `i18n.ts`. |
| 14 | Lóg | `app/[lang]/page.tsx:285` | `0{i + 1}` vira "010". → `padStart(2, "0")`. |
| 15 | Arq/UX | `#181715` 6×, `#b9d77a` 3×, `#e0a100`; janela de terminal copiada 5× | → Tokens `--terminal`, `--term-success` e `--warning`, mais um componente `<TerminalWindow>`. |
| 16 | Arq | `command-palette.tsx:5`, `holo-card.tsx:5`, `table-of-contents.tsx:4` | Componentes importam tipos de pastas de rota. → Props estruturais. |
| 17 | Arq | 66 imports relativos contra 5 com `@/` | → `@/` para o que cruza pastas de topo. |
| 18 | Arq | `app/[lang]/layout.tsx:48`, `blog/layout.tsx:64`, `[slug]/page.tsx:29`, `opengraph-image.tsx:7` | "Elias Neto" fixo no código, contrariando o README. → `profile.name`. |
| 19 | Arq | `content/blog/posts.ts` e `app/[lang]/blog/posts.ts` | Dois arquivos `posts.ts` com papéis diferentes, e o tipo `cover` redeclarado. → Renomear o loader para `load-posts.ts` e usar `PostEntry["cover"]`. |
| 20 | Arq | `app/[lang]/page.tsx` (443 linhas), `app/globals.css` (592 linhas) | Grandes, mas coesos. → Dividir só quando ganharem lógica; o CSS do blog pode ir para `blog.css`. |
| 21 | Perf | `app/globals.css:182-193` | Transição de `font-weight` nas letras de 24vw gera layout a cada frame. → Animar só cor e `rotate`. |
| 22 | Perf | `app/globals.css:57-65` | Grain em `body::after` fixo em tela cheia com `z-index: 60`. → Usar `background` do body, ou desligar em `pointer: coarse`. |
| 23 | Perf | `app/[lang]/page.tsx:86`, `blog/layout.tsx:22` | `backdrop-blur` em headers fixos. → Fundo opaco no mobile. |
| 24 | Perf | `holo-card.tsx:30-35`, `globals.css:360-431` | Três camadas com blend, filter e mask repintadas durante o tilt. → Desligar o `filter` em `pointer: coarse`. |
| 25 | Perf | `work-list.tsx`, `command-palette.tsx` | Ilhas client maiores do que precisam. → Lista no servidor com ilha só para o preview; corpo da paleta carregado sob demanda. |
| 26 | Perf | `typing-terminal.tsx:29,40` | `setState` por caractere para sempre, mesmo fora da tela. → Pausar com IntersectionObserver ou escrever por ref. |
| 27 | Perf | `public/elias-card.webp` (440 KB), `author-avatar.tsx` | Avatar feito com `scale-[2.6]` sobre a arte inteira. → Arquivo de avatar recortado em 128×128 e a fonte reduzida para cerca de 800 px. |
| 28 | UX | `blog/[slug]/page.tsx:121`, `blog/layout.tsx:23-43`, `language-switcher.tsx:22` | TOC some abaixo de `lg`, header do blog no limite em 320px, alvos de toque de cerca de 29px. → `<details>` com o índice acima do artigo e alvos de 44px. |
| 29 | UX | `page.tsx:91-93`, `blog/theme-switch.tsx:14`, `theme-toggle.tsx:27`, `holo-card.tsx:80-95` | Âncoras em português em todos os idiomas, rótulo ambíguo do tema, radiogroup sem setas e `div role=button`. → Rótulo "Ativar tema escuro" e `<button>` nativo. |
| 30 | Lóg | `app/[lang]/page.tsx:434`, `blog/layout.tsx:64` | Ano do copyright congelado no build (SSG). → Aceitar, ou documentar no README. |

---

## 4. Verificações

| Verificação | Resultado |
|---|---|
| `npm audit --omit=dev` (a partir do lockfile) | **6 vulnerabilidades:** 1 crítica (`next` 16.2.10), 4 altas (postcss, sharp, nanoid, source-map-js) e 1 moderada (baseline-browser-mapping). Fix: `next@16.4.6` mais `npm audit fix`. Ver P2-1. |
| Busca de segredos (árvore e histórico, `git log -p --all -S`) | Nada encontrado. `.env*` está no `.gitignore` desde o commit inicial. O PDF e o webp não têm metadados pessoais. |
| Contraste WCAG dos tokens | Recalculado: muted/paper 3,93; signal/paper 2,82; ink/signal 5,69; `#635e55`/paper 5,47; comentário/terminal 3,26. |
| `tsc --noEmit` | **Não verificado.** O `node_modules` não está instalado neste container e a auditoria não altera o ambiente. A saída só tinha erros de módulo não encontrado. |
| `npm run lint` | **Não verificado** (mesmo motivo). |
| `npm run build` | **Não verificado** (mesmo motivo). Última execução conhecida: passou no commit `42329bb`, numa sessão anterior. |
| Testes | **Não existem.** Não há runner nem script de teste. |
| Telas no navegador (Playwright) | **Não verificado.** Sem dependências não dá para subir o app; a UX foi analisada pelo código. |

---

## 5. Próximos passos (ordem de ataque)

1. **`/fix`, P1-1, P2-9 e P2-10:** tokens de contraste (`--muted`, `--signal-text`, `text-on-signal` nos hovers, piso de opacidade no terminal). É uma única passada no design system, revisando o portfólio e o blog.
2. **`/fix`, P2-1:** atualizar `next`, `@next/mdx` e `eslint-config-next` para 16.4.6 e rodar `npm audit fix`.
3. **Conteúdo (dono do projeto), P1-2:** preencher links, CV, agenda e redes. **`/feature`:** estado "em breve" para projetos sem link.
4. **`/add-tests`, P2-8:** instalar Vitest e escrever testes de `negotiate`, `extractHeadings` contra o `rehype-slug` e a integridade do conteúdo do blog. É a rede de segurança para os passos seguintes.
5. **`/fix`, P2-4:** CRLF e markdown inline na TOC, coberto pelo teste do passo 4.
6. **`/fix`, P2-2:** `openGraph` do blog.
7. **`/fix`, P2-3:** um único `copyText` com toast de erro.
8. **`/fix`, P2-12, P2-14, P2-15, P2-16 e P2-17:** pacote de acessibilidade (títulos, paleta, preview por toque e teclado, controle de movimento, foco visível).
9. **`/feature`, P2-11:** `not-found.tsx` e `error.tsx` localizados.
10. **`/fix`, P2-13:** gatilho do reveal mais a regra de impressão.
11. **Refatoração planejada, P2-5, P2-6 e P2-7:** desacoplar o blog, levar os hashes e estatísticas para junto dos itens e centralizar os ids de seção.
12. **Medir e depois decidir, P2-18 a P2-21:** fazer uma linha de base com Lighthouse e o Performance panel e só então mexer no spotlight, no Lenis, nas fontes e na animação do h1. A troca de fontes (P2-20) é de uma linha e pode ir antes.
13. **P3:** backlog. Fazer cada item quando o arquivo for tocado por outro motivo.

---

## 6. Limites

- **Sem execução:** typecheck, lint, build, testes, medição de performance (Lighthouse, Performance panel) e telas no navegador não rodaram, porque não há `node_modules` neste container e a auditoria não instala nada. Todos os achados de performance são hipóteses, cada um com a forma de medir.
- **Fora do escopo ou não aplicável:**
  - a dimensão "Banco e performance do back", porque não há back-end;
  - o conteúdo `.mdx` foi lido só para checar headings, cercas de código e o `<Callout>`;
  - `assets/fonts` e as imagens geradas (OG e ícones) não foram aprofundados.
- **Pontos que não puderam ser checados:**
  - a documentação local do Next 16 (`node_modules/next/dist/docs/`, exigida pelo `AGENTS.md`) estava indisponível. A herança de metadata (P2-2) e a API de `headers()` foram avaliadas pelo comportamento documentado do Next;
  - o texto completo dos advisories e o comportamento real na Vercel (headers HTTP de produção, `Host`) não foram consultados;
  - não houve teste real com teclado nem com leitor de tela.
