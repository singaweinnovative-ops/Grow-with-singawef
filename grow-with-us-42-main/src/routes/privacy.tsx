import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { PageHero } from "@/components/site/PageHero";
import { SITE } from "@/lib/site-content";
import steam from "@/assets/steam.jpg";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — SINGAWE Foundation" },
      {
        name: "description",
        content:
          "How SINGAWE Foundation NPC collects, uses and protects personal information, in line with South Africa's Protection of Personal Information Act (POPIA).",
      },
    ],
  }),
  component: Privacy,
});

const SECTIONS = [
  {
    title: "What we collect",
    body: "Names, contact details, school or institution, and the information you choose to share in an interest, application-help or contact form. We never ask for banking details or payment information from a Journeyer.",
  },
  {
    title: "Why we collect it",
    body: "To match a Journeyer with a Guide, respond to a request for help applying, run our programmes safely, and keep in touch through updates such as our newsletter — never to sell or trade your information.",
  },
  {
    title: "Who sees it",
    body: "Only Foundation staff, screened Guides and representatives directly involved in your programme. Partner organisations only receive what is necessary to process an application you have asked help with, and only with your knowledge.",
  },
  {
    title: "How long we keep it",
    body: "For as long as it is needed for the purpose it was collected, or as required by law and our safeguarding framework — after which it is securely deleted.",
  },
  {
    title: "Your rights",
    body: "Under the Protection of Personal Information Act, 2013 (POPIA), you may ask what we hold about you, request a correction, withdraw consent, or ask us to delete it, at any time and at no cost.",
  },
  {
    title: "Newsletter and forms",
    body: "If you subscribe to updates or submit a form, we use your email only to contact you about that request or our work — you can unsubscribe at any time via the link in any email, or by writing to us.",
  },
];

function Privacy() {
  return (
    <>
    <PageHero image={steam} alt="Students collaborating on a hands-on project">
      <Reveal>
        <p className="eyebrow text-gold">Legal</p>
        <h1 className="mt-5 text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.02]">Privacy Policy</h1>
        <div className="mt-8 h-px w-40 rule-draw bg-gold" />
        <p className="mt-8 max-w-2xl leading-relaxed text-cream/80">
          {SITE.legal} respects your privacy and is committed to protecting your personal
          information in line with the Protection of Personal Information Act, 2013 (POPIA).
        </p>
      </Reveal>
    </PageHero>

    <section className="mx-auto max-w-4xl px-6 py-16 lg:px-10 lg:py-24">
      <div className="space-y-10">
        {SECTIONS.map((s, i) => (
          <Reveal key={s.title} delay={i * 60}>
            <h2 className="font-display text-2xl">{s.title}</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">{s.body}</p>
          </Reveal>
        ))}
      </div>

      <Reveal delay={360} className="mt-16 rounded-sm border border-border bg-sand p-8">
        <h2 className="font-display text-xl">Questions about your information?</h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Write to us and we will respond promptly.
        </p>
        <a href={`mailto:${SITE.email}`} className="slash mt-5 inline-block text-sm font-semibold hover:text-clay">
          {SITE.email}
        </a>
      </Reveal>
    </section>
    </>
  );
}
