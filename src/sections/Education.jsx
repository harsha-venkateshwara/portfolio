import { useState } from "react";

export default function Education() {
  const [openPg, setOpenPg] = useState(false);
  const [openOnline, setOpenOnline] = useState(false);

  const schools = [
    {
      name: "University at Buffalo (SUNY)",
      year: "2025 – 2026",
      degree: "MS, Computer Science & Engineering (AI/ML Track)",
      lines: [
        "School of Engineering and Applied Sciences (SEAS)",
        "Center for Computational Research (CCR)",
        "UB Hacking Club",
      ],
      logo: "/images/UBlogo.jpg",
    },
    {
      name: "Visvesvaraya Technological University",
      year: "2018 – 2022",
      degree: "BE, Mechanical Engineering",
      lines: [
        "Robotics, Mechatronics, and Machine Data Analysis",
        "Machine automation workshop coordinator",
        "Teaching Assistant",
      ],
      logo: "/images/vtulogo.jpg",
    },
    {
      name: "MES Pre-University College",
      year: "2016 – 2018",
      degree: "Pre-University (Science)",
      lines: [
        "Focused on Physics, Chemistry, Mathematics, and Electronics",
        "Inter-college level sports",
      ],
      logo: "/images/meslogo.png",
    },
  ];

  return (
    <section id="education" className="py-24 bg-[color:var(--bg)]">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-4xl sm:text-5xl font-bold text-[color:var(--text)] mb-4">
            Education
          </h2>
          <p className="text-lg text-[color:var(--muted)] max-w-2xl mx-auto">
            Formal academic foundation in data science, engineering, and AI/ML
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {schools.map((s) => (
            <div
              key={s.name}
              className={[
                "w-full rounded-2xl bg-[color:var(--card)] border border-[color:var(--border)] shadow-lg shadow-black/10 p-8",
                "transition-all duration-300 ease-out",
                "hover:-translate-y-2 hover:shadow-xl",
              ].join(" ")}
            >
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full bg-[color:var(--card)] border border-[color:var(--border)] overflow-hidden grid place-items-center">
                  <img
                    src={s.logo}
                    alt={`${s.name} logo`}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="min-w-0">
                  <div className="text-lg font-semibold text-[color:var(--text)] leading-snug">
                    {s.name}
                  </div>
                  <div className="text-sm text-[color:var(--muted)] mt-1">
                    {s.year}
                  </div>
                </div>
              </div>

              <div className="mt-5 text-[color:var(--text)] font-semibold">
                {s.degree}
              </div>

              <ul className="mt-4 space-y-2 text-sm text-[color:var(--muted)]">
                {s.lines.map((line) => (
                  <li key={line} className="leading-relaxed">
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold text-[color:var(--text)]">
            Continuing Education
          </h3>
          <p className="mt-3 text-[color:var(--muted)]">
            A lifelong learner committed to staying current with modern AI and data systems
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="rounded-2xl bg-[color:var(--card)] border border-[color:var(--border)] p-6 text-left">
              <button
                type="button"
                onClick={() => setOpenPg((v) => !v)}
                className="w-full flex items-center justify-between text-[color:var(--text)] font-semibold"
                aria-expanded={openPg}
                aria-controls="pg-panel"
              >
                <span>Postgraduate Certifications</span>
                <span
                  className={[
                    "text-[color:var(--muted)] transition-transform duration-200",
                    openPg ? "rotate-180" : "rotate-0",
                  ].join(" ")}
                >
                  ⌄
                </span>
              </button>

              <div
                id="pg-panel"
                className={[
                  "grid transition-[grid-template-rows] duration-300 ease-in-out",
                  openPg ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                ].join(" ")}
              >
                <div className="overflow-hidden">
                  <div className="mt-4 text-sm text-[color:var(--muted)] space-y-2">
                    <p>• Data Science, Machine Learning and Deep Learning with Python — 180 hours</p>
                    <p>• Python Full Stack Development — 6 months</p>
                    <p>• Big Data and Analytics — 140 hours</p>
                    <p>• C Programming Language — 2 months</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-[color:var(--card)] border border-[color:var(--border)] p-6 text-left">
              <button
                type="button"
                onClick={() => setOpenOnline((v) => !v)}
                className="w-full flex items-center justify-between text-[color:var(--text)] font-semibold"
                aria-expanded={openOnline}
                aria-controls="online-panel"
              >
                <span>Online Courses</span>
                <span
                  className={[
                    "text-[color:var(--muted)] transition-transform duration-200",
                    openOnline ? "rotate-180" : "rotate-0",
                  ].join(" ")}
                >
                  ⌄
                </span>
              </button>

              <div
                id="online-panel"
                className={[
                  "grid transition-[grid-template-rows] duration-300 ease-in-out",
                  openOnline ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                ].join(" ")}
              >
                <div className="overflow-hidden">
                  <div className="mt-4 text-sm text-[color:var(--muted)] space-y-3">
                    <p className="text-[color:var(--muted)]">
                      Courses from platforms including Hugging Face, Datacamp, Coursera,
                      edX, and IBM, covering topics such as:
                    </p>

                    <div className="space-y-2">
                      <p>• Generative AI, RAG, Vector Databases, LLMs, NLP</p>
                      <p>• Machine Learning, MLOps, Cloud Computing</p>
                      <p>• Deep Learning, Computer Vision, Image Processing</p>
                      <p>• Business Intelligence, Dashboarding, Data Visualization</p>
                      <p>• Financial Analytics, Time Series Analysis, Forecasting</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
