import { SearchParams } from "next/dist/server/request/search-params";
import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";
import { client } from "@/sanity/lib/client";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";

export default async function page({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
  const query = (await searchParams).query;
  const params = {search :query || null};
  //  const posts = await client.fetch(STARTUPS_QUERY)
  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY ,params });

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Piche your startup, <br />
          Connect with  Enterpreneurs
        </h1>
        <p className="sub-heading !max-w-3xl ">
          Submit Ideas, Vote on Pitches, ans Get Noticed in Virtual  Competitions.
        </p>
        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p>{query ? `search result for "${query}"` : 'all Startups'}</p>
        <ul className="mt-7 card_grid">
          {posts?.length > 0 ?
          (posts.map((post, index: Number) => (
            <StartupCard key={post?._id} post = {post} />))): (
              <p className="no-results">No Startups Found</p>
              )
          }
        </ul>
      </section>
      <SanityLive />
    </>
  )
}
