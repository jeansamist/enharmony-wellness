import { PostCard } from "@/components/post-card";
import { Button } from "@/components/ui/button";
import { getAuthenticatedUser } from "@/services/auth.services";
import { getPosts } from "@/services/post.services";

export default async function page() {
  const posts = await getPosts();
  const user = await getAuthenticatedUser();
  return (
    <div className="space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12 xl:space-y-16 pt-6">
      <div className="container mx-auto space-y-6">
        <h2 className="text-3xl leading-normal font-bold flex items-center gap-6 justify-between">
          Posts<Button href="/app/posts/create">New post</Button>
        </h2>
        <div className="grid px-0 xl:px-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-12">
          {posts.map((post) => (
            <PostCard
              key={post.slug}
              type={post.type}
              cover={post.cover}
              category={post.category.name}
              read_time={post.read_time.toString()}
              description={post.description}
              title={post.title}
              author={post.user.full_name}
              reviewer={post.reviews[0]?.user.full_name}
              slug={post.slug}
              currentUser={user}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
