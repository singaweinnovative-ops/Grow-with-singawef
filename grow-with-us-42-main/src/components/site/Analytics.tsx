import { useEffect, useRef } from "react";
import { useRouterState } from "@tanstack/react-router";
import { onConsentChange, readConsent, type ConsentChoice } from "@/lib/consent";

const MEASUREMENT_ID = import.meta.env["VITE_GA_MEASUREMENT_ID"] as string | undefined;

type Gtag = (...args: unknown[]) => void;
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

function ensureGtag(): Gtag {
  window.dataLayer = window.dataLayer ?? [];
  if (!window.gtag) {
    window.gtag = function gtag() {
      // gtag.js expects the real `arguments` object, not an array.
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
    // Google Consent Mode v2: nothing is stored until the visitor accepts.
    window.gtag("consent", "default", {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "denied",
    });
  }
  return window.gtag;
}

let scriptLoaded = false;
let lastPageView = "";

function sendPageView() {
  if (!window.gtag || lastPageView === location.href) return;
  lastPageView = location.href;
  window.gtag("event", "page_view", { page_location: location.href, page_title: document.title });
}

function enableAnalytics(id: string) {
  const gtag = ensureGtag();
  gtag("consent", "update", { analytics_storage: "granted" });
  if (scriptLoaded) return;
  scriptLoaded = true;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(script);

  gtag("js", new Date());
  // Page views are sent manually on each client-side navigation below.
  gtag("config", id, { send_page_view: false, anonymize_ip: true });
}

function disableAnalytics(id: string) {
  if (!window.gtag) return;
  window.gtag("consent", "update", { analytics_storage: "denied" });
  // Remove GA cookies set before the visitor changed their mind.
  const suffix = id.replace(/^G-/, "");
  for (const name of ["_ga", `_ga_${suffix}`]) {
    document.cookie = `${name}=; Max-Age=0; path=/; domain=.${location.hostname}`;
    document.cookie = `${name}=; Max-Age=0; path=/`;
  }
}

/**
 * Google Analytics 4, loaded only after the visitor clicks "Accept cookies"
 * in the cookie banner. Set VITE_GA_MEASUREMENT_ID (e.g. G-XXXXXXX) to turn
 * it on; without it this component does nothing.
 */
export function Analytics() {
  const href = useRouterState({ select: (s) => s.location.href });
  const enabled = useRef(false);

  useEffect(() => {
    if (!MEASUREMENT_ID) return;
    const apply = (choice: ConsentChoice | null) => {
      enabled.current = choice === "accepted";
      if (enabled.current) {
        enableAnalytics(MEASUREMENT_ID);
        sendPageView();
      } else {
        disableAnalytics(MEASUREMENT_ID);
      }
    };
    apply(readConsent());
    return onConsentChange(apply);
  }, []);

  useEffect(() => {
    if (!MEASUREMENT_ID || !enabled.current) return;
    // Wait a tick so the new route's <title> is in place.
    const id = window.setTimeout(sendPageView, 0);
    return () => window.clearTimeout(id);
  }, [href]);

  return null;
}
