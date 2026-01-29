import { auth } from "@/auth";
import SearchForm from "@/components/search/SearchForm";
import ArticleCard, { ArticleCardType } from "@/components/article/ArticleCard";
import { sanityFetch, SanityLive } from "@/lib/live";
import { article_query } from "@/sanity/lib/queries";

export default async function Home({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
  const query = (await searchParams).query;
  const params = { search: query || null };
  const session = await auth();
  console.log("session in app/(root)/page.tsx", session);

  // Sanityにクエリを送るための関数 → 記事を取得
  const { data: posts } = await sanityFetch({ query: article_query, params });

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">Write your latest favorite news</h1>
        <p className="sub-heading !max-w-3xl">Submit ideas, Vote on Pithces</p>
        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-30-semibold">{query ? `Search results for ${query}` : "All Articles"}</p>

        <ul className="mt-30 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: ArticleCardType) => <ArticleCard key={post?._id} post={post} />)
          ) : (
            <p className="no-results">No article found</p>
          )}
        </ul>
      </section>

      <SanityLive />
    </>
  );
}
