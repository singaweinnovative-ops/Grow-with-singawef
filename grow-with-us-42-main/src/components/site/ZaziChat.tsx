import { useEffect, useRef, useState, type FormEvent } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { SITE } from "@/lib/site-content";

type ChatMessage = { role: "user" | "assistant"; content: string };

const GREETING: ChatMessage = {
  role: "assistant",
  content:
    "Hi, I'm Zazi 👋 — the SINGAWE Foundation assistant. Ask me about our programmes, how to get involved, opportunities, or anything else about the Foundation.",
};

async function streamZaziReply(
  messages: ChatMessage[],
  onDelta: (delta: string) => void,
  onError: (message: string) => void,
) {
  const response = await fetch("/api/zazi", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
  });

  if (!response.ok || !response.body) {
    onError("Zazi is having trouble right now — please try again in a moment.");
    return;
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    const events = buffer.split("\n\n");
    buffer = events.pop() ?? "";

    for (const event of events) {
      const line = event.trim();
      if (!line.startsWith("data:")) continue;
      const payload = line.slice(5).trim();
      if (payload === "[DONE]") return;

      try {
        const parsed = JSON.parse(payload) as { delta?: string; error?: string };
        if (parsed.delta) onDelta(parsed.delta);
        if (parsed.error) onError(parsed.error);
      } catch {
        // ignore malformed SSE chunk
      }
    }
  }
}

export function ZaziChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const text = input.trim();
    if (!text || sending) return;

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: text }];
    setMessages([...nextMessages, { role: "assistant", content: "" }]);
    setInput("");
    setSending(true);

    function appendToLastAssistant(fn: (prev: string) => string) {
      setMessages((prev) => {
        const copy = [...prev];
        const last = copy[copy.length - 1];
        if (last && last.role === "assistant") {
          copy[copy.length - 1] = { ...last, content: fn(last.content) };
        }
        return copy;
      });
    }

    try {
      await streamZaziReply(
        nextMessages,
        (delta) => appendToLastAssistant((prev) => prev + delta),
        (errorMessage) => appendToLastAssistant((prev) => prev || errorMessage),
      );
    } catch {
      appendToLastAssistant(
        (prev) => prev || "Zazi is having trouble right now — please try again in a moment.",
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close Zazi chat" : "Chat with Zazi"}
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-ink px-5 py-3.5 text-sm font-semibold text-cream shadow-lg transition-colors hover:bg-clay"
      >
        {open ? <X className="size-4" /> : <MessageCircle className="size-4" />}
        {!open && <span>Ask Zazi</span>}
      </button>

      {open ? (
        <div className="fixed bottom-24 right-5 z-50 flex h-[32rem] w-[min(24rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-sm border border-border bg-background shadow-2xl">
          <div className="flex items-center justify-between border-b border-border bg-ink px-5 py-4 text-cream">
            <div>
              <p className="font-display text-lg leading-tight">Zazi</p>
              <p className="text-xs text-cream/65">SINGAWE Foundation assistant</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="rounded-sm p-1.5 text-cream/70 transition-colors hover:bg-cream/10 hover:text-cream"
            >
              <X className="size-4" />
            </button>
          </div>

          <div ref={listRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-sm px-4 py-2.5 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-ink text-cream"
                      : "border border-border bg-sand text-foreground"
                  }`}
                >
                  {m.content ||
                    (m.role === "assistant" && sending && i === messages.length - 1 ? (
                      <span className="text-muted-foreground">Thinking…</span>
                    ) : null)}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2 border-t border-border p-3">
            <label className="sr-only" htmlFor="zazi-input">
              Ask Zazi a question
            </label>
            <input
              id="zazi-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about SINGAWE…"
              disabled={sending}
              className="flex-1 rounded-sm border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-gold disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={sending || !input.trim()}
              aria-label="Send message"
              className="rounded-sm bg-ink px-3.5 py-2.5 text-cream transition-colors hover:bg-clay disabled:opacity-50"
            >
              <Send className="size-4" />
            </button>
          </form>
          <p className="border-t border-border px-5 py-2 text-center text-[0.65rem] text-muted-foreground">
            Zazi can make mistakes. For safeguarding concerns, email{" "}
            <a href={`mailto:${SITE.email}`} className="underline">
              {SITE.email}
            </a>{" "}
            directly.
          </p>
        </div>
      ) : null}
    </>
  );
}
