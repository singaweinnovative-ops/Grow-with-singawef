import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { PageHero } from "@/components/site/PageHero";
import { VolunteerCompanionForm } from "@/components/site/VolunteerCompanionForm";
import community from "@/assets/community.jpg";

export const Route = createFileRoute("/get-involved/companion")({
  head: () => ({
    meta: [
      { title: "Become a Volunteer or Companion — SINGAWE Foundation" },
      {
        name: "description",
        content:
          "Volunteer your time and skills, or partner as a Companion organisation — funding, venues, equipment or expertise that makes the journey shorter for everyone.",
      },
    ],
  }),
  component: CompanionPage,
});

function CompanionPage() {
  return (
    <>
      <PageHero image={community} alt="A group of young community members standing together, laughing">
        <Reveal>
          <Link to="/get-involved" className="slash text-sm text-cream/70 hover:text-gold">
            Get Involved
          </Link>
          <p className="eyebrow mt-6 text-gold">For individuals, groups &amp; organisations</p>
          <h1 className="mt-4 max-w-3xl text-[clamp(2.2rem,5vw,4rem)] leading-[1.02]">
            Become a Volunteer or Companion.
          </h1>
          <div className="mt-8 h-px w-40 rule-draw bg-gold" />
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-cream/80">
            Give an afternoon, a skill, or a partnership. Volunteers and Companions — individuals,
            schools, businesses and institutions — make the journey shorter for everyone on it.
          </p>
        </Reveal>
      </PageHero>

      <section className="mx-auto max-w-3xl bg-gold-soft/15 px-6 py-16 lg:px-10 lg:py-24">
        <Reveal>
          <p className="eyebrow text-clay">Volunteer &amp; Companion</p>
          <h2 className="mt-3 font-display text-3xl leading-tight">
            Make the walk shorter for everyone.
          </h2>
        </Reveal>
        <Reveal delay={100} className="mt-10">
          <VolunteerCompanionForm />
        </Reveal>
      </section>
    </>
  );
}
