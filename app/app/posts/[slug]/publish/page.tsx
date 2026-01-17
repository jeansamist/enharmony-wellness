import { getPostBySlug, publishPost } from "@/services/post.services";
import { redirect } from "next/navigation";

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
  await publishPost(Number(post.id));
  redirect(`/articles/${post.slug}`);
}
