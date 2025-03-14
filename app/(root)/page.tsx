import SearchForm from "@/components/SearchForm";
import StartupCard, {StartupTypeCard} from "@/components/StartupCard";
// import { client } from "@/sanity/lib/client";
import {sanityFetch, SanityLive} from "@/sanity/lib/live";
import {STARTUPS_QUERY} from "@/sanity/lib/queries";
import {auth} from "@/auth";

export default async function Home({searchParams}: { searchParams: Promise<{ query: string }> }) {
    const query = (await searchParams).query;

    // RETRIEVE DATA FROM SANITY
    const params = {search: query || null};

    /*
    * EXTRACT THE SESSION
    * FROM IT GET THE SANITY ID OF THE AUTHOR FOR THAT USER
    */
    const session = await auth();

    // TO AVOID THE WARNING FROM TYPESCRIPT FILE next-auth.d.ts IS CREATED, NOW IT KNOWS SESSION WILL HAVE AN ID
    console.log(session?.id);

    // const posts = await client.fetch(STARTUPS_QUERY);

    // ?THIS NEW CHANGE REVALIDATES THE PAGE WHENEVER THE NEW CHANGES ARE MADE
    const {data: posts} = await sanityFetch({query: STARTUPS_QUERY, params});

    // console.log(JSON.stringify(posts, null, 2));

    // const posts = [
    //   {
    //     _id: 1,
    //     _createdAt: new Date(),
    //     views: 55,
    //     author: { _id: 1, name: "Swapnil" },
    //     description: "Lorem ipsum dolor sit amet.",
    //     image:
    //       "https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //     category: "Robots",
    //     title: "We Robots",
    //   },
    // ];

    return (
        <>
            <section className="pink_container">
                <h1 className="heading">
                    Pitch Your Startup, <br/>
                    Connect with Entrepreneurs
                </h1>
                <p className="sub-heading !max-w-3xl">
                    Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions
                </p>
                <SearchForm query={query}/>
            </section>
            <section className="section_container">
                <p className="text-30-semibold">
                    {query ? `Search results for "${query}"` : "All Startups"}
                </p>
                <ul className="mt-7 card_grid">
                    {posts?.length > 0 ? (
                        posts.map((post: StartupTypeCard) => (
                            <StartupCard key={post._id} post={post}/>
                        ))
                    ) : (
                        <p className="no-result">No results found</p>
                    )}
                </ul>
            </section>

            <SanityLive/>
        </>
    );
}
