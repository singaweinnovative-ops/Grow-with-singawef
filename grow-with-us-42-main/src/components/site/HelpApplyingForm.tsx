import { useState, type FormEvent } from "react";
import { useSiteContent } from "@/lib/site-content-context";
import { FormSubmitError, submitFormToSupabase } from "@/lib/forms-client";
import { FormGuard } from "@/components/site/FormGuard";
import type { SiteOpportunity } from "@/lib/site-content-db";

type Opportunity = SiteOpportunity;

const inputClass =
  "rounded-sm border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-gold";

const CATEGORY_FIELD: Record<string, { label: string; options: string[] }> = {
  Funding: {
    label: "Which bursary or scheme?",
    options: [
      "NSFAS",
      "Funza Lushaka",
      "An institution-specific bursary",
      "Another bursary or scholarship",
      "Not sure yet",
    ],
  },
  Study: {
    label: "Which kind of application?",
    options: [
      "University application",
      "TVET college application",
      "Central Applications Clearing House (CACS)",
      "Not sure yet",
    ],
  },
  Work: {
    label: "Which kind of opportunity?",
    options: ["Learnership", "Internship", "Entry-level job", "Not sure yet"],
  },
  Competition: {
    label: "Which competition?",
    options: [
      "Eskom Expo for Young Scientists",
      "Another STEM or innovation competition",
      "Not sure yet",
    ],
  },
};

const HELP_OPTIONS = [
  "Understanding the requirements",
  "Gathering documents",
  "Filling in the application",
  "Funding or application fees",
  "Transport to submit or attend",
  "Interview preparation",
  "Something else",
];

export function HelpApplyingForm({ opportunity }: { opportunity: Opportunity }) {
  const { OPPORTUNITY_HELP_FORMS, SITE } = useSiteContent();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorDetail, setErrorDetail] = useState<string | null>(null);
  const [helpWith, setHelpWith] = useState<string[]>([]);
  const config =
    OPPORTUNITY_HELP_FORMS[opportunity.category as keyof typeof OPPORTUNITY_HELP_FORMS];
  const categoryField = CATEGORY_FIELD[opportunity.category] ?? CATEGORY_FIELD["Study"]!;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const formData = new FormData(e.currentTarget);
    formData.set("form_type", "help_applying");
    formData.set("opportunity", opportunity.title);
    try {
      await submitFormToSupabase("help_applying", formData);
      setStatus("sent");
    } catch (err) {
      setErrorDetail(err instanceof FormSubmitError ? err.message : null);
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-sm border border-gold/40 bg-gold-soft/40 p-6">
        <p className="font-display text-lg">Thank you — we have your details.</p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          A person reads and answers every message — if it's urgent, write to us directly and
          mention "{opportunity.title}".
        </p>
        <a
          href={`mailto:${SITE.email}?subject=${encodeURIComponent(`Help applying: ${opportunity.title}`)}`}
          className="slash mt-5 inline-block text-sm font-semibold transition-colors hover:text-clay"
        >
          {SITE.email}
        </a>
      </div>
    );
  }

  const toggleHelp = (option: string) => {
    setHelpWith((prev) =>
      prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option],
    );
  };

  return (
    <form
      className="grid gap-4 rounded-sm border border-gold/40 bg-gold-soft/40 p-6"
      onSubmit={handleSubmit}
    >
      <p className="text-xs leading-relaxed text-muted-foreground">
        {config?.blurb ?? "Tell us where you are and what is in the way. No cost, ever."}
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5 text-sm">
          <span className="eyebrow text-clay">Full name</span>
          <input required name="name" className={inputClass} />
        </label>
        <label className="grid gap-1.5 text-sm">
          <span className="eyebrow text-clay">Phone</span>
          <input required type="tel" name="phone" className={inputClass} />
        </label>
      </div>

      <label className="grid gap-1.5 text-sm">
        <span className="eyebrow text-clay">Email</span>
        <input required type="email" name="email" className={inputClass} />
      </label>

      <label className="grid gap-1.5 text-sm">
        <span className="eyebrow text-clay">{categoryField.label}</span>
        <select required name="categoryDetail" defaultValue="" className={inputClass}>
          <option value="" disabled>
            Choose one
          </option>
          {categoryField.options.map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
      </label>

      <fieldset className="grid gap-2">
        <legend className="eyebrow text-clay">What do you need help with?</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {HELP_OPTIONS.map((option) => (
            <label
              key={option}
              className="flex items-start gap-2.5 rounded-sm border border-border px-3 py-2.5 text-sm transition-colors has-[:checked]:border-gold has-[:checked]:bg-gold-soft/30"
            >
              <input
                type="checkbox"
                name="helpWith"
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

      <label className="grid gap-1.5 text-sm">
        <span className="eyebrow text-clay">Anything else (optional)</span>
        <textarea
          name="message"
          rows={2}
          placeholder="Only if there's something the options above didn't cover."
          className={`${inputClass} resize-none`}
        />
      </label>

      <FormGuard />
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-2 rounded-sm bg-ink px-5 py-3 text-sm font-semibold text-cream transition-colors hover:bg-clay disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send this to SINGAWE"}
      </button>
      {status === "error" && (
        <p className="text-sm text-destructive">
          {errorDetail ?? "Something went wrong."} Please email us directly at{" "}
          <a
            href={`mailto:${SITE.email}?subject=${encodeURIComponent(`Help applying: ${opportunity.title}`)}`}
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
