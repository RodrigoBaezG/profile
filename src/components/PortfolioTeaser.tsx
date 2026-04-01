export function PortfolioTeaser() {
  return (
    <section
      id="portfolio"
      className="section-anchor border-b border-slate-800/70 bg-slate-950 py-14 sm:py-18"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-xl">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
              Portfolio
            </h2>
            <p className="mt-3 text-lg font-semibold text-slate-50">
              A space for the work I&apos;m building next.
            </p>
            <p className="mt-3 text-sm text-slate-300">
              I&apos;m currently curating and polishing a set of projects that
              reflect how I think about engineering: clear responsibilities,
              consistent patterns, and thoughtful UX. This section is designed
              to grow with my experience.
            </p>
          </div>
          <div className="mt-4 grid flex-1 gap-4 text-sm sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                Live Portfolio
              </p>
              <p className="mt-2 text-sm text-slate-300">
                Check out my complete portfolio showcasing my work in full-stack development,
                featuring Angular front-ends, Node/Express APIs, and modern web applications.
              </p>
              <a
                href="https://rodrigobaezgarcia.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex rounded-full bg-accent-soft/90 px-4 py-1.5 text-[11px] font-semibold text-slate-950 shadow-glow-accent transition hover:bg-accent-soft"
              >
                View Portfolio →
              </a>
            </div>
            <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/40 p-4 text-xs text-slate-300">
              <p className="font-semibold text-slate-100">
                Want to see code today?
              </p>
              <p className="mt-1.5">
                Reach out and I&apos;ll happily walk you through current work,
                repositories and how I approach real problems.
              </p>
              <a
                href="mailto:rkbaezgarcia@gmail.com?subject=Portfolio%20request"
                className="mt-3 inline-flex rounded-full bg-accent-soft/90 px-4 py-1.5 text-[11px] font-semibold text-slate-950 shadow-glow-accent transition hover:bg-accent-soft"
              >
                Request portfolio links
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

