import { createFileRoute } from "@tanstack/react-router";
import { buildZaziSystemPrompt } from "@/lib/zazi-context";

const SYSTEM_PROMPT = buildZaziSystemPrompt();
const MAX_MESSAGES = 20;
const MAX_MESSAGE_LENGTH = 2000;

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

        const encoder = new TextEncoder();
        const stream = new ReadableStream({
          async start(controller) {
            try {
              const apiKey = process.env["GEMINI_API_KEY"];
              if (!apiKey) throw new Error("GEMINI_API_KEY is not configured.");

              const response = await fetch(
                "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:streamGenerateContent?alt=sse",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    "x-goog-api-key": apiKey,
                  },
                  body: JSON.stringify({
                    systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
                    contents: messages.map((message) => ({
                      role: message.role === "assistant" ? "model" : "user",
                      parts: [{ text: message.content }],
                    })),
                    generationConfig: { maxOutputTokens: 2048 },
                  }),
                },
              );

              if (!response.ok || !response.body) {
                throw new Error(`Gemini request failed with status ${response.status}.`);
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

                  const delta = candidate?.content?.parts
                    ?.map((part) => part.text ?? "")
                    .join("");
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
