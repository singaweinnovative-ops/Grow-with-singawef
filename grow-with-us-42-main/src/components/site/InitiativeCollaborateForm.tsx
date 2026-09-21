import { useState } from "react";
import type { ProgrammeBrand } from "@/lib/programme-brands";
import { SITE } from "@/lib/site-content";

const inputClass =
  "rounded-sm border border-black/15 bg-white/70 px-4 py-3 text-sm outline-none transition-colors focus:border-current";

export function InitiativeCollaborateForm({
  brand,
  programmeName,
}: {
  brand: ProgrammeBrand;
  programmeName: string;
}) {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="rounded-sm border p-6" style={{ borderColor: `${brand.accent}40` }}>
        <p className="font-display text-lg">Thank you — we have your details.</p>
        <p className="mt-3 text-sm leading-relaxed" style={{ color: brand.accent }}>
          This form is not yet wired to our intake system. In the meantime, write to us and mention
          "{programmeName}" — a person reads and answers every message.
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
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
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
          <input required type="email" name="email" className={inputClass} style={{ color: "#2E2419" }} />
        </label>
        <label className="grid gap-1.5 text-sm">
          <span className="text-xs font-semibold" style={{ color: brand.accent }}>
            Phone
          </span>
          <input required type="tel" name="phone" className={inputClass} style={{ color: "#2E2419" }} />
        </label>
      </div>

      <label className="grid gap-1.5 text-sm">
        <span className="text-xs font-semibold" style={{ color: brand.accent }}>
          How would you like to collaborate?
        </span>
        <select required name="collabType" defaultValue="" className={inputClass} style={{ color: "#2E2419" }}>
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

      <button
        type="submit"
        className="mt-2 rounded-sm px-5 py-3 text-sm font-semibold transition-opacity hover:opacity-90"
        style={{ backgroundColor: brand.accent, color: brand.onAccent }}
      >
        Send this to SINGAWE
      </button>
    </form>
  );
}
