/**
 * Cookie consent, stored in this browser only. "accepted" allows analytics;
 * "essential-only" (or no answer yet) keeps Google Analytics switched off.
 */
export type ConsentChoice = "accepted" | "essential-only";

const STORAGE_KEY = "singawe-cookie-consent";
const CHANGE_EVENT = "singawe:consent-change";
const OPEN_EVENT = "singawe:consent-open";

export function readConsent(): ConsentChoice | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "accepted" || value === "essential-only" ? value : null;
  } catch {
    return null;
  }
}

export function writeConsent(choice: ConsentChoice) {
  try {
    localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    // Storage may be blocked; the choice still applies for this page view.
  }
  window.dispatchEvent(new CustomEvent<ConsentChoice>(CHANGE_EVENT, { detail: choice }));
}

export function onConsentChange(listener: (choice: ConsentChoice) => void) {
  const handler = (event: Event) => listener((event as CustomEvent<ConsentChoice>).detail);
  window.addEventListener(CHANGE_EVENT, handler);
  return () => window.removeEventListener(CHANGE_EVENT, handler);
}

/** Re-opens the cookie banner, e.g. from a "Cookie settings" link in the footer. */
export function openConsentSettings() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function onConsentSettingsOpen(listener: () => void) {
  window.addEventListener(OPEN_EVENT, listener);
  return () => window.removeEventListener(OPEN_EVENT, listener);
}
