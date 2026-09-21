import { useState } from "react";
import { SITE } from "@/lib/site-content";

const inputClass =
  "rounded-sm border border-border bg-background px-4 py-3 text-base outline-none transition-colors focus:border-gold";

const HELP_OPTIONS = [
  "My time and skills (event or ongoing volunteering)",
  "Funding",
  "Venue, equipment or materials",
  "Professional expertise",
  "An opportunity pipeline (bursary, job, competition)",
  "Something else",
];

export function VolunteerCompanionForm() {
  const [as, setAs] = useState<"individual" | "organisation">("individual");
  const [helpWith, setHelpWith] = useState<string[]>([]);
  const [sent, setSent] = useState(false);

  const toggleHelp = (option: string) => {
    setHelpWith((prev) =>
      prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option],
    );
  };

  return (
    <form
      className="rounded-sm border border-gold/40 bg-gold-soft/40 p-8 md:p-10"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <h3 className="font-display text-2xl">Volunteer &amp; Companion form</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Whether you are one person with an afternoon to give, or an organisation with more to
        offer — tell us how you would like to help.
      </p>

      <div className="mt-8 grid gap-5">
        <div className="flex gap-2 text-xs">
          {(["individual", "organisation"] as const).map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => setAs(opt)}
              className={`rounded-sm border px-3 py-1.5 capitalize transition-colors ${
                as === opt
                  ? "border-ink bg-ink text-cream"
                  : "border-border text-muted-foreground hover:border-gold hover:text-clay"
              }`}
            >
              I am an {opt}
            </button>
          ))}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="grid gap-2 text-sm">
            <span className="eyebrow text-clay">
              {as === "individual" ? "Full name" : "Organisation name"}
            </span>
            <input required name="name" className={inputClass} />
          </label>
          <label className="grid gap-2 text-sm">
            <span className="eyebrow text-clay">Phone</span>
            <input required type="tel" name="phone" className={inputClass} />
          </label>
        </div>

        <label className="grid gap-2 text-sm">
          <span className="eyebrow text-clay">Email</span>
          <input required type="email" name="email" className={inputClass} />
        </label>

        <fieldset className="grid gap-2">
          <legend className="eyebrow text-clay">How would you like to help?</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {HELP_OPTIONS.map((option) => (
              <label
                key={option}
                className="flex items-start gap-2.5 rounded-sm border border-border px-3 py-2.5 text-sm transition-colors has-[:checked]:border-gold has-[:checked]:bg-gold-soft/30"
              >
                <input
                  type="checkbox"
                  name="helpType"
                  value={option}
                  checked={helpWith.includes(option)}
                  onChange={() => toggleHelp(option)}
                  className="mt-0.5 size-4 shrink-0 accent-[var(--gold)]"
                />
                {option}
              </label>
            ))}
          </div>
        </fieldset>

        <label className="grid gap-2 text-sm">
          <span className="eyebrow text-clay">Anything else (optional)</span>
          <textarea
            name="message"
            rows={3}
            className={`${inputClass} resize-none`}
            placeholder="Dates, availability or details that matter."
          />
        </label>
      </div>

      <button
        type="submit"
        className="mt-8 w-full rounded-sm bg-ink px-6 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-clay"
      >
        {sent ? "Thank you — we have your details" : "Send it to the Foundation"}
      </button>
      {sent && (
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          This form is not yet wired to our intake system. In the meantime, please email us
          directly at{" "}
          <a href={`mailto:${SITE.email}?subject=${encodeURIComponent("Volunteer / Companion enquiry")}`} className="slash">
            {SITE.email}
          </a>{" "}
          — a person reads and answers every message.
        </p>
      )}
    </form>
  );
}
