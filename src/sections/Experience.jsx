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
      role: "Graduate Research Assistant",
      company: "Research Foundation for SUNY",
      dates: "Jan 2026 – Present",
      logo: "",
      bullets: [
        "Investigate perception and planning architectures for autonomous vehicles using ROS2 and Autoware within physics-accurate digital twin simulation environments, contributing to real-world deployment research",
        "Develop real-time system integration modules in C++ on Linux, containerized via Docker; advancing multi-sensor fusion and autonomous control pipelines for next-generation AV stacks"
      ],
      tags: [
        "C++",
        "Linux",
        "Docker",
        "Sensors",
        "Lidar",
        "Feature Engineering",
        "Statistical Analysis of vehicle data",
        "Data Quality",
      ],
    },
    {
      role: "Technical Associate, Machine Learning & Data Systems",
      company: "Itron, Inc.",
      dates: "Aug 2023 – Aug 2025",
      logo: "/images/logos/itron.png",
      bullets: [
        "Architected production ML pipelines for energy and utility analytics, supporting 8–10M+ smart-meter and sensor records across operational and analytical workflows.",
        "Engineered regression, classification, and time-series models for load forecasting and anomaly detection, achieving 18–30% performance gains over statistical baselines",
        "Streamlined large-scale data processing via advanced feature engineering, reducing data noise by 25% and improving downstream model stability in production.",
        "Automated data ingestion, training, evaluation, and retraining workflows in Python, cutting manual analysis effort by 35% and accelerating experimentation cycles by 2×.",
        "Collaborated with MV-90xi MDM product managers, domain experts, and engineers to translate ambiguous operational requirements into scalable ML solutions supporting data-driven decisions achieving client satisfaction rating of 4.87/5 for over 2 years",
        "Implemented continuous model validation and monitoring strategies, maintaining >90% accuracy under evolving data distributions."
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
        "Delivered end-to-end ML solutions across 6–8 client projects in e-commerce, healthcare, and retail, owning full model lifecycle from data preparation to deployment.",
        "Developed customer intent, conversion prediction models with feature engineering and rigorous evaluation, improving AUC by 0.12 and increasing marketing targeting precision, reducing wasted outreach by 20%.",
        "Implemented recommendation and classification systems that improved personalization and operational insights by 10–20%.",
        "Built scalable preprocessing and feature engineering pipelines handling 100K–1M+ records from heterogeneous data sources.",
        "Integrated and optimized models in production systems with backend and frontend teams, reducing inference latency by 14% without sacrificing accuracy."
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
        "Supported defense analytics initiatives for Indian Air Force systems in a mission-critical, security-restricted environment,contributing to operational data analysis and reporting.",
        "Analyzed and visualized sensitive operational datasets, adhering to 100% security and documentation compliance while following high-reliability practices for accuracy, validation, and traceability.",
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
