"use client";
import { ArrowRightIcon, PlayIcon } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { FunctionComponent } from "react";

export type ArticleCardProps = {
  type: "text" | "video";
  cover: string;
  category: string;
  read_time: string;
  description: string;
  title: string;
  slug: string;
};

export const ArticleCard: FunctionComponent<ArticleCardProps> = ({
  type,
  cover,
  category,
  read_time,
  description,
  title,
  slug,
}) => {
  return (
    <div className="">
      <div className="relative">
        <Image
          src={cover}
          alt="Article Cover"
          width={376}
          height={211.5}
          className="aspect-video w-full rounded-4xl object-cover object-center relative"
        />
        {type === "video" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-secondary/25 border border-secondary/30 backdrop-blur-xl rounded-full flex items-center justify-center hover:bg-secondary/30 duration-300 transition-colors text-secondary">
              <PlayIcon size={24} />
            </div>
          </div>
        )}
      </div>
      <div className="p-4 space-y-2">
        <div className="opacity-70 leading-normal">
          {category} • {read_time} min read
        </div>
        <div className="leading-normal font-bold text-xl">{title}</div>
        <div className="leading-normal opacity-70">{description}</div>

        <Link
          href={`/articles/${slug}`}
          className="flex items-center leading-none underline font-semibold gap-2 text-primary"
        >
          Read more
          <ArrowRightIcon />
        </Link>
      </div>
    </div>
  );
};
