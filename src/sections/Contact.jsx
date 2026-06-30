import React from "react";
import SectionHeader from "../components/SectionHeader";
import Reveal from "../components/Reveal";

const LinkedInIcon = ({ className = "" }) => (
  <svg className={`w-5 h-5 ${className}`} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const MailIcon = ({ className = "" }) => (
  <svg className={`w-5 h-5 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 7.89a2 2 0 002.82 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const PinIcon = ({ className = "" }) => (
  <svg className={`w-5 h-5 ${className}`} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
  </svg>
);

const GhIcon = ({ className = "" }) => (
  <svg className={`w-5 h-5 ${className}`} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

export default function Contact() {
  return (
    <section id="contact" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader
          index="07"
          label="contact"
          title="Looking for an AI/ML Engineer with technical depth and product instinct?"
          subtitle="Always happy to connect, collaborate, or simply have a great conversation."
        />

        <Reveal className="mt-16 max-w-6xl mx-auto">
          <div className="card ring-gradient relative overflow-hidden p-10 sm:p-14">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at 20% 0%, var(--accent-soft) 0%, transparent 50%), radial-gradient(circle at 90% 100%, var(--accent-soft) 0%, transparent 50%)",
              }}
            />

            <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-2 mb-7">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  <span className="font-mono text-[12px] uppercase tracking-[0.18em] text-emerald-300">
                    Available now
                  </span>
                </div>

                <h3 className="font-display text-h2 font-bold text-[color:var(--text)]">
                  Building something ambitious?<br />
                  <span className="italic font-medium text-[color:var(--accent-text)]">Let&apos;s talk.</span>
                </h3>

                <p className="mt-6 text-lead text-[color:var(--muted)] max-w-xl">
                  Open to internships, full-time, and part-time AI/ML, Data Science, Analytics, and
                  GenAI roles. Reach out. I respond within 24 hours.
                </p>

                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <a
                    href="mailto:harsha.venkateswara@gmail.com"
                    className="btn-primary"
                    aria-label="Email me"
                  >
                    <MailIcon className="!w-4 !h-4" />
                    Email me
                  </a>
                  <a
                    href="https://www.linkedin.com/in/harsha-venkateshwara/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                  >
                    <LinkedInIcon className="!w-4 !h-4" />
                    LinkedIn
                  </a>
                  <a
                    href="/resume/Harsha_Venkateshwara_Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
                    </svg>
                    Resume
                  </a>
                </div>

                <div className="mt-7 flex flex-wrap gap-2">
                  {["AI/ML", "Data Science", "Analytics", "GenAI", "MLOps"].map((t) => (
                    <span key={t} className="chip">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="grid grid-cols-1 gap-3">
                  <InfoRow icon={<PinIcon />} label="Location" value="New York, USA · Open to remote / relocation" />
                  <InfoRow
                    icon={<MailIcon />}
                    label="Email"
                    value="harsha.venkateswara@gmail.com"
                    href="mailto:harsha.venkateswara@gmail.com"
                  />
                  <InfoRow
                    icon={<LinkedInIcon />}
                    label="LinkedIn"
                    value="linkedin.com/in/harsha-venkateshwara"
                    href="https://www.linkedin.com/in/harsha-venkateshwara/"
                  />
                  <InfoRow
                    icon={<GhIcon />}
                    label="GitHub"
                    value="github.com/harsha-venkateshwara"
                    href="https://github.com/harsha-venkateshwara"
                  />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function InfoRow({ icon, label, value, href }) {
  const inner = (
    <>
      <span className="grid h-12 w-12 place-items-center rounded-lg border border-[color:var(--border)] bg-[color:var(--elevated)] text-[color:var(--muted)] shrink-0">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--subtle)]">
          {label}
        </div>
        <div className="mt-1 text-base font-semibold text-[color:var(--text)] truncate">
          {value}
        </div>
      </div>
      {href ? (
        <svg className="w-4 h-4 text-[color:var(--subtle)] group-hover:text-[color:var(--text)] transition" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      ) : null}
    </>
  );

  if (!href) {
    return (
      <div className="flex items-center gap-4 rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)]/60 backdrop-blur p-4">
        {inner}
      </div>
    );
  }

  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="group flex items-center gap-4 rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)]/60 backdrop-blur p-4 hover:border-[color:var(--border-strong)] transition"
    >
      {inner}
    </a>
  );
}
