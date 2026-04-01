export function Hero() {
  return (
    <section
      id="about"
      className="section-anchor relative border-b border-slate-800/70 bg-gradient-to-b from-slate-950/60 via-slate-950 to-slate-950/95"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.22),_transparent_60%)] blur-3xl" />
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 pb-16 pt-14 sm:px-8 sm:pb-20 sm:pt-18 lg:flex-row lg:items-center lg:gap-16">
        <div className="relative z-10 flex-1 space-y-7">
          <p className="inline-flex items-center gap-2 rounded-full border border-accent-subtle/50 bg-slate-900/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300 shadow-sm backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" />
            Open to frontend & full stack roles
          </p>
          <div className="space-y-4">
            <h1 className="text-balance text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl lg:text-5xl">
              Rodrigo Báez García{" "}
              <span className="bg-gradient-to-tr from-accent-soft via-sky-400 to-indigo-400 bg-clip-text text-transparent">
                Full stack developer
              </span>
              .
            </h1>
            <p className="max-w-xl text-sm text-slate-300 sm:text-[15px]">
              I&apos;m Rodrigo Báez, a Junior Full Stack Developer based in
              Oxford. I build clean, reliable interfaces and services using
              modern JavaScript, from Angular front-ends to Node-powered
              back-ends, with a strong focus on quality and maintainable
              practices.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#portfolio"
              className="inline-flex items-center justify-center rounded-full bg-accent-soft px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-glow-accent transition hover:bg-sky-400"
            >
              View future portfolio
            </a>
            <a
              href="#journey"
              className="inline-flex items-center justify-center rounded-full border border-slate-700/80 bg-slate-950/50 px-4 py-2.5 text-xs font-semibold text-slate-200 shadow-sm transition hover:border-accent-soft hover:text-accent-soft"
            >
              Explore my journey
            </a>
          </div>
          <dl className="mt-5 grid grid-cols-2 gap-4 text-xs text-slate-300 sm:max-w-md sm:text-[12px]">
            <div className="space-y-1">
              <dt className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
                Core stack
              </dt>
              <dd>JavaScript, TypeScript, React, Node.js, Express</dd>
            </div>
            <div className="space-y-1">
              <dt className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
                Location
              </dt>
              <dd>Oxford, United Kingdom · Open to remote</dd>
            </div>
          </dl>
        </div>
        <div className="relative z-10 flex-1">
          <div className="card-gradient-border rounded-3xl">
            <div className="card-gradient-border-inner glass-layer relative overflow-hidden rounded-3xl px-7 py-8 shadow-[0_22px_70px_rgba(15,23,42,0.9)] sm:px-8 sm:py-9">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[conic-gradient(from_210deg,_rgba(56,189,248,0.5),_rgba(129,140,248,0.2),_transparent_55%)] blur-2xl" />
              <div className="relative space-y-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                      Snapshot
                    </p>
                    <h2 className="text-lg font-semibold text-slate-50">
                      Junior Full Stack Developer
                    </h2>
                    <p className="text-xs text-slate-400">
                      Academia X · Learning Curve · Hillogy
                    </p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900/70 ring-1 ring-slate-700/80">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-300">
                      JS
                    </span>
                  </div>
                </div>
                <div className="grid gap-4 text-xs text-slate-200 sm:grid-cols-3">
                  <div className="rounded-2xl bg-slate-900/80 p-3 ring-1 ring-slate-700/80">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
                      Experience
                    </p>
                    <p className="mt-1.5 text-[13px] font-semibold text-slate-50">
                      Junior Frontend Developer
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Hillogy · May 2023
                    </p>
                    <p className="mt-1 text-[11px] text-slate-300">
                      Delivered sign up & login flows with Angular, TypeScript &
                      Bootstrap.
                    </p>
                  </div>
                  <div className="rounded-2xl bg-slate-900/70 p-3 ring-1 ring-slate-800">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
                      Education
                    </p>
                    <p className="mt-1.5 text-[13px] font-semibold text-slate-50">
                      Full Stack Development
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Academia X · 2024–2025
                    </p>
                    <p className="mt-1 text-[11px] text-slate-300">
                      Strong foundation across front-end, back-end and software
                      engineering practices.
                    </p>
                  </div>
                  <div className="rounded-2xl bg-slate-900/70 p-3 ring-1 ring-slate-800">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
                      Focus
                    </p>
                    <ul className="mt-1.5 space-y-1 text-[11px]">
                      <li>Clean, readable code</li>
                      <li>Accessible interfaces</li>
                      <li>Reliable delivery</li>
                    </ul>
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

