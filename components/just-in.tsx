import { ArticleCard, ArticleCardProps } from "@/components/article-card";
import Link from "next/link";
import { FunctionComponent } from "react";

export const JustIn: FunctionComponent<{ posts: ArticleCardProps[] }> = ({
  posts,
}) => {
  return (
    <div className="container px-6 mx-auto space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12 xl:space-y-16">
      <h2 className="text-2xl md:text-3xl xl:text-4xl font-bold leading-tight md:leading-normal px-2 py-2 border-b border-tertiary">
        Just in
      </h2>
      <div className="grid px-0 xl:px-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-12">
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
        <div>
          <div className="p-6 md:p-8 rounded-4xl border border-tertiary/15 bg-secondary space-y-2 flex justify-items-center flex-col">
            <div>
              <div className="text-3xl leading-normal font-bold">
                Ongoing Series
              </div>
              <div className="leading-normal opacity-70 text-xl">
                A daily exploration of healing practices, reflections, and
                habits — shared through short videos and deeper written
                insights.
              </div>
            </div>
            <Link
              href="/articles/the-art-of-daily-healing"
              className="flex items-center leading-none underline font-semibold gap-2 text-primary"
            >
              Read today’s entry
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
