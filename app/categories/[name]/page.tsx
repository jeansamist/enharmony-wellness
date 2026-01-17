import { ArticleCard } from "@/components/article-card";
import { getPostsByCategory } from "@/services/post.services";

export default async function page({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const posts = await getPostsByCategory(name);

  return (
    <div className="container px-6 mx-auto space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12 xl:space-y-16">
      <div className="grid px-0 xl:px-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-12">
        {posts.map((post) => (
          <ArticleCard
            key={post.slug}
            type={post.type}
            cover={post.cover}
            category={post.category.name}
            read_time={post.read_time.toString()}
            description={post.description}
            title={post.title}
            slug={post.slug}
          />
        ))}
      </div>
    </div>
  );
}
