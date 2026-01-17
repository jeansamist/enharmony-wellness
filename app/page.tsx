import { ExploreBy } from "@/components/explore-by";
import { Featured } from "@/components/featured";
import { JustIn } from "@/components/just-in";
import { Recommended } from "@/components/recommanded";
import { Subscribe } from "@/components/subscribe";
import { WatchAndLearn } from "@/components/watch-and-learn";
import { getJustIn } from "@/services/post.services";

export default async function Home() {
  // const posts = await prisma.post.findMany({});
  const posts = await getJustIn();
  return (
    <main className="space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12 xl:space-y-16">
      <Featured />
      <JustIn
        posts={posts.map((post) => ({
          category: post.category.name,
          cover: post.cover,
          description: post.description,
          read_time: post.read_time.toString(),
          slug: post.slug,
          title: post.title,
          type: post.type,
        }))}
      />
      <ExploreBy />
      <WatchAndLearn />
      <Recommended />
      <Subscribe />
    </main>
  );
}
