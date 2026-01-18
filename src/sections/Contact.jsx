import React from "react";

const LinkedInIcon = ({ className = "", ...props }) => (
  <svg
    {...props}
    className={`w-5 h-5 ${className}`}
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const MailIcon = ({ className = "", ...props }) => (
  <svg
    {...props}
    className={`w-5 h-5 ${className}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M3 8l7.89 7.89a2 2 0 002.82 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

const PinIcon = ({ className = "", ...props }) => (
  <svg
    {...props}
    className={`w-5 h-5 ${className}`}
    fill="currentColor"
    viewBox="0 0 20 20"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
      clipRule="evenodd"
    />
  </svg>
);

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-[color:var(--bg)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-4xl sm:text-5xl font-bold text-[color:var(--text)] mb-4">
            Contact
          </h2>
          <p className="text-lg text-[color:var(--muted)] max-w-2xl mx-auto">
            Always happy to connect, collaborate, or simply have a great conversation
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-2xl bg-[color:var(--card)] border border-[color:var(--border)] shadow-lg shadow-black/10 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-xl font-semibold text-[color:var(--text)] mb-5">
                Contact Me
              </h3>

              <div className="space-y-7">
                <a
                  href="https://www.linkedin.com/in/harsha-venkateshwara/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 border border-[color:var(--border)] rounded-lg p-3 bg-[color:var(--card)] hover:brightness-105 transition text-[color:var(--text)] w-full"
                >
                  <LinkedInIcon className="opacity-80" />
                  <span className="font-medium">LinkedIn</span>
                </a>

                <a
                  href="mailto:harsha.venkateswara@gmail.com"
                  className="flex items-center justify-center gap-2 border border-[color:var(--border)] rounded-lg p-3 bg-[color:var(--card)] hover:brightness-105 transition text-[color:var(--text)] w-full"
                >
                  <MailIcon className="opacity-80" />
                  <span className="font-medium">Email</span>
                </a>
              </div>

              <p className="mt-6 text-xs text-[color:var(--muted)]">
                Prefer email for detailed discussions; LinkedIn is great for quick intros.
              </p>
            </div>

            <div className="space-y-8">
              <div className="rounded-2xl bg-[color:var(--card)] border border-[color:var(--border)] shadow-lg shadow-black/10 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <h3 className="text-xl font-semibold text-[color:var(--text)] mb-4">
                  Location
                </h3>
                <div className="flex items-center gap-3 text-[color:var(--text)]">
                  <span className="opacity-70">
                    <PinIcon />
                  </span>
                  <p className="text-[color:var(--muted)]">
                    New York, USA (Open to Remote/Relocation)
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-green-900/20 border border-green-500/30 shadow-lg shadow-black/10 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start gap-3">
                  <div className="mt-2 h-3 w-3 bg-green-500 rounded-full" />
                  <div>
                    <h3 className="text-xl font-semibold text-green-200 mb-2">
                      Current Availability
                    </h3>
                    <p className="text-green-100/80">
                      Open to internships, part-time and full-time roles and collaboration on AI/ML + data projects.
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {["AI/ML", "Data Science", "Analytics", "GenAI"].map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-green-400/30 bg-green-500/10 px-3 py-1 text-xs text-green-100/90"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
