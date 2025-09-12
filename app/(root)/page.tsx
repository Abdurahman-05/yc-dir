import { SearchParams } from "next/dist/server/request/search-params";
import SearchForm from "../components/SearchForm";

export default async function page({searchParams} : {searchParams:Promise<{query?:string}>}) {
  const query =  (await searchParams).query;

  return (
    <>
    <section className="pink_container">

        <h1 className="heading">
          Piche your startup, <br/>
       Connect with  Enterpreneurs
        </h1>
        <p className="sub-heading !max-w-3xl ">
          Submit Ideas, Vote on Pitches, ans Get Noticed in Virtual  Competitions.
        </p>

        <SearchForm query = {query} />
    </section>
    </>
   
  )
}
