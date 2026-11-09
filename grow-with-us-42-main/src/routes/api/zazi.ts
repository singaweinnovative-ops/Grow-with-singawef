import { createFileRoute } from "@tanstack/react-router";
import { buildZaziSystemPrompt } from "@/lib/zazi-context";
import { loadSiteContent } from "@/lib/site-content-db";
import { isSameOrigin, json, withinRateLimit } from "@/lib/server/security";

const MAX_MESSAGES = 20;
const MAX_MESSAGE_LENGTH = 2000;
const MAX_BODY_BYTES = 64 * 1024;
/**
 * Models to try, in order. GEMINI_MODEL (server setting) goes first when
 * set; the fallbacks keep Zazi answering when Google reports a model busy.
 */
const GEMINI_MODELS = Array.from(
  new Set(
    [
      process.env["GEMINI_MODEL"],
      "gemini-3.8-flash",
      "gemini-3.5-flash",
      "gemini-3.5-flash-lite",
      "gemini-3.1-flash-lite",
    ].filter(Boolean),
  ),
) as string[];

/** Per visitor: a burst limit and a daily cap, so the Gemini key can't be drained. */
const RATE_LIMITS = [
  { scope: "zazi-10m", limit: 15, windowSeconds: 10 * 60 },
  { scope: "zazi-day", limit: 80, windowSeconds: 24 * 60 * 60 },
];

async function getSystemPrompt() {
  try {
    return buildZaziSystemPrompt(await loadSiteContent());
  } catch {
    return buildZaziSystemPrompt();
  }
}

type ChatMessage = { role: "user" | "assistant"; content: string };
type GeminiChunk = {
  candidates?: {
    finishReason?: string;
    content?: { parts?: { text?: string }[] };
  }[];
  promptFeedback?: { blockReason?: string };
};

function sseEvent(data: unknown): string {
  return `data: ${JSON.stringify(data)}\n\n`;
}

export const Route = createFileRoute("/api/zazi")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!isSameOrigin(request)) return json({ error: "Forbidden." }, 403);
        if (Number(request.headers.get("content-length") ?? 0) > MAX_BODY_BYTES) {
          return new Response("Request too large", { status: 413 });
        }
        for (const rule of RATE_LIMITS) {
          if (!(await withinRateLimit(rule.scope, request, rule.limit, rule.windowSeconds))) {
            return json(
              {
                error:
                  "Zazi needs a short break — you've sent a lot of messages. Please try again later.",
              },
              429,
              { "retry-after": String(Math.min(rule.windowSeconds, 600)) },
            );
          }
        }

        let body: { messages?: unknown };
        try {
          body = await request.json();
        } catch {
          return new Response("Invalid JSON", { status: 400 });
        }

        if (!Array.isArray(body.messages)) {
          return new Response("Missing messages", { status: 400 });
        }

        const messages: ChatMessage[] = body.messages
          .filter(
            (m): m is ChatMessage =>
              typeof m === "object" &&
              m !== null &&
              (m.role === "user" || m.role === "assistant") &&
              typeof m.content === "string",
          )
          .slice(-MAX_MESSAGES)
          .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_MESSAGE_LENGTH) }));

        if (messages.length === 0 || messages[messages.length - 1]!.role !== "user") {
          return new Response("Last message must be from the user", { status: 400 });
        }

        const SYSTEM_PROMPT = await getSystemPrompt();
        const encoder = new TextEncoder();
        const stream = new ReadableStream({
          async start(controller) {
            try {
              const apiKey = process.env["GEMINI_API_KEY"];
              if (!apiKey) throw new Error("GEMINI_API_KEY is not configured.");

              const requestBody = JSON.stringify({
                systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
                contents: messages.map((message) => ({
                  role: message.role === "assistant" ? "model" : "user",
                  parts: [{ text: message.content }],
                })),
                generationConfig: { maxOutputTokens: 2048 },
              });

              // Try each model in turn; move on only when Google says the
              // model is busy or unavailable (429 / 5xx) or unknown (404).
              let response: Response | undefined;
              for (const model of GEMINI_MODELS) {
                // Give each model 12 s to start answering before trying the next.
                const startTimeout = new AbortController();
                const timer = setTimeout(() => startTimeout.abort(), 12_000);
                try {
                  response = await fetch(
                    `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:streamGenerateContent?alt=sse`,
                    {
                      method: "POST",
                      headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
                      body: requestBody,
                      signal: startTimeout.signal,
                    },
                  );
                } catch {
                  console.warn(`[Zazi] ${model} did not respond in time.`);
                  response = undefined;
                  continue;
                } finally {
                  // Once headers arrive the answer streams without a time limit.
                  clearTimeout(timer);
                }
                if (response.ok) break;
                const retryable =
                  response.status === 429 || response.status === 404 || response.status >= 500;
                console.warn(`[Zazi] ${model} returned ${response.status}.`);
                if (!retryable) break;
              }

              if (!response || !response.ok || !response.body) {
                throw new Error(
                  `Gemini request failed with status ${response?.status ?? "unknown"}.`,
                );
              }

              const reader = response.body.getReader();
              const decoder = new TextDecoder();
              let buffer = "";

              while (true) {
                const { done, value } = await reader.read();
                buffer += decoder.decode(value, { stream: !done });
                const events = buffer.split(/\r?\n\r?\n/);
                buffer = events.pop() ?? "";

                for (const event of events) {
                  const payload = event
                    .split(/\r?\n/)
                    .filter((line) => line.startsWith("data:"))
                    .map((line) => line.slice(5).trim())
                    .join("\n");
                  if (!payload || payload === "[DONE]") continue;

                  let chunk: GeminiChunk;
                  try {
                    chunk = JSON.parse(payload) as GeminiChunk;
                  } catch {
                    continue;
                  }

                  if (chunk.promptFeedback?.blockReason) {
                    controller.enqueue(
                      encoder.encode(
                        sseEvent({
                          error:
                            "Zazi can't help with that one — try asking something about SINGAWE Foundation instead.",
                        }),
                      ),
                    );
                    continue;
                  }

                  const candidate = chunk.candidates?.[0];
                  if (candidate?.finishReason === "SAFETY") {
                    controller.enqueue(
                      encoder.encode(
                        sseEvent({
                          error:
                            "Zazi can't help with that one — try asking something about SINGAWE Foundation instead.",
                        }),
                      ),
                    );
                    continue;
                  }

                  const delta = candidate?.content?.parts?.map((part) => part.text ?? "").join("");
                  if (delta) controller.enqueue(encoder.encode(sseEvent({ delta })));
                }

                if (done) break;
              }
            } catch (err) {
              console.error(
                "[Zazi] Gemini request failed:",
                err instanceof Error ? err.message : "Unknown error",
              );
              const message =
                err instanceof Error && err.message === "GEMINI_API_KEY is not configured."
                  ? "Zazi isn't configured yet. Add GEMINI_API_KEY to the server environment."
                  : "Zazi is having trouble connecting right now. Please try again.";
              controller.enqueue(encoder.encode(sseEvent({ error: message })));
            } finally {
              controller.enqueue(encoder.encode("data: [DONE]\n\n"));
              controller.close();
            }
          },
        });

        return new Response(stream, {
          headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            Connection: "keep-alive",
          },
        });
      },
    },
  },
});
