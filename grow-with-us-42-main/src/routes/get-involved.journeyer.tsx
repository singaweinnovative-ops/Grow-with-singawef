import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { PageHero } from "@/components/site/PageHero";
import { IntakeForm } from "@/components/site/IntakeForm";
import heroStudent from "@/assets/hero-student.jpg";

export const Route = createFileRoute("/get-involved/journeyer")({
  head: () => ({
    meta: [
      { title: "Become a Journeyer — SINGAWE Foundation" },
      {
        name: "description",
        content:
          "Apply to become a SINGAWE Journeyer — free mentorship, opportunity access and support. No cost, ever.",
      },
    ],
  }),
  component: JourneyerPage,
});

function JourneyerPage() {
  return (
    <>
      <PageHero image={heroStudent} alt="A young South African student smiling in warm sunlight">
        <Reveal>
          <Link to="/get-involved" className="slash text-sm text-cream/70 hover:text-gold">
            Get Involved
          </Link>
          <p className="eyebrow mt-6 text-gold">For individuals</p>
          <h1 className="mt-4 max-w-3xl text-[clamp(2.2rem,5vw,4rem)] leading-[1.02]">
            Become a Journeyer.
          </h1>
          <div className="mt-8 h-px w-40 rule-draw bg-gold" />
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-cream/80">
            You are looking for guidance, an opportunity, or someone in your corner. There is no
            cost, and there is no wrong time to reach out.
          </p>
        </Reveal>
      </PageHero>

      <section className="mx-auto max-w-3xl bg-gold-soft/15 px-6 py-16 lg:px-10 lg:py-24">
        <Reveal>
          <p className="eyebrow text-clay">Journeyer application</p>
          <h2 className="mt-3 font-display text-3xl leading-tight">
            Tell us where you are, and what's in the way.
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            We ask for your date of birth (or ID number, which reads it for you) so we can match you
            correctly and, if you're under 18, involve a parent or guardian from the start — as our
            safeguarding framework requires.
          </p>
        </Reveal>
        <Reveal delay={100} className="mt-10">
          <IntakeForm
            title="Journeyer interest form"
            blurb="No cost, ever. This starts a conversation, not a commitment."
            submitLabel="Submit my details"
            formType="intake_journeyer"
          />
        </Reveal>
      </section>
    </>
  );
}
