import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { PageHero } from "@/components/site/PageHero";
import { IntakeForm } from "@/components/site/IntakeForm";
import mentorship from "@/assets/mentorship.jpg";

export const Route = createFileRoute("/get-involved/guide")({
  head: () => ({
    meta: [
      { title: "Become a Guide — SINGAWE Foundation" },
      {
        name: "description",
        content:
          "Offer structured mentorship as a SINGAWE Guide — screened, briefed and matched within our safeguarding framework.",
      },
    ],
  }),
  component: GuidePage,
});

function GuidePage() {
  return (
    <>
      <PageHero
        image={mentorship}
        alt="A Guide and a Journeyer working through an application together"
      >
        <Reveal>
          <Link to="/get-involved" className="slash text-sm text-cream/70 hover:text-gold">
            Get Involved
          </Link>
          <p className="eyebrow mt-6 text-gold">For professionals &amp; students</p>
          <h1 className="mt-4 max-w-3xl text-[clamp(2.2rem,5vw,4rem)] leading-[1.02]">
            Become a Guide.
          </h1>
          <div className="mt-8 h-px w-40 rule-draw bg-gold" />
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-cream/80">
            You have walked a path someone else is starting. Guides commit consistency, not money —
            usually monthly contact across a programme cycle.
          </p>
        </Reveal>
      </PageHero>

      <section className="mx-auto max-w-3xl bg-gold-soft/15 px-6 py-16 lg:px-10 lg:py-24">
        <Reveal>
          <p className="eyebrow text-clay">Guide application</p>
          <h2 className="mt-3 font-display text-3xl leading-tight">
            Offer consistency, not money.
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Guides are screened before they are matched. We ask for your ID and CV as part of that
            screening, and your date of birth to confirm you meet our minimum age requirement.
          </p>
        </Reveal>
        <Reveal delay={100} className="mt-10">
          <IntakeForm
            title="Guide interest form"
            blurb="One structured hour a month, inside our safeguarding framework."
            submitLabel="Submit my application"
            requireCv
            formType="intake_guide"
          />
        </Reveal>
      </section>
    </>
  );
}
