import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Reveal } from "@/components/site/Reveal";
import { PageHero } from "@/components/site/PageHero";
import { useSiteContent } from "@/lib/site-content-context";
import { FORMSPREE_ENDPOINT } from "@/lib/env";
import { FormSubmitError, submitFormToSupabase } from "@/lib/forms-client";
import { FormGuard } from "@/components/site/FormGuard";
import heroPortrait from "@/assets/hero-portrait.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact SINGAWE Foundation NPC" },
      {
        name: "description",
        content:
          "Reach SINGAWE Foundation NPC in Durban, South Africa — for support, mentorship, partnerships, safeguarding concerns or general enquiries.",
      },
      { property: "og:title", content: "Contact SINGAWE Foundation" },
      {
        property: "og:description",
        content: "Your Journey. Our Commitment. Write to us — we read everything.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  const { SITE } = useSiteContent();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorDetail, setErrorDetail] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setStatus("sending");
    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.set("form_type", "contact");

    try {
      await submitFormToSupabase("contact", formData);
      if (FORMSPREE_ENDPOINT) {
        fetch(FORMSPREE_ENDPOINT, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: formData,
        }).catch(() => {});
      }
      setStatus("sent");
      form.reset();
    } catch (err) {
      setErrorDetail(err instanceof FormSubmitError ? err.message : null);
      setStatus("error");
    }
  }

  return (
    <>
      <PageHero image={heroPortrait} alt="A young South African student">
        <Reveal>
          <p className="eyebrow text-gold">Contact</p>
          <h1 className="mt-5 max-w-3xl text-[clamp(2.4rem,5vw,3.8rem)] leading-[1.02]">
            We read everything that reaches us.
          </h1>
          <div className="mt-8 h-px w-40 rule-draw bg-gold" />
          <p className="mt-8 max-w-md leading-relaxed text-cream/80">
            Whether you are asking for support, offering it, or raising a safeguarding concern, your
            message reaches a person — not a queue.
          </p>
        </Reveal>
      </PageHero>

      <section className="mx-auto grid max-w-7xl gap-16 bg-gold-soft/15 px-6 py-16 lg:grid-cols-[0.85fr_1fr] lg:px-10 lg:py-24">
        <Reveal>
          <dl className="space-y-6 text-sm">
            <div>
              <dt className="eyebrow text-clay">Email</dt>
              <dd className="mt-2">
                <a href={`mailto:${SITE.email}`} className="slash hover:text-clay">
                  {SITE.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-clay">Telephone</dt>
              <dd className="mt-2">{SITE.phone}</dd>
            </div>
            <div>
              <dt className="eyebrow text-clay">Based in</dt>
              <dd className="mt-2">{SITE.location}</dd>
            </div>
            <div>
              <dt className="eyebrow text-clay">Registered as</dt>
              <dd className="mt-2 text-muted-foreground">
                {SITE.legal}, a Non-Profit Company incorporated under the Companies Act, 2008.
              </dd>
            </div>
          </dl>
        </Reveal>

        <Reveal delay={120}>
          <form
            className="rounded-sm border border-gold/40 bg-gold-soft/40 p-8 md:p-10"
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="_subject" value="New message from the SINGAWE website" />
            <input type="hidden" name="source" value="Contact page" />
            <h2 className="font-display text-3xl">Send a message</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Tell us who you are and what you need. We respond as soon as we can.
            </p>

            <div className="mt-8 grid gap-5">
              <label className="grid gap-2 text-sm">
                <span className="eyebrow text-clay">Your name</span>
                <input
                  required
                  name="name"
                  className="rounded-sm border border-border bg-background px-4 py-3 text-base outline-none transition-colors focus:border-gold"
                />
              </label>
              <label className="grid gap-2 text-sm">
                <span className="eyebrow text-clay">Email</span>
                <input
                  required
                  type="email"
                  name="email"
                  className="rounded-sm border border-border bg-background px-4 py-3 text-base outline-none transition-colors focus:border-gold"
                />
              </label>
              <label className="grid gap-2 text-sm">
                <span className="eyebrow text-clay">I am reaching out as</span>
                <select
                  name="role"
                  className="rounded-sm border border-border bg-background px-4 py-3 text-base outline-none transition-colors focus:border-gold"
                >
                  <option>A Journeyer seeking support</option>
                  <option>Someone offering to be a Guide</option>
                  <option>An organisation or Companion</option>
                  <option>Media or general enquiry</option>
                  <option>A safeguarding concern</option>
                </select>
              </label>
              <label className="grid gap-2 text-sm">
                <span className="eyebrow text-clay">Message</span>
                <textarea
                  required
                  name="message"
                  rows={5}
                  className="resize-none rounded-sm border border-border bg-background px-4 py-3 text-base outline-none transition-colors focus:border-gold"
                />
              </label>
            </div>

            <FormGuard />
            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-8 w-full rounded-sm bg-ink px-6 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-clay disabled:opacity-60"
            >
              {status === "sending"
                ? "Sending…"
                : status === "sent"
                  ? "Thank you — we have your message"
                  : "Send message"}
            </button>
            {status === "error" && (
              <p className="mt-4 text-sm text-destructive">
                Something went wrong sending your message. Please email us directly at{" "}
                <a href={`mailto:${SITE.email}`} className="slash">
                  {SITE.email}
                </a>
                .
              </p>
            )}
          </form>
        </Reveal>
      </section>
    </>
  );
}
