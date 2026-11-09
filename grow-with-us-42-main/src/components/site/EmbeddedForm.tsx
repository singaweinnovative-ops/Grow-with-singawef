import { useState, type FormEvent } from "react";
import { useSiteContent } from "@/lib/site-content-context";
import type { SiteContent } from "@/lib/site-content";
import { FormSubmitError, submitFormToSupabase } from "@/lib/forms-client";
import { FormGuard } from "@/components/site/FormGuard";
import { cn } from "@/lib/utils";

type FormKey = keyof SiteContent["FORMS"];

export function EmbeddedForm({
  form,
  className,
  tone = "light",
}: {
  form: FormKey;
  className?: string;
  tone?: "light" | "dark";
}) {
  const { FORMS, SITE } = useSiteContent();
  const config = FORMS[form];
  const dark = tone === "dark";
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorDetail, setErrorDetail] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const formData = new FormData(formElement);
    formData.set("source", config.title);
    setStatus("sending");

    try {
      await submitFormToSupabase(form === "newsTip" ? "news_tip" : form, formData);
      setStatus("sent");
      formElement.reset();
    } catch (err) {
      setErrorDetail(err instanceof FormSubmitError ? err.message : null);
      setStatus("error");
    }
  }

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

      <form className="grid gap-5 px-6 py-8" onSubmit={handleSubmit}>
        <input type="hidden" name="_subject" value={config.title} />
        <label className="grid gap-2 text-sm">
          <span className={cn("eyebrow", dark ? "text-gold" : "text-clay")}>Your name</span>
          <input
            required
            name="name"
            autoComplete="name"
            className="rounded-sm border border-border bg-background px-4 py-3 text-base text-foreground outline-none transition-colors focus:border-gold"
          />
        </label>
        <label className="grid gap-2 text-sm">
          <span className={cn("eyebrow", dark ? "text-gold" : "text-clay")}>Email</span>
          <input
            required
            type="email"
            name="email"
            autoComplete="email"
            className="rounded-sm border border-border bg-background px-4 py-3 text-base text-foreground outline-none transition-colors focus:border-gold"
          />
        </label>
        <label className="grid gap-2 text-sm">
          <span className={cn("eyebrow", dark ? "text-gold" : "text-clay")}>
            Organisation or role <span className="normal-case text-muted-foreground">(optional)</span>
          </span>
          <input
            name="organisation"
            autoComplete="organization"
            className="rounded-sm border border-border bg-background px-4 py-3 text-base text-foreground outline-none transition-colors focus:border-gold"
          />
        </label>
        <label className="grid gap-2 text-sm">
          <span className={cn("eyebrow", dark ? "text-gold" : "text-clay")}>Message</span>
          <textarea
            required
            name="message"
            rows={5}
            className="resize-y rounded-sm border border-border bg-background px-4 py-3 text-base text-foreground outline-none transition-colors focus:border-gold"
          />
        </label>
        <FormGuard />
        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-sm bg-ink px-6 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-clay disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Send enquiry"}
        </button>
        {status === "sent" ? (
          <p role="status" className="text-sm text-muted-foreground">
            Thank you. Your message has reached the SINGAWE team.
          </p>
        ) : null}
        {status === "error" ? (
          <p role="alert" className="text-sm text-destructive">
            {errorDetail ?? "Something went wrong."} Please email{" "}
            <a href={`mailto:${SITE.email}`} className="underline">
              {SITE.email}
            </a>
            .
          </p>
        ) : null}
      </form>
    </div>
  );
}
