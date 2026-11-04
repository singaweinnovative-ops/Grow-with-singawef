import { Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import logoDark from "@/assets/logo-dark-trim.png";
import { SITE } from "@/lib/site-content";
import { FORMSPREE_ENDPOINT } from "@/lib/env";
import { submitFormToSupabase } from "@/lib/forms-client";
import { SocialLinks } from "@/components/site/SocialIcons";
import { ReportConcernForm } from "@/components/site/ReportConcernForm";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [reportOpen, setReportOpen] = useState(false);

  async function handleSubscribe(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setSubscribeStatus("sending");
    const formData = new FormData(e.currentTarget);
    formData.set("form_type", "newsletter");

    try {
      await submitFormToSupabase("newsletter", formData);
      if (FORMSPREE_ENDPOINT) {
        fetch(FORMSPREE_ENDPOINT, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: formData,
        }).catch(() => {});
      }
      setSubscribeStatus("sent");
    } catch {
      setSubscribeStatus("error");
    }
  }

  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid gap-14 md:grid-cols-2 lg:grid-cols-[1.1fr_0.7fr_0.7fr_0.7fr_0.9fr]">
          <div>
            <img
              src={logoDark}
              alt="SINGAWE Foundation"
              width={320}
              height={64}
              loading="lazy"
              className="h-16 w-auto object-contain object-left"
            />
            <p className="mt-6 max-w-sm font-display text-2xl leading-snug">
              SINGAWE means <span className="text-gold">“We Are For You.”</span>
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/65">
              {SITE.legal} is a South African Non-Profit Company established under the Companies
              Act, 2008 (Act No. 71 of 2008), operating independently and without political
              affiliation.
            </p>
            <SocialLinks className="mt-6" />
          </div>

          <div>
            <h3 className="eyebrow text-gold">Explore</h3>
            <ul className="mt-6 space-y-3 text-sm text-cream/75">
              {[
                { to: "/about", label: "About the Foundation" },
                { to: "/our-work", label: "Our Work" },
                { to: "/who-we-serve", label: "Who We Serve" },
                { to: "/programmes", label: "Programmes" },
                { to: "/people", label: "Our People" },
                { to: "/collaborate", label: "Collaborate" },
                { to: "/opportunities", label: "Opportunities" },
                { to: "/gallery", label: "Gallery" },
                { to: "/resources", label: "Resources" },
                { to: "/news", label: "News & Media" },
                { to: "/faq", label: "FAQ" },
                { to: "/get-involved", label: "Get Involved" },
                { to: "/contact", label: "Contact" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="transition-colors hover:text-gold">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="eyebrow text-gold">Legal</h3>
            <ul className="mt-6 space-y-3 text-sm text-cream/75">
              <li>
                <Link to="/safety" className="transition-colors hover:text-gold">
                  Safety &amp; Safeguarding
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="transition-colors hover:text-gold">
                  Privacy Policy
                </Link>
              </li>
            </ul>
            <button
              type="button"
              onClick={() => setReportOpen(true)}
              className="mt-6 rounded-sm border border-gold/50 px-4 py-2 text-xs font-semibold text-gold transition-colors hover:bg-gold hover:text-ink"
            >
              Report a concern
            </button>
          </div>

          <div>
            <h3 className="eyebrow text-gold">Reach us</h3>
            <ul className="mt-6 space-y-3 text-sm text-cream/75">
              <li>
                <a href={`mailto:${SITE.email}`} className="transition-colors hover:text-gold">
                  {SITE.email}
                </a>
              </li>
              <li>{SITE.phone}</li>
              <li>
                {SITE.registration.registeredAddressLines.map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}
              </li>
            </ul>
            <p className="mt-8 text-xs leading-relaxed text-cream/45">
              Governed by the Foundation Charter (SF-001), Version 1.0 — Issued for Execution.
            </p>
          </div>

          <div>
            <h3 className="eyebrow text-gold">Stay in the loop</h3>
            <p className="mt-6 text-sm leading-relaxed text-cream/65">
              One email a month — new opportunities, programme updates and stories from the walk.
            </p>
            <form className="mt-5 flex flex-col gap-2 sm:flex-row" onSubmit={handleSubscribe}>
              <input type="hidden" name="_subject" value="New newsletter signup" />
              <input type="hidden" name="source" value="Footer newsletter" />
              <label className="sr-only" htmlFor="footer-newsletter-email">
                Email address
              </label>
              <input
                id="footer-newsletter-email"
                type="email"
                name="email"
                required
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="min-w-0 flex-1 rounded-sm border border-cream/20 bg-cream/[0.06] px-4 py-2.5 text-sm text-cream placeholder:text-cream/40 outline-none transition-colors focus:border-gold"
              />
              <button
                type="submit"
                disabled={subscribeStatus === "sending"}
                className="shrink-0 rounded-sm bg-gold px-4 py-2.5 text-xs font-semibold text-ink transition-colors hover:bg-gold-soft disabled:opacity-60"
              >
                {subscribeStatus === "sending" ? "Sending…" : "Subscribe"}
              </button>
            </form>
            {subscribeStatus === "sent" && (
              <p className="mt-3 text-xs leading-relaxed text-cream/55">
                Thank you — you're on the list.
              </p>
            )}
            {subscribeStatus === "error" && (
              <p className="mt-3 text-xs leading-relaxed text-cream/55">
                Something went wrong. Please write to{" "}
                <a
                  href={`mailto:${SITE.email}?subject=${encodeURIComponent("Newsletter signup")}`}
                  className="underline hover:text-gold"
                >
                  {SITE.email}
                </a>{" "}
                instead.
              </p>
            )}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-cream/12 pt-8 text-xs text-cream/50 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <p>
              © {new Date().getFullYear()} {SITE.legal}. All rights reserved.
            </p>
            <p className="text-cream/40">
              {SITE.legal} · CIPC Registration No.: {SITE.registration.cipcNumber} · Income Tax
              Reference No.: {SITE.registration.taxRefNumber}
            </p>
          </div>
          <p className="font-display text-sm tracking-wide text-gold">{SITE.tagline}</p>
        </div>
      </div>

      <Sheet open={reportOpen} onOpenChange={setReportOpen}>
        <SheetContent
          side="right"
          className="w-full overflow-y-auto bg-background text-foreground sm:max-w-lg"
        >
          <SheetHeader>
            <p className="eyebrow text-clay">Confidential</p>
            <SheetTitle className="font-display text-2xl">Report a concern</SheetTitle>
            <SheetDescription>
              Raise a safeguarding concern directly with our Stewards. See our{" "}
              <Link
                to="/safety"
                className="underline hover:text-clay"
                onClick={() => setReportOpen(false)}
              >
                Safety &amp; Safeguarding
              </Link>{" "}
              commitments.
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            <ReportConcernForm />
          </div>
        </SheetContent>
      </Sheet>
    </footer>
  );
}
