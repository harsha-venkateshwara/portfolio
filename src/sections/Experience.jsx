import React, { useState } from "react";
import SectionHeader from "../components/SectionHeader";

function TagChip({ children }) {
  return (
    <span
      className="rounded-full border px-3 py-1.5 text-[12px] font-medium font-mono"
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

const roles = [
  {
    role: "AI Engineer Intern",
    company: "Commvault",
    logo: "/images/Commvault.png",
    dates: "May 2026 – Present",
    current: true,
    featured: true,
    summary:
      "Building RAG and Agentic AI pipelines for automated Summary of Findings generation from Alexandria and Dynamics 365 CRM data, cutting documentation drafting and generation cycles from days to seconds.",
    bullets: [
      "Engineered SOF-Forge, an agentic RAG pipeline using GPT-4.1, LangGraph, and Azure OpenAI, automating Summary of Findings generation from Dynamics 365 CRM data - cutting documentation time from 4 days to under 90 seconds.",
      "Architected a multi-agent system with PII/PHI sanitization guardrails, Cosmos DB persistence, and Azure Blob Storage delivery via FastAPI - achieving zero data leakage across 100% of validated outputs.",
      "Designed a dual-path LLM classification engine with prompt engineering and RAG across six parallel section generators, delivering audit-ready Word documents via SAS-authenticated APIs with latency under 30 seconds.",
    ],
    tags: ["GPT-4.1", "LangGraph", "Azure OpenAI", "RAG", "FastAPI", "Cosmos DB", "Multi-Agent", "Prompt Engineering"],
    metrics: [
      { value: "4d → 90s", label: "Documentation time" },
      { value: "0", label: "Data leakage events" },
      { value: "< 30s", label: "Section latency" },
    ],
  },
  {
    role: "Graduate Research Assistant",
    company: "Research Foundation for SUNY",
    logo: "/images/SUNY Research Foundation.jpeg",
    dates: "Jan 2026 – Present",
    location: "Buffalo, NY",
    current: true,
    summary:
      "Investigating perception and planning architectures for autonomous vehicles in physics-accurate digital twin environments.",
    bullets: [
      "Investigating perception and planning architectures for autonomous vehicles using ROS2 and Autoware within physics-accurate digital twin simulation environments, contributing to real-world deployment research.",
      "Developing real-time system integration modules in C++ on Linux, containerized via Docker; advancing multi-sensor fusion and autonomous control pipelines for next-generation AV stacks.",
      "Designing feature engineering pipelines for raw vehicle telemetry and sensor streams, transforming high-frequency spatial data into structured inputs for downstream perception and behavior-prediction models.",
      "Architecting modular ROS2 node interfaces bridging Autoware's planning stack with digital twin simulation, reducing hardware-in-the-loop testing overhead and enabling rapid iteration on autonomous control algorithms.",
    ],
    tags: ["C++", "Linux", "Docker", "ROS2", "Autoware", "Lidar", "Sensor Fusion", "Feature Engineering"],
  },
  {
    role: "Technical Associate, Machine Learning & Data Systems",
    company: "Itron, Inc.",
    logo: "/images/Itron.jpeg",
    dates: "Aug 2023 – Aug 2025",
    location: "Bengaluru, India",
    summary:
      "Architected production ML pipelines for energy and utility analytics across MV-90xi meter data management system.",
    bullets: [
      "Architected production ML pipelines for energy and utility analytics for MV-90xi meter data management application, supporting 8 to 10M+ smart-meter and sensor records across operational and analytical workflows.",
      "Engineered regression, classification, and time-series models for load forecasting and anomaly detection, achieving 18 to 30% performance gains over statistical baselines.",
      "Streamlined large-scale data processing via advanced feature engineering, reducing data noise by 25% and improving downstream model stability in production.",
      "Automated data ingestion, training, evaluation, and retraining workflows in Python, cutting manual analysis effort by 35% and accelerating experimentation cycles by 2×.",
      "Collaborated with MV-90xi MDM product managers, domain experts, and engineers to translate ambiguous operational requirements into scalable ML solutions, sustaining a client satisfaction rating of 4.92/5 over two years.",
      "Implemented continuous model validation and monitoring strategies, maintaining > 90% accuracy under evolving data distributions.",
    ],
    tags: ["Python", "SQL", "Forecasting", "Classification", "Feature Engineering", "EDA", "Utility Analytics"],
    metrics: [
      { value: "8M+", label: "Records modeled" },
      { value: "30%", label: "Gain vs baseline" },
      { value: "4.92/5", label: "Client rating" },
    ],
  },
  {
    role: "Machine Learning Engineer",
    company: "Kyono Software Pvt. Ltd.",
    logo: "/images/Kyono.jpeg",
    dates: "Jun 2022 – Jul 2023",
    location: "Bengaluru, India",
    summary:
      "Delivered end-to-end ML solutions across e-commerce, healthcare, and retail, full lifecycle from data prep to deployment.",
    bullets: [
      "Delivered end-to-end ML solutions across 6 to 8 client projects in e-commerce, healthcare, and retail, owning the full model lifecycle from data preparation to deployment.",
      "Developed customer intent and conversion prediction models with feature engineering and rigorous evaluation, improving AUC by 0.12 and reducing wasted marketing outreach by 20%.",
      "Implemented recommendation and classification systems that improved personalization and operational insights by 10 to 20%.",
      "Built scalable preprocessing and feature engineering pipelines handling 100K to 1M+ records from heterogeneous data sources.",
      "Integrated and optimized models in production systems with backend and frontend teams, reducing inference latency by 14% without sacrificing accuracy.",
    ],
    tags: ["ETL", "Clickstream", "Feature Engineering", "Conversion Optimization", "Distributed Training", "Model Eval"],
    metrics: [
      { value: "+0.12", label: "AUC lift" },
      { value: "−14%", label: "Inference latency" },
      { value: "6 to 8", label: "Client projects" },
    ],
  },
  {
    role: "Data Science Intern, Air Force Defense Unit",
    company: "Bharat Electronics Limited",
    logo: "/images/BEL.jpeg",
    dates: "Sep 2021 – Oct 2021",
    location: "Bengaluru, India",
    summary:
      "Defense analytics for Indian Air Force systems in a mission-critical, security-restricted environment.",
    bullets: [
      "Supported defense analytics initiatives for Indian Air Force systems in a mission-critical, security-restricted environment, contributing to operational data analysis and reporting.",
      "Analyzed and visualized sensitive operational datasets, adhering to 100% security and documentation compliance while following high-reliability practices for accuracy, validation, and traceability.",
    ],
    tags: ["Python", "Pandas", "Data Cleaning", "Defense Systems", "Documentation"],
  },
];

function RoleCard({ r }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="card group relative h-full flex flex-col p-8 lg:p-10 hover:-translate-y-1 transition-transform">
      <header className="flex items-start gap-5">
        {r.logo ? (
          <div className="shrink-0">
            <div className="h-16 w-16 sm:h-[72px] sm:w-[72px] rounded-2xl bg-white ring-1 ring-[color:var(--border)] shadow-sm overflow-hidden flex items-center justify-center p-2 transition-transform duration-300 group-hover:scale-105">
              <img
                src={r.logo}
                alt={`${r.company} logo`}
                loading="lazy"
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </div>
        ) : null}

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2.5 flex-wrap mb-3">
            <span className="font-mono text-[12px] uppercase tracking-[0.18em] text-[color:var(--subtle)]">
              {r.dates}
            </span>
            {r.location ? (
              <>
                <span className="text-[color:var(--subtle)]">·</span>
                <span className="font-mono text-[12px] uppercase tracking-[0.18em] text-[color:var(--subtle)]">
                  {r.location}
                </span>
              </>
            ) : null}
            {r.featured ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 text-[11px] font-mono uppercase tracking-[0.18em] text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Current
              </span>
            ) : null}
          </div>

          <h3 className="font-display text-2xl sm:text-[28px] font-bold text-[color:var(--text)] leading-tight">
            {r.role}
          </h3>
          <div className="mt-2 text-base font-medium text-[color:var(--muted)]">{r.company}</div>
        </div>
      </header>

      <p className="mt-6 text-[17px] text-[color:var(--text)]/85 leading-relaxed">{r.summary}</p>

      {r.metrics ? (
        <div className="mt-6 grid grid-cols-3 gap-3">
          {r.metrics.map((m) => (
            <div
              key={m.label}
              className="rounded-xl border border-[color:var(--border)] bg-[color:var(--elevated)] p-4"
            >
              <div className="font-display text-[26px] sm:text-[30px] font-bold text-[color:var(--text)] leading-none">
                {m.value}
              </div>
              <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--subtle)]">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      ) : null}

      <div className="mt-6 flex flex-wrap gap-2">
        {r.tags.map((t) => (
          <TagChip key={t}>{t}</TagChip>
        ))}
      </div>

      <div className="mt-auto">
        <div
          className={[
            "grid transition-[grid-template-rows] duration-300 ease-in-out",
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
          ].join(" ")}
        >
          <div className="overflow-hidden">
            <div className="mt-6 pt-6 border-t border-[color:var(--border)] space-y-3">
              {r.bullets.map((b, i) => (
                <div className="flex items-start gap-3" key={i}>
                  <span className="text-[color:var(--accent)] mt-2.5 inline-block h-1.5 w-1.5 rounded-full bg-current shrink-0" />
                  <span className="text-[15px] text-[color:var(--muted)] leading-relaxed">{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[color:var(--muted)] hover:text-[color:var(--text)] transition"
          aria-expanded={open}
        >
          {open ? "Show less" : "Read full details"}
          <svg
            className={["w-3.5 h-3.5 transition-transform", open ? "rotate-180" : ""].join(" ")}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 9l6 6 6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="py-24 lg:py-32 bg-[color:var(--bg)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader
          index="03"
          label="experience"
          title="From defense analytics to agentic AI. Production ML across sectors."
          subtitle="Five roles, four industries, one consistent thread: turning ambiguous data problems into measurable outcomes."
        />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {roles.map((r) => (
            <div
              key={`${r.company}-${r.role}`}
              className={r.featured ? "lg:col-span-2" : ""}
            >
              <RoleCard r={r} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
