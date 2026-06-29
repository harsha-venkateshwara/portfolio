import Reveal from "./Reveal";

export default function SectionHeader({ index, label, title, subtitle, align = "left" }) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <Reveal className={`max-w-4xl ${alignClass}`}>
      <div className={`section-tag ${align === "center" ? "justify-center" : ""}`}>
        {index ? <span className="gradient-text font-bold">{index}</span> : null}
        <span>/ {label}</span>
      </div>
      <h2 className="mt-6 font-display text-h2 font-bold text-[color:var(--text)]">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-5 text-lead text-[color:var(--muted)] max-w-2xl">
          {subtitle}
        </p>
      ) : null}
    </Reveal>
  );
}
