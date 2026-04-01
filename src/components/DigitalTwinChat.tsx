"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type ChatRole = "user" | "assistant";
type ChatItem = {
  role: ChatRole;
  content: string;
  timestamp: Date;
};

const SUGGESTIONS: string[] = [
  "Give me your 30-second elevator pitch.",
  "What technologies are you strongest in?",
  "Tell me about your Hillogy experience.",
  "What kind of roles are you looking for next?",
  "Can you summarize your education and training?"
];

function clsx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function DigitalTwinChat() {
  const [items, setItems] = useState<ChatItem[]>([
    {
      role: "assistant",
      content: "I’m Rodrigo’s Digital Twin. Ask me anything about his experience, skills, and career journey.",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  // Chat history is only stored in component state to keep behavior deterministic.
  // Removed localStorage persistence per request.

  const history = useMemo(
    () =>
      items
        .filter((m) => m.role === "user" || m.role === "assistant")
        .map((m) => ({ role: m.role, content: m.content })),
    [items]
  );

  async function send(message: string) {
    const trimmed = message.trim();
    if (!trimmed || isSending) return;

    setError(null);
    setIsSending(true);
    setInput("");

    setItems((prev) => [...prev, { role: "user", content: trimmed, timestamp: new Date() }]);

    // Show typing indicator
    setIsTyping(true);

    try {
      const res = await fetch("/api/digital-twin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, history })
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const serverError =
          typeof (data as any)?.error === "string" ? (data as any).error : null;
        const status =
          typeof (data as any)?.status === "number" ? (data as any).status : res.status;
        const providerMsg =
          typeof (data as any)?.details?.error?.message === "string"
            ? (data as any).details.error.message
            : typeof (data as any)?.details?.error?.metadata?.raw === "string"
              ? (data as any).details.error.metadata.raw
              : null;

        const msg = [
          serverError ?? "Request failed.",
          Number.isFinite(status) ? `Status: ${status}` : null,
          providerMsg ? `Details: ${providerMsg}` : null
        ]
          .filter(Boolean)
          .join(" ");

        setError(msg);
        setItems((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              status === 403
                ? "OpenRouter rejected the request (403). This usually means the key/account can’t use this model right now (credits/plan/policy). Try rotating the key, adding credit, or switching to another free model."
                : status === 429
                  ? "Rate limit exceeded. Please wait a moment before sending more messages."
                  : "I hit an issue responding. If you're running this locally, confirm your OPENROUTER_API_KEY is set and restart the dev server.",
            timestamp: new Date()
          }
        ]);
        return;
      }

      const reply =
        typeof data?.reply === "string" && data.reply.trim()
          ? data.reply.trim()
          : "I didn’t receive a response. Try rephrasing your question.";

      setItems((prev) => [...prev, { role: "assistant", content: reply, timestamp: new Date() }]);
    } catch (e) {
      setError("Network error. Is the dev server running?");
      setItems((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I couldn't reach the server. Please confirm `npm run dev` is running, then try again.",
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsSending(false);
      setIsTyping(false);
      queueMicrotask(() => {
        listRef.current?.scrollTo({
          top: listRef.current.scrollHeight,
          behavior: "smooth"
        });
      });
    }
  }

  return (
    <section
      id="digital-twin"
      className="section-anchor border-b border-slate-800/70 bg-slate-950/95 py-14 sm:py-18"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="flex flex-col gap-10 lg:flex-row">
          <div className="lg:w-1/3">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
              Digital Twin
            </h2>
            <p className="mt-3 text-lg font-semibold text-slate-50">
              Ask about my career — get instant answers.
            </p>
            <p className="mt-3 text-sm text-slate-300">
              This is an AI assistant trained with my public career information.
              It’s great for quick context, interview prep, and role fit checks.
            </p>

            <div className="mt-6 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                Try these
              </p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => send(s)}
                    disabled={isSending}
                    className="rounded-full border border-slate-700/80 bg-slate-950/40 px-3 py-1.5 text-[11px] font-semibold text-slate-200 transition hover:border-accent-soft hover:text-accent-soft disabled:opacity-50"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:w-2/3">
            <div className="card-gradient-border rounded-3xl">
              <div className="card-gradient-border-inner glass-layer rounded-3xl shadow-[0_22px_70px_rgba(15,23,42,0.9)]">
                <div className="flex items-center justify-between gap-3 border-b border-slate-800/60 px-5 py-4 sm:px-6">
                  <div>
                    <p className="text-xs font-semibold text-slate-200">
                      Rodrigo’s Digital Twin
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Powered by OpenRouter
                    </p>
                  </div>
                  <div
                    className={clsx(
                      "rounded-full px-3 py-1 text-[11px] font-semibold ring-1",
                      isSending
                        ? "bg-sky-500/10 text-sky-300 ring-sky-500/40"
                        : "bg-emerald-500/10 text-emerald-300 ring-emerald-500/40"
                    )}
                  >
                    {isSending ? "Thinking…" : "Ready"}
                  </div>
                </div>

                <div
                  ref={listRef}
                  className="max-h-[420px] space-y-3 overflow-auto px-5 py-5 sm:px-6"
                >
                  {items.map((m, idx) => (
                    <div
                      key={idx}
                      className={clsx(
                        "flex",
                        m.role === "user" ? "justify-end" : "justify-start"
                      )}
                    >
                      <div className="flex max-w-[92%] flex-col gap-1">
                        <div
                          className={clsx(
                            "whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed",
                            m.role === "user"
                              ? "bg-accent-soft text-slate-950 shadow-glow-accent"
                              : "bg-slate-900/70 text-slate-100 ring-1 ring-slate-800/80"
                          )}
                        >
                          {m.content}
                        </div>
                        <div className="flex items-center justify-between px-2">
                          <span className="text-[10px] text-slate-500">
                            {m.timestamp.toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="max-w-[92%] whitespace-pre-wrap rounded-2xl bg-slate-900/70 px-4 py-3 text-sm leading-relaxed text-slate-100 ring-1 ring-slate-800/80">
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1">
                            <div className="h-2 w-2 animate-bounce rounded-full bg-slate-400"></div>
                            <div className="h-2 w-2 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: '0.1s' }}></div>
                            <div className="h-2 w-2 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                          <span className="text-slate-400">Rodrigo is typing...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="border-t border-slate-800/60 px-5 py-4 sm:px-6">
                  {error ? (
                    <p className="mb-3 text-xs font-semibold text-rose-300">
                      {error}
                    </p>
                  ) : null}
                  <form
                    className="flex flex-col gap-3 sm:flex-row sm:items-center"
                    onSubmit={(e) => {
                      e.preventDefault();
                      send(input);
                    }}
                  >
                    <input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask a question about Rodrigo’s career…"
                      className="h-11 flex-1 rounded-2xl border border-slate-700/70 bg-slate-950/40 px-4 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-accent-soft"
                      disabled={isSending}
                    />
                    <button
                      type="submit"
                      disabled={isSending || !input.trim()}
                      className="inline-flex h-11 items-center justify-center rounded-2xl bg-accent-soft px-5 text-sm font-semibold text-slate-950 shadow-glow-accent transition hover:bg-sky-400 disabled:opacity-50"
                    >
                      Send
                    </button>
                  </form>
                  <p className="mt-3 text-[11px] text-slate-500">
                    Note: answers are based on public resume-level info. For
                    deeper detail, reach out directly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

