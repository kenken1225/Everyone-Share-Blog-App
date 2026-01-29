import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";
import { author_by_id_query } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import UserArticle from "@/components/article/UserArticle";

export const experimental_ppr = true;

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const session = await auth();
  const user = await client.fetch(author_by_id_query, { id });
  if (!user) return notFound();

  return (
    <>
      <section className="profile_container">
        <div className="profile_card">
          <div className="profile_title">
            <h3 className="text-24-black uppercase text-center line-clamp-1">{user.name}</h3>
          </div>
          <Image src={user.image} alt={user.name} width={150} height={150} className="profile_image" />

          <p className="text-30-extrabold mt-7 text-center">{user?.name}</p>
          <p className="mt-1 text-center text-14-normal">{user?.bio}</p>
        </div>

        <div className="mt-30 flex-1 flex flex-col gap-20 lg:-mt-5">
          <p className="text-30-bold">{session?.id === id ? "Your" : "All"} Articles</p>
          <ul className="card_grid-sm">
            <Suspense fallback={<Skeleton className="view_skeleton" />}>
              <UserArticle id={id} />
            </Suspense>
          </ul>
        </div>
      </section>
    </>
  );
};

export default Page;
