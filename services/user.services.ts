"use server";
import { prisma } from "@/lib/prisma";

export const getUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};

export const getUserById = async (id: number) => {
  const user = await prisma.user.findUnique({ where: { id } });
  return user;
};

export const createUser = async (data: {
  email: string;
  full_name: string;
  role: string;
}) => {
  const length = 12;
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";
  for (let i = 0, n = charset.length; i < length; ++i) {
    password += charset.charAt(Math.floor(Math.random() * n));
  }
  const user = await prisma.user.create({ data: { ...data, password } });
  return user;
};

const getReviewer = async (id: number) => {
  const user = await getUserById(id);
  if (user?.role !== "reviewer") {
    return null;
  }
  return user;
};

export const getReviewers = async () => {
  const reviewers = await prisma.user.findMany({
    where: {
      role: "reviewer",
    },
  });
  return reviewers;
};
export const getReviewerReviews = async (reviewerId: number) => {
  const reviewer = await getReviewer(reviewerId);
  if (!reviewer) {
    return [];
  }
  const reviews = await prisma.review.findMany({
    where: {
      user_id: reviewer.id,
    },
    include: {
      post: true,
    },
  });
  return reviews;
};

export const getUserStats = async () => {
  const totalUsers = await prisma.user.count();
  const writers = await prisma.user.count({
    where: {
      role: "writer",
    },
  });
  const reviewers = await prisma.user.count({
    where: {
      role: "reviewer",
    },
  });

  return {
    totalUsers,
    writers,
    reviewers,
  };
};
