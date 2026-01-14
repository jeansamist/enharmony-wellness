import { ExploreBy } from "@/components/explore-by";
import { Featured } from "@/components/featured";
import { JustIn } from "@/components/just-in";
import { Recommended } from "@/components/recommanded";
import { Subscribe } from "@/components/subscribe";
import { WatchAndLearn } from "@/components/watch-and-learn";

export default async function Home() {
  // const posts = await prisma.post.findMany({});
  return (
    <main className="space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12 xl:space-y-16">
      <Featured />
      <JustIn />
      <ExploreBy />
      <WatchAndLearn />
      <Recommended />
      <Subscribe />
    </main>
  );
}
