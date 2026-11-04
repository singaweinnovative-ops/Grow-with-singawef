import { createClient } from "@supabase/supabase-js";
import { OPPORTUNITIES, PEOPLE } from "../src/lib/site-content.ts";
import type { Database } from "../src/lib/supabase-types.ts";

const url = process.env["SUPABASE_URL"] ?? process.env["VITE_SUPABASE_URL"];
const serviceRoleKey = process.env["SUPABASE_SERVICE_ROLE_KEY"];

if (!url || !serviceRoleKey) {
  throw new Error("Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY before running this seed.");
}

const supabase = createClient<Database>(url, serviceRoleKey, {
  auth: { persistSession: false },
});

const opportunities = OPPORTUNITIES.map((opportunity, sort_order) => ({
  ...opportunity,
  image_url: null,
  is_published: true,
  sort_order,
}));

const people = PEOPLE.map((person, sort_order) => ({
  ...person,
  photo: person.photo ?? null,
  quote: person.quote ?? null,
  links: person.links ?? [],
  is_published: true,
  sort_order,
}));
const syncExistingPeople = process.argv.includes("--sync-people");

const { error: opportunitiesError } = await supabase
  .from("site_opportunities")
  .upsert(opportunities, { onConflict: "id", ignoreDuplicates: true });

if (opportunitiesError) throw opportunitiesError;

const { error: peopleError } = await supabase
  .from("site_people")
  .upsert(people, { onConflict: "slug", ignoreDuplicates: !syncExistingPeople });

if (peopleError) throw peopleError;

if (syncExistingPeople) {
  const includedSlugs = `(${people.map((person) => `"${person.slug}"`).join(",")})`;
  const { error: stalePeopleError } = await supabase
    .from("site_people")
    .update({ is_published: false })
    .not("slug", "in", includedSlugs);

  if (stalePeopleError) throw stalePeopleError;
}

console.log(
  `Seeded ${opportunities.length} opportunities and ${people.length} people${syncExistingPeople ? " (updated matching profiles)" : " if missing"}.`,
);
