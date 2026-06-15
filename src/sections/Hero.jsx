import { useEffect, useRef } from "react";
import * as THREE from "three";
import NET from "vanta/dist/vanta.net.min.js";

function StatusPill() {
  return (
    <div className="inline-flex items-center gap-2.5 rounded-full border border-[color:var(--border-strong)] bg-[color:var(--surface)]/80 backdrop-blur px-4 py-2">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>
      <span className="font-mono text-[12px] font-medium uppercase tracking-[0.16em] text-[color:var(--muted)]">
        Available · AI/ML Engineer roles
      </span>
    </div>
  );
}

function Meta({ label, value }) {
  return (
    <div>
      <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--subtle)]">
        {label}
      </div>
      <div className="mt-2 text-base font-semibold text-[color:var(--text)]">{value}</div>
    </div>
  );
}

function IconBtn({ href, label, children }) {
  const props = href.startsWith("http")
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
  return (
    <a
      href={href}
      aria-label={label}
      {...props}
      className="grid h-12 w-12 place-items-center rounded-full border border-[color:var(--border)] bg-[color:var(--surface)]/60 text-[color:var(--muted)] hover:text-[color:var(--text)] hover:border-[color:var(--border-strong)] transition"
    >
      {children}
    </a>
  );
}

export default function Hero() {
  const vantaRef = useRef(null);
  const effectRef = useRef(null);

  useEffect(() => {
    if (!effectRef.current && vantaRef.current) {
      const isDark = document.documentElement.classList.contains("dark");
      try {
        effectRef.current = NET({
          el: vantaRef.current,
          THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          backgroundColor: isDark ? 0x07080b : 0xfafafa,
          showDots: true,
          color: isDark ? 0x2b3a55 : 0x94a3b8,
          points: 8,
          maxDistance: 25,
          spacing: 20,
        });
      } catch (err) {
        console.warn("Vanta init failed; continuing without background.", err);
      }
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
    const sync = () => {
      if (!effectRef.current) return;
      const isDark = root.classList.contains("dark");
      try {
        effectRef.current.setOptions({
          backgroundColor: isDark ? 0x07080b : 0xfafafa,
          color: isDark ? 0x2b3a55 : 0x94a3b8,
        });
      } catch (err) {
        // Vanta NET's internal materials can be out of sync with newer Three.js
        // versions; failures here should not crash the page.
        console.warn("Vanta setOptions failed.", err);
      }
    };
    sync();
    const obs = new MutationObserver(sync);
    obs.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  return (
    <section id="home" className="relative isolate overflow-hidden">
      <div ref={vantaRef} className="absolute inset-0 z-0 pointer-events-none vanta-net" />
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 10%, transparent 0%, transparent 35%, var(--bg) 95%)",
        }}
      />

      <div className="relative z-20 mx-auto max-w-7xl px-6 lg:px-8 pt-28 pb-20 lg:pt-32 lg:pb-24">
        <div className="mb-10 flex flex-wrap items-center gap-4">
          <StatusPill />
          <span className="font-mono text-[12px] uppercase tracking-[0.18em] text-[color:var(--subtle)]">
            New York · Open to remote / relocation
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          <div className="lg:col-span-8">
            <p className="eyebrow mb-6">Harsha Venkateshwara · portfolio.2026</p>

            <h1 className="font-display font-bold text-display text-[color:var(--text)]">
              Building intelligent systems
              <br className="hidden sm:block" />{" "}
              that turn raw data into{" "}
              <span className="italic font-medium text-[color:var(--accent-text)]">
                shipped product.
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-lead text-[color:var(--muted)]">
              I&apos;m an AI/ML Engineer working across GenAI, machine learning, and big-data
              systems - from production ML pipelines for energy analytics at Itron, to
              autonomous-vehicle research at SUNY, and now building agentic AI systems at
              Commvault. Currently completing an MS in Computer Science at the University at
              Buffalo.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a href="#projects" className="btn-primary" aria-label="View projects">
                View projects
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href="/resume/Harsha_Venkateshwara_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                aria-label="Download résumé PDF"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
                </svg>
                Download résumé
              </a>

              <div className="ml-1 flex items-center gap-1.5">
                <IconBtn href="https://www.linkedin.com/in/harsha-venkateshwara/" label="LinkedIn">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                </IconBtn>
                <IconBtn href="https://github.com/harsha-venkateshwara" label="GitHub">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                </IconBtn>
                <IconBtn href="mailto:harsha.venkateswara@gmail.com" label="Email">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h3.819l6.545 4.91 6.545-4.91h3.819A1.636 1.636 0 0 1 24 5.457z" /></svg>
                </IconBtn>
              </div>
            </div>

            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-6 max-w-2xl border-t border-[color:var(--border)] pt-8">
              <Meta label="Experience" value="3+ years" />
              <Meta label="Focus" value="GenAI · ML · Data" />
              <Meta label="Education" value="MS @ UB" />
              <Meta label="Currently" value="AI Engineer @ Commvault" />
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="relative overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] aspect-[4/5] shadow-xl shadow-black/20">
              <img
                src="/images/hv.jpg"
                alt="Harsha Venkateshwara"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-5 left-5 inline-flex items-center gap-2 rounded-md bg-black/45 backdrop-blur px-2.5 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/90">
                  HV · 2026
                </span>
              </div>
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent p-5">
                <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/75">
                  Currently
                </div>
                <div className="text-[15px] font-semibold text-white mt-1.5 leading-snug">
                  AI Engineer Intern
                  <br />
                  Commvault
                </div>
              </div>
            </div>

            <div className="mt-7 flex items-center justify-between gap-4 rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)]/50 px-5 py-4">
              <img
                src="/images/UBlogo.jpg"
                alt="University at Buffalo"
                title="University at Buffalo · MS in CS"
                className="h-10 w-auto opacity-85 hover:opacity-100 transition"
              />
              <img
                src="/images/vtulogo.jpg"
                alt="VTU"
                title="Visvesvaraya Technological University"
                className="h-10 w-auto opacity-85 hover:opacity-100 transition"
              />
              <img
                src="/images/meslogo.png"
                alt="MES"
                title="MES College"
                className="h-10 w-auto opacity-85 hover:opacity-100 transition"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
