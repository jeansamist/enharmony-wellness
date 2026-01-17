import { Article } from "@/components/article";
import { getPostBySlug } from "@/services/post.services";

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    return <div>Post not found</div>;
  }
  return (
    <div>
      <main className="space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12 xl:space-y-16">
        <Article
          title={post.title}
          content={post.content}
          description={post.description}
          cover={post.cover}
          video_url={post.video_url || undefined}
          type={post.type}
          category={post.category}
        />
      </main>
    </div>
  );
}
