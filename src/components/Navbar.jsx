import { useEffect, useState } from "react";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Education", href: "#education" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Personal", href: "#personal" },
  { label: "Contact", href: "#contact" },
];

function getInitialTheme() {
  const saved = localStorage.getItem("theme");
  if (saved === "dark" || saved === "light") return saved;
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [activeHref, setActiveHref] = useState("#home");

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
    const ids = links.map((l) => l.href.replace("#", ""));
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
        if (!visible?.target?.id) return;
        setActiveHref(`#${visible.target.id}`);
      },
      { root: null, rootMargin: "-35% 0px -55% 0px", threshold: [0.05, 0.12, 0.2] }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <header data-navbar="true" className="fixed inset-x-0 top-0 z-50">
      <div
        className={[
          "w-full transition-colors",
          scrolled
            ? "backdrop-blur border-b border-[color:var(--border)] bg-[color:var(--bg)]/80"
            : "bg-transparent",
        ].join(" ")}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <a
            href="#home"
            className="text-lg font-semibold tracking-tight text-[color:var(--text)] hover:opacity-90 transition"
          >
            hvenkate
          </a>

          <nav className="hidden md:flex items-center justify-center gap-8 text-sm text-[color:var(--text)]/80">
            {links.map((l) => {
              const active = activeHref === l.href;
              return (
                <a
                  key={l.href}
                  href={l.href}
                  className={[
                    "transition-colors",
                    active
                      ? "text-[color:var(--text)] border-b-2 border-blue-500/70 pb-1"
                      : "text-[color:var(--text)]/80 hover:text-[color:var(--text)]",
                  ].join(" ")}
                >
                  {l.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="/resume/Harsha_Venkateshwara_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-500 transition"
            >
              Resume
            </a>

            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[color:var(--border)] bg-[color:var(--card)] text-[color:var(--text)] hover:opacity-90 transition"
              title="Toggle theme"
              onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
              aria-label="Toggle theme"
            >
              <span className="text-lg leading-none">{theme === "dark" ? "☾" : "☀"}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
