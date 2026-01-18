import Link from "next/link";
import { FunctionComponent } from "react";
import { ArticleCard, ArticleCardProps } from "./article-card";

export const WatchAndLearn: FunctionComponent<{
  posts: ArticleCardProps[];
}> = ({ posts }) => {
  return (
    <div className="container px-2 lg:px-6 mx-auto space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12 xl:space-y-16">
      <div className="bg-secondary border border-tertiary/15 p-6 md:p-12 xl:p-24 rounded-2xl sm:rounded-3xl md:rounded-4xl xl:rounded-[48px] space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12 xl:space-y-16">
        <div className="space-y-2 max-w-xl w-full">
          <div className="space-y-2">
            <div className="text-3xl leading-normal font-bold">
              Watch & Learn
            </div>
            <div className="leading-normal opacity-70 md:text-xl">
              Some ideas are easier to feel than to read. Explore short videos
              connected to our latest articles and series.
            </div>
          </div>
          <Link
            href="/articles/the-art-of-daily-healing"
            className="flex items-center leading-none underline font-semibold gap-2 md:text-xl text-primary"
          >
            See more
          </Link>
        </div>
        <div className="gap-6 lg:gap-12 grid grid-cols-1 md:grid-cols-2">
          {posts.map((post) => (
            <ArticleCard
              key={post.slug}
              type={post.type}
              cover={post.cover}
              category={post.category}
              read_time={post.read_time.toString()}
              description={post.description}
              title={post.title}
              slug={post.slug}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
