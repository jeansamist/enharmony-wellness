import { ExploreBy } from "@/components/explore-by";
import { Featured } from "@/components/featured";
import { JustIn } from "@/components/just-in";
import { Recommended } from "@/components/recommanded";
import { Button } from "@/components/ui/button";
import { WatchAndLearn } from "@/components/watch-and-learn";
import Link from "next/link";

export default function Home() {
  return (
    <main className="space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12 xl:space-y-16">
      <Featured />
      <JustIn />
      <ExploreBy />
      <WatchAndLearn />
      <Recommended />

      <div className="container px-6 mx-auto space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12 xl:space-y-16">
        <div className="bg-primary text-secondary p-6 md:p-12 xl:p-24 rounded-2xl sm:rounded-3xl md:rounded-4xl xl:rounded-[48px] space-y-6 sm:space-y-8">
          <div className="space-y-2 max-w-3xl w-full">
            <div>
              <div className="text-3xl leading-normal font-bold">Subscribe</div>
              <div className="leading-normal opacity-70 text-xl text-balance">
                Practical ideas, reflections, and holistic perspectives to help
                you improve your health naturally, delivered through one
                thoughtful email at a time.
              </div>
            </div>
            <Link
              href="/articles/the-art-of-daily-healing"
              className="flex items-center leading-none underline font-semibold gap-2 text-xl text-primary"
            >
              See more
            </Link>
            <div className="flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-6 py-4 h-12 rounded-full font-semibold hover:opacity-90 transition-opacity flex items-center justify-center leading-none w-full text-secondary bg-secondary/15 border border-secondary/40 focus:outline-none focus:ring-2 focus:ring-secondary/50 placeholder:text-secondary/70"
              />
              <Button variant="secondary">Subscribe</Button>
            </div>
          </div>
        </div>
      </div>
      <footer className="p-6 md:p-12 xl:p-24 bg-tertiary text-secondary">
        <div className="container mx-auto"></div>
      </footer>
    </main>
  );
}
