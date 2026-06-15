import { useEffect, useMemo, useState } from "react";
import SectionHeader from "../components/SectionHeader";

const ArrowLeft = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
  </svg>
);
const ArrowRight = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
  </svg>
);
const PauseIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
  </svg>
);
const PlayIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M8 5v14l11-7L8 5z" />
  </svg>
);

function Chip({ children }) {
  return (
    <span
      className="rounded-full border px-3.5 py-1.5 text-xs font-medium transition"
      style={{
        background: "var(--chip-bg)",
        borderColor: "var(--chip-border)",
        color: "var(--chip-text)",
      }}
    >
      {children}
    </span>
  );
}

function Stat({ value, label }) {
  return (
    <div className="rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 transition hover:border-[color:var(--border-strong)]">
      <div className="font-display text-4xl font-bold tracking-tight text-[color:var(--text)] leading-none">
        {value}
      </div>
      <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--subtle)]">
        {label}
      </div>
    </div>
  );
}

export default function About() {
  const images = useMemo(
    () => [
      { src: "/images/aboutme_1.jpeg", alt: "Harsha moment 1" },
      { src: "/images/aboutme_2.jpeg", alt: "Harsha moment 2" },
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % images.length), 4500);
    return () => clearInterval(id);
  }, [paused, images.length]);

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  return (
    <section id="about" className="py-24 lg:py-32 bg-[color:var(--bg)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader
          index="01"
          label="about"
          title="AI Engineer, Data Scientist, and Graduate Researcher solving real-world problems."
          subtitle="Cross-sector experience across energy, e-commerce, defense, and autonomous-vehicle research, paired with hands-on academic work in healthcare AI."
        />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <div className="relative w-full aspect-[4/5] overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] shadow-xl shadow-black/20">
              <div
                className="flex transition-transform duration-700 ease-out h-full"
                style={{ transform: `translateX(-${index * 100}%)` }}
              >
                {images.map((img, i) => (
                  <div key={img.src} className="min-w-full h-full">
                    <img
                      className="w-full h-full object-cover"
                      src={img.src}
                      alt={img.alt}
                      loading={i === 0 ? "eager" : "lazy"}
                    />
                  </div>
                ))}
              </div>

              <button
                className="absolute top-1/2 left-3 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full bg-black/45 hover:bg-black/65 text-white border border-white/15 transition"
                aria-label="Previous image"
                onClick={prev}
                type="button"
              >
                <ArrowLeft />
              </button>
              <button
                className="absolute top-1/2 right-3 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full bg-black/45 hover:bg-black/65 text-white border border-white/15 transition"
                aria-label="Next image"
                onClick={next}
                type="button"
              >
                <ArrowRight />
              </button>
              <button
                className="absolute top-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-black/45 hover:bg-black/65 text-white border border-white/15 transition"
                aria-label={paused ? "Play slideshow" : "Pause slideshow"}
                onClick={() => setPaused((p) => !p)}
                type="button"
              >
                {paused ? <PlayIcon /> : <PauseIcon />}
              </button>
              <div className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-black/45 border border-white/10 px-3 py-1 text-xs text-white/90 font-mono">
                {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
              </div>
            </div>

            <div className="mt-4 flex justify-center items-center gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  className="p-2"
                  aria-label={`Go to image ${i + 1}`}
                  onClick={() => setIndex(i)}
                  type="button"
                >
                  <span
                    className={[
                      "block h-1.5 rounded-full transition-all duration-300",
                      i === index ? "w-8 bg-[color:var(--text)]" : "w-2 bg-[color:var(--border-strong)]",
                    ].join(" ")}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 space-y-12">
            <div className="space-y-7">
              <p className="text-lead text-[color:var(--muted)]">
                I&apos;m an AI/ML Engineer pursuing a Master&apos;s degree from the State
                University of New York at Buffalo. I specialize in generative AI, data science,
                machine learning, big data, and product development. Building data-driven
                solutions to real-world challenges and optimizing critical processes.
              </p>
              <p className="text-lead text-[color:var(--muted)]">
                I&apos;ve worked across energy &amp; utilities, defense, and e-commerce in both
                private and public sector environments, delivering end-to-end analytics and ML
                solutions on large-scale datasets. My focus is practical, scalable systems:
                data acquisition, feature engineering, rigorous evaluation, and clear stakeholder
                communication that improves performance and decision-making. I&apos;m also actively
                involved in academic research, currently building healthcare-focused projects.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Stat value="3+" label="Years experience" />
              <Stat value="4" label="Industries" />
              <Stat value="8M+" label="Records modeled" />
              <Stat value="2" label="Countries" />
            </div>

            <div>
              <div className="section-tag mb-4">
                <span>·</span>
                <span>/ key highlights</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Highlight color="bg-blue-500" label="AI/ML focused coursework" />
                <Highlight color="bg-emerald-500" label="Multi-sector experience" />
                <Highlight color="bg-sky-500" label="University research projects" />
                <Highlight color="bg-purple-500" label="International experience" />
              </div>
            </div>

            <div>
              <div className="section-tag mb-4">
                <span>·</span>
                <span>/ global experience</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <Chip>United States</Chip>
                <Chip>India</Chip>
              </div>
            </div>

            <div>
              <div className="section-tag mb-4">
                <span>·</span>
                <span>/ personal interests</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <Interest emoji="🏋️" label="Fitness" />
                <Interest emoji="💃" label="Dance" />
                <Interest emoji="🏏" label="Cricket" />
                <Interest emoji="✈️" label="Travelling" />
                <Interest emoji="🎭" label="Performing Arts" />
                <Interest emoji="🎵" label="Music" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Highlight({ color, label }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] p-5 transition hover:border-[color:var(--border-strong)]">
      <div className={`h-2.5 w-2.5 rounded-full ${color}`} />
      <span className="text-base font-medium text-[color:var(--text)]">{label}</span>
    </div>
  );
}

function Interest({ emoji, label }) {
  return (
    <div className="flex items-center gap-3 p-4 bg-[color:var(--surface)] rounded-xl border border-[color:var(--border)] transition hover:border-[color:var(--border-strong)]">
      <span className="text-xl">{emoji}</span>
      <span className="text-base font-medium text-[color:var(--text)]">{label}</span>
    </div>
  );
}
