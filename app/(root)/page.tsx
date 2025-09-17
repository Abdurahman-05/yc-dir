import { SearchParams } from "next/dist/server/request/search-params";
import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export default async function page({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
  const query = (await searchParams).query;
  const session = await auth()
 
  
  const posts = await prisma.startup.findMany({
    include: { author: true },
  })
  
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
              <StartupCard key={post?.id} post={post} />))) : (
              <p className="no-results">No Startups Found</p>
            )
          }
        </ul>
      </section>

    </>
  )
}
