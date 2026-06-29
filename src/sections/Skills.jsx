import React from "react";
import SectionHeader from "../components/SectionHeader";
import Reveal from "../components/Reveal";

function SkillChip({ children }) {
  return <span className="chip">{children}</span>;
}

function Group({ title, items }) {
  return (
    <div className="mt-6">
      <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--subtle)] mb-3">
        {title}
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((x) => (
          <SkillChip key={x}>{x}</SkillChip>
        ))}
      </div>
    </div>
  );
}

function CategoryCard({ id, title, capability, groups, accent }) {
  return (
    <div className="card relative p-8 lg:p-9 hover:-translate-y-1 transition-transform">
      <div className={`absolute top-8 right-8 grid h-10 w-10 place-items-center rounded-full ${accent} text-[12px] font-mono font-semibold`}>
        {id}
      </div>

      <div className="pr-14">
        <h3 className="font-display text-2xl sm:text-[26px] font-bold text-[color:var(--text)] leading-tight tracking-tight">
          {title}
        </h3>
        <p className="mt-4 text-[15px] text-[color:var(--muted)] leading-relaxed">{capability}</p>
      </div>

      <div className="mt-7 h-px bg-[color:var(--border)]" />

      {groups.map((g) => (
        <Group key={g.title} title={g.title} items={g.items} />
      ))}
    </div>
  );
}

export default function Skills() {
  const categories = [
    {
      id: "01",
      title: "Programming & Data Science",
      capability:
        "I build production-grade data pipelines and analytical models, from raw ingestion to evaluated documented output, using the standard Python data stack and adjacent languages.",
      accent: "bg-blue-500/10 text-blue-300 border border-blue-500/30",
      groups: [
        { title: "Languages", items: ["Python", "C/C++", "SQL", "JavaScript/TypeScript", "R", "Shell/Bash"] },
        {
          title: "Python Libraries",
          items: ["NumPy", "Pandas", "Matplotlib", "Seaborn", "scikit-learn", "TensorFlow", "PyTorch", "OpenCV", "BeautifulSoup", "Transformers", "NLTK", "statsmodels", "FastAPI"],
        },
        { title: "Analysis", items: ["EDA", "Feature Engineering", "Hyperparameter Tuning", "A/B Testing"] },
      ],
    },
    {
      id: "02",
      title: "Machine Learning, Deep Learning & GenAI",
      capability:
        "Designing and shipping models across classical ML, deep learning, and modern LLM workflows, with rigorous evaluation, monitoring, and tradeoff awareness around latency, cost, and quality.",
      accent: "bg-purple-500/10 text-purple-300 border border-purple-500/30",
      groups: [
        { title: "ML Techniques", items: ["Supervised/Unsupervised", "Classification", "Regression", "Ensembles", "Time-series", "Model Evaluation"] },
        { title: "Deep Learning", items: ["Neural Networks", "CNNs", "Transfer Learning", "Computer Vision"] },
        { title: "NLP & LLMs", items: ["LLMs", "RAG", "Fine-tuning", "Prompt Engineering", "Vector DBs", "Eval Metrics"] },
      ],
    },
    {
      id: "03",
      title: "Big Data, Cloud & MLOps",
      capability:
        "Scaling data processing and operationalizing ML: orchestrating pipelines, deploying models, and monitoring them across distributed systems and major cloud platforms.",
      accent: "bg-emerald-500/10 text-emerald-300 border border-emerald-500/30",
      groups: [
        { title: "Big Data", items: ["Hadoop", "Apache Spark"] },
        { title: "Data Engineering", items: ["Apache Kafka", "Apache Airflow", "ETL/ELT", "MongoDB", "Neo4j", "Redis", "ELK"] },
        { title: "MLOps", items: ["MLFlow", "Weights & Biases", "CI/CD", "GitHub Actions"] },
        { title: "DevOps", items: ["Docker", "Kubernetes"] },
        { title: "Cloud", items: ["AWS", "Azure", "GCP", "Databricks"] },
      ],
    },
    {
      id: "04",
      title: "Web Development & BI",
      capability:
        "Building user-facing analytics, from React-based dashboards and APIs to BI reports, closing the loop between models and the people who act on them.",
      accent: "bg-amber-500/10 text-amber-300 border border-amber-500/30",
      groups: [
        { title: "Web Frameworks", items: ["React", "Solid.js", "Node.js", "FastAPI"] },
        { title: "Frontend & Tools", items: ["TailwindCSS", "Figma", "Git", "GitHub", "GitLab"] },
        { title: "BI Tools", items: ["Power BI", "Tableau", "Qlik Sense"] },
      ],
    },
  ];

  return (
    <section id="skills" className="py-24 lg:py-32 bg-[color:var(--bg)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader
          index="05"
          label="capabilities"
          title="The toolkit: organized by what I can build, not by what I've clicked."
          subtitle="Skills grouped by capability with honest depth. No percentage bars, no decorative logo walls."
        />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {categories.map((c, i) => (
            <Reveal key={c.id} delay={Math.min(i, 3) * 0.08}>
              <CategoryCard {...c} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
