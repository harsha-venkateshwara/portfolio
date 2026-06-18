export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[color:var(--border)] bg-[color:var(--bg)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 items-center">
          <div className="font-mono text-[12px] uppercase tracking-[0.18em] text-[color:var(--subtle)]">
            © {year} · Harsha Venkateshwara
          </div>
          <div className="text-center text-sm text-[color:var(--muted)]">
            Designed &amp; built with React, Tailwind, Curiosity and Purpose.
          </div>
          <div className="flex justify-start sm:justify-end gap-5 text-sm font-medium text-[color:var(--muted)]">
            <a
              href="https://www.linkedin.com/in/harsha-venkateshwara/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[color:var(--text)] transition"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/harsha-venkateshwara"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[color:var(--text)] transition"
            >
              GitHub
            </a>
            <a
              href="mailto:harsha.venkateswara@gmail.com"
              className="hover:text-[color:var(--text)] transition"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
