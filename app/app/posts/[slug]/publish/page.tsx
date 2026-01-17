import { PostEditor } from "@/components/post-editor";
import { getCategories, getPostBySlug } from "@/services/post.services";
import { getReviewers } from "@/services/user.services";

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const categories = await getCategories();
  const reviewers = await getReviewers();
  if (!post) {
    return <div>Post not found</div>;
  }
  return (
    <div>
      <PostEditor
        categories={categories}
        reviewers={reviewers}
        title={post.title}
        content={post.content}
        description={post.description}
        default_cover={post.cover}
        default_video_url={post.video_url || undefined}
        default_type={post.type}
        default_slug={post.slug}
        default_category={post.category}
        default_reviewer={post.reviews[0]?.user || undefined}
      />
    </div>
  );
}
