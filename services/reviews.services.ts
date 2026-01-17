"use server";
import { prisma } from "@/lib/prisma";

export const getReviewStats = async () => {
  const totalReviews = await prisma.review.count();
  return {
    totalReviews,
  };
};

export const getReviewerStats = async (userId: number) => {
  const myReviewsCount = await prisma.review.count({
    where: {
      user_id: userId,
    },
  });
  return {
    myReviewsCount,
  };
};
