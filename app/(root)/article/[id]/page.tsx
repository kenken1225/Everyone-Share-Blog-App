import Link from "next/link";
import Image from "next/image";
import markdownit from "markdown-it";
import { article_by_id_query, playlist_by_slug_query } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { formatDate } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import View from "@/components/common/View";
import ArticleCard, { ArticleCardType } from "@/components/article/ArticleCard";

export const experimental_ppr = true;
const md = markdownit();

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const [post, { select: editorPosts }] = await Promise.all([
    client.fetch(article_by_id_query, { id }),
    client.fetch(playlist_by_slug_query, {
      slug: "playlist",
    }),
  ]);

  if (!post) return notFound();

  const parsedContent = md.render(post?.pitch || "");

  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <p className="tag">{formatDate(post?._createdAt)}</p>
        <h1 className="heading">{post.title} </h1>
        <p className="sub-heading !max-w-5xl">{post.description}</p>
      </section>

      <section className="section_container">
        <img src={post.image} alt="thumbnail" className="w-full h-auto rounded-xl" />

        <div className="space-y-10 mt-50 max-w-4xl mx-auto mb-50">
          <div className="flex-between gap-10">
            <Link href={`/user/${post.author?._id}`} className="flex gap-12 items-center mb-6">
              <Image
                width={50}
                height={50}
                src={post.author?.image}
                alt="avatar"
                className="rounded-full drop-shadow-lg"
              />
              <div>
                <p className="text-20-medium">{post.author?.name}</p>
              </div>
            </Link>

            <p className="category-tag">{post.category}</p>
          </div>
          <h3 className="text-30-bold"> Pitch Details </h3>
          {parsedContent ? (
            <article
              className="prose w-full font-work-sans break-all whitespace-pre-wrap min-w-[900px]"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          ) : (
            <p>No content found</p>
          )}
        </div>

        <hr className="devider" />

        {editorPosts?.length > 0 && (
          <div className="max-w-[1200px] mx-auto">
            <p className="text-30-semibold">Editor Picks</p>

            <ul className="mt-7 card_grid-sm">
              {editorPosts.map((post: ArticleCardType, i: number) => (
                <ArticleCard key={i} post={post} />
              ))}
            </ul>
          </div>
        )}

        {/* TODO: Editor SELECTED STARTUPS ここからPPR */}
        <Suspense fallback={<Skeleton className="view_skeleton" />}>
          <View id={id} />
        </Suspense>
      </section>
    </>
  );
};

export default Page;
