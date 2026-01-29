import React from "react";
import { formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { Author, Article } from "@/sanity/types";

export type ArticleCardType = Omit<Article, "author"> & { author?: Author };

const ArticleCard = ({ post }: { post: ArticleCardType }) => {
  const { _createdAt, views, author, _id, title, category, description, image } = post;

  return (
    <>
      <li className="startup-card group-only:">
        <div className="flex-between">
          <p className="startup-card_date">{formatDate(_createdAt)}</p>

          <div className="flex gap-6 items-center">
            <EyeIcon className="size-25 text-primary" />
            <span className="text-30-medium">{views}</span>
          </div>
        </div>
        <div className="flex-between mt-20 gap-10">
          <div className="flex-10 w-full">
            <div className="flex-between">
              <div>
                <Link href={`/user/${author?._id}`}>
                  <p className="text-20-medium line-clamp-1">{author?.name}</p>
                </Link>
                <Link href={`/article/${_id}`}>
                  <h3 className="text-30-semibold line-clamp-1">{title}</h3>
                </Link>
              </div>
              <Link href={`/user/${author?._id}`}>
                <Image
                  src={author?.image || "/path/to/default/image.jpg"}
                  alt="placeholder"
                  width={70}
                  height={70}
                  className="rounded-full max-w-70 w-full"
                />
              </Link>
            </div>
            <Link href={`/article/${_id}`}>
              <p className="startup-card_desc">{description}</p>
              <img src={image} alt="placeholder" className="startup-card_img" />
            </Link>

            <div className="flex-between gap-10 mt-20">
              <Link href={`/?query=${category?.toLowerCase()}`}>
                <p className="text-2o-medium">{category}</p>
              </Link>
              <Button className="startup-card_btn" asChild>
                <Link href={`/article/${_id}`}>Details</Link>
              </Button>
            </div>
          </div>
        </div>
      </li>
    </>
  );
};

export default ArticleCard;
