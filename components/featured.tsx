"use client";
import { ArrowRightIcon } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { FunctionComponent } from "react";

export const Featured: FunctionComponent = () => {
  return (
    <div className="container mx-auto px-6">
      <div className="w-full aspect-9/10 sm:aspect-video rounded-2xl sm:rounded-3xl md:rounded-4xl xl:rounded-[48px] overflow-hidden relative">
        <div className="absolute z-10 inset-0 bg-linear-to-b from-tertiary/0 via-tertiary/0 to-tertiary p-6 md:p-12 xl:p-24 text-secondary flex flex-col justify-end">
          <div className="space-y-4 md:space-y-6 max-w-4xl w-full">
            <span className="text-sm md:text-xl font-semibold px-3 py-1.5 md:px-4 md:py-2 rounded-3xl bg-secondary/15 border border-secondary/40 inline-flex self-start leading-none backdrop-blur-3xl">
              Featured
            </span>
            <div>
              <div className="text-base md:text-xl opacity-70 leading-normal mb-2 md:mb-0">
                Wellness • 6 min read
              </div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight md:leading-normal mb-3 md:mb-0">
                The Art of Daily Healing: Small Practices That Support Mind and
                Body
              </div>
              <div className="text-lg md:text-2xl opacity-70 leading-relaxed md:leading-normal">
                Exploring gentle, holistic practices you can integrate into
                everyday life to support balance, awareness, and long-term
                wellbeing.
              </div>
            </div>
            <Link
              href="/articles/the-art-of-daily-healing"
              className="flex items-center leading-none underline font-semibold gap-2 text-base md:text-xl"
            >
              Read Article
              <ArrowRightIcon />
            </Link>
          </div>
        </div>
        <Image
          src="/header-cover-image.png"
          width={1920}
          height={1080}
          alt="EnHarmony Wellness Header Image"
          className="w-full h-full z-0 object-cover object-center"
        />
      </div>
    </div>
  );
};
