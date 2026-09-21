import { useState } from "react";
import { SITE } from "@/lib/site-content";

const inputClass =
  "rounded-sm border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-gold";

export function ReportConcernForm() {
  const [anonymous, setAnonymous] = useState(false);
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="rounded-sm border border-border bg-clay/10 p-6">
        <p className="font-display text-lg">Thank you — this has been received.</p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          This form is not yet wired to our intake system, so please also write to us directly so a
          person can act on it immediately.
        </p>
        <a
          href={`mailto:${SITE.email}?subject=${encodeURIComponent("Safeguarding concern")}`}
          className="slash mt-5 inline-block text-sm font-semibold transition-colors hover:text-clay"
        >
          {SITE.email}
        </a>
      </div>
    );
  }

  return (
    <form
      className="grid gap-4 rounded-sm border border-gold/40 bg-gold-soft/40 p-6"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <p className="text-xs leading-relaxed text-muted-foreground">
        Every concern is read by a Steward, in confidence. You will never be asked to justify
        raising it, and it will never affect a Journeyer's place in a programme.
      </p>

      <label className="flex items-center gap-2.5 text-sm">
        <input
          type="checkbox"
          checked={anonymous}
          onChange={(e) => setAnonymous(e.target.checked)}
          className="size-4 shrink-0 accent-[var(--gold)]"
        />
        I would like to report this anonymously
      </label>

      {!anonymous && (
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-1.5 text-sm">
            <span className="eyebrow text-clay">Your name</span>
            <input name="name" className={inputClass} />
          </label>
          <label className="grid gap-1.5 text-sm">
            <span className="eyebrow text-clay">Email or phone</span>
            <input name="contact" className={inputClass} />
          </label>
        </div>
      )}

      <label className="grid gap-1.5 text-sm">
        <span className="eyebrow text-clay">I am raising this as</span>
        <select name="role" defaultValue="" className={inputClass}>
          <option value="" disabled>
            Choose one
          </option>
          <option>A Journeyer</option>
          <option>A parent or guardian</option>
          <option>A Guide</option>
          <option>A Companion or partner</option>
          <option>A member of the public</option>
        </select>
      </label>

      <label className="grid gap-1.5 text-sm">
        <span className="eyebrow text-clay">What happened?</span>
        <textarea
          required
          name="details"
          rows={6}
          placeholder="Share as much or as little as you're comfortable with — who, what, when and where it happened."
          className={`${inputClass} resize-none`}
        />
      </label>

      <button
        type="submit"
        className="mt-2 rounded-sm bg-ink px-5 py-3 text-sm font-semibold text-cream transition-colors hover:bg-clay"
      >
        Submit report
      </button>
    </form>
  );
}
