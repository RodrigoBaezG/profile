export function Journey() {
  return (
    <section
      id="journey"
      className="section-anchor border-b border-slate-800/70 bg-slate-950/95 py-14 sm:py-18"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 sm:px-8 lg:flex-row">
        <div className="lg:w-1/3">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
            Career Journey
          </h2>
          <p className="mt-3 text-lg font-semibold text-slate-50">
            From fundamentals to full stack delivery.
          </p>
          <p className="mt-3 text-sm text-slate-300">
            I&apos;ve invested heavily in structured learning and real-world
            projects to move fast from fundamentals to shipping reliable
            software for teams.
          </p>
        </div>
        <div className="space-y-6 lg:w-2/3">
          <ol className="space-y-4 text-sm">
            <li className="relative rounded-2xl border border-slate-800 bg-slate-900/70 p-4 sm:p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                    2025
                  </p>
                  <h3 className="text-[15px] font-semibold text-slate-50">
                    Coding Practices Level 3
                  </h3>
                  <p className="text-xs text-slate-400">Learning Curve</p>
                </div>
                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold text-emerald-300 ring-1 ring-emerald-500/40">
                  Engineering discipline
                </span>
              </div>
              <p className="mt-2 text-xs text-slate-300">
                Strengthened software engineering habits: clean code, version
                control, testing, and iterative delivery.
              </p>
            </li>
            <li className="relative rounded-2xl border border-slate-800 bg-slate-900/70 p-4 sm:p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                    2024 – 2025
                  </p>
                  <h3 className="text-[15px] font-semibold text-slate-50">
                    Full Stack Software Developer
                  </h3>
                  <p className="text-xs text-slate-400">Academia X</p>
                </div>
                <span className="rounded-full bg-sky-500/10 px-3 py-1 text-[11px] font-semibold text-sky-300 ring-1 ring-sky-500/40">
                  Full stack track
                </span>
              </div>
              <p className="mt-2 text-xs text-slate-300">
                Built projects across the stack using JavaScript, TypeScript,
                front-end frameworks, REST APIs and databases, learning how to
                design, implement and deploy complete features.
              </p>
            </li>
            <li className="relative rounded-2xl border border-slate-800 bg-slate-900/70 p-4 sm:p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                    May 2023
                  </p>
                  <h3 className="text-[15px] font-semibold text-slate-50">
                    Junior Frontend Developer
                  </h3>
                  <p className="text-xs text-slate-400">Hillogy</p>
                </div>
                <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-[11px] font-semibold text-indigo-300 ring-1 ring-indigo-500/40">
                  Real-world experience
                </span>
              </div>
              <p className="mt-2 text-xs text-slate-300">
                Contributed to production forms, sign-up and log-in experiences
                using HTML, CSS with Bootstrap, JavaScript, TypeScript and
                Angular. Collaborated with senior developers, followed existing
                patterns and shipped UI that met design and accessibility
                requirements.
              </p>
            </li>
          </ol>
          <div className="rounded-2xl border border-dashed border-slate-700/80 bg-slate-900/60 p-4 text-xs text-slate-300 sm:p-5">
            <p className="font-semibold text-slate-100">
              What&apos;s next · 2026 and beyond
            </p>
            <p className="mt-1.5">
              I&apos;m looking to grow inside a team where I can own user-facing
              features end-to-end: from requirements and UX, through clean
              implementation, to monitoring in production.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

