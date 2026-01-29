import ArticleForm from "@/components/article/ArticleForm";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import React from "react";

const page = async () => {
  const session = await auth();

  if (!session) redirect("/");

  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <h1 className="heading">Submit your article</h1>
      </section>

      <ArticleForm />
    </>
  );
};

export default page;
