"use client";
import { User } from "@/generated/prisma/client";
import { PencilSimpleIcon, PlayIcon, TrashIcon } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { FunctionComponent } from "react";

export type PostCardProps = {
  type: "text" | "video";
  cover: string;
  category: string;
  read_time: string;
  description: string;
  title: string;
  slug: string;
  author: string;
  reviewer: string;
  currentUser: User | null;
};

export const PostCard: FunctionComponent<PostCardProps> = ({
  type,
  cover,
  category,
  read_time,
  description,
  title,
  slug,
  author,
  reviewer,
  currentUser,
}) => {
  return (
    <div className="">
      <div className="relative">
        <Image
          src={cover}
          alt="Post Cover"
          width={376}
          height={211.5}
          className="aspect-video w-full rounded-4xl object-cover object-center relative"
        />
        <div className="absolute top-4 right-4 flex items-center justify-center gap-2">
          <Link
            href={`/app/posts/${slug}/edit`}
            className="h-8 px-4 gap-2 leading-none bg-secondary/25 border border-secondary/30 backdrop-blur-xl rounded-full flex items-center justify-center hover:bg-secondary/30 duration-300 transition-colors text-secondary"
          >
            <PencilSimpleIcon size={16} /> Edit Post
          </Link>
          <button className="h-8 w-8 leading-none bg-red-500/25 border border-red-500/30 backdrop-blur-xl rounded-full flex items-center justify-center hover:bg-red-500/30 duration-300 transition-colors text-red-500">
            <TrashIcon size={16} />
          </button>
        </div>
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
        <div className="flex gap-2 items-center">
          <Image
            src={`https://tapback.co/api/avatar/${encodeURIComponent(author)}`}
            alt="User Avatar"
            width={32}
            height={32}
            className="rounded-full"
          />
          <b>Author :</b> {author}
        </div>
        <div className="flex gap-2 items-center">
          <Image
            src={`https://tapback.co/api/avatar/${encodeURIComponent(
              reviewer
            )}`}
            alt="User Avatar"
            width={32}
            height={32}
            className="rounded-full"
          />
          <b>Reviewer :</b> {reviewer}
        </div>
        <div className="flex gap-4">
          <Link
            href={`/articles/${slug}`}
            className="flex items-center leading-none underline font-semibold gap-2 text-primary"
          >
            Read
          </Link>
          {currentUser && currentUser.role === "admin" && (
            <Link
              href={`/app/posts/${slug}/publish`}
              className="flex items-center leading-none underline font-semibold gap-2 text-primary"
            >
              Publish
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
