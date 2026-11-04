import { useState, type FormEvent } from "react";
import { BirthDetailsField } from "@/components/site/BirthDetailsField";
import { SITE } from "@/lib/site-content";
import { submitFormToSupabase } from "@/lib/forms-client";

const inputClass =
  "rounded-sm border border-border bg-background px-4 py-3 text-base outline-none transition-colors focus:border-gold";
const fileClass =
  "rounded-sm border border-dashed border-border bg-background px-4 py-3 text-sm outline-none transition-colors file:mr-4 file:rounded-sm file:border-0 file:bg-ink file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-cream hover:border-gold";

export function IntakeForm({
  title,
  blurb,
  submitLabel,
  requireCv = false,
  formType,
}: {
  title: string;
  blurb: string;
  submitLabel: string;
  requireCv?: boolean;
  formType: "intake_journeyer" | "intake_guide";
}) {
  const [age, setAge] = useState<number | null>(null);
  const [idFile, setIdFile] = useState<File | null>(null);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [guardianConsent, setGuardianConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const isMinor = age !== null && age < 18;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const formData = new FormData(e.currentTarget);
    formData.set("form_type", formType);
    try {
      await submitFormToSupabase(formType, formData);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form
      className="rounded-sm border border-gold/40 bg-gold-soft/40 p-8 md:p-10"
      onSubmit={handleSubmit}
    >
      <h3 className="font-display text-2xl">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{blurb}</p>

      <div className="mt-8 grid gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="grid gap-2 text-sm">
            <span className="eyebrow text-clay">Full name</span>
            <input required name="name" className={inputClass} />
          </label>
          <label className="grid gap-2 text-sm">
            <span className="eyebrow text-clay">Phone</span>
            <input required name="phone" type="tel" className={inputClass} />
          </label>
        </div>

        <label className="grid gap-2 text-sm">
          <span className="eyebrow text-clay">Email</span>
          <input required type="email" name="email" className={inputClass} />
        </label>

        <BirthDetailsField onChange={({ age }) => setAge(age)} />

        <label className="grid gap-2 text-sm">
          <span className="eyebrow text-clay">Upload a copy of your ID</span>
          <input
            required
            type="file"
            name="idCopy"
            accept="image/*,.pdf"
            onChange={(e) => setIdFile(e.target.files?.[0] ?? null)}
            className={fileClass}
          />
          {idFile ? (
            <span className="text-xs text-muted-foreground">Selected: {idFile.name}</span>
          ) : null}
        </label>

        {requireCv ? (
          <label className="grid gap-2 text-sm">
            <span className="eyebrow text-clay">Upload your CV</span>
            <input
              required
              type="file"
              name="cv"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setCvFile(e.target.files?.[0] ?? null)}
              className={fileClass}
            />
            {cvFile ? (
              <span className="text-xs text-muted-foreground">Selected: {cvFile.name}</span>
            ) : null}
          </label>
        ) : null}

        {isMinor ? (
          <div className="rounded-sm border border-gold/40 bg-gold-soft/30 p-5">
            <p className="eyebrow text-clay">Guardian details required</p>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Because this Journeyer is under 18, a parent or legal guardian must be listed and must
              consent below.
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm">
                <span className="eyebrow text-clay">Guardian full name</span>
                <input required name="guardianName" className={inputClass} />
              </label>
              <label className="grid gap-2 text-sm">
                <span className="eyebrow text-clay">Relationship to Journeyer</span>
                <input required name="guardianRelationship" className={inputClass} />
              </label>
              <label className="grid gap-2 text-sm">
                <span className="eyebrow text-clay">Guardian phone</span>
                <input required type="tel" name="guardianPhone" className={inputClass} />
              </label>
              <label className="grid gap-2 text-sm">
                <span className="eyebrow text-clay">Guardian email</span>
                <input required type="email" name="guardianEmail" className={inputClass} />
              </label>
            </div>
            <label className="mt-5 flex items-start gap-3 text-xs leading-relaxed text-muted-foreground">
              <input
                required
                type="checkbox"
                name="guardianConsent"
                checked={guardianConsent}
                onChange={(e) => setGuardianConsent(e.target.checked)}
                className="mt-0.5 size-4 shrink-0 accent-[var(--gold)]"
              />
              I confirm I am this Journeyer's parent or legal guardian and I consent to their
              participation in SINGAWE Foundation programmes, within the Foundation's safeguarding
              framework.
            </label>
          </div>
        ) : null}

        <label className="grid gap-2 text-sm">
          <span className="eyebrow text-clay">Anything else we should know</span>
          <textarea
            name="message"
            rows={4}
            className={`${inputClass} resize-none`}
            placeholder="Where you are, what you need, or what's in the way."
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={(isMinor && !guardianConsent) || status === "sending"}
        className="mt-8 w-full rounded-sm bg-ink px-6 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-clay disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "sending"
          ? "Sending…"
          : status === "sent"
            ? "Thank you — we have your details"
            : submitLabel}
      </button>

      {status === "sent" && (
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          A person reads and answers every message. If it's urgent, email us directly at{" "}
          <a href={`mailto:${SITE.email}?subject=${encodeURIComponent(title)}`} className="slash">
            {SITE.email}
          </a>
          .
        </p>
      )}
      {status === "error" && (
        <p className="mt-4 text-sm leading-relaxed text-destructive">
          Something went wrong. Please email us directly at{" "}
          <a href={`mailto:${SITE.email}?subject=${encodeURIComponent(title)}`} className="slash">
            {SITE.email}
          </a>{" "}
          and attach your documents.
        </p>
      )}
    </form>
  );
}
