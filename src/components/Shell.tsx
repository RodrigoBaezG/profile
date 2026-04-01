import Link from "next/link";
import { ReactNode } from "react";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col bg-gradient-to-b from-slate-950 via-slate-950/95 to-slate-950 text-foreground">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-accent/40 via-transparent to-transparent opacity-80 blur-3xl" />
      <header className="relative z-20 border-b border-slate-800/70 bg-slate-950/60 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-8">
          <Link href="#top" className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-accent-soft via-sky-500 to-indigo-500 shadow-glow-accent" />
            <div className="leading-tight">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent-soft">
                Rodrigo Báez
              </p>
              <p className="text-[11px] text-slate-400">
                Full Stack Developer · Oxford
              </p>
            </div>
          </Link>
          <nav className="hidden gap-8 text-sm font-medium text-slate-200 sm:flex">
            <a href="#about" className="transition hover:text-accent-soft">
              About
            </a>
            <a href="#journey" className="transition hover:text-accent-soft">
              Journey
            </a>
            <a href="#portfolio" className="transition hover:text-accent-soft">
              Portfolio
            </a>
            <a
              href="#digital-twin"
              className="transition hover:text-accent-soft"
            >
              Digital Twin
            </a>
            <a href="#contact" className="transition hover:text-accent-soft">
              Contact
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <a
              href="mailto:rkbaezgarcia@gmail.com"
              className="hidden rounded-full border border-accent-subtle/70 bg-slate-950/60 px-3 py-1.5 text-xs font-semibold text-accent-soft shadow-sm backdrop-blur hover:border-accent-soft hover:text-accent transition sm:inline-flex"
            >
              Let&apos;s talk
            </a>
          </div>
        </div>
      </header>
      <main id="top" className="relative z-10 flex-1">
        {children}
      </main>
      <footer className="relative z-10 border-t border-slate-800/70 bg-slate-950/80 py-5 text-xs text-slate-500">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 sm:flex-row sm:px-8">
          <p>
            © {new Date().getFullYear()} Rodrigo Báez García. All rights
            reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/in/rodrigo-báez-garcía-4bb55a271"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-accent-soft"
            >
              LinkedIn
            </a>
            <span className="h-1 w-1 rounded-full bg-slate-600" />
            <span>Built with Next.js & Tailwind CSS</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

