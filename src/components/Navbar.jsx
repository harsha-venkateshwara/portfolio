import { useEffect, useRef, useState } from "react";

const links = [
  { label: "About", href: "#about", n: "01" },
  { label: "Education", href: "#education", n: "02" },
  { label: "Experience", href: "#experience", n: "03" },
  { label: "Projects", href: "#projects", n: "04" },
  { label: "Skills", href: "#skills", n: "05" },
  { label: "Personal", href: "#personal", n: "06" },
  { label: "Contact", href: "#contact", n: "07" },
];

function getInitialTheme() {
  const saved = localStorage.getItem("theme");
  if (saved === "dark" || saved === "light") return saved;
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "dark";
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState(getInitialTheme);
  const [activeHref, setActiveHref] = useState("#home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const lockRef = useRef(false);
  const lockTimer = useRef(0);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  // One passive, rAF-throttled scroll listener drives both the nav background
  // and the active-section highlight. A deterministic offsetTop check is instant
  // and accurate (the IntersectionObserver version lagged / stuck on tall
  // sections — what read as "the violet renders slow"). Suppressed while a
  // click-triggered smooth scroll is in flight so the pill doesn't wander.
  useEffect(() => {
    const ids = ["home", ...links.map((l) => l.href.replace("#", ""))];
    let ticking = false;
    const measure = () => {
      ticking = false;
      setScrolled(window.scrollY > 8);
      if (lockRef.current) return;
      const line = window.scrollY + 110;
      let current = "home";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= line) current = id;
      }
      const next = `#${current}`;
      setActiveHref((prev) => (prev === next ? prev : next));
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e) => e.key === "Escape" && setMobileOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  const onNavClick = (e, href) => {
    const el = document.getElementById(href.slice(1));
    if (!el) return;
    e.preventDefault();
    lockRef.current = true;
    clearTimeout(lockTimer.current);
    lockTimer.current = setTimeout(() => {
      lockRef.current = false;
    }, 700);
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    setActiveHref(href);
    window.history.replaceState(null, "", href);
  };

  return (
    <header data-navbar="true" className="fixed inset-x-0 top-0 z-50">
      <div
        className={[
          "w-full transition-all duration-300",
          scrolled
            ? "backdrop-blur-md border-b border-[color:var(--border)] bg-[color:var(--bg)]/85"
            : "bg-transparent",
        ].join(" ")}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
          <a
            href="#home"
            onClick={(e) => onNavClick(e, "#home")}
            className="group inline-flex items-center gap-3 text-[color:var(--text)]"
            aria-label="Home"
          >
            <span className="grid h-11 w-11 place-items-center overflow-hidden rounded-xl border border-[color:var(--border-strong)] bg-[color:var(--surface)] transition-transform duration-300 group-hover:scale-105">
              <img
                src="/images/nav%20logo.jpeg"
                alt="Harsha Venkateshwara"
                className="h-full w-full object-cover"
              />
            </span>
            <span className="hidden sm:flex flex-col leading-none">
              <span className="text-[15px] font-semibold tracking-tight">
                Harsha Venkateshwara
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--subtle)] mt-1">
                AI/ML Engineer
              </span>
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-1 rounded-full border border-[color:var(--border)] bg-[color:var(--surface)]/70 backdrop-blur px-2 py-2">
            {links.map((l) => {
              const active = activeHref === l.href;
              return (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => onNavClick(e, l.href)}
                  style={active ? { backgroundImage: "var(--grad-cta)", color: "#fff" } : undefined}
                  className={[
                    "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    active ? "" : "text-[color:var(--muted)] hover:text-[color:var(--text)]",
                  ].join(" ")}
                >
                  {l.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="/resume/Harsha_Venkateshwara_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-[color:var(--text)] px-5 py-2.5 text-sm font-semibold text-[color:var(--bg)] hover:opacity-90 transition min-h-[44px]"
            >
              Resume
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M7 17l10-10M17 7H8m9 0v9"/>
              </svg>
            </a>

            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--border)] bg-[color:var(--surface)]/70 text-[color:var(--text)] hover:border-[color:var(--border-strong)] transition"
              title="Toggle theme"
              onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
                </svg>
              ) : (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                  <circle cx="12" cy="12" r="4" strokeWidth="1.8"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41"/>
                </svg>
              )}
            </button>

            <button
              type="button"
              className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--border)] bg-[color:var(--surface)]/70 text-[color:var(--text)]"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 6l12 12M18 6L6 18"/>
                </svg>
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7h16M4 12h16M4 17h16"/>
                </svg>
              )}
            </button>
          </div>
        </div>

        {mobileOpen ? (
          <div className="lg:hidden border-t border-[color:var(--border)] bg-[color:var(--bg)]/95 backdrop-blur-xl">
            <nav className="mx-auto max-w-7xl px-6 py-5 flex flex-col gap-1">
              {links.map((l) => {
                const active = activeHref === l.href;
                return (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={(e) => {
                      onNavClick(e, l.href);
                      setMobileOpen(false);
                    }}
                    className={[
                      "flex items-center justify-between rounded-xl px-4 py-4 text-base",
                      active
                        ? "bg-[color:var(--raised)] text-[color:var(--text)]"
                        : "text-[color:var(--muted)] hover:text-[color:var(--text)]",
                    ].join(" ")}
                  >
                    <span className="flex items-center gap-4">
                      <span className="font-mono text-[11px] tracking-[0.18em] text-[color:var(--subtle)]">
                        {l.n}
                      </span>
                      <span className="font-medium">{l.label}</span>
                    </span>
                    <span className="text-[color:var(--subtle)]">→</span>
                  </a>
                );
              })}
              <a
                href="/resume/Harsha_Venkateshwara_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--text)] px-5 py-3.5 text-base font-semibold text-[color:var(--bg)]"
              >
                Download Résumé
              </a>
            </nav>
          </div>
        ) : null}
      </div>
    </header>
  );
}
