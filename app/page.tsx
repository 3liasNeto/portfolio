import { Clock } from "./components/clock";
import { WorkList } from "./components/work-list";
import { experience, profile, projects, services, stack, stats } from "./data";

function Monogram({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-baseline font-extrabold tracking-tighter ${className}`}
    >
      E<span className="font-serif font-normal italic">n</span>
      <span className="text-signal">.</span>
    </span>
  );
}

function RotatingBadge() {
  return (
    <div className="relative grid size-32 place-items-center md:size-44">
      <svg
        viewBox="0 0 200 200"
        className="animate-spin-slow absolute inset-0 size-full"
        aria-hidden
      >
        <defs>
          <path
            id="circle"
            d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0"
          />
        </defs>
        <text className="fill-ink font-mono text-[15px] tracking-[0.28em] uppercase">
          <textPath href="#circle">
            Código com assinatura ✳ Código com assinatura ✳
          </textPath>
        </text>
      </svg>
      <span className="grid size-14 place-items-center rounded-full bg-signal text-2xl text-paper md:size-20 md:text-3xl">
        ✳
      </span>
    </div>
  );
}

function SectionLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <div className="mb-10 flex items-center gap-3 font-mono text-xs tracking-widest uppercase">
      <span className="text-signal">({index})</span>
      <span>{children}</span>
      <span className="h-px flex-1 bg-ink/20" />
    </div>
  );
}

export default function Home() {
  return (
    <main className="flex-1">
      {/* ---------- Nav ---------- */}
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8">
        <nav className="mx-auto flex max-w-[1600px] items-center justify-between rounded-full border border-ink/10 bg-paper/80 py-2 pr-2 pl-5 backdrop-blur-md">
          <a href="#top" className="text-2xl" aria-label="Início">
            <Monogram />
          </a>
          <ul className="hidden gap-8 font-mono text-xs tracking-wider uppercase md:flex">
            <li><a className="hover:text-signal" href="#trabalhos">Trabalhos</a></li>
            <li><a className="hover:text-signal" href="#sobre">Sobre</a></li>
            <li><a className="hover:text-signal" href="#experiencia">Experiência</a></li>
          </ul>
          <a
            href="#contato"
            className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-signal"
          >
            Vamos conversar →
          </a>
        </nav>
      </header>

      {/* ---------- Hero ---------- */}
      <section
        id="top"
        className="relative mx-auto flex min-h-svh max-w-[1600px] flex-col justify-between px-4 pt-28 pb-8 md:px-8"
      >
        <div className="flex flex-wrap items-start justify-between gap-4 font-mono text-xs tracking-wider uppercase">
          <p className="flex items-center gap-2">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-signal opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-signal" />
            </span>
            {profile.availability}
          </p>
          <p className="text-right">
            {profile.location} — <Clock timeZone={profile.timeZone} /> BRT
          </p>
        </div>

        <div className="relative py-12">
          <p className="mb-4 font-mono text-sm text-muted">
            <span className="text-signal">~/</span>portfolio{" "}
            <span className="text-ink">$ whoami</span>
            <span className="animate-blink ml-1 inline-block h-4 w-2 translate-y-0.5 bg-ink" />
          </p>
          <h1 className="leading-[0.82] uppercase">
            <span className="rise block overflow-hidden">
              <span className="text-[24vw] font-black tracking-[-0.06em] md:text-[19vw]">
                Elias
              </span>
            </span>
            <span className="rise flex items-end justify-end gap-6 overflow-hidden md:-mt-[3vw]">
              <span
                className="font-serif text-[26vw] tracking-[-0.03em] normal-case italic md:text-[21vw]"
                style={{ animationDelay: "120ms" }}
              >
                Neto<span className="text-signal">.</span>
              </span>
            </span>
          </h1>
          <div className="absolute top-1/2 left-[52%] hidden -translate-y-1/3 md:block">
            <RotatingBadge />
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <p className="max-w-xl text-xl leading-snug md:text-2xl">
            {profile.role} que transforma ideias em{" "}
            <em className="font-serif text-[1.15em]">produtos digitais</em> rápidos,
            acessíveis e com{" "}
            <span className="bg-signal px-1 text-paper">personalidade</span>.
          </p>
          <a
            href="#trabalhos"
            className="group flex items-center gap-3 font-mono text-xs tracking-wider uppercase"
          >
            Role para ver trabalhos
            <span className="grid size-10 place-items-center rounded-full border border-ink transition-transform group-hover:translate-y-1">
              ↓
            </span>
          </a>
        </div>
      </section>

      {/* ---------- Marquee ---------- */}
      <div className="-rotate-1 overflow-hidden border-y border-ink bg-ink py-4 text-paper">
        <div className="animate-marquee flex w-max">
          {[0, 1].map((copy) => (
            <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0">
              {stack.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-8 pr-8 text-3xl font-bold tracking-tight uppercase md:text-5xl"
                >
                  {item}
                  <span className="text-signal">✳</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      {/* ---------- Work ---------- */}
      <section id="trabalhos" className="mx-auto max-w-[1600px] px-4 pt-32 pb-24 md:px-8">
        <SectionLabel index="01">Trabalhos selecionados</SectionLabel>
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <h2 className="max-w-3xl text-5xl leading-[0.95] font-extrabold tracking-[-0.04em] md:text-7xl">
            Coisas que eu{" "}
            <span className="font-serif font-normal italic">construí</span> e
            gosto de mostrar.
          </h2>
          <p className="max-w-xs font-mono text-xs text-muted uppercase">
            Passe o mouse para espiar · 2024 — 2026
          </p>
        </div>
        <WorkList projects={projects} />
      </section>

      {/* ---------- About ---------- */}
      <section id="sobre" className="bg-ink text-paper">
        <div className="mx-auto max-w-[1600px] px-4 py-32 md:px-8">
          <div className="mb-10 flex items-center gap-3 font-mono text-xs tracking-widest uppercase">
            <span className="text-signal">(02)</span>
            <span>Sobre</span>
            <span className="h-px flex-1 bg-paper/20" />
          </div>
          <div className="grid gap-16 md:grid-cols-[1.4fr_1fr]">
            <p className="text-3xl leading-[1.15] tracking-tight md:text-5xl">
              Oi, eu sou o Elias. Escrevo código como quem escreve um{" "}
              <em className="font-serif text-signal">bom texto</em>: com clareza,
              ritmo e sem palavras sobrando. Gosto do ponto onde{" "}
              <em className="font-serif">design</em> e{" "}
              <em className="font-serif">engenharia</em> se encontram — é ali que
              os produtos ganham alma.
            </p>
            <div className="flex flex-col justify-between gap-12">
              <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl bg-[radial-gradient(circle_at_30%_20%,#ff8a66,var(--signal)_45%,#7a1c05)] md:ml-auto">
                <span className="absolute inset-0 grid place-items-center text-[10rem] text-paper/90">
                  <Monogram />
                </span>
                <span className="absolute bottom-4 left-4 font-mono text-[11px] tracking-wider uppercase">
                  [ foto em breve ]
                </span>
              </div>
              <dl className="grid grid-cols-3 gap-4 border-t border-paper/20 pt-6">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <dt className="text-4xl font-extrabold tracking-tight md:text-5xl">
                      {stat.value}
                    </dt>
                    <dd className="mt-1 font-mono text-[11px] text-paper/60 uppercase">
                      {stat.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="mt-28 grid gap-px overflow-hidden rounded-2xl border border-paper/15 bg-paper/15 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, i) => (
              <div
                key={service.title}
                className="group bg-ink p-8 transition-colors hover:bg-signal"
              >
                <span className="font-mono text-xs text-signal group-hover:text-ink">
                  0{i + 1}
                </span>
                <h3 className="mt-12 text-2xl font-bold tracking-tight">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm text-paper/70 group-hover:text-paper">
                  {service.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Experience ---------- */}
      <section id="experiencia" className="mx-auto max-w-[1600px] px-4 py-32 md:px-8">
        <SectionLabel index="03">Experiência</SectionLabel>
        <div className="grid gap-12 md:grid-cols-[1fr_1.6fr]">
          <h2 className="text-5xl leading-[0.95] font-extrabold tracking-[-0.04em] md:text-7xl">
            O histórico de <span className="font-serif font-normal italic">commits</span>{" "}
            da minha carreira.
          </h2>
          <div className="overflow-hidden rounded-2xl border border-ink bg-[#181715] font-mono text-sm text-paper shadow-[8px_8px_0_var(--signal)]">
            <div className="flex items-center gap-2 border-b border-paper/10 px-4 py-3">
              <span className="size-3 rounded-full bg-signal" />
              <span className="size-3 rounded-full bg-paper/30" />
              <span className="size-3 rounded-full bg-paper/30" />
              <span className="ml-3 text-xs text-paper/50">
                elias@neto: ~/carreira — git log --graph
              </span>
            </div>
            <ol className="p-5 md:p-8">
              {experience.map((item, i) => (
                <li key={item.hash} className="group relative flex gap-4 pb-8 last:pb-0">
                  <span className="relative flex flex-col items-center">
                    <span
                      className={`z-10 mt-1 size-3 rounded-full border-2 ${
                        i === 0 ? "border-signal bg-signal" : "border-paper/60 bg-[#181715]"
                      }`}
                    />
                    {i < experience.length - 1 && (
                      <span className="absolute top-4 bottom-[-2rem] w-px bg-paper/20" />
                    )}
                  </span>
                  <div className="flex-1">
                    <p className="flex flex-wrap gap-x-3 text-xs">
                      <span className="text-signal">{item.hash}</span>
                      {i === 0 && (
                        <span className="text-[#b9d77a]">(HEAD -&gt; main)</span>
                      )}
                      <span className="text-paper/50">{item.period}</span>
                    </p>
                    <p className="mt-1.5 font-sans text-xl font-semibold tracking-tight md:text-2xl">
                      {item.role}{" "}
                      <span className="font-serif font-normal text-paper/60 italic">
                        @ {item.company}
                      </span>
                    </p>
                    <p className="mt-1 text-paper/60">{item.note}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ---------- Contact / Footer ---------- */}
      <footer id="contato" className="bg-signal text-ink">
        <div className="mx-auto max-w-[1600px] px-4 pt-32 pb-6 md:px-8">
          <div className="mb-10 flex items-center gap-3 font-mono text-xs tracking-widest uppercase">
            <span>(04)</span>
            <span>Contato</span>
            <span className="h-px flex-1 bg-ink/30" />
          </div>
          <p className="text-4xl leading-[0.95] font-extrabold tracking-[-0.04em] md:text-7xl">
            Tem uma ideia?
            <br />
            <span className="font-serif font-normal italic">Vamos construir juntos.</span>
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="group mt-12 inline-flex items-center gap-4 border-b-2 border-ink pb-2 text-2xl font-semibold tracking-tight sm:text-4xl md:text-6xl"
          >
            {profile.email}
            <span className="transition-transform duration-300 group-hover:translate-x-2 group-hover:-translate-y-2">
              ↗
            </span>
          </a>

          <div className="mt-24 grid gap-8 border-t border-ink/30 pt-8 font-mono text-xs uppercase md:grid-cols-3">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {profile.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="underline-offset-4 hover:underline"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="md:text-center">
              {profile.location} · <Clock timeZone={profile.timeZone} />
            </p>
            <a href="#top" className="md:text-right">
              Voltar ao topo ↑
            </a>
          </div>

          <p
            aria-hidden
            className="mt-10 text-center text-[16vw] leading-[0.75] font-black tracking-[-0.07em] whitespace-nowrap uppercase select-none"
          >
            Elias{" "}<span className="font-serif font-normal tracking-[-0.03em] normal-case italic">Neto</span>
          </p>
          <p className="mt-6 flex justify-between font-mono text-[11px] uppercase">
            <span>© {new Date().getFullYear()} Elias Neto</span>
            <span>Feito com Next.js & café</span>
          </p>
        </div>
      </footer>
    </main>
  );
}
