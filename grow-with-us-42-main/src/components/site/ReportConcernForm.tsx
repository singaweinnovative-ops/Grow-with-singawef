import { useState, type FormEvent } from "react";
import { useSiteContent } from "@/lib/site-content-context";
import { FormSubmitError, submitFormToSupabase } from "@/lib/forms-client";
import { FormGuard } from "@/components/site/FormGuard";

const inputClass =
  "rounded-sm border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-gold";

export function ReportConcernForm() {
  const { SITE } = useSiteContent();
  const [anonymous, setAnonymous] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorDetail, setErrorDetail] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const formData = new FormData(e.currentTarget);
    formData.set("form_type", "report_concern");
    try {
      await submitFormToSupabase("report_concern", formData);
      setStatus("sent");
    } catch (err) {
      setErrorDetail(err instanceof FormSubmitError ? err.message : null);
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-sm border border-border bg-clay/10 p-6">
        <p className="font-display text-lg">Thank you — this has been received.</p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          A Steward will read this in confidence. If it is urgent, please also write to us directly
          so a person can act on it immediately.
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
      onSubmit={handleSubmit}
    >
      <p className="text-xs leading-relaxed text-muted-foreground">
        Every concern is read by a Steward, in confidence. You will never be asked to justify
        raising it, and it will never affect a Journeyer's place in a programme.
      </p>

      <label className="flex items-center gap-2.5 text-sm">
        <input
          type="checkbox"
          name="anonymous"
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

      <FormGuard />
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-2 rounded-sm bg-ink px-5 py-3 text-sm font-semibold text-cream transition-colors hover:bg-clay disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Submit report"}
      </button>
      {status === "error" && (
        <p className="text-sm text-destructive">
          {errorDetail ?? "Something went wrong."} Please email us directly at{" "}
          <a
            href={`mailto:${SITE.email}?subject=${encodeURIComponent("Safeguarding concern")}`}
            className="slash"
          >
            {SITE.email}
          </a>
          .
        </p>
      )}
    </form>
  );
}
