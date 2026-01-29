import { client } from "@/sanity/lib/client";
import { article_by_author_query } from "@/sanity/lib/queries";
import React from "react";
import ArticleCard, { ArticleCardType } from "./ArticleCard";

const UserArticle = async ({ id }: { id: string }) => {
  const articles = await client.fetch(article_by_author_query, { id });

  return (
    <>
      {articles.length > 0 ? (
        articles.map((article: ArticleCardType) => <ArticleCard key={article._id} post={article} />)
      ) : (
        <p className="no-result">No post yet</p>
      )}
    </>
  );
};

export default UserArticle;
