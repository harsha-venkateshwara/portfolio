export default function SectionHeader({ index, label, title, subtitle, align = "left" }) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={`max-w-4xl ${alignClass}`}>
      <div className={`section-tag ${align === "center" ? "justify-center" : ""}`}>
        <span>{index}</span>
        <span>/ {label}</span>
      </div>
      <h2 className="mt-6 font-display text-[2.5rem] sm:text-[3.25rem] lg:text-[4rem] xl:text-[4.5rem] font-bold tracking-tight text-[color:var(--text)] leading-[1.02]">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-5 text-lg sm:text-xl text-[color:var(--muted)] leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
