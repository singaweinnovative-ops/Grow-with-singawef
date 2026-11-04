import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { Reveal } from "@/components/site/Reveal";
import { PageHero } from "@/components/site/PageHero";
import { searchItems, type SearchResult } from "@/lib/search-index";
import { getPublishedOpportunities, getPublishedPeople } from "@/lib/site-content-db";
import community from "@/assets/community.jpg";

const searchSchema = z.object({
  q: z.string().default(""),
});

export const Route = createFileRoute("/search")({
  validateSearch: searchSchema,
  loader: async () => ({
    people: await getPublishedPeople(),
    opportunities: await getPublishedOpportunities(),
  }),
  head: () => ({
    meta: [{ title: "Search — SINGAWE Foundation" }, { name: "robots", content: "noindex" }],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const { people, opportunities } = Route.useLoaderData();
  const [value, setValue] = useState(q);
  const results = searchItems(q, people, opportunities);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    navigate({ search: { q: value } });
  }

  function goTo(result: SearchResult) {
    navigate({
      to: result.to,
      params: result.params,
    } as unknown as Parameters<typeof navigate>[0]);
  }

  return (
    <>
      <PageHero image={community} alt="SINGAWE Foundation community">
        <Reveal>
          <p className="eyebrow text-gold">Search</p>
          <h1 className="mt-5 max-w-3xl text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.05]">
            Find anything on the site.
          </h1>
          <form onSubmit={handleSubmit} className="mt-8 flex max-w-xl gap-2">
            <label className="sr-only" htmlFor="search-input">
              Search
            </label>
            <input
              id="search-input"
              type="search"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Search programmes, people, news, opportunities…"
              className="min-w-0 flex-1 rounded-sm border border-cream/25 bg-ink/40 px-4 py-3 text-base text-cream placeholder:text-cream/50 outline-none transition-colors focus:border-gold"
              autoFocus
            />
            <button
              type="submit"
              className="shrink-0 rounded-sm bg-gold px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-gold-soft"
            >
              Search
            </button>
          </form>
        </Reveal>
      </PageHero>

      <section className="mx-auto max-w-4xl px-6 py-16 lg:px-10 lg:py-24">
        {q.trim() === "" ? (
          <p className="text-center text-sm text-muted-foreground">
            Type something above to search the site.
          </p>
        ) : results.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground">
            No results for &quot;{q}&quot;. Try a different word.
          </p>
        ) : (
          <>
            <p className="text-sm text-muted-foreground">
              {results.length} result{results.length === 1 ? "" : "s"} for &quot;{q}&quot;
            </p>
            <ul className="mt-8 divide-y divide-border overflow-hidden rounded-sm border border-border">
              {results.map((r) => (
                <li key={r.id}>
                  <button
                    type="button"
                    onClick={() => goTo(r)}
                    className="flex w-full flex-col gap-1 bg-background px-6 py-5 text-left transition-colors hover:bg-gold-soft/40"
                  >
                    <span className="eyebrow text-gold">{r.group}</span>
                    <span className="font-display text-lg">{r.title}</span>
                    {r.subtitle ? (
                      <span className="text-sm text-muted-foreground">{r.subtitle}</span>
                    ) : null}
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>
    </>
  );
}
