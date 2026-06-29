import SectionHeader from "../components/SectionHeader";
import Reveal from "../components/Reveal";

/**
 * Real projects sourced from ~/Desktop/myprojects.
 * Update `repo` / `demo` URLs when the public links are confirmed.
 */
const projects = [
  {
    id: "01",
    title: "Storm Restoration AI: Hurricane Outage Forecasting & GridGuard",
    tagline:
      "Deep-learning county-level outage forecasts 24h ahead, paired with a graph-traversal critical-facility alert engine for utility crew dispatch.",
    type: "Deep Learning · Geospatial",
    status: "Research",
    spotlight: true,
    situation:
      "U.S. utilities still stage storm crews through spreadsheets and phone calls. Outage records, weather, grid topology, and critical-facility data live in silos. No single system links them for pre-storm dispatch.",
    action:
      "Built a two-system ensemble. (1) Multi-task LSTM (258K params) on 17.8M balanced sequences, 2015 to 2020, using Focal Loss for classification + Pinball Loss for P50/P90 uncertainty, plus a Gradient Boosting baseline on 28 engineered features (storm flags, lag structures, county fragility index). (2) GridGuard: a NetworkX graph of the Long Island grid (50 substations, 90 edges) with k-hop BFS from at-risk substations to hospitals and fire stations.",
    metrics: [
      { value: "0.91", label: "ROC-AUC (held-out 2022)" },
      { value: "#1", label: "Lee County rank pre-Ian" },
      { value: "< 2s", label: "20/20 Sandy substations" },
    ],
    impact:
      "Model ranked Lee County, FL as the #1 outage-risk county pre-Hurricane Ian. Ian made direct landfall there on Sep 28, 2022. GridGuard detected 20/20 substations in the Sandy impact zone in under 2s, producing 29 prioritized alerts (14 critical hospitals, 15 fire stations).",
    tech: [
      "PyTorch",
      "XGBoost",
      "NetworkX",
      "GeoPandas",
      "Streamlit",
      "Plotly",
      "OSMnx",
      "NOAA API",
      "Parquet",
    ],
    skills: [
      "Spatiotemporal DL",
      "Focal & quantile loss",
      "Graph algorithms",
      "Geospatial",
      "MLOps",
    ],
    repo: "https://github.com/harsha-venkateshwara/storm_restoration_ai",
    demo: null,
    accent: "from-blue-500/25 via-indigo-500/10 to-transparent",
  },
  {
    id: "02",
    title: "Large-Scale eCommerce Behavior Analytics",
    tagline:
      "Distributed PySpark pipeline processing 67.5M user events to predict conversion, segment products, and forecast sales.",
    type: "Distributed ML",
    status: "Research",
    situation:
      "eCommerce platforms generate massive event logs but lack scalable pipelines to extract actionable insight on conversion, segmentation, and demand.",
    action:
      "Two-phase build. Phase I: local EDA on sampled Pandas data. Phase II: distributed Spark MLlib on the full 67.5M events. Engineered session-level features (event counts, unique products, average price), then trained Random Forest, Logistic Regression, and Gradient Boosted Trees for conversion; K-Means for product segmentation; Random Forest Regression for sales forecasting.",
    metrics: [
      { value: "0.986", label: "Conversion accuracy" },
      { value: "0.85", label: "Cluster silhouette" },
      { value: "67.5M", label: "Events processed" },
    ],
    impact:
      "Conversion model hit 0.9858 accuracy, 0.9770 F1, and ≈0.98 ROC-AUC; product clusters reached 0.85 silhouette; forecasting RMSE 663.74 / MAE 296.58. All validated at full scale via chunked ingestion.",
    tech: [
      "PySpark",
      "Spark MLlib",
      "Spark SQL",
      "Scikit-learn",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Seaborn",
    ],
    skills: [
      "Distributed ML",
      "Feature engineering at scale",
      "Ensemble methods",
      "Unsupervised learning",
    ],
    repo: "https://github.com/harsha-venkateshwara/large-scale-ecommerce-behavior-analytics",
    demo: null,
    accent: "from-emerald-500/25 via-emerald-500/10 to-transparent",
  },
  {
    id: "03",
    title: "AEGIS: AI Support Automation Engine",
    tagline:
      "Production-grade Streamlit platform that automates support email triage, KB-grounded chat, ticket routing, and SLA tracking.",
    type: "GenAI · RAG",
    status: "Production",
    situation:
      "Enterprise support teams burn hours on routine emails and redundant FAQs. Off-the-shelf vendor stacks are expensive and rigid; in-house chatbots rarely cover the full workflow from inbox to ticket to KB gap detection.",
    action:
      "Built a 2,600+ line Streamlit app with seven pages: Dashboard, RAG Chatbot, Ticket Inbox, Email Automation Hub, Analytics, KB Admin, Settings. Designed a 5-layer intent router (greetings → hard escalation → 12 regex rules → FAISS similarity → Groq LLM) on Llama 3.3 70B with HuggingFace embeddings + FAISS for retrieval, SQLite for the operational store, and live IMAP/SMTP Gmail integration. Includes a production upgrade path via docker-compose (FastAPI + PostgreSQL + Redis).",
    metrics: [
      { value: "12", label: "Intents routed" },
      { value: "< 500ms", label: "Inference / query" },
      { value: "2.6k", label: "Lines of production code" },
    ],
    impact:
      "Streaming RAG responses with source attribution, automatic triage from real Gmail traffic, SLA tiering (P1 4h → P4 168h), and a confidence-gated escalation path (FAISS L2 < 0.35 → human).",
    tech: [
      "Streamlit",
      "Groq Llama 3.3 70B",
      "FAISS",
      "Transformers",
      "SQLite",
      "FastAPI",
      "PostgreSQL",
      "Gmail API",
      "Plotly",
    ],
    skills: [
      "LLM integration",
      "RAG architecture",
      "Vector search",
      "Email automation",
      "Production Streamlit",
    ],
    repo: "https://github.com/harsha-venkateshwara/project-aegis",
    demo: null,
    accent: "from-purple-500/25 via-fuchsia-500/10 to-transparent",
  },
  {
    id: "04",
    title: "TVLift: Causal TV Attribution & Bayesian MMM",
    tagline:
      "Geo-lift experimentation plus Bayesian media-mix modeling to quantify true incremental TV ROAS with uncertainty bounds.",
    type: "Causal Inference · Analytics",
    status: "Production",
    situation:
      "TV attribution is broken. You can't click a TV ad, and traditional models credit channels in proportion to spend, not causation. Production ad-tech teams solve this with geo-lift; most brands cannot.",
    action:
      "Built an 8-page Streamlit dashboard: KPI overview, adstock + Hill-saturation fitting via scipy L-BFGS-B, naive vs OLS vs XGBoost+SHAP attribution, geo-lift with 1,000-iteration bootstrap CIs, pre-experiment power analysis, PyMC Bayesian MMM with HDI bands, daypart heatmaps, and a budget optimizer over $10K to $500K. Validated on Meta Robyn's 4-year weekly dataset.",
    metrics: [
      { value: "56.3%", label: "TV geo-lift (95% CI)" },
      { value: "0.97", label: "Daypart model R²" },
      { value: "19%", label: "XGBoost CV MAPE" },
    ],
    impact:
      "Quantified TV lift at 56.3% (CI 32.9% to 82.1%), surfaced Saturday primetime at 2.8× ROAS, and produced 3 to 8% revenue uplift over equal-split allocation, with full Bayesian uncertainty around every channel.",
    tech: [
      "PyMC 5",
      "XGBoost",
      "Streamlit",
      "scipy",
      "SHAP",
      "Plotly",
      "Pandas",
      "NumPy",
    ],
    skills: [
      "Causal inference",
      "Geo-lift",
      "Bayesian modeling",
      "Adstock / saturation",
      "Budget optimization",
    ],
    repo: "https://github.com/harsha-venkateshwara/SpotLift",
    demo: null,
    accent: "from-amber-500/25 via-orange-500/10 to-transparent",
  },
  {
    id: "05",
    title: "Lithostream Sentinel: Industrial Telemetry Platform",
    tagline:
      "Real-time observability stack for high-frequency machine telemetry: schema-validated ingest, time-series storage, and live dashboards.",
    type: "Data Engineering · Observability",
    status: "Prototype",
    situation:
      "Industrial systems (semiconductor, manufacturing) emit continuous telemetry such as temperature, latency, and error rates, but rarely have unified real-time visibility or early-failure indicators in one place.",
    action:
      "Engineered a full-stack platform: FastAPI service for schema-validated ingest, InfluxDB for time-series storage, Prometheus for system metrics, and Grafana for unified dashboards. Wired together with Docker Compose and a machine-data simulator for repeatable load testing.",
    metrics: [
      { value: "4", label: "Stack components" },
      { value: "Live", label: "Grafana dashboards" },
      { value: "Docker", label: "One-command boot" },
    ],
    impact:
      "Real-time ingestion with threshold-based alerting and live Grafana dashboards across both system and machine signals: a portable reference architecture for industrial observability.",
    tech: [
      "FastAPI",
      "InfluxDB",
      "Prometheus",
      "Grafana",
      "Docker Compose",
      "Python",
    ],
    skills: [
      "Streaming ingest",
      "Time-series DBs",
      "Observability",
      "Containerization",
      "System design",
    ],
    repo: "https://github.com/harsha-venkateshwara/lithostream-sentinel-platform",
    demo: null,
    accent: "from-cyan-500/25 via-sky-500/10 to-transparent",
  },
  {
    id: "06",
    title: "OCTMNIST Medical Imaging: Custom CNN",
    tagline:
      "From-scratch convolutional network for four-class ophthalmic disease classification on retinal OCT scans.",
    type: "Computer Vision · Healthcare",
    status: "Research",
    situation:
      "Ophthalmic OCT datasets are class-imbalanced and noisy. Off-the-shelf models underperform, and pretrained shortcuts hide the fundamentals.",
    action:
      "Implemented two CNNs from scratch. Base: 3 conv blocks + max-pool + dropout. Improved: 4 conv blocks with batch normalization, WeightedRandomSampler for class imbalance, and early stopping. Trained on 97.5K images across 4 classes (CNV, DME, drusen, normal).",
    metrics: [
      { value: "82%", label: "Best val accuracy" },
      { value: "97.5K", label: "Training images" },
      { value: "4", label: "Disease classes" },
    ],
    impact:
      "Base model reached 75.4% test accuracy / 0.7501 F1; the improved architecture pushed best validation accuracy to 0.8191 before early stopping, entirely with a custom-built network.",
    tech: ["PyTorch", "CUDA", "MedMNIST", "Scikit-learn", "Matplotlib", "NumPy"],
    skills: [
      "CNN architecture",
      "Class-imbalance handling",
      "Regularization",
      "Medical imaging",
    ],
    repo: "https://github.com/harsha-venkateshwara/dl1",
    demo: null,
    accent: "from-rose-500/25 via-pink-500/10 to-transparent",
  },
];

function ExternalIcon() {
  return (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M14 5h5v5M9 15L19 5M19 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6"
      />
    </svg>
  );
}

function GhIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function TechChip({ children }) {
  return <span className="chip chip--ghost">{children}</span>;
}

function SkillChip({ children }) {
  return <span className="chip">{children}</span>;
}

function StatusBadge({ status }) {
  const map = {
    Production: {
      cls: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
      dot: "bg-emerald-400",
      pulse: true,
    },
    Research: {
      cls: "bg-blue-500/10 border-blue-500/30 text-blue-300",
      dot: "bg-blue-400",
    },
    Prototype: {
      cls: "bg-amber-500/10 border-amber-500/30 text-amber-300",
      dot: "bg-amber-400",
    },
  };
  const s = map[status] || map.Research;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-mono uppercase tracking-[0.16em] ${s.cls}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${s.dot} ${s.pulse ? "animate-pulse" : ""}`}
      />
      {status}
    </span>
  );
}

function MetricTile({ metric }) {
  return (
    <div className="rounded-xl border border-[color:var(--border)] bg-[color:var(--elevated)] px-4 py-3.5">
      <div className="font-display text-[26px] font-bold text-[color:var(--text)] leading-none">
        {metric.value}
      </div>
      <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[color:var(--subtle)] leading-tight">
        {metric.label}
      </div>
    </div>
  );
}

function ProjectLinks({ p }) {
  return (
    <div className="flex flex-wrap gap-2">
      {p.demo ? (
        <a
          href={p.demo}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--border-strong)] px-4 py-2 text-sm font-semibold text-[color:var(--text)] hover:bg-[color:var(--raised)] transition"
        >
          Live demo <ExternalIcon />
        </a>
      ) : null}
      {p.repo ? (
        <a
          href={p.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--border-strong)] px-4 py-2 text-sm font-semibold text-[color:var(--text)] hover:bg-[color:var(--raised)] transition"
        >
          <GhIcon /> Source
        </a>
      ) : null}
    </div>
  );
}

function FeaturedCard({ p }) {
  return (
    <div className="card group relative overflow-hidden p-8 lg:p-10 hover:-translate-y-1 transition-transform">
      <div
        className={`pointer-events-none absolute -inset-px bg-gradient-to-br ${p.accent} opacity-60`}
      />
      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-7">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="font-mono text-[12px] uppercase tracking-[0.18em] text-[color:var(--subtle)]">
              {p.id} / featured
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[color:var(--accent-soft)] border border-[color:var(--chip-border)] px-2.5 py-1 text-[11px] font-mono uppercase tracking-[0.16em] text-[color:var(--chip-text)]">
              spotlight
            </span>
            <StatusBadge status={p.status} />
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--muted)]">
              {p.type}
            </span>
          </div>

          <h3 className="font-display text-h3 font-bold text-[color:var(--text)]">
            {p.title}
          </h3>
          <p className="mt-4 text-lead text-[color:var(--muted)]">
            {p.tagline}
          </p>

          <div className="mt-7 space-y-5">
            <Section label="Context">{p.situation}</Section>
            <Section label="Approach">{p.action}</Section>
            <Section label="Impact">{p.impact}</Section>
          </div>

          <div className="mt-7">
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--subtle)] mb-2.5">
              Skills demonstrated
            </div>
            <div className="flex flex-wrap gap-2">
              {p.skills.map((s) => (
                <SkillChip key={s}>{s}</SkillChip>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--subtle)] mb-2.5">
              Tech stack
            </div>
            <div className="flex flex-wrap gap-2">
              {p.tech.map((t) => (
                <TechChip key={t}>{t}</TechChip>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <ProjectLinks p={p} />
          </div>
        </div>

        <div className="lg:col-span-5 lg:sticky lg:top-28">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--subtle)] mb-3">
            Headline results
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3">
            {p.metrics.map((m) => (
              <MetricTile key={m.label} metric={m} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ p }) {
  return (
    <div className="card group relative overflow-hidden p-8 hover:-translate-y-1 transition-transform">
      <div
        className={`pointer-events-none absolute -inset-px bg-gradient-to-br ${p.accent} opacity-40 group-hover:opacity-70 transition-opacity`}
      />
      <div className="relative">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-mono text-[12px] uppercase tracking-[0.18em] text-[color:var(--subtle)]">
              {p.id} / project
            </span>
            <StatusBadge status={p.status} />
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--muted)]">
            {p.type}
          </span>
        </div>

        <h3 className="font-display text-2xl sm:text-[26px] font-bold text-[color:var(--text)] leading-tight tracking-tight">
          {p.title}
        </h3>
        <p className="mt-3 text-base text-[color:var(--muted)] leading-relaxed">
          {p.tagline}
        </p>

        <div className="mt-6 space-y-4">
          <Section label="Context">{p.situation}</Section>
          <Section label="Approach">{p.action}</Section>
          <Section label="Impact">{p.impact}</Section>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-2.5">
          {p.metrics.map((m) => (
            <MetricTile key={m.label} metric={m} />
          ))}
        </div>

        <div className="mt-6">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--subtle)] mb-2.5">
            Tech stack
          </div>
          <div className="flex flex-wrap gap-2">
            {p.tech.map((t) => (
              <TechChip key={t}>{t}</TechChip>
            ))}
          </div>
        </div>

        <div className="mt-7 pt-6 border-t border-[color:var(--border)]">
          <ProjectLinks p={p} />
        </div>
      </div>
    </div>
  );
}

function Section({ label, children }) {
  return (
    <div>
      <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--subtle)] mb-1.5">
        {label}
      </div>
      <p className="text-[15px] text-[color:var(--text)]/85 leading-relaxed">{children}</p>
    </div>
  );
}

export default function Projects() {
  const [featured, ...rest] = projects;

  return (
    <section id="projects" className="py-24 lg:py-32 bg-[color:var(--bg)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <SectionHeader
            index="04"
            label="projects"
            title="Selected work: shipped, measured, documented."
            subtitle="A curated set of projects spanning deep learning, distributed ML, GenAI, causal inference, and full-stack data systems. Each one ships with the problem, the approach, and the measured outcome."
          />
          <a
            href="https://github.com/harsha-venkateshwara?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary self-start sm:self-end shrink-0"
          >
            All projects on GitHub
            <ExternalIcon />
          </a>
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Reveal className="lg:col-span-2">
            <FeaturedCard p={featured} />
          </Reveal>
          {rest.map((p, i) => (
            <Reveal key={p.id} delay={Math.min(i, 3) * 0.08}>
              <ProjectCard p={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
