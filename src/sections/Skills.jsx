import React from "react";

function SkillChip({ children }) {
  return (
    <span
      style={{
        background: "var(--chip-bg)",
        borderColor: "var(--chip-border)",
        color: "var(--chip-text)",
      }}
      className="rounded-full border px-3 py-1 text-xs font-medium transition"
      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--chip-bg-hover)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "var(--chip-bg)")}
    >
      {children}
    </span>
  );
}


function Group({ title, items }) {
  return (
    <div className="mt-5">
      <div className="text-sm font-semibold text-[color:var(--text)]/90">
        {title}
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        {items.map((x) => (
          <SkillChip key={x}>{x}</SkillChip>
        ))}
      </div>
    </div>
  );
}

function CategoryCard({ title, subtitle, groups }) {
  return (
    <div
      className={[
        "rounded-2xl bg-[color:var(--card)] border border-[color:var(--border)] shadow-lg shadow-black/10",
        "p-7 transition-all duration-300 ease-out",
        "hover:-translate-y-2 hover:shadow-xl hover:shadow-black/15",
      ].join(" ")}
    >
      <div className="mb-2">
        <h3 className="text-lg sm:text-xl font-semibold text-[color:var(--text)]">
          {title}
        </h3>
        {subtitle ? (
          <p className="mt-1 text-sm text-[color:var(--muted)] leading-relaxed">
            {subtitle}
          </p>
        ) : null}
      </div>

      {groups.map((g) => (
        <Group key={g.title} title={g.title} items={g.items} />
      ))}
    </div>
  );
}

export default function Skills() {
  const categories = [
    {
      title: "Programming & Data Science Foundations",
      subtitle:
        "Core languages and libraries used for data analysis, modeling, and building production-ready systems.",
      groups: [
        {
          title: "Languages",
          items: ["Python", "C/C++", "SQL", "JavaScript/TypeScript", "R", "Shell/Bash"],
        },
        {
          title: "Python Libraries",
          items: [
            "NumPy",
            "Pandas",
            "Matplotlib",
            "Seaborn",
            "scikit-learn",
            "TensorFlow",
            "PyTorch",
            "OpenCV",
            "BeautifulSoup",
            "Transformers",
            "NLTK",
            "statsmodels",
            "FastAPI",
          ],
        },
        {
          title: "Data Analysis",
          items: ["EDA", "Feature Engineering", "Hyperparameter Tuning", "A/B Testing"],
        },
      ],
    },
    {
      title: "Machine Learning, Deep Learning & Generative AI",
      subtitle:
        "Model development across classical ML, deep learning, and modern LLM workflows.",
      groups: [
        {
          title: "ML Techniques",
          items: [
            "Supervised/Unsupervised learning",
            "Classification",
            "Regression",
            "Ensemble methods",
            "Time series modelling",
            "Model Evaluation & Interpretability",
          ],
        },
        {
          title: "Deep Learning",
          items: ["Neural Networks", "CNNs", "Transfer Learning", "Computer Vision"],
        },
        {
          title: "NLP & LLMs",
          items: [
            "LLMs",
            "RAG",
            "Fine-tuning",
            "Prompt Engineering",
            "Vector DBs",
            "Evaluation Metrics",
          ],
        },
      ],
    },
    {
      title: "Big Data, Cloud & MLOps",
      subtitle:
        "Scalable data processing, orchestration, and ML lifecycle tooling for deployment and monitoring.",
      groups: [
        { title: "Big Data", items: ["Hadoop", "Apache Spark"] },
        {
          title: "Data Engineering",
          items: [
            "Apache Kafka",
            "Apache Airflow",
            "ETL/ELT pipelines",
            "NoSQL (MongoDB, Neo4j)",
            "Redis",
            "ELK",
          ],
        },
        { title: "MLOps", items: ["MLFlow", "Weights & Biases", "CI/CD", "GitHub Actions"] },
        { title: "DevOps & Deployment", items: ["Docker", "Kubernetes"] },
        { title: "Cloud Platforms", items: ["AWS", "Azure", "GCP", "Databricks"] },
      ],
    },
    {
      title: "Web Development & BI",
      subtitle:
        "Frontend, backend, and BI tools used to ship user-facing analytics and applications.",
      groups: [
        { title: "Web Frameworks", items: ["React", "Solid.js", "Node.js", "FastAPI"] },
        { title: "Frontend & Tools", items: ["TailwindCSS", "Figma", "Git", "GitHub", "Gitlab"] },
        { title: "BI Tools", items: ["Power BI", "Tableau", "Qlik Sense"] },
      ],
    },
  ];

  return (
    <section id="skills" className="py-24 bg-[color:var(--bg)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-4xl sm:text-5xl font-bold text-[color:var(--text)] mb-4">
            Skills & Expertise
          </h2>
          <p className="text-lg text-[color:var(--muted)] max-w-3xl mx-auto">
            A consolidated view of my technical toolkit across data science, machine learning,
            generative AI, cloud, MLOps, and full-stack analytics delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {categories.map((c) => (
            <CategoryCard
              key={c.title}
              title={c.title}
              subtitle={c.subtitle}
              groups={c.groups}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
