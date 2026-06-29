import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const SESSION_KEY = "hv_chat_history_v1";

const SUGGESTED_PROMPTS = [
  "What's Harsha's strongest project?",
  "What's he building at Commvault?",
  "Is he open to remote AI/ML roles?",
  "Which projects used LLMs or RAG?",
];

const WELCOME = {
  role: "assistant",
  content:
    "Hi, I'm Jarvis, an AI trained on Harsha's portfolio. Ask me about his projects, experience, skills, or how to get in touch.",
};

function loadHistory() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) return null;
    return parsed;
  } catch {
    return null;
  }
}

function saveHistory(messages) {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(messages));
  } catch {
    // sessionStorage may be unavailable in privacy modes; non-fatal.
  }
}

function BotIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <rect x="3" y="6" width="18" height="13" rx="3" strokeWidth="1.8" />
      <path strokeWidth="1.8" strokeLinecap="round" d="M12 3v3M8 12h.01M16 12h.01M9 16h6" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function TypingDots() {
  return (
    <div className="inline-flex items-center gap-1 px-3 py-2.5">
      <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--muted)] animate-bounce" style={{ animationDelay: "0ms" }} />
      <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--muted)] animate-bounce" style={{ animationDelay: "120ms" }} />
      <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--muted)] animate-bounce" style={{ animationDelay: "240ms" }} />
    </div>
  );
}

function MessageBubble({ role, content, streaming }) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[85%] ${isUser ? "items-end" : "items-start"} flex flex-col gap-2`}>
        {!isUser ? (
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--subtle)] pl-1">
            Jarvis
          </div>
        ) : null}
        <div
          className={[
            "rounded-2xl px-4 py-3 sm:px-5 sm:py-3.5 text-[15px] sm:text-[16px] leading-relaxed whitespace-pre-wrap break-words",
            isUser
              ? "bg-[color:var(--text)] text-[color:var(--bg)] rounded-br-md"
              : "bg-[color:var(--elevated)] text-[color:var(--text)] border border-[color:var(--border)] rounded-bl-md",
          ].join(" ")}
        >
          {content}
          {streaming ? (
            <span className="inline-block w-1.5 h-4 align-[-2px] ml-0.5 bg-[color:var(--muted)] animate-pulse" />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState(null);
  const [messages, setMessages] = useState(() => loadHistory() || [WELCOME]);

  const abortRef = useRef(null);
  const scrollRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    saveHistory(messages);
  }, [messages]);

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (open && textareaRef.current) {
      setTimeout(() => textareaRef.current?.focus(), 80);
    }
  }, [open]);

  // Lock background scroll only while the panel is full-screen (mobile),
  // so the desktop floating widget still lets the page scroll behind it.
  useEffect(() => {
    if (!open) return;
    if (!window.matchMedia?.("(max-width: 639px)").matches) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const send = useCallback(
    async (text) => {
      const trimmed = (text || "").trim();
      if (!trimmed || streaming) return;
      setError(null);

      const userMsg = { role: "user", content: trimmed };
      const assistantPlaceholder = { role: "assistant", content: "" };
      const baseMessages = [...messages, userMsg];
      setMessages([...baseMessages, assistantPlaceholder]);
      setInput("");
      setStreaming(true);

      const payload = baseMessages
        .filter((m) => m.role === "user" || m.role === "assistant")
        .filter((m) => !(m === WELCOME && messages[0] === WELCOME));

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ messages: payload.map((m) => ({ role: m.role, content: m.content })) }),
          signal: controller.signal,
        });

        if (!res.ok) {
          let serverMsg = null;
          try {
            const data = await res.json();
            serverMsg = data?.error || null;
          } catch {
            // Response body was not JSON; fall back to the status-based message.
          }

          let msg =
            serverMsg ||
            "Something went wrong. Please try again, or reach out to harsha.venkateswara@gmail.com directly.";

          if (res.status === 429 && !serverMsg) {
            msg = "Quick break, you're sending messages too fast. Please wait a moment.";
          }
          if (res.status === 500 && !serverMsg) {
            msg = "The chatbot isn't configured yet. Please reach out at harsha.venkateswara@gmail.com.";
          }
          throw new Error(msg);
        }

        if (!res.body) throw new Error("No response stream.");

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        let accumulated = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            const trimmedLine = line.trim();
            if (!trimmedLine.startsWith("data:")) continue;
            const data = trimmedLine.slice(5).trim();
            if (data === "[DONE]") continue;
            try {
              const parsed = JSON.parse(data);
              if (parsed.error) throw new Error(parsed.error);
              if (typeof parsed.delta === "string") {
                accumulated += parsed.delta;
                setMessages((prev) => {
                  const next = [...prev];
                  next[next.length - 1] = { role: "assistant", content: accumulated };
                  return next;
                });
              }
            } catch {
              // Skip malformed chunks
            }
          }
        }

        if (!accumulated) {
          setMessages((prev) => {
            const next = [...prev];
            next[next.length - 1] = {
              role: "assistant",
              content: "I didn't catch that. Could you rephrase?",
            };
            return next;
          });
        }
      } catch (err) {
        if (err.name === "AbortError") return;
        const message = err?.message || "Something went wrong.";
        setError(message);
        setMessages((prev) => {
          const next = [...prev];
          next[next.length - 1] = { role: "assistant", content: message };
          return next;
        });
      } finally {
        setStreaming(false);
        abortRef.current = null;
      }
    },
    [messages, streaming]
  );

  const handleSubmit = (e) => {
    e?.preventDefault?.();
    send(input);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  const reset = () => {
    if (streaming && abortRef.current) abortRef.current.abort();
    setMessages([WELCOME]);
    setError(null);
    setInput("");
  };

  const showSuggestions = useMemo(
    () => messages.length === 1 && messages[0]?.role === "assistant",
    [messages]
  );

  return (
    <>
      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open chat with Jarvis"
          style={{ backgroundImage: "var(--grad-cta)" }}
          className="fixed bottom-6 right-6 z-40 group inline-flex items-center gap-3 rounded-full text-white pl-5 pr-6 py-4 shadow-[0_16px_50px_-10px_rgba(99,102,241,0.65)] hover:scale-105 transition-transform"
        >
          <span className="relative grid place-items-center">
            <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-50 animate-ping" />
            <BotIcon className="w-6 h-6 relative" />
          </span>
          <span className="text-[15px] font-semibold">Ask Jarvis</span>
        </button>
      ) : null}

      {open ? (
        <div
          role="dialog"
          aria-label="Chat with Jarvis"
          aria-modal="false"
          className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 z-[60] flex flex-col bg-[color:var(--surface)] border-0 sm:border border-[color:var(--border-strong)] sm:rounded-3xl shadow-2xl shadow-black/40 overflow-hidden sm:w-[400px] sm:h-[640px] sm:max-h-[calc(100dvh-7rem)]"
        >
          <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-4 sm:py-5 pt-[max(1rem,env(safe-area-inset-top))] sm:pt-5 border-b border-[color:var(--border)] bg-[color:var(--bg)]/50">
            <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
              <div className="grid h-10 w-10 sm:h-11 sm:w-11 shrink-0 place-items-center rounded-xl border border-[color:var(--border-strong)] bg-[color:var(--elevated)] text-[color:var(--text)]">
                <BotIcon className="w-5 h-5" />
              </div>
              <div className="leading-tight min-w-0">
                <div className="text-base font-semibold text-[color:var(--text)] font-display tracking-tight">
                  Jarvis
                </div>
                <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-[color:var(--subtle)] mt-1 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="truncate">AI Assistant</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
              <button
                type="button"
                onClick={reset}
                className="rounded-full px-3 py-1.5 text-[11px] font-mono uppercase tracking-[0.16em] text-[color:var(--muted)] hover:text-[color:var(--text)] hover:bg-[color:var(--raised)] transition"
                aria-label="Reset conversation"
                title="Reset conversation"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-full border border-[color:var(--border)] text-[color:var(--muted)] hover:text-[color:var(--text)] hover:border-[color:var(--border-strong)] transition"
                aria-label="Close chat"
              >
                <CloseIcon />
              </button>
            </div>
          </div>

          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-4 sm:px-6 py-5 sm:py-6 space-y-4 sm:space-y-5"
          >
            {messages.map((m, i) => {
              const isStreamingLast =
                streaming &&
                i === messages.length - 1 &&
                m.role === "assistant";
              return (
                <MessageBubble
                  key={i}
                  role={m.role}
                  content={m.content || ""}
                  streaming={isStreamingLast && m.content.length > 0}
                />
              );
            })}

            {streaming &&
            messages[messages.length - 1]?.role === "assistant" &&
            messages[messages.length - 1]?.content === "" ? (
              <div className="flex justify-start">
                <div className="bg-[color:var(--elevated)] border border-[color:var(--border)] rounded-2xl rounded-bl-md">
                  <TypingDots />
                </div>
              </div>
            ) : null}

            {showSuggestions ? (
              <div className="pt-3">
                <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--subtle)] mb-4">
                  / try asking
                </div>
                <div className="flex flex-col gap-2.5">
                  {SUGGESTED_PROMPTS.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => send(p)}
                      className="text-left text-[14px] sm:text-[15px] rounded-xl border border-[color:var(--border)] bg-[color:var(--elevated)] px-4 py-3 text-[color:var(--text)] hover:border-[color:var(--border-strong)] hover:-translate-y-0.5 transition-all"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <form
            onSubmit={handleSubmit}
            className="border-t border-[color:var(--border)] bg-[color:var(--bg)]/40 px-4 sm:px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:pb-4"
          >
            <div className="flex items-end gap-2.5 rounded-2xl border border-[color:var(--border-strong)] bg-[color:var(--surface)] px-4 py-3 focus-within:border-[color:var(--text)] transition">
              <textarea
                ref={textareaRef}
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about a project, skill, or how to get in touch…"
                aria-label="Message"
                className="chat-input flex-1 resize-none bg-transparent text-[16px] text-[color:var(--text)] placeholder:text-[color:var(--subtle)] outline-none max-h-28"
                disabled={streaming}
              />
              <button
                type="submit"
                disabled={streaming || input.trim().length === 0}
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[color:var(--text)] text-[color:var(--bg)] disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition"
                aria-label="Send"
              >
                <SendIcon />
              </button>
            </div>
            <div className="mt-2.5 px-1 flex items-center justify-between gap-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--subtle)]">
                AI· Powered by Groq, may make mistakes. Verify important details.
              </span>
              {error ? (
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-red-400">
                  error
                </span>
              ) : null}
            </div>
          </form>
        </div>
      ) : null}
    </>
  );
}
