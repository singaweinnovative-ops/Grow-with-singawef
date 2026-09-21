import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { PageHero } from "@/components/site/PageHero";
import { SITE } from "@/lib/site-content";
import mentorship from "@/assets/mentorship.jpg";

export const Route = createFileRoute("/safety")({
  head: () => ({
    meta: [
      { title: "Safeguarding & Safety — SINGAWE Foundation" },
      {
        name: "description",
        content:
          "SINGAWE Foundation NPC's safeguarding commitments — how Guides are screened, how contact is structured, and how to raise a concern confidentially.",
      },
    ],
  }),
  component: Safety,
});

const COMMITMENTS = [
  {
    title: "Screening, every time",
    body: "Every Guide and representative is screened and briefed before they are matched with a Journeyer. No exceptions, regardless of how they were referred to us.",
  },
  {
    title: "Structured, recorded contact",
    body: "Mentorship happens through accountable, recorded channels on a fixed schedule — never through unstructured, unsupervised private contact.",
  },
  {
    title: "No cost, ever",
    body: "Journeyers are never asked to pay for access to mentorship, guidance or opportunity support. Anyone asking a Journeyer for money is not acting for the Foundation.",
  },
  {
    title: "Confidential reporting",
    body: "Concerns can be raised at any time, by anyone, in confidence — a Journeyer, a parent, a Guide or a member of the public — without fear of it affecting a Journeyer's place in a programme.",
  },
  {
    title: "Charter-bound",
    body: "All Guides and representatives are bound by the Foundation Charter and our safeguarding policy, overseen by our governance Stewards.",
  },
];

function Safety() {
  return (
    <>
    <PageHero image={mentorship} alt="A Guide and a Journeyer working together">
      <Reveal>
        <p className="eyebrow text-gold">Legal</p>
        <h1 className="mt-5 text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.02]">
          Safeguarding is non-negotiable.
        </h1>
        <div className="mt-8 h-px w-40 rule-draw bg-gold" />
        <p className="mt-8 max-w-2xl leading-relaxed text-cream/80">
          Every person who walks with {SITE.name} — Journeyer, Guide or Companion — is entitled to a
          safe, respectful and accountable relationship. These are our commitments.
        </p>
      </Reveal>
    </PageHero>

    <section className="mx-auto max-w-4xl px-6 py-16 lg:px-10 lg:py-24">
      <div className="space-y-10">
        {COMMITMENTS.map((c, i) => (
          <Reveal key={c.title} delay={i * 60}>
            <h2 className="font-display text-2xl">{c.title}</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">{c.body}</p>
          </Reveal>
        ))}
      </div>

      <Reveal delay={360} className="mt-16 rounded-sm border border-border bg-sand p-8">
        <h2 className="font-display text-xl">Raise a safeguarding concern</h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Write to us directly, or use our contact form and select "A safeguarding concern." Every
          message reaches a person, in confidence.
        </p>
        <a href={`mailto:${SITE.email}`} className="slash mt-5 inline-block text-sm font-semibold hover:text-clay">
          {SITE.email}
        </a>
      </Reveal>
    </section>
    </>
  );
}
