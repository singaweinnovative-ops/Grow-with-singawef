import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const SITE_KEY = import.meta.env["VITE_TURNSTILE_SITE_KEY"] as string | undefined;
const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
export const TURNSTILE_RESET_EVENT = "singawe:turnstile-reset";

type Turnstile = {
  render: (container: HTMLElement, options: Record<string, unknown>) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
};
declare global {
  interface Window {
    turnstile?: Turnstile;
  }
}

let scriptPromise: Promise<Turnstile> | undefined;

function loadTurnstile(): Promise<Turnstile> {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  scriptPromise ??= new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () =>
      window.turnstile ? resolve(window.turnstile) : reject(new Error("Turnstile unavailable"));
    script.onerror = () => {
      scriptPromise = undefined;
      reject(new Error("Turnstile failed to load"));
    };
    document.head.appendChild(script);
  });
  return scriptPromise;
}

/**
 * Drop inside any <form> that posts through submitFormToSupabase. Adds:
 *  - a hidden honeypot field that people never see but naive bots fill in;
 *  - a Cloudflare Turnstile check (when VITE_TURNSTILE_SITE_KEY is set). It
 *    stays invisible for most visitors and only asks for a click when
 *    Cloudflare is unsure. Its token lands in the form as
 *    `cf-turnstile-response` and is verified by /api/submit.
 */
export function FormGuard({ className }: { className?: string }) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!SITE_KEY || !container.current) return;
    let widgetId: string | undefined;
    let cancelled = false;

    loadTurnstile()
      .then((turnstile) => {
        if (cancelled || !container.current) return;
        widgetId = turnstile.render(container.current, {
          sitekey: SITE_KEY,
          appearance: "interaction-only",
          size: "flexible",
          "refresh-expired": "auto",
        });
      })
      .catch(() => {
        // If Cloudflare is unreachable the server rejects the submission with
        // a clear message; nothing else to do here.
      });

    // Tokens are single-use: get a fresh one after every submit attempt.
    const reset = () => {
      if (widgetId && window.turnstile) window.turnstile.reset(widgetId);
    };
    window.addEventListener(TURNSTILE_RESET_EVENT, reset);

    return () => {
      cancelled = true;
      window.removeEventListener(TURNSTILE_RESET_EVENT, reset);
      if (widgetId && window.turnstile) window.turnstile.remove(widgetId);
    };
  }, []);

  return (
    <>
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Leave this field empty
          <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      {SITE_KEY ? <div ref={container} className={cn("empty:hidden", className)} /> : null}
    </>
  );
}
