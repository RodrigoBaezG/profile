export function Contact() {
  return (
    <section
      id="contact"
      className="section-anchor bg-gradient-to-b from-slate-950 via-slate-950 to-slate-950/95 py-14 sm:py-18"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="rounded-3xl border border-slate-800/80 bg-slate-900/70 p-6 shadow-[0_22px_70px_rgba(15,23,42,0.9)] sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                Let&apos;s build something
              </h2>
              <p className="mt-3 text-lg font-semibold text-slate-50">
                Ready for junior roles with room to grow.
              </p>
              <p className="mt-3 text-sm text-slate-300">
                If you&apos;re looking for someone who&apos;s hungry to learn,
                comfortable with modern JavaScript, and serious about doing
                things the right way, I&apos;d love to talk.
              </p>
            </div>
            <div className="space-y-3 text-sm text-slate-200">
              <a
                href="mailto:rkbaezgarcia@gmail.com"
                className="block text-sm font-semibold text-accent-soft transition hover:text-sky-400"
              >
                rkbaezgarcia@gmail.com
              </a>
              <p className="text-xs text-slate-400">Based in Oxford, UK</p>
              <div className="mt-3 flex flex-wrap gap-3 text-xs text-slate-300">
                <a
                  href="https://www.linkedin.com/in/rodrigo-báez-garcía-4bb55a271"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 rounded-full border border-slate-700 bg-slate-900/60 px-3 py-1.5 font-semibold text-slate-200 transition hover:border-accent-soft hover:text-accent-soft"
                >
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

