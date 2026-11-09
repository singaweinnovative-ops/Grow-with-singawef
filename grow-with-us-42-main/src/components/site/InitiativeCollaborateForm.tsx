import { useState, type FormEvent } from "react";
import type { ProgrammeBrand } from "@/lib/programme-brands";
import { useSiteContent } from "@/lib/site-content-context";
import { FormSubmitError, submitFormToSupabase } from "@/lib/forms-client";
import { FormGuard } from "@/components/site/FormGuard";

const inputClass =
  "rounded-sm border border-black/15 bg-white/70 px-4 py-3 text-sm outline-none transition-colors focus:border-current";

export function InitiativeCollaborateForm({
  brand,
  programmeName,
}: {
  brand: ProgrammeBrand;
  programmeName: string;
}) {
  const { SITE } = useSiteContent();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorDetail, setErrorDetail] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const formData = new FormData(e.currentTarget);
    formData.set("form_type", "initiative_collaborate");
    formData.set("programme", programmeName);
    try {
      await submitFormToSupabase("initiative_collaborate", formData);
      setStatus("sent");
    } catch (err) {
      setErrorDetail(err instanceof FormSubmitError ? err.message : null);
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-sm border p-6" style={{ borderColor: `${brand.accent}40` }}>
        <p className="font-display text-lg">Thank you — we have your details.</p>
        <p className="mt-3 text-sm leading-relaxed" style={{ color: brand.accent }}>
          A person reads and answers every message. If it's urgent, write to us and mention "
          {programmeName}".
        </p>
        <a
          href={`mailto:${SITE.email}?subject=${encodeURIComponent(`Collaboration: ${programmeName}`)}`}
          className="mt-5 inline-block text-sm font-semibold underline"
          style={{ color: brand.accent }}
        >
          {SITE.email}
        </a>
      </div>
    );
  }

  return (
    <form
      className="grid gap-4 rounded-sm border p-6"
      style={{ borderColor: `${brand.accent}40`, backgroundColor: brand.tint }}
      onSubmit={handleSubmit}
    >
      <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: brand.accent }}>
        Collaborate on {programmeName}
      </p>

      <label className="grid gap-1.5 text-sm">
        <span className="text-xs font-semibold" style={{ color: brand.accent }}>
          Your name or organisation
        </span>
        <input required name="name" className={inputClass} style={{ color: "#2E2419" }} />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5 text-sm">
          <span className="text-xs font-semibold" style={{ color: brand.accent }}>
            Email
          </span>
          <input
            required
            type="email"
            name="email"
            className={inputClass}
            style={{ color: "#2E2419" }}
          />
        </label>
        <label className="grid gap-1.5 text-sm">
          <span className="text-xs font-semibold" style={{ color: brand.accent }}>
            Phone
          </span>
          <input
            required
            type="tel"
            name="phone"
            className={inputClass}
            style={{ color: "#2E2419" }}
          />
        </label>
      </div>

      <label className="grid gap-1.5 text-sm">
        <span className="text-xs font-semibold" style={{ color: brand.accent }}>
          How would you like to collaborate?
        </span>
        <select
          required
          name="collabType"
          defaultValue=""
          className={inputClass}
          style={{ color: "#2E2419" }}
        >
          <option value="" disabled>
            Choose one
          </option>
          <option>Funding or sponsorship</option>
          <option>Venue, equipment or materials</option>
          <option>Expertise or facilitation</option>
          <option>An existing initiative to bring together</option>
          <option>Something else</option>
        </select>
      </label>

      <label className="grid gap-1.5 text-sm">
        <span className="text-xs font-semibold" style={{ color: brand.accent }}>
          Tell us more
        </span>
        <textarea
          required
          name="message"
          rows={4}
          className={`${inputClass} resize-none`}
          style={{ color: "#2E2419" }}
        />
      </label>

      <FormGuard />
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-2 rounded-sm px-5 py-3 text-sm font-semibold transition-opacity hover:opacity-90 disabled:opacity-60"
        style={{ backgroundColor: brand.accent, color: brand.onAccent }}
      >
        {status === "sending" ? "Sending…" : "Send this to SINGAWE"}
      </button>
      {status === "error" && (
        <p className="text-sm" style={{ color: brand.accent }}>
          {errorDetail ?? "Something went wrong."} Please email us directly at{" "}
          <a
            href={`mailto:${SITE.email}?subject=${encodeURIComponent(`Collaboration: ${programmeName}`)}`}
            className="underline"
          >
            {SITE.email}
          </a>
          .
        </p>
      )}
    </form>
  );
}
