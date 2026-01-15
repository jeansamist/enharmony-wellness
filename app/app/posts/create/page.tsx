import { PostEditor } from "@/components/post-editor";
import { getCategories } from "@/services/post.services";
import { getReviewers } from "@/services/user.services";

export default async function page() {
  const categories = await getCategories();
  const reviewers = await getReviewers();
  return (
    <div>
      <PostEditor
        categories={categories}
        reviewers={reviewers}
        title="New Article Title"
        content="Write your article here"
        description="Post description"
      />
    </div>
  );
}
