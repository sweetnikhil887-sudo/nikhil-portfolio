import { useEffect, useState, type FormEvent, type ReactNode } from "react";

/* ================= CONFIG — edit these ================= */
const CONFIG = {
  photo: "/nikhil.jpg", // place your portrait at public/nikhil.jpg
  email: "sweetnikhil887@gmail.com",
  phone: "7877413396",
  location: "Gurugram, Haryana, India",
  linkedinUrl: "", // TODO: add your exact LinkedIn profile URL
  instagramHandle: "official_nikhil_0712",
};
const instagramUrl = `https://instagram.com/${CONFIG.instagramHandle}`;

const NAV = ["Home", "About", "Skills", "Projects", "Experience", "Education", "Contact"];

/* ================= Helpers ================= */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

const Reveal = ({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) => (
  <div className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>
);

const SectionHead = ({ tag, title, sub }: { tag: string; title: ReactNode; sub?: string }) => (
  <Reveal className="mb-14 max-w-3xl">
    <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[.3em] text-accent">
      <span className="h-px w-10 bg-accent" />{tag}
    </p>
    <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">{title}</h2>
    {sub && <p className="mt-5 text-lg text-neutral-400">{sub}</p>}
  </Reveal>
);

const Icon = {
  linkedin: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden><path d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.6c0-1.33-.02-3.05-1.86-3.05-1.86 0-2.14 1.45-2.14 2.95V21H9z"/></svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>
  ),
  phone: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .4 1.9.7 2.8a2 2 0 01-.5 2.1L8 9.9a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.4c.9.3 1.8.6 2.8.7a2 2 0 011.7 2z"/></svg>
  ),
  pin: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M12 22s7-6.3 7-12a7 7 0 10-14 0c0 5.7 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>
  ),
  arrow: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden><path d="M5 12h14M13 5l7 7-7 7"/></svg>
  ),
};

function Socials({ size = "h-11 w-11" }: { size?: string }) {
  const cls = `${size} grid place-items-center rounded-full border border-white/10 text-neutral-300 transition hover:border-accent hover:bg-accent hover:text-white`;
  return (
    <div className="flex gap-3">
      {CONFIG.linkedinUrl ? (
        <a href={CONFIG.linkedinUrl} target="_blank" rel="noreferrer" aria-label="LinkedIn" className={cls}>{Icon.linkedin}</a>
      ) : (
        <span title="LinkedIn — search 'Nikhil Rohilla'" aria-label="LinkedIn: Nikhil Rohilla" className={cls}>{Icon.linkedin}</span>
      )}
      <a href={instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram" className={cls}>{Icon.instagram}</a>
      <a href={`mailto:${CONFIG.email}`} aria-label="Email" className={cls}>{Icon.mail}</a>
    </div>
  );
}

function Photo({ className = "" }: { className?: string }) {
  const [err, setErr] = useState(false);
  return err ? (
    <div className={`grid place-items-center bg-gradient-to-br from-neutral-900 to-black font-display text-8xl font-bold text-accent ${className}`}>NR</div>
  ) : (
    <img src={CONFIG.photo} onError={() => setErr(true)} alt="Portrait of Nikhil Rohilla, AI Developer and Web Creator" className={`object-cover object-top ${className}`} />
  );
}

/* ================= Navbar ================= */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      let cur = "home";
      NAV.forEach((n) => {
        const el = document.getElementById(n.toLowerCase());
        if (el && el.getBoundingClientRect().top <= 140) cur = n.toLowerCase();
      });
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; }, [open]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "border-b border-white/5 bg-black/70 py-3 backdrop-blur-xl" : "py-6"}`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8" aria-label="Main">
        <a href="#home" className="font-display text-2xl font-extrabold tracking-tight">NIKHIL<span className="text-accent">.</span></a>
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => {
            const id = n.toLowerCase();
            return (
              <li key={n}>
                <a href={`#${id}`} className={`relative px-4 py-2 text-sm transition ${active === id ? "text-white" : "text-neutral-400 hover:text-white"}`}>
                  {n}
                  <span className={`absolute inset-x-4 -bottom-0.5 h-0.5 origin-left rounded bg-accent transition-transform duration-300 ${active === id ? "scale-x-100" : "scale-x-0"}`} />
                </a>
              </li>
            );
          })}
        </ul>
        <a href="#contact" className="hidden rounded-full bg-accent px-6 py-2.5 text-sm font-semibold shadow-[0_0_30px_-5px_#e50914] transition hover:scale-105 hover:bg-red-500 lg:inline-block">Let's Talk</a>
        <button onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open} className="relative z-50 grid h-11 w-11 place-items-center rounded-full border border-white/10 lg:hidden">
          <span className={`absolute h-0.5 w-5 bg-white transition ${open ? "rotate-45" : "-translate-y-1.5"}`} />
          <span className={`absolute h-0.5 w-5 bg-white transition ${open ? "opacity-0" : ""}`} />
          <span className={`absolute h-0.5 w-5 bg-white transition ${open ? "-rotate-45" : "translate-y-1.5"}`} />
        </button>
      </nav>
      <div className={`fixed inset-0 z-40 flex flex-col justify-center bg-black/95 px-8 backdrop-blur-xl transition-all duration-500 lg:hidden ${open ? "visible opacity-100" : "invisible opacity-0"}`}>
        {NAV.map((n, i) => (
          <a key={n} href={`#${n.toLowerCase()}`} onClick={() => setOpen(false)}
            className={`border-b border-white/5 py-4 font-display text-3xl font-bold transition-all duration-500 ${open ? "translate-x-0 opacity-100" : "-translate-x-6 opacity-0"} ${active === n.toLowerCase() ? "text-accent" : ""}`}
            style={{ transitionDelay: open ? `${i * 50}ms` : "0ms" }}>{n}</a>
        ))}
        <a href="#contact" onClick={() => setOpen(false)} className="mt-8 rounded-full bg-accent py-4 text-center font-semibold">Let's Talk</a>
      </div>
    </header>
  );
}

/* ================= Hero ================= */
function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-16">
      <div className="grid-bg absolute inset-0" />
      <div className="floaty absolute -top-40 right-[-10%] h-[600px] w-[600px] rounded-full bg-accent/20 blur-[140px]" />
      <div className="floaty absolute bottom-[-20%] left-[-10%] h-[400px] w-[400px] rounded-full bg-red-900/20 blur-[120px]" style={{ animationDelay: "-7s" }} />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.15fr_.85fr]">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-neutral-300 backdrop-blur">
              <span className="pulse-dot h-2 w-2 rounded-full bg-green-500" /> Open to Freelance Opportunities
            </span>
          </Reveal>
          <Reveal delay={100}><p className="mt-8 text-lg text-neutral-400 sm:text-xl">Hi, I'm <span className="font-semibold text-white">Nikhil Rohilla</span></p></Reveal>
          <Reveal delay={200}>
            <h1 className="mt-3 font-display text-5xl font-extrabold leading-[0.98] tracking-tight sm:text-7xl xl:text-8xl">
              AI Developer <br /><span className="text-grad">&amp; Web Creator</span>
            </h1>
          </Reveal>
          <Reveal delay={300}><p className="mt-7 max-w-xl text-lg leading-relaxed text-neutral-400">Building intelligent ideas, modern web experiences and practical AI solutions.</p></Reveal>
          <Reveal delay={350}>
            <p className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-sm font-medium tracking-wide text-neutral-300">
              {["Python", "Web Development", "AI", "Prompt Engineering"].map((t, i) => (
                <span key={t} className="flex items-center gap-3">{i > 0 && <span className="text-accent">•</span>}{t}</span>
              ))}
            </p>
          </Reveal>
          <Reveal delay={450}>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="#projects" className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-4 font-semibold shadow-[0_10px_40px_-10px_#e50914] transition hover:bg-red-500">
                View My Work <span className="transition group-hover:translate-x-1">{Icon.arrow}</span>
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-4 font-semibold transition hover:border-white hover:bg-white hover:text-black">Let's Connect</a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={250} className="relative mx-auto w-full max-w-sm lg:max-w-md">
          <div className="group relative">
            <div className="absolute -inset-4 rounded-[2.5rem] bg-accent/30 opacity-60 blur-3xl transition duration-700 group-hover:opacity-90" />
            <div className="absolute -inset-px rounded-[2.2rem] bg-gradient-to-b from-accent via-red-900/40 to-transparent" />
            <div className="relative overflow-hidden rounded-[2.2rem] bg-neutral-950">
              <Photo className="aspect-[4/5] w-full transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
              <div className="absolute inset-x-5 bottom-5 flex items-center justify-between rounded-2xl border border-white/10 bg-black/50 px-5 py-4 backdrop-blur-md">
                <div>
                  <p className="font-display font-semibold">Nikhil Rohilla</p>
                  <p className="text-xs text-neutral-400">{CONFIG.location}</p>
                </div>
                <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-medium text-red-400">BCA Student</span>
              </div>
            </div>
            <div className="absolute -left-6 top-10 hidden rounded-2xl border border-white/10 bg-black/60 px-4 py-3 text-sm backdrop-blur-md sm:block">
              <span className="text-accent">{"</>"}</span> Web + AI
            </div>
          </div>
        </Reveal>
      </div>

      <a href="#about" aria-label="Scroll to about" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-[.3em] text-neutral-500 md:flex">
        Scroll <span className="h-10 w-px bg-gradient-to-b from-accent to-transparent" />
      </a>
    </section>
  );
}

function Marquee() {
  const items = ["AI Development", "Web Creation", "Python", "Prompt Engineering", "Automation", "LinkedIn Ghostwriting", "Creative Problem Solving"];
  return (
    <div className="overflow-hidden border-y border-white/5 bg-[#080808] py-6" aria-hidden>
      <div className="marquee flex w-max gap-12 whitespace-nowrap font-display text-2xl font-bold text-neutral-700 sm:text-3xl">
        {[...items, ...items].map((t, i) => (
          <span key={i} className="flex items-center gap-12">{t}<span className="text-accent">✦</span></span>
        ))}
      </div>
    </div>
  );
}

/* ================= About ================= */
function About() {
  const interests = ["Artificial Intelligence", "Web Development", "Automation", "AI-powered Applications", "Creative Digital Products"];
  return (
    <section id="about" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead tag="About Me" title={<>Ambitious by nature. <span className="text-neutral-500">Builder by choice.</span></>} />
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
          <Reveal>
            <div className="space-y-6 text-lg leading-relaxed text-neutral-400">
              <p>I'm <span className="text-white">Nikhil Rohilla</span>, an aspiring AI and web developer focused on turning ideas into useful digital experiences. I work with modern web technologies, Python and AI tools while continuously sharpening my development and problem-solving skills.</p>
              <p>I'm currently pursuing my <span className="text-white">BCA (Bachelor of Computer Applications)</span> and actively building practical projects — learning by doing, shipping ideas and improving with every build.</p>
              <p>Alongside development, I freelance and write LinkedIn content for founders and professionals, which keeps me close to real people, real problems and clear communication.</p>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="card rounded-3xl p-8">
              <h3 className="font-display text-xl font-semibold">What drives me</h3>
              <ul className="mt-6 space-y-3">
                {interests.map((i) => (
                  <li key={i} className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/[.02] px-4 py-3 text-neutral-300 transition hover:border-accent/40 hover:text-white">
                    <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_10px_#e50914]" />{i}
                  </li>
                ))}
              </ul>
              <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl bg-white/[.03] p-4"><p className="text-neutral-500">Based in</p><p className="mt-1 font-medium">Gurugram, India</p></div>
                <div className="rounded-xl bg-white/[.03] p-4"><p className="text-neutral-500">Currently</p><p className="mt-1 font-medium">BCA · 5th Semester</p></div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ================= Skills ================= */
function Skills() {
  const groups = [
    { title: "Frontend", icon: "◧", items: ["HTML", "CSS", "JavaScript"] },
    { title: "Programming", icon: "⌘", items: ["Python"] },
    { title: "AI", icon: "✦", items: ["Artificial Intelligence", "Prompt Engineering", "AI Tools", "AI-assisted Development"] },
    { title: "Tools", icon: "⚙", items: ["Git", "GitHub", "VS Code"] },
  ];
  const core = ["HTML", "CSS", "JavaScript", "Python", "Git", "GitHub", "AI", "Prompt Engineering"];
  return (
    <section id="skills" className="relative bg-[#080808] py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead tag="Skills" title={<>My growing <span className="text-grad">toolkit</span></>} sub="The technologies and tools I'm learning, using and building with every day." />
        <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {core.map((s, i) => (
            <Reveal key={s} delay={i * 50}>
              <div className="card group flex h-full items-center gap-3 rounded-2xl p-5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent/10 font-display text-sm font-bold text-accent transition group-hover:bg-accent group-hover:text-white">{s.slice(0, 2).toUpperCase()}</span>
                <span className="font-medium">{s}</span>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {groups.map((g, i) => (
            <Reveal key={g.title} delay={i * 80}>
              <div className="card h-full rounded-3xl p-7">
                <span className="text-2xl text-accent">{g.icon}</span>
                <h3 className="mt-4 font-display text-xl font-semibold">{g.title}</h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {g.items.map((it) => <span key={it} className="rounded-full border border-white/10 px-3 py-1.5 text-sm text-neutral-300">{it}</span>)}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= Projects ================= */
type Project = { n: string; title: string; tagline?: string; desc: string; highlights: string[]; tech: string[]; visual: ReactNode; link?: string; code?: string };

const projects: Project[] = [
  {
    n: "01", title: "AI Assistant", tagline: "Your intelligent digital companion",
    desc: "A personal AI assistant concept designed to combine conversational intelligence, task assistance, personalization and future computer interaction into one intelligent digital companion.",
    highlights: ["AI interaction", "Personal assistant concept", "Voice interaction potential", "Automation", "Personalized experience"],
    tech: ["Python", "AI", "Prompt Engineering"],
    visual: (
      <div className="relative grid h-full place-items-center">
        <div className="absolute h-40 w-40 animate-ping rounded-full bg-accent/10" style={{ animationDuration: "3s" }} />
        <div className="h-28 w-28 rounded-full bg-gradient-to-br from-accent to-red-950 shadow-[0_0_80px_#e50914]" />
        <div className="absolute bottom-6 flex items-end gap-1">{[3, 6, 9, 5, 8, 4, 7, 3].map((h, i) => <span key={i} className="w-1 rounded bg-white/60" style={{ height: h * 3 }} />)}</div>
      </div>
    ),
  },
  {
    n: "02", title: "AI Travel", tagline: "Explore • Learn • Experience",
    desc: "An AI-powered virtual travel experience designed to help users explore famous destinations from home through an interactive AI Guide.",
    highlights: ["AI Guide", "Virtual exploration", "Famous destinations", "Interactive experience", "Learn + Explore concept"],
    tech: ["HTML", "CSS", "JavaScript", "AI"],
    visual: (
      <div className="relative grid h-full place-items-center">
        <div className="h-36 w-36 rounded-full border border-white/20 bg-[radial-gradient(circle_at_30%_30%,#ff4d55,#5a0005_70%)] shadow-[0_0_60px_-10px_#e50914]" />
        <div className="absolute h-52 w-52 rounded-full border border-dashed border-white/15" />
        <span className="absolute right-[22%] top-[22%] h-3 w-3 rounded-full bg-white shadow-[0_0_12px_#fff]" />
      </div>
    ),
  },
  {
    n: "03", title: "Medical Website", tagline: "Care, clearly presented",
    desc: "A modern medical website concept focused on creating a clean, accessible and trustworthy digital experience for patients and healthcare-related information.",
    highlights: ["Modern healthcare UI", "Responsive design", "Patient-friendly experience", "Clear information architecture", "Professional interface"],
    tech: ["HTML", "CSS", "JavaScript"],
    visual: (
      <div className="grid h-full place-items-center">
        <div className="w-56 rounded-xl border border-white/10 bg-black/60 p-3">
          <div className="mb-3 flex gap-1.5">{[0, 1, 2].map((i) => <span key={i} className="h-2 w-2 rounded-full bg-white/20" />)}</div>
          <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-lg bg-accent text-xl font-bold">+</span><div className="flex-1 space-y-1.5"><div className="h-2 w-3/4 rounded bg-white/40" /><div className="h-2 w-1/2 rounded bg-white/15" /></div></div>
          <div className="mt-3 grid grid-cols-3 gap-2">{[0, 1, 2].map((i) => <div key={i} className="h-10 rounded bg-white/[.06]" />)}</div>
        </div>
      </div>
    ),
  },
];

function Projects() {
  return (
    <section id="projects" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead tag="Projects" title={<>Selected <span className="text-grad">work</span> &amp; concepts</>} sub="Practical projects where I explore AI, interaction and modern web design." />
        <div className="space-y-8">
          {projects.map((p, i) => (
            <Reveal key={p.title}>
              <article className="card group grid overflow-hidden rounded-[2rem] lg:grid-cols-2">
                <div className={`relative min-h-[260px] overflow-hidden bg-[radial-gradient(ellipse_at_center,rgba(229,9,20,.18),transparent_70%)] ${i % 2 ? "lg:order-2" : ""}`}>
                  <div className="grid-bg absolute inset-0" />
                  <div className="relative h-full transition duration-700 group-hover:scale-105">{p.visual}</div>
                  <span className="absolute left-6 top-5 font-display text-6xl font-extrabold text-white/5">{p.n}</span>
                </div>
                <div className="p-8 sm:p-10">
                  {p.tagline && <p className="text-xs font-semibold uppercase tracking-[.25em] text-accent">{p.tagline}</p>}
                  <h3 className="mt-3 font-display text-3xl font-bold sm:text-4xl">{p.title}</h3>
                  <p className="mt-4 leading-relaxed text-neutral-400">{p.desc}</p>
                  <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                    {p.highlights.map((h) => <li key={h} className="flex items-center gap-2 text-sm text-neutral-300"><span className="text-accent">▹</span>{h}</li>)}
                  </ul>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {p.tech.map((t) => <span key={t} className="rounded-full bg-white/5 px-3 py-1 text-xs text-neutral-300">{t}</span>)}
                  </div>
                  <div className="mt-8 flex flex-wrap gap-3">
                    {p.link ? (
                      <a href={p.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold transition hover:bg-red-500">View Project {Icon.arrow}</a>
                    ) : (
                      <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold transition hover:bg-red-500">View Project — Request Demo {Icon.arrow}</a>
                    )}
                    {p.code && <a href={p.code} target="_blank" rel="noreferrer" className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold transition hover:border-white">View Code</a>}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
          <Reveal>
            <div className="grid place-items-center rounded-[2rem] border border-dashed border-white/15 px-6 py-16 text-center">
              <span className="text-3xl text-accent">✦</span>
              <h3 className="mt-4 font-display text-2xl font-bold">More Projects Coming Soon</h3>
              <p className="mt-2 max-w-md text-neutral-400">I'm constantly building. New AI and web projects are on the way.</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ================= Experience ================= */
function Experience() {
  const items = [
    { role: "Freelancing", tag: "Current", desc: "Working on digital projects while developing practical skills in web development, AI tools, content creation and technology-driven solutions.", tags: ["Web Development", "AI Tools", "Content"] },
    { role: "LinkedIn Ghostwriting", tag: "Current", desc: "Creating engaging LinkedIn content for founders and professionals with a focus on clear communication, personal branding and audience engagement.", tags: ["Personal Branding", "Copywriting", "Engagement"] },
  ];
  return (
    <section id="experience" className="bg-[#080808] py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead tag="Experience" title={<>Real work, <span className="text-neutral-500">real learning.</span></>} />
        <div className="grid gap-6 md:grid-cols-2">
          {items.map((e, i) => (
            <Reveal key={e.role} delay={i * 120}>
              <div className="card h-full rounded-3xl p-8 sm:p-10">
                <div className="flex items-center justify-between">
                  <span className="font-display text-5xl font-extrabold text-white/10">0{i + 1}</span>
                  <span className="flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs text-green-400"><span className="h-1.5 w-1.5 rounded-full bg-green-400" />{e.tag}</span>
                </div>
                <h3 className="mt-6 font-display text-2xl font-bold sm:text-3xl">{e.role}</h3>
                <p className="mt-4 leading-relaxed text-neutral-400">{e.desc}</p>
                <div className="mt-6 flex flex-wrap gap-2">{e.tags.map((t) => <span key={t} className="rounded-full border border-white/10 px-3 py-1 text-xs text-neutral-300">{t}</span>)}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= Education ================= */
function Education() {
  const items = [
    { status: "Currently Pursuing", title: "BCA — Bachelor of Computer Applications", place: "St. Andrews Institute of Technology & Management", meta: "MDU (Maharshi Dayanand University)", badge: "3rd Year • 5th Semester" },
    { status: "Schooling", title: "Senior Secondary Education", place: "B.P.S Sr. Sec. School", meta: "", badge: "Completed" },
  ];
  return (
    <section id="education" className="py-28 sm:py-36">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <SectionHead tag="Education" title={<>Academic <span className="text-grad">foundation</span></>} />
        <ol className="relative border-l border-white/10 pl-8 sm:pl-12">
          {items.map((e, i) => (
            <li key={e.title} className="relative mb-10 last:mb-0">
              <span className="absolute -left-[41px] top-8 h-4 w-4 rounded-full border-4 border-[#050505] bg-accent shadow-[0_0_0_4px_rgba(229,9,20,.25)] sm:-left-[57px]" />
              <Reveal delay={i * 120}>
                <div className="card rounded-3xl p-7 sm:p-9">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-xs font-semibold uppercase tracking-[.25em] text-accent">{e.status}</p>
                    <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-neutral-300">{e.badge}</span>
                  </div>
                  <h3 className="mt-4 font-display text-2xl font-bold">{e.title}</h3>
                  <p className="mt-2 text-neutral-300">{e.place}</p>
                  {e.meta && <p className="mt-1 text-sm text-neutral-500">{e.meta}</p>}
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ================= Services ================= */
function Services() {
  const s = [
    ["Web Development", "Modern responsive websites and clean frontend experiences."],
    ["AI Solutions", "Exploring and building practical AI-powered digital experiences."],
    ["Prompt Engineering", "Creating structured prompts and AI workflows for better results."],
    ["LinkedIn Ghostwriting", "Writing engaging professional content for founders and professionals."],
    ["AI-Assisted Development", "Using modern AI tools to accelerate ideation, development and problem solving."],
  ];
  return (
    <section id="services" className="bg-[#080808] py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead tag="Services" title={<>What I <span className="text-grad">Do</span></>} />
        <div className="divide-y divide-white/10 border-y border-white/10">
          {s.map(([t, d], i) => (
            <Reveal key={t}>
              <div className="group relative grid items-center gap-3 overflow-hidden py-8 sm:grid-cols-[100px_1fr_1fr_40px] sm:gap-8">
                <span className="absolute inset-0 -z-0 origin-left scale-x-0 bg-gradient-to-r from-accent/10 to-transparent transition-transform duration-500 group-hover:scale-x-100" />
                <span className="relative font-display text-lg text-accent">0{i + 1}</span>
                <h3 className="relative font-display text-2xl font-bold transition group-hover:translate-x-2 sm:text-3xl">{t}</h3>
                <p className="relative text-neutral-400">{d}</p>
                <span className="relative hidden -rotate-45 text-neutral-500 transition group-hover:rotate-0 group-hover:text-accent sm:block">{Icon.arrow}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= Journey ================= */
function Journey() {
  const f = ["AI", "Web Development", "Python", "Automation", "Personal Projects", "Freelancing", "Professional Branding"];
  return (
    <section id="journey" className="relative overflow-hidden py-28 sm:py-36">
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 blur-[140px]" />
      <div className="relative mx-auto max-w-5xl px-5 text-center sm:px-8">
        <Reveal><p className="text-xs font-semibold uppercase tracking-[.3em] text-accent">My Journey · Current Focus</p></Reveal>
        <Reveal delay={100}>
          <h2 className="mt-6 font-display text-5xl font-extrabold leading-none tracking-tight sm:text-7xl lg:text-8xl">
            Building.<br /><span className="text-neutral-500">Learning.</span><br /><span className="text-grad">Creating.</span>
          </h2>
        </Reveal>
        <Reveal delay={200}><p className="mx-auto mt-8 max-w-2xl text-lg text-neutral-400">Every day is a step forward. I'm continuously developing my skills and pushing my limits across:</p></Reveal>
        <Reveal delay={300}>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {f.map((x) => <span key={x} className="rounded-full border border-white/10 bg-white/[.03] px-5 py-2.5 text-sm backdrop-blur transition hover:border-accent hover:bg-accent/10">{x}</span>)}
          </div>
        </Reveal>
        <Reveal delay={400}>
          <blockquote className="mx-auto mt-14 max-w-3xl font-display text-2xl font-medium leading-snug sm:text-3xl">
            “My goal is to keep learning, build meaningful projects and turn ideas into <span className="text-accent">useful digital products.</span>”
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}

/* ================= Contact ================= */
function Contact() {
  const [v, setV] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (v.name.trim().length < 2) e.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = "Please enter a valid email.";
    if (v.subject.trim().length < 3) e.subject = "Please add a subject.";
    if (v.message.trim().length < 10) e.message = "Message should be at least 10 characters.";
    return e;
  };
  const submit = (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    // No backend: open user's email client with prefilled message
    const body = `Name: ${v.name}\nEmail: ${v.email}\n\n${v.message}`;
    window.location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent(v.subject)}&body=${encodeURIComponent(body)}`;
    setDone(true);
  };
  const field = (k: keyof typeof v, label: string, type = "text") => (
    <div>
      <label htmlFor={k} className="mb-2 block text-sm text-neutral-400">{label}</label>
      {k === "message" ? (
        <textarea id={k} rows={5} value={v[k]} onChange={(e) => setV({ ...v, [k]: e.target.value })} aria-invalid={!!errors[k]}
          className={`w-full resize-none rounded-xl border bg-white/[.03] px-4 py-3.5 outline-none transition focus:border-accent focus:bg-white/[.05] ${errors[k] ? "border-red-500" : "border-white/10"}`} />
      ) : (
        <input id={k} type={type} value={v[k]} onChange={(e) => setV({ ...v, [k]: e.target.value })} aria-invalid={!!errors[k]}
          className={`w-full rounded-xl border bg-white/[.03] px-4 py-3.5 outline-none transition focus:border-accent focus:bg-white/[.05] ${errors[k] ? "border-red-500" : "border-white/10"}`} />
      )}
      {errors[k] && <p className="mt-1.5 text-xs text-red-400" role="alert">{errors[k]}</p>}
    </div>
  );
  const info = [
    { i: Icon.mail, l: "Email", v: CONFIG.email, h: `mailto:${CONFIG.email}` },
    { i: Icon.phone, l: "Phone", v: CONFIG.phone, h: `tel:+91${CONFIG.phone}` },
    { i: Icon.pin, l: "Location", v: CONFIG.location },
  ];
  return (
    <section id="contact" className="relative overflow-hidden bg-[#080808] py-28 sm:py-36">
      <div className="absolute -right-40 top-0 h-[500px] w-[500px] rounded-full bg-accent/10 blur-[140px]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead tag="Contact" title={<>Let's Build <span className="text-grad">Something Great.</span></>} sub="Have an idea, project or opportunity? Let's connect and turn it into something meaningful." />
        <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr]">
          <Reveal>
            <div className="space-y-4">
              {info.map((x) => {
                const inner = (
                  <>
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">{x.i}</span>
                    <div className="min-w-0"><p className="text-xs uppercase tracking-widest text-neutral-500">{x.l}</p><p className="mt-1 break-all font-medium">{x.v}</p></div>
                  </>
                );
                return x.h ? <a key={x.l} href={x.h} className="card flex items-center gap-4 rounded-2xl p-5">{inner}</a> : <div key={x.l} className="card flex items-center gap-4 rounded-2xl p-5">{inner}</div>;
              })}
              <div className="card rounded-2xl p-6">
                <p className="font-display text-lg font-semibold">Nikhil Rohilla</p>
                <p className="mt-1 text-sm text-neutral-400">LinkedIn Ghostwriter | I Write Engaging LinkedIn Posts for Founders &amp; Professionals</p>
                <p className="mt-3 text-sm text-neutral-300">Instagram: <a href={instagramUrl} target="_blank" rel="noreferrer" className="text-accent hover:underline">@{CONFIG.instagramHandle}</a></p>
                <div className="mt-5"><Socials /></div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <form onSubmit={submit} noValidate className="card space-y-5 rounded-3xl p-7 sm:p-10">
              <div className="grid gap-5 sm:grid-cols-2">{field("name", "Name")}{field("email", "Email", "email")}</div>
              {field("subject", "Subject")}
              {field("message", "Message")}
              <button type="submit" className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-7 py-4 font-semibold shadow-[0_10px_40px_-10px_#e50914] transition hover:bg-red-500 sm:w-auto">
                Send Message <span className="transition group-hover:translate-x-1">{Icon.arrow}</span>
              </button>
              <p className="text-xs text-neutral-500" aria-live="polite">
                {done ? "Your email app should open with your message ready to send. If it didn't, email me directly at " + CONFIG.email + "." : "Submitting opens your email app with the message pre-filled."}
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ================= Footer ================= */
function Footer() {
  return (
    <footer className="border-t border-white/5 pt-20 pb-10">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <a href="#home" className="font-display text-3xl font-extrabold">NIKHIL<span className="text-accent">.</span></a>
            <p className="mt-4 font-display font-semibold">Nikhil Rohilla</p>
            <p className="text-sm text-neutral-400">AI Developer &amp; Web Creator</p>
            <p className="mt-4 max-w-sm text-neutral-500">Turning Ideas Into Intelligent Digital Experiences.</p>
          </div>
          <div>
            <p className="mb-4 text-xs uppercase tracking-widest text-neutral-500">Navigate</p>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              {NAV.map((n) => <li key={n}><a href={`#${n.toLowerCase()}`} className="text-neutral-300 transition hover:text-accent">{n}</a></li>)}
            </ul>
          </div>
          <div>
            <p className="mb-4 text-xs uppercase tracking-widest text-neutral-500">Connect</p>
            <a href={`mailto:${CONFIG.email}`} className="break-all text-sm text-neutral-300 hover:text-accent">{CONFIG.email}</a>
            <div className="mt-5"><Socials size="h-10 w-10" /></div>
          </div>
        </div>
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-sm text-neutral-500 sm:flex-row">
          <p>© 2026 Nikhil Rohilla. All rights reserved.</p>
          <a href="#home" className="flex items-center gap-2 hover:text-white">Back to top <span className="-rotate-90">{Icon.arrow}</span></a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  useReveal();
  return (
    <>
      <a href="#about" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-accent focus:px-4 focus:py-2">Skip to content</a>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Services />
        <Journey />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
