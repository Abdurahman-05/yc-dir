import { SearchParams } from "next/dist/server/request/search-params";
import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";

export default async function page({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
  const query = (await searchParams).query;
  const posts = [
    {
      _createdAt: Date.now(),
      views:55,
      author: {_id:1,name:"adrian"},
      id: 1,
      description: "This is a description",
      image:
        "https://images.unsplash.com/photo-1544717306-279e9ae68955?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=625&q=80",
      title: "Awesome",
      category: "events",
    }, 
    {
      _createdAt: Date.now(),
      views:55,
      author: {_id:2,name:"adrian"},
      id: 2,
      description: "This is a description",
      image:
        "https://images.unsplash.com/photo-1544717306-279e9ae68955?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=625&q=80",
      title: "Awesome",
      category: "events",
    }, 
    {
      _createdAt: Date.now(),
      views:55,
      author: {_id:3,name:"adrian"},
      id: 3,
      description: "This is a description",
      image:
        "https://images.unsplash.com/photo-1544717306-279e9ae68955?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=625&q=80",
      title: "Awesome",
      category: "events",
    }, 
  ];

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
            <StartupCard key={post?.id} post = {post} />))): (
              <p className="no-results">No Startups Found</p>
              )
          }
        </ul>
      </section>
    </>
  )
}
