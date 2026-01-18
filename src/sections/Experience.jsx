import React from "react";

const PinIcon = (props) => (
  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" {...props}>
    <path
      fillRule="evenodd"
      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
      clipRule="evenodd"
    />
  </svg>
);

const CalendarIcon = (props) => (
  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" {...props}>
    <path
      fillRule="evenodd"
      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
      clipRule="evenodd"
    />
  </svg>
);

function TagChip({ children }) {
  return (
    <span
      className="
        px-3 py-1 rounded-full text-xs font-medium border transition
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

export default function Experience() {
  const roles = [
    {
      role: "Technical Associate",
      company: "Itron, Inc.",
      dates: "Aug 2023 – Aug 2025",
      logo: "/images/logos/itron.png",
      bullets: [
        "Co-led utility operations analytics and predictive modeling initiatives on large-scale operational datasets (70M+ records), delivering forecasting, risk classification, and standardized feature-ready datasets for repeatable analytics workflows.",
        "Built and evaluated regression and classification models, improving forecasting accuracy by 18% through feature engineering, validation, and tuning.",
        "Performed EDA and data-quality diagnostics to uncover operational risk patterns, cutting false positives by 30% and improving reliability of model-driven decisions.",
        "Documented results with statistical metrics and communicated insights to cross-functional stakeholders through decision-focused walkthroughs.",
      ],
      tags: [
        "Python",
        "SQL",
        "Forecasting",
        "Classification",
        "Feature Engineering",
        "Model Evaluation",
        "EDA",
        "Data Quality",
        "Utility Analytics",
      ],
    },
    {
      role: "Machine Learning Engineer",
      company: "Kyono Software Pvt. Ltd.",
      dates: "Jun 2022 – Jul 2023",
      logo: "/images/logos/kyono.png",
      bullets: [
        "Built scalable e-commerce data pipelines to process clickstream transaction events into feature ready tables, cutting data prep and refresh time by 60% and enabling daily KPI model updates.",
        "Developed customer intent, conversion prediction models with feature engineering and rigorous evaluation, improving AUC by 0.12 and increasing marketing targeting precision, reducing wasted outreach by 20%.",
        "Delivered funnel analytics and experimentation insights, identifying key drop offs and optimization levers that improved checkout conversion by 8% and increased AOV by 5%.",
      ],
      tags: [
        "ETL/Data Pipelines",
        "Clickstream Data",
        "Feature Engineering",
        "Conversion Rate Optimization",
        "Distributed Training",
        "Model Evaluation",
      ],
    },
    {
      role: "Data Science Intern - Air Force Defense Unit",
      company: "Bharat Electronics Limited",
      dates: "Sep 2021 – Oct 2021",
      logo: "/images/logos/bel.png",
      bullets: [
        "Developed predictive maintenance models with Python and Pandas, improving fault detection accuracy by 15%.",
        "Performed data cleaning, statistical analysis, and interpretation to support operational decision-making.",
        "Composed technical reports and delivered findings to engineering and defense teams, improving adoption of data solutions.",
      ],
      tags: [
        "Python",
        "Pandas",
        "Data Cleaning",
        "Cross-functional Collaboration",
        "Documentation",
        "Defense Systems",
      ],
    },
  ];

  return (
    <section id="experience" className="py-24 bg-[color:var(--bg)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-4xl sm:text-5xl font-bold text-[color:var(--text)] mb-4">
            Experience
          </h2>
          <p className="text-lg text-[color:var(--muted)] max-w-2xl mx-auto">
            Professional experience building analytics and machine learning systems
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {roles.map((r, idx) => (
            <div
              key={`${r.company}-${r.role}`}
              className={[
                "rounded-2xl bg-[color:var(--card)] border border-[color:var(--border)] shadow-lg shadow-black/10 p-7",
                "hover:shadow-xl transition-all duration-300 hover:-translate-y-1",
                roles.length % 2 === 1 && idx === roles.length - 1 ? "lg:col-span-2" : "",
              ].join(" ")}
            >
              <div className="flex items-start mb-5">
                <img
                  className="flex-shrink-0 w-12 h-12 object-contain mr-4"
                  src={r.logo}
                  alt={`${r.company} logo`}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />

                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-[color:var(--text)]">{r.role}</h3>
                  <h4 className="text-lg font-semibold text-[color:var(--muted)] mb-2">
                    {r.company}
                  </h4>

                  {r.location ? (
                    <div className="flex items-center text-[color:var(--muted)] text-sm mb-2">
                      <PinIcon />
                      {r.location}
                    </div>
                  ) : null}

                  {r.dates ? (
                    <div className="flex items-center text-[color:var(--muted)] text-sm">
                      <CalendarIcon />
                      {r.dates}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="mb-5 leading-relaxed">
                {r.bullets.map((b, i) => (
                  <div className="flex items-start mb-2" key={`${r.company}-${i}`}>
                    <span className="text-[color:var(--muted)] mr-2 mt-1 text-sm">•</span>
                    <span className="flex-1 text-[15px] text-[color:var(--text)]/90">{b}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {r.tags.map((t) => (
                  <TagChip key={t}>{t}</TagChip>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
