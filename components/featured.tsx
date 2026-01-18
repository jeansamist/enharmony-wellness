"use client";
import { ArrowRightIcon } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { FunctionComponent } from "react";
type Post = {
  category: {
    id: bigint;
    created_at: Date;
    updated_at: Date;
    name: string;
  };
  user: {
    id: bigint;
    created_at: Date;
    updated_at: Date;
    email: string;
    full_name: string;
    password: string;
    role: string;
  };
  reviews: ({
    user: {
      id: bigint;
      created_at: Date;
      updated_at: Date;
      email: string;
      full_name: string;
      password: string;
      role: string;
    };
  } & {
    user_id: bigint;
    id: bigint;
    created_at: Date;
    updated_at: Date;
    post_id: bigint;
  })[];
} & {
  user_id: bigint;
  views: number;
  id: bigint;
  read_time: number;
  category_id: bigint;
  published: boolean;
  approved: boolean;
  type: string;
  cover: string;
  video_url: string | null;
  title: string;
  description: string;
  slug: string;
  content: string;
  created_at: Date;
  updated_at: Date;
};
export const Featured: FunctionComponent<{ post: Post | null }> = ({
  post,
}) => {
  return (
    <div className="container mx-auto flex flex-col lg:flex-row! gap-6 px-2 lg:px-6">
      {post && (
        <div className="flex-1 rounded-2xl sm:rounded-3xl md:rounded-4xl xl:rounded-[48px] overflow-hidden relative min-h-125">
          <div className="absolute z-10 inset-0 bg-linear-to-b from-primary/0 via-primary/0 to-primary/50 p-2 lg:p-6 flex flex-col justify-end">
            <div className="space-y-4 md:space-y-6 max-w-4xl w-full border border-white bg-white/70 backdrop-blur-xl text-tertiary p-6 lg:p-8 rounded-2xl sm:rounded-3xl md:rounded-4xl">
              <span className="text-sm md:text-xl font-semibold px-3 py-1.5 md:px-4 md:py-2 rounded-3xl bg-secondary/15 border border-secondary/40 inline-flex self-start leading-none backdrop-blur-3xl">
                Featured
              </span>
              <div>
                <div className="text-base md:text-xl opacity-70 leading-normal mb-2 md:mb-0">
                  {post.category.name} • {post.read_time} min read
                </div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight md:leading-normal mb-3 md:mb-0">
                  {post.title}
                </div>
                <div className="text-lg md:text-2xl opacity-70 leading-relaxed md:leading-normal">
                  {post.description}
                </div>
              </div>
              <Link
                href={`/articles/${post.slug}`}
                className="flex items-center leading-none underline font-semibold gap-2 text-base md:text-xl"
              >
                Read Article
                <ArrowRightIcon />
              </Link>
            </div>
          </div>
          <Image
            src={post.cover}
            width={1920}
            height={1080}
            alt="EnHarmony Wellness Header Image"
            className="w-full min-h-125 h-full z-0 object-cover object-center"
          />
        </div>
      )}
      <div>
        <div className="lg:max-w-xl w-full p-6 md:p-8 rounded-4xl border border-tertiary/15 bg-secondary/15 space-y-4 flex justify-items-center flex-col">
          <Image
            src="/ongoing.png"
            width={480}
            height={480}
            alt="ongoing"
            className="w-full rounded-3xl aspect-video object-cover"
          />
          <div className="space-y-2">
            <div className="text-3xl leading-normal font-bold">Ongoing</div>
            <div className="leading-normal opacity-70 md:text-xl">
              A daily exploration of healing practices, reflections, and habits
              — shared through short videos and deeper written insights
            </div>
          </div>
          <Link
            href="/articles/the-art-of-daily-healing"
            className="flex items-center leading-none underline font-semibold gap-2 text-primary"
          >
            Read Today&apos;s article
          </Link>
        </div>
      </div>
    </div>
  );
};
