import { useState } from "react";
import SectionHeader from "../components/SectionHeader";

export default function Education() {
  const [openPg, setOpenPg] = useState(false);
  const [openOnline, setOpenOnline] = useState(false);

  const schools = [
    {
      name: "University at Buffalo, SUNY",
      year: "2025 to 2026",
      degree: "MS, Computer Science & Engineering",
      track: "AI/ML Track",
      lines: [
        "School of Engineering and Applied Sciences (SEAS)",
        "Center for Computational Research (CCR)",
        "UB Hacking Club",
      ],
      logo: "/images/UBlogo.jpg",
      tag: "Current",
    },
    {
      name: "Visvesvaraya Technological University",
      year: "2018 to 2022",
      degree: "BE, Mechanical Engineering",
      track: "Robotics & Mechatronics",
      lines: [
        "Robotics, Mechatronics, and Machine Data Analysis",
        "Machine automation workshop coordinator",
        "Teaching Assistant",
      ],
      logo: "/images/vtulogo.jpg",
    },
    {
      name: "MES Pre-University College",
      year: "2016 to 2018",
      degree: "Pre-University (Science)",
      track: "PCM + Electronics",
      lines: [
        "Focused on Physics, Chemistry, Mathematics, and Electronics",
        "Inter-college level sports",
      ],
      logo: "/images/meslogo.png",
    },
  ];

  return (
    <section id="education" className="py-24 lg:py-32 bg-[color:var(--bg)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader
          index="02"
          label="education"
          title="A foundation built across engineering, computer science, and AI/ML."
          subtitle="Three institutions, two countries, one trajectory: from mechanical engineering to applied AI."
        />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {schools.map((s, i) => (
            <div
              key={s.name}
              className="card relative p-8 hover:-translate-y-1 transition-transform"
            >
              <div className="absolute top-8 right-8 font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--subtle)]">
                {String(i + 1).padStart(2, "0")}
              </div>

              <div className="flex items-start gap-4">
                <div className="h-14 w-14 shrink-0 rounded-xl bg-[color:var(--elevated)] border border-[color:var(--border)] overflow-hidden grid place-items-center">
                  <img src={s.logo} alt={`${s.name} logo`} className="h-full w-full object-cover" />
                </div>
                <div className="min-w-0 pr-8">
                  <div className="font-display text-xl font-semibold text-[color:var(--text)] leading-snug">
                    {s.name}
                  </div>
                  <div className="font-mono text-[12px] tracking-[0.14em] text-[color:var(--subtle)] mt-2.5">
                    {s.year}
                  </div>
                </div>
              </div>

              {s.tag ? (
                <div className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.18em] text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {s.tag}
                </div>
              ) : null}

              <div className="mt-6">
                <div className="text-lg font-semibold text-[color:var(--text)]">{s.degree}</div>
                <div className="mt-1.5 text-base text-[color:var(--muted)]">{s.track}</div>
              </div>

              <div className="mt-6 h-px bg-[color:var(--border)]" />

              <ul className="mt-6 space-y-3 text-[15px] text-[color:var(--muted)]">
                {s.lines.map((line) => (
                  <li key={line} className="flex items-start gap-3 leading-relaxed">
                    <span className="text-[color:var(--accent)] mt-2 inline-block h-1.5 w-1.5 rounded-full bg-current shrink-0" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="section-tag justify-center">
              <span>·</span>
              <span>/ continuing education</span>
            </div>
            <h3 className="mt-5 font-display text-3xl sm:text-4xl font-bold text-[color:var(--text)] tracking-tight">
              A lifelong learner committed to staying current.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start max-w-4xl mx-auto">
            <Collapsible
              open={openPg}
              onToggle={() => setOpenPg((v) => !v)}
              title="Postgraduate Certifications"
              n="01"
            >
              <Item>Data Science, Machine Learning, and Deep Learning with Python (180 hours)</Item>
              <Item>Python Full Stack Development (6 months)</Item>
              <Item>Big Data and Analytics (140 hours)</Item>
              <Item>C Programming Language (2 months)</Item>
            </Collapsible>

            <Collapsible
              open={openOnline}
              onToggle={() => setOpenOnline((v) => !v)}
              title="Online Courses"
              n="02"
            >
              <p className="text-[color:var(--muted)]">
                Coursework from Hugging Face, Datacamp, Coursera, edX, and IBM covering:
              </p>
              <Item>Generative AI, RAG, Vector Databases, LLMs, NLP</Item>
              <Item>Machine Learning, MLOps, Cloud Computing</Item>
              <Item>Deep Learning, Computer Vision, Image Processing</Item>
              <Item>Business Intelligence, Dashboarding, Data Visualization</Item>
              <Item>Financial Analytics, Time Series Analysis, Forecasting</Item>
            </Collapsible>
          </div>
        </div>
      </div>
    </section>
  );
}

function Collapsible({ open, onToggle, title, n, children }) {
  return (
    <div className="card p-7 text-left">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between text-[color:var(--text)]"
        aria-expanded={open}
      >
        <span className="flex items-center gap-3">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--subtle)]">
            {n}
          </span>
          <span className="text-lg font-semibold">{title}</span>
        </span>
        <span
          className={[
            "grid h-9 w-9 place-items-center rounded-full border border-[color:var(--border)] text-[color:var(--muted)] transition-transform duration-300",
            open ? "rotate-180" : "rotate-0",
          ].join(" ")}
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 9l6 6 6-6" />
          </svg>
        </span>
      </button>
      <div
        className={[
          "grid transition-[grid-template-rows] duration-300 ease-in-out",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        ].join(" ")}
      >
        <div className="overflow-hidden">
          <div className="mt-6 space-y-3 text-[15px] text-[color:var(--muted)]">{children}</div>
        </div>
      </div>
    </div>
  );
}

function Item({ children }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-2.5 inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--accent)] shrink-0" />
      <span className="leading-relaxed">{children}</span>
    </div>
  );
}
