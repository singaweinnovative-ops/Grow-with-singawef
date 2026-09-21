import { FORMS, SITE } from "@/lib/site-content";
import { cn } from "@/lib/utils";

type FormKey = keyof typeof FORMS;

/**
 * Renders a Google Form directly on the page. Paste the form's embed URL into
 * FORMS in src/lib/site-content.ts and it appears here — responses land in your
 * Google Sheet. Until then a graceful fallback with a direct email is shown.
 */
export function EmbeddedForm({
  form,
  className,
  tone = "light",
}: {
  form: FormKey;
  className?: string;
  tone?: "light" | "dark";
}) {
  const config = FORMS[form];
  const dark = tone === "dark";

  return (
    <div
      className={cn(
        "overflow-hidden rounded-sm border",
        dark ? "border-cream/15 bg-cream/[0.04]" : "border-border bg-card",
        className,
      )}
    >
      <div className={cn("border-b px-6 py-5", dark ? "border-cream/15" : "border-border")}>
        <p className="eyebrow text-gold">Fill this in right here</p>
        <h3 className="mt-2 font-display text-2xl leading-tight">{config.title}</h3>
        <p className={cn("mt-2 text-sm", dark ? "text-cream/65" : "text-muted-foreground")}>
          {config.blurb}
        </p>
      </div>

      {config.embedUrl ? (
        <iframe
          src={config.embedUrl}
          title={config.title}
          height={config.height ?? 1000}
          loading="lazy"
          className="w-full bg-background"
          style={{ border: 0 }}
        >
          Loading form…
        </iframe>
      ) : (
        <div className="px-6 py-10">
          <p className={cn("text-sm leading-relaxed", dark ? "text-cream/70" : "text-muted-foreground")}>
            This form is being finalised. In the meantime, write to us directly — a person reads
            every message and answers it.
          </p>
          <a
            href={`mailto:${SITE.email}?subject=${encodeURIComponent(config.title)}`}
            className="slash mt-6 inline-block text-sm font-semibold transition-colors hover:text-clay"
          >
            {SITE.email}
          </a>
          <p
            className={cn(
              "mt-8 border-t pt-5 text-xs leading-relaxed",
              dark ? "border-cream/15 text-cream/45" : "border-border text-muted-foreground/70",
            )}
          >
            Admin note: paste the Google Form embed link into FORMS.{form}.embedUrl and this section
            becomes a live, fillable form on the site.
          </p>
        </div>
      )}
    </div>
  );
}
