export default function Section({ id, title, subtitle, children, muted = false }) {
  return (
    <section id={id} className={muted ? "bg-black/20" : ""}>
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-white">{title}</h2>
          {subtitle ? (
            <p className="mx-auto mt-3 max-w-3xl text-sm text-white/70">{subtitle}</p>
          ) : null}
        </div>

        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
