import { useEffect, useMemo, useState } from "react";

const ArrowLeft = (props) => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
  </svg>
);

const ArrowRight = (props) => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
  </svg>
);

const PauseIcon = (props) => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
  </svg>
);

const PlayIcon = (props) => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="M8 5v14l11-7L8 5z" />
  </svg>
);

function Chip({ children }) {
  return (
    <span
      className="
        px-4 py-2 rounded-full text-sm font-medium border transition
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

export default function About() {
  const images = useMemo(
    () => [
      { src: "/images/aboutme_1.jpeg", alt: "Harsha About 1" },
      { src: "/images/aboutme_2.jpeg", alt: "Harsha About 2" },
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
    <section id="about" className="scroll-mt-20 py-20 bg-[color:var(--bg)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-[color:var(--text)]">
            About Me
          </h2>
          <p className="text-base sm:text-lg text-[color:var(--muted)] max-w-3xl mx-auto">
            AI Engineer, Data Scientist, and Graduate Student with a passion for solving real-world challenges
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-stretch">
          <div className="flex justify-center">
            <div className="relative w-full max-w-[34rem]">
              <div className="relative w-full h-[32rem] sm:h-[40rem] md:h-[44rem] overflow-hidden rounded-2xl shadow-2xl bg-[color:var(--card)] border border-[color:var(--border)]">
                <div
                  className="flex transition-transform duration-500 ease-in-out h-full"
                  style={{ transform: `translateX(-${index * 100}%)` }}
                >
                  {images.map((img, i) => (
                    <div key={img.src} className="min-w-full h-full relative">
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
                  className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10"
                  aria-label="Previous image"
                  onClick={prev}
                  type="button"
                >
                  <ArrowLeft />
                </button>

                <button
                  className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10"
                  aria-label="Next image"
                  onClick={next}
                  type="button"
                >
                  <ArrowRight />
                </button>

                <button
                  className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10"
                  aria-label={paused ? "Play slideshow" : "Pause slideshow"}
                  onClick={() => setPaused((p) => !p)}
                  type="button"
                >
                  {paused ? <PlayIcon /> : <PauseIcon />}
                </button>

                <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm z-10">
                  {index + 1} / {images.length}
                </div>
              </div>

              <div className="flex justify-center items-center mt-6 gap-1">
                {images.map((_, i) => (
                  <button
                    key={i}
                    className="p-2 touch-manipulation"
                    aria-label={`Go to image ${i + 1}`}
                    onClick={() => setIndex(i)}
                    type="button"
                  >
                    <span
                      className={[
                        "block w-3 h-3 rounded-full transition-colors",
                        i === index ? "bg-blue-500" : "bg-[color:var(--border)] hover:opacity-80",
                      ].join(" ")}
                    />
                  </button>
                ))}
              </div>

              <div className="hidden md:flex justify-center mt-4 gap-2 overflow-x-auto pb-2">
                {images.map((img, i) => (
                  <button
                    key={img.src}
                    className={[
                      "flex-shrink-0 w-12 h-16 rounded-md border-2 overflow-hidden transition-all",
                      i === index ? "border-blue-500 ring-2 ring-blue-300/30" : "border-[color:var(--border)] hover:opacity-90",
                    ].join(" ")}
                    onClick={() => setIndex(i)}
                    type="button"
                    aria-label={`Select image ${i + 1}`}
                  >
                    <img className="w-full h-full object-cover" loading="lazy" src={img.src} alt={`Thumbnail ${i + 1}`} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-10">
            <div className="max-w-none space-y-10">
              <p className="text-lg sm:text-xl text-[color:var(--muted)] leading-relaxed">
                I am an AI/ML Engineer pursuing Master of Science degree from State University of New York, Buffalo. I specialize in generative
                artificial intelligence, data science, machine learning, big data and product development. I excel at developing data-driven
                solutions to real-world challenges and optimizing critical processes.
              </p>

              <p className="text-lg sm:text-xl text-[color:var(--muted)] leading-relaxed">
                I have worked across Energy & Utilities, Defense, and E-commerce in both private and public sector environments, delivering
                end-to-end analytics and machine learning solutions on large-scale datasets. I focus on practical, scalable systems data acquisition
                and cleaning, feature engineering, rigorous evaluation, and clear stakeholder communication that improve performance and
                decision-making. I’m also actively involved in academics, currently building healthcare focused research projects.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-[color:var(--text)] mb-6">Key Highlights</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Highlight color="bg-blue-500" label="AI/ML focused coursework" />
                <Highlight color="bg-emerald-500" label="Multi-Sector Experience" />
                <Highlight color="bg-sky-500" label="University research projects" />
                <Highlight color="bg-purple-500" label="International Experience" />
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-[color:var(--text)] mb-6">Global Experience</h3>
              <div className="flex flex-wrap gap-3">
                <Chip>United States</Chip>
                <Chip>India</Chip>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-[color:var(--text)] mb-6">Personal Interests</h3>
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
    <div className="flex items-center gap-3 rounded-xl border border-[color:var(--border)] bg-[color:var(--card)] p-4">
      <div className={`w-10 h-10 ${color} rounded-full flex items-center justify-center text-white`}>★</div>
      <span className="text-[color:var(--text)] font-medium">{label}</span>
    </div>
  );
}

function Interest({ emoji, label }) {
  return (
    <div className="flex items-center gap-2 p-3 bg-[color:var(--card)] rounded-xl border border-[color:var(--border)]">
      <span className="text-xl">{emoji}</span>
      <span className="text-sm font-medium text-[color:var(--text)]">{label}</span>
    </div>
  );
}
