import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { PageHero } from "@/components/site/PageHero";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { SITE, FAQS } from "@/lib/site-content";
import community from "@/assets/community.jpg";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — SINGAWE Foundation" },
      {
        name: "description",
        content:
          "Answers to common questions about joining a SINGAWE programme, becoming a Guide, safeguarding and how to partner with the Foundation.",
      },
      { property: "og:title", content: "Frequently Asked Questions — SINGAWE Foundation" },
      {
        property: "og:description",
        content: "What people actually ask us, answered plainly.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Faq,
});

function Faq() {
  return (
    <>
      <PageHero image={community} alt="A SINGAWE Foundation community gathering">
        <Reveal>
          <p className="eyebrow text-gold">FAQ</p>
          <h1 className="mt-5 text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.02]">
            Frequently asked questions.
          </h1>
          <div className="mt-8 h-px w-40 rule-draw bg-gold" />
          <p className="mt-8 max-w-2xl leading-relaxed text-cream/80">
            What people actually ask us, answered plainly — no jargon, no fine print.
          </p>
        </Reveal>
      </PageHero>

      <section className="mx-auto max-w-3xl px-6 py-16 lg:px-10 lg:py-24">
        <Reveal>
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((f, i) => (
              <AccordionItem key={f.q} value={`faq-${i}`}>
                <AccordionTrigger className="font-display text-lg">{f.q}</AccordionTrigger>
                <AccordionContent className="leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>

        <Reveal
          delay={120}
          className="mt-16 rounded-sm border border-border bg-sand p-8 text-center"
        >
          <h2 className="font-display text-xl">Still have a question?</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Write to us and a person will answer — not a bot.
          </p>
          <a
            href={`mailto:${SITE.email}`}
            className="slash mt-5 inline-block text-sm font-semibold hover:text-clay"
          >
            {SITE.email}
          </a>
        </Reveal>
      </section>
    </>
  );
}
