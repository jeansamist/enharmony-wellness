import { getAuthenticatedUser } from "@/services/auth.services";
import { getPostStats, getWriterStats, getReviewerPendingPosts } from "@/services/post.services";
import { getUserStats } from "@/services/user.services";
import { getReviewStats, getReviewerStats } from "@/services/reviews.services";
import { redirect } from "next/navigation";

const DashboardStatCard = ({ title, value }: { title: string; value: number | string }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
      <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">{title}</h3>
      <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
    </div>
  );
};

export default async function Dashboard() {
  const user = await getAuthenticatedUser();

  if (!user) {
    redirect("/auth/sign-in");
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user.full_name}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {user.role === "admin" && (
          <>
            {/* Admin Stats */}
            <AdminStats />
          </>
        )}

        {user.role === "writer" && (
          <>
            {/* Writer Stats */}
            <WriterStats userId={Number(user.id)} />
          </>
        )}

        {user.role === "reviewer" && (
          <>
            {/* Reviewer Stats */}
            <ReviewerStats userId={Number(user.id)} />
          </>
        )}
      </div>
    </div>
  );
}

const AdminStats = async () => {
  const userStats = await getUserStats();
  const postStats = await getPostStats();
  const reviewStats = await getReviewStats();

  return (
    <>
      <DashboardStatCard title="Total Users" value={userStats.totalUsers} />
      <DashboardStatCard title="Writers" value={userStats.writers} />
      <DashboardStatCard title="Reviewers" value={userStats.reviewers} />
      <DashboardStatCard title="Total Posts" value={postStats.totalPosts} />
      <DashboardStatCard title="Published Posts" value={postStats.publishedPosts} />
      <DashboardStatCard title="Pending Posts" value={postStats.pendingPosts} />
      <DashboardStatCard title="Total Reviews" value={reviewStats.totalReviews} />
    </>
  );
};

const WriterStats = async ({ userId }: { userId: number }) => {
  const stats = await getWriterStats(userId);

  return (
    <>
      <DashboardStatCard title="My Total Posts" value={stats.totalPosts} />
      <DashboardStatCard title="Published Posts" value={stats.publishedPosts} />
      <DashboardStatCard title="Pending Approval" value={stats.pendingPosts} />
      <DashboardStatCard title="Total Views" value={stats.totalViews} />
    </>
  );
};

const ReviewerStats = async ({ userId }: { userId: number }) => {
  const pendingPosts = await getReviewerPendingPosts();
  const myReviews = await getReviewerStats(userId);

  return (
    <>
      <DashboardStatCard title="Posts to Review" value={pendingPosts.pendingPostsCount} />
      <DashboardStatCard title="My Reviews" value={myReviews.myReviewsCount} />
    </>
  );
};