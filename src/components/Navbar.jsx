import { useEffect, useState } from "react";

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
  const [theme, setTheme] = useState("dark");
  const [activeHref, setActiveHref] = useState("#home");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setTheme(getInitialTheme());
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = ["home", ...links.map((l) => l.href.replace("#", ""))];
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
        if (!visible?.target?.id) return;
        setActiveHref(`#${visible.target.id}`);
      },
      { root: null, rootMargin: "-30% 0px -60% 0px", threshold: [0.05, 0.12, 0.2] }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e) => e.key === "Escape" && setMobileOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  return (
    <header data-navbar="true" className="fixed inset-x-0 top-0 z-50">
      <div
        className={[
          "w-full transition-all duration-300",
          scrolled
            ? "backdrop-blur-xl border-b border-[color:var(--border)] bg-[color:var(--bg)]/85"
            : "bg-transparent",
        ].join(" ")}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
          <a
            href="#home"
            className="group inline-flex items-center gap-3 text-[color:var(--text)]"
            aria-label="Home"
          >
            <span className="grid h-11 w-11 place-items-center rounded-xl border border-[color:var(--border-strong)] bg-[color:var(--surface)] font-display text-lg font-bold tracking-tight">
              hv
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
                  className={[
                    "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-[color:var(--text)] text-[color:var(--bg)]"
                      : "text-[color:var(--muted)] hover:text-[color:var(--text)]",
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
              Résumé
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
                    onClick={() => setMobileOpen(false)}
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
