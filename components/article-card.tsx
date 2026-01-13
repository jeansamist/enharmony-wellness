"use client";
import { ArrowRightIcon, PlayIcon } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { FunctionComponent } from "react";

export type ArticleCardProps = {
  type?: "featured" | "video";
};

export const ArticleCard: FunctionComponent<ArticleCardProps> = ({
  type = "featured",
}) => {
  return (
    <div className="">
      <div className="relative">
        <Image
          src={"/article-cover.png"}
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
        <div className="opacity-70 leading-normal">Wellness • 6 min read</div>
        <div className="leading-normal font-bold text-xl">
          The Art of Daily Healing: Small Practices That Support Mind
        </div>
        <div className="leading-normal opacity-70">
          Healing does not always arrive through dramatic change. Often, it
          grows quietly through small, repeated practices that support
          awareness, balance, and a more responsive relationship with the body
          and mind.
        </div>

        <Link
          href="/articles/the-art-of-daily-healing"
          className="flex items-center leading-none underline font-semibold gap-2 text-primary"
        >
          Read more
          <ArrowRightIcon />
        </Link>
      </div>
    </div>
  );
};
