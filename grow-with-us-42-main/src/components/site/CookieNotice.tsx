import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  onConsentSettingsOpen,
  readConsent,
  writeConsent,
  type ConsentChoice,
} from "@/lib/consent";

export function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!readConsent()) setVisible(true);
    return onConsentSettingsOpen(() => setVisible(true));
  }, []);

  const dismiss = (value: ConsentChoice) => {
    writeConsent(value);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie notice"
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-gold/20 bg-ink"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between lg:px-10">
        <p className="max-w-2xl text-sm leading-relaxed text-cream/75">
          We use essential storage to keep this site working. With your permission we also use
          Google Analytics cookies to understand how the site is used. No personal data is sold,
          ever. Read our{" "}
          <Link to="/privacy" className="text-gold underline hover:text-gold-soft">
            Privacy Policy
          </Link>{" "}
          for details.
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => dismiss("essential-only")}
            className="rounded-sm border border-gold/50 px-4 py-2 text-xs font-semibold text-gold transition-colors hover:bg-gold/10"
          >
            Essential only
          </button>
          <button
            type="button"
            onClick={() => dismiss("accepted")}
            className="rounded-sm bg-gold px-4 py-2 text-xs font-semibold text-ink transition-colors hover:bg-gold-soft"
          >
            Accept cookies
          </button>
        </div>
      </div>
    </div>
  );
}
