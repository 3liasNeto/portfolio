import { notFound } from "next/navigation";
import { Clock } from "../components/clock";
import { CommandPalette } from "../components/command-palette";
import { ContactActions } from "../components/contact-actions";
import { CountUp } from "../components/count-up";
import { InteractiveHero } from "../components/interactive-hero";
import { LanguageSwitcher } from "../components/language-switcher";
import { RevealWords } from "../components/reveal";
import { RevealObserver } from "../components/reveal-observer";
import { SmoothScroll } from "../components/smooth-scroll";
import { ThemeToggle } from "../components/theme-toggle";
import { Toaster } from "../components/toast";
import { WorkList } from "../components/work-list";
import { commits, profile, projects, siteUrl, stack, statValues } from "../data";
import { hasLocale, htmlLang } from "../i18n";
import { getDictionary } from "./dictionaries";

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

function Letters({ text, className }: { text: string; className: string }) {
  return [...text].map((char, i) => (
    <span key={i} className={`hero-letter ${className}`}>
      {char}
    </span>
  ));
}

function RotatingBadge({ text }: { text: string }) {
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
        <text
          textLength="482"
          lengthAdjust="spacing"
          className="fill-ink font-mono text-[15px] uppercase"
        >
          <textPath href="#circle">{text}</textPath>
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
    <div
      data-reveal="fade"
      className="mb-10 flex items-center gap-3 font-mono text-xs tracking-widest uppercase"
    >
      <span className="text-signal">({index})</span>
      <span>{children}</span>
      <span className="h-px flex-1 bg-ink/20" />
    </div>
  );
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);
  const localizedProjects = projects.map((project) => ({
    ...project,
    description: t.projects[project.id],
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: t.hero.role,
    description: t.meta.description,
    url: `${siteUrl}/${lang}`,
    email: `mailto:${profile.email}`,
    address: { "@type": "PostalAddress", addressLocality: "São Paulo", addressCountry: "BR" },
    knowsAbout: stack,
    sameAs: profile.socials.map((social) => social.href),
  };

  return (
    <main className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <SmoothScroll />
      <RevealObserver />
      <Toaster />

      {/* ---------- Nav ---------- */}
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8">
        <nav className="mx-auto flex max-w-[1600px] items-center justify-between gap-3 rounded-full border border-ink/10 bg-paper/80 py-2 pr-2 pl-5 backdrop-blur-md">
          <a href="#top" className="text-2xl" aria-label={t.nav.home}>
            <Monogram />
          </a>
          <ul className="hidden gap-8 font-mono text-xs tracking-wider uppercase md:flex">
            <li><a className="hover:text-signal" href="#trabalhos">{t.nav.work}</a></li>
            <li><a className="hover:text-signal" href="#sobre">{t.nav.about}</a></li>
            <li><a className="hover:text-signal" href="#experiencia">{t.nav.experience}</a></li>
          </ul>
          <div className="flex items-center gap-2 sm:gap-3">
            <CommandPalette
              lang={lang}
              t={t.palette}
              contact={t.contact}
              profile={{
                email: profile.email,
                cv: profile.cv,
                calendar: profile.calendar,
                socials: profile.socials,
              }}
            />
            <LanguageSwitcher current={lang} label={t.nav.language} />
            <a
              href="#contato"
              className="rounded-full bg-ink px-4 py-2.5 text-sm font-semibold whitespace-nowrap text-paper transition-colors hover:bg-signal sm:px-5"
            >
              <span className="hidden sm:inline">{t.nav.cta} </span>→
            </a>
          </div>
        </nav>
      </header>

      {/* ---------- Hero ---------- */}
      <InteractiveHero
        id="top"
        className="relative mx-auto flex min-h-svh max-w-[1600px] flex-col justify-between px-4 pt-28 pb-8 md:px-8"
      >
        <div className="flex flex-wrap items-start justify-between gap-4 font-mono text-xs tracking-wider uppercase">
          <p className="flex items-center gap-2">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-signal opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-signal" />
            </span>
            {t.hero.availability}
          </p>
          <p className="text-right">
            {profile.location} — <Clock timeZone={profile.timeZone} locale={htmlLang[lang]} /> BRT
          </p>
        </div>

        <div className="relative py-12">
          <p className="mb-4 font-mono text-sm text-muted">
            <span className="text-signal">~/</span>portfolio{" "}
            <span className="text-ink">$ whoami</span>
            <span className="animate-blink ml-1 inline-block h-4 w-2 translate-y-0.5 bg-ink" />
          </p>
          <h1 className="leading-[0.82] uppercase">
            <span className="sr-only">Elias Neto</span>
            <span aria-hidden className="rise hero-depth-1 block overflow-hidden">
              <span className="text-[24vw] font-black tracking-[-0.06em] md:text-[19vw]">
                <Letters text="Elias" className="hero-letter-sans" />
              </span>
            </span>
            <span
              aria-hidden
              className="rise hero-depth-2 flex items-end justify-end gap-6 overflow-hidden md:-mt-[3vw]"
            >
              <span
                className="font-serif text-[26vw] tracking-[-0.03em] normal-case italic md:text-[21vw]"
                style={{ animationDelay: "120ms" }}
              >
                <Letters text="Neto" className="hero-letter-serif" />
                <span className="text-signal">.</span>
              </span>
            </span>
          </h1>
          <div className="hero-depth-3 absolute top-1/2 left-[52%] hidden -translate-y-1/3 md:block">
            <RotatingBadge text={t.hero.badge} />
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <p className="max-w-xl text-xl leading-snug md:text-2xl">
            {t.hero.role} {t.hero.before}{" "}
            <em className="font-serif text-[1.15em]">{t.hero.em}</em> {t.hero.middle}{" "}
            <span className="bg-signal px-1 text-on-signal">{t.hero.highlight}</span>
            {t.hero.after}
          </p>
          <a
            href="#trabalhos"
            className="group flex items-center gap-3 font-mono text-xs tracking-wider uppercase"
          >
            {t.hero.scroll}
            <span className="grid size-10 place-items-center rounded-full border border-ink transition-transform group-hover:translate-y-1">
              ↓
            </span>
          </a>
        </div>
      </InteractiveHero>

      {/* ---------- Marquee ---------- */}
      <div className="-rotate-1 overflow-hidden border-y border-ink bg-night py-4 text-chalk">
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
        <SectionLabel index="01">{t.work.label}</SectionLabel>
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <h2
            data-reveal="words"
            className="max-w-3xl text-5xl leading-[0.95] font-extrabold tracking-[-0.04em] md:text-7xl"
          >
            <RevealWords
              segments={[
                { text: t.work.titleA },
                { text: t.work.titleEm, className: "font-serif font-normal italic" },
                { text: t.work.titleB },
              ]}
            />
          </h2>
          <p data-reveal="fade" className="max-w-xs font-mono text-xs text-muted uppercase">
            {t.work.hint}
          </p>
        </div>
        <WorkList projects={localizedProjects} />
      </section>

      {/* ---------- About ---------- */}
      <section id="sobre" className="bg-night text-chalk">
        <div className="mx-auto max-w-[1600px] px-4 py-32 md:px-8">
          <div
            data-reveal="fade"
            className="mb-10 flex items-center gap-3 font-mono text-xs tracking-widest uppercase"
          >
            <span className="text-signal">(02)</span>
            <span>{t.about.label}</span>
            <span className="h-px flex-1 bg-chalk/20" />
          </div>
          <div className="grid gap-16 md:grid-cols-[1.4fr_1fr]">
            <p data-reveal="up" className="text-3xl leading-[1.15] tracking-tight md:text-5xl">
              {t.about.statement.map((part, i) =>
                i % 2 === 0 ? (
                  part
                ) : (
                  <em key={i} className={`font-serif ${i === 1 ? "text-signal" : ""}`}>
                    {part}
                  </em>
                ),
              )}
            </p>
            <div className="flex flex-col justify-between gap-12">
              <div
                data-reveal="clip"
                className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl bg-[radial-gradient(circle_at_30%_20%,#ff8a66,var(--signal)_45%,#7a1c05)] md:ml-auto"
              >
                <span className="absolute inset-0 grid place-items-center text-[10rem] text-chalk/90">
                  <Monogram />
                </span>
                <span className="absolute bottom-4 left-4 font-mono text-[11px] tracking-wider uppercase">
                  {t.about.photo}
                </span>
              </div>
              <dl className="grid grid-cols-3 gap-4 border-t border-chalk/20 pt-6">
                {statValues.map((value, i) => (
                  <div key={value}>
                    <dt className="text-4xl font-extrabold tracking-tight tabular-nums md:text-5xl">
                      <CountUp value={value} />
                    </dt>
                    <dd className="mt-1 font-mono text-[11px] text-chalk/60 uppercase">
                      {t.about.stats[i]}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="mt-28 grid gap-px overflow-hidden rounded-2xl border border-chalk/15 bg-chalk/15 sm:grid-cols-2 lg:grid-cols-4">
            {t.services.map((service, i) => (
              <div
                key={service.title}
                data-reveal="up"
                style={{ "--i": i } as React.CSSProperties}
                className="group bg-night p-8 transition-colors hover:bg-signal"
              >
                <span className="font-mono text-xs text-signal group-hover:text-on-signal">
                  0{i + 1}
                </span>
                <h3 className="mt-12 text-2xl font-bold tracking-tight">{service.title}</h3>
                <p className="mt-3 text-sm text-chalk/70 group-hover:text-chalk">
                  {service.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Experience ---------- */}
      <section id="experiencia" className="mx-auto max-w-[1600px] px-4 py-32 md:px-8">
        <SectionLabel index="03">{t.experience.label}</SectionLabel>
        <div className="grid gap-12 md:grid-cols-[1fr_1.6fr]">
          <h2
            data-reveal="words"
            className="text-5xl leading-[0.95] font-extrabold tracking-[-0.04em] md:text-7xl"
          >
            <RevealWords
              segments={[
                { text: t.experience.titleA },
                { text: t.experience.titleEm, className: "font-serif font-normal italic" },
                { text: t.experience.titleB },
              ]}
            />
          </h2>
          <div
            data-reveal="up"
            className="overflow-hidden rounded-2xl border border-ink bg-[#181715] font-mono text-sm text-chalk shadow-[8px_8px_0_var(--signal)]"
          >
            <div className="flex items-center gap-2 border-b border-chalk/10 px-4 py-3">
              <span className="size-3 rounded-full bg-signal" />
              <span className="size-3 rounded-full bg-chalk/30" />
              <span className="size-3 rounded-full bg-chalk/30" />
              <span className="ml-3 text-xs text-chalk/50">{t.experience.terminal}</span>
            </div>
            <ol className="p-5 md:p-8">
              {t.experience.items.map((item, i) => (
                <li
                  key={commits[i]}
                  data-reveal="up"
                  style={{ "--i": i + 2 } as React.CSSProperties}
                  className="group relative flex gap-4 pb-8 last:pb-0"
                >
                  <span className="relative flex flex-col items-center">
                    <span
                      className={`z-10 mt-1 size-3 rounded-full border-2 ${
                        i === 0 ? "border-signal bg-signal" : "border-chalk/60 bg-[#181715]"
                      }`}
                    />
                    {i < t.experience.items.length - 1 && (
                      <span className="absolute top-4 bottom-[-2rem] w-px bg-chalk/20" />
                    )}
                  </span>
                  <div className="flex-1">
                    <p className="flex flex-wrap gap-x-3 text-xs">
                      <span className="text-signal">{commits[i]}</span>
                      {i === 0 && <span className="text-[#b9d77a]">(HEAD -&gt; main)</span>}
                      <span className="text-chalk/50">{item.period}</span>
                    </p>
                    <p className="mt-1.5 font-sans text-xl font-semibold tracking-tight md:text-2xl">
                      {item.role}{" "}
                      <span className="font-serif font-normal text-chalk/60 italic">
                        @ {item.company}
                      </span>
                    </p>
                    <p className="mt-1 text-chalk/60">{item.note}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ---------- Contact / Footer ---------- */}
      <footer id="contato" className="bg-signal text-on-signal">
        <div className="mx-auto max-w-[1600px] px-4 pt-32 pb-6 md:px-8">
          <div
            data-reveal="fade"
            className="mb-10 flex items-center gap-3 font-mono text-xs tracking-widest uppercase"
          >
            <span>(04)</span>
            <span>{t.contact.label}</span>
            <span className="h-px flex-1 bg-on-signal/30" />
          </div>
          <p
            data-reveal="words"
            className="text-4xl leading-[0.95] font-extrabold tracking-[-0.04em] md:text-7xl"
          >
            <RevealWords segments={[{ text: t.contact.title }]} />
            <br />
            <RevealWords
              segments={[{ text: t.contact.titleEm, className: "font-serif font-normal italic" }]}
            />
          </p>
          <a
            data-reveal="up"
            href={`mailto:${profile.email}`}
            className="group mt-12 inline-flex items-center gap-4 border-b-2 border-on-signal pb-2 text-2xl font-semibold tracking-tight sm:text-4xl md:text-6xl"
          >
            {profile.email}
            <span className="transition-transform duration-300 group-hover:translate-x-2 group-hover:-translate-y-2">
              ↗
            </span>
          </a>
          <ContactActions
            email={profile.email}
            cv={profile.cv}
            calendar={profile.calendar}
            labels={t.contact}
          />

          <div className="mt-24 grid items-center gap-8 border-t border-on-signal/30 pt-8 font-mono text-xs uppercase md:grid-cols-3">
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
            <div className="md:justify-self-center">
              <ThemeToggle labels={t.theme} />
            </div>
            <a href="#top" className="md:text-right">
              {t.contact.back}
            </a>
          </div>

          <p
            aria-hidden
            className="mt-10 text-center text-[16vw] leading-[0.75] font-black tracking-[-0.07em] whitespace-nowrap uppercase select-none"
          >
            Elias{" "}
            <span className="font-serif font-normal tracking-[-0.03em] normal-case italic">
              Neto
            </span>
          </p>
          <p className="mt-6 flex justify-between gap-4 font-mono text-[11px] uppercase">
            <span>
              © {new Date().getFullYear()} {profile.name} · {profile.location} ·{" "}
              <Clock timeZone={profile.timeZone} locale={htmlLang[lang]} />
            </span>
            <span>{t.contact.madeWith}</span>
          </p>
        </div>
      </footer>
    </main>
  );
}
