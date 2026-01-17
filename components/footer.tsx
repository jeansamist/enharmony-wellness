"use client";
import Image from "next/image";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, FunctionComponent } from "react";
import { Button } from "./ui/button";

export const Footer: FunctionComponent = () => {
  const pathname = usePathname();
  return (
    <Activity mode={pathname.includes("/app") ? "hidden" : "visible"}>
      <footer className="p-6 md:p-12 xl:p-24 bg-tertiary text-secondary mt-6 sm:mt-8 md:mt-10 lg:mt-12 xl:mt-16">
        <div className="container mx-auto space-y-6">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="space-y-4 w-full">
              <Link href={"/"} className="relative z-50">
                <Image
                  src={"/enharmony-wellness-logo-dark.svg"}
                  alt={"EnHarmony Wellness Logo"}
                  width={240}
                  height={30}
                  className="w-40 md:w-60 h-auto" // Responsive logo sizing
                />
              </Link>
              <div className="text-xl font-bold leading-normal">
                Rethinking health, naturally
              </div>
              <ul className="list-disc space-y-4 list-outside pl-4">
                <li>
                  <Link
                    href="/articles/the-art-of-daily-healing"
                    className="flex items-center leading-none underline font-semibold gap-2 opacity-70"
                  >
                    Wellness
                  </Link>
                </li>
                <li>
                  <Link
                    href="/articles/the-art-of-daily-healing"
                    className="flex items-center leading-none underline font-semibold gap-2 opacity-70"
                  >
                    Holistic Care
                  </Link>
                </li>
                <li>
                  <Link
                    href="/articles/the-art-of-daily-healing"
                    className="flex items-center leading-none underline font-semibold gap-2 opacity-70"
                  >
                    Guides
                  </Link>
                </li>
                <li>
                  <Link
                    href="/articles/the-art-of-daily-healing"
                    className="flex items-center leading-none underline font-semibold gap-2 opacity-70"
                  >
                    Videos
                  </Link>
                </li>
                <li>
                  <Link
                    href="/articles/the-art-of-daily-healing"
                    className="flex items-center leading-none underline font-semibold gap-2 opacity-70"
                  >
                    About Enharmony Wellness
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4 w-full">
              <div>
                <div className="text-3xl leading-normal font-bold">
                  Newsletter
                </div>
                <div className="leading-normal opacity-70 text-xl text-balance">
                  Explore simple, holistic ways to support your wellbeing and
                  live more consciously — delivered straight to your inbox.
                </div>
              </div>
              <div className="flex gap-4 max-w-xl w-full">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-6 py-4 h-12 rounded-full font-semibold hover:opacity-90 transition-opacity flex items-center justify-center leading-none w-full text-secondary bg-secondary/15 border border-secondary/40 focus:outline-none focus:ring-2 focus:ring-secondary/50 placeholder:text-secondary/70"
                />
                <Button variant="secondary" className="text-tertiary">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
          <div className="flex gap-4"></div>
          <div className="opacity-70 text-sm">
            © Enharmony Wellness. A media brand by Enharmony.  <br />  <br /> Content on Enharmony Wellness is
            for educational purposes only. Some articles are medically reviewed
            and are not intended as medical advice, diagnosis, or treatment.
          </div>
        </div>
      </footer>
    </Activity>
  );
};
