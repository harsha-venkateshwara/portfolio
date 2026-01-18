import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import NET from "vanta/dist/vanta.net.min.js";

function HeroPill({ children }) {
  return (
    <span
      className="
        inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition
        bg-[var(--chip-bg)]
        text-[var(--chip-text)]
        border-[var(--chip-border)]
        hover:bg-[var(--chip-bg-hover)]
      "
    >
      {children}
    </span>
  );
}

export default function Hero() {
  const vantaRef = useRef(null);
  const effectRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!effectRef.current && vantaRef.current) {
      const isDark = document.documentElement.classList.contains("dark");

      effectRef.current = NET({
        el: vantaRef.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        backgroundColor: isDark ? 0x0a1733 : 0xf8fafc,
        showDots: true,
        color: isDark ? 0x2b3a55 : 0x94a3b8,
        points: 8,
        maxDistance: 25,
        spacing: 20,
      });

      setReady(true);
    }

    const forceResize = () => window.dispatchEvent(new Event("resize"));
    const t1 = setTimeout(forceResize, 50);
    const t2 = setTimeout(forceResize, 250);
    const t3 = setTimeout(forceResize, 800);
    window.addEventListener("resize", forceResize);

    return () => {
      window.removeEventListener("resize", forceResize);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);

      if (effectRef.current) {
        effectRef.current.destroy();
        effectRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    const syncVanta = () => {
      if (!effectRef.current) return;
      const isDark = root.classList.contains("dark");
      effectRef.current.setOptions({
        backgroundColor: isDark ? 0x0a1733 : 0xf8fafc,
        color: isDark ? 0x2b3a55 : 0x94a3b8,
      });
    };

    syncVanta();
    const obs = new MutationObserver(syncVanta);
    obs.observe(root, { attributes: true, attributeFilter: ["class"] });

    return () => obs.disconnect();
  }, []);

  const scrollToAbout = () => {
    const el = document.getElementById("about");
    if (!el) return;

    const nav =
      document.querySelector("header") ||
      document.querySelector('[data-navbar="true"]');
    const navH = nav ? nav.getBoundingClientRect().height : 64;

    const y = el.getBoundingClientRect().top + window.scrollY - navH;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const overlay = document.documentElement.classList.contains("dark")
    ? "linear-gradient(to bottom, rgba(0,0,0,0.35), rgba(0,0,0,0.25), rgba(0,0,0,0.45))"
    : "linear-gradient(to bottom, rgba(255,255,255,0.65), rgba(255,255,255,0.50), rgba(255,255,255,0.75))";

  return (
    <section id="home" className="relative w-full overflow-hidden min-h-screen pt-24">
      <div ref={vantaRef} className="absolute inset-0 z-0 pointer-events-none vanta-net" />

      <div className="absolute inset-0 z-10 pointer-events-none" style={{ background: overlay }} />

      <div className="relative z-20 mx-auto flex min-h-[calc(100vh-6rem)] max-w-6xl items-center justify-center px-6 pb-16">
        <div className="w-full max-w-3xl text-center">
          <div className="mx-auto h-28 w-28 sm:h-36 sm:w-36 md:h-44 md:w-44 rounded-full border border-[color:var(--border)] bg-[color:var(--card)] shadow-lg shadow-black/20 overflow-hidden">
            <img
              src="/images/hv.jpg"
              alt="Harsha Venkateshwara"
              className="h-full w-full object-cover"
            />
          </div>

          <h1 className="mt-3 text-4xl sm:text-5xl md:text-5xl font-bold tracking-tight text-[color:var(--text)]">
            Harsha Venkateshwara
          </h1>

          <p className="mt-3 text-xl sm:text-2xl md:text-3xl font-bold text-[color:var(--muted)]">
            AI/ML Engineer
          </p>

          <p className="mt-2 text-base sm:text-lg md:text-2xl font-semibold text-[color:var(--muted)]">
            MS in Computer Science and Engineering @ University at Buffalo
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-8">
            <img
              src="/images/UBlogo.jpg"
              alt="University at Buffalo"
              className="h-12 sm:h-14 w-auto opacity-85 hover:opacity-65 transition-opacity"
              title="University at Buffalo — MS in Computer Science"
            />
            <img
              src="/images/vtulogo.jpg"
              alt="VTU"
              className="h-12 sm:h-14 w-auto opacity-85 hover:opacity-65 transition-opacity"
              title="Visvesvaraya Technological University"
            />
            <img
              src="/images/meslogo.png"
              alt="MES"
              className="h-12 sm:h-14 w-auto opacity-85 hover:opacity-65 transition-opacity"
              title="MES College of Arts, Commerce and Science"
            />
          </div>

          <p className="mt-6 text-base sm:text-lg text-[color:var(--muted)] max-w-2xl mx-auto">
            Transforming data into intelligent solutions through GenAI and ML
          </p>

          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <HeroPill>GenAI</HeroPill>
            <HeroPill>AI</HeroPill>
            <HeroPill>ML</HeroPill>
            <HeroPill>Big Data</HeroPill>
          </div>

          <p className="mt-5 text-sm text-[color:var(--muted)]">
            📍 New York, USA (Open to Remote/Relocation)
          </p>

          <div className="mt-6 flex items-center justify-center gap-5">
            <a
              href="https://www.linkedin.com/in/harsha-venkateshwara/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[color:var(--muted)] hover:text-[color:var(--text)] transition-colors"
              aria-label="LinkedIn"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>

            <a
              href="mailto:harsha.venkateswara@gmail.com"
              className="text-[color:var(--muted)] hover:text-[color:var(--text)] transition-colors"
              aria-label="Email"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h3.819l6.545 4.91 6.545-4.91h3.819A1.636 1.636 0 0 1 24 5.457z" />
              </svg>
            </a>

            <a
              href="https://github.com/harsha-venkateshwara"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[color:var(--muted)] hover:text-[color:var(--text)] transition-colors"
              aria-label="GitHub"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </div>

          <div className="mt-10 animate-bounce">
            <button
              type="button"
              className="text-[color:var(--muted)] hover:text-[color:var(--text)] transition-colors"
              aria-label="Scroll to about section"
              onClick={scrollToAbout}
            >
              <svg className="w-9 h-9 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {!ready ? (
        <div className="absolute left-4 top-24 z-20 text-xs text-[color:var(--muted)]">
          Initializing background…
        </div>
      ) : null}
    </section>
  );
}
