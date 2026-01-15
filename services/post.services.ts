"use server";

import { prisma } from "@/lib/prisma";
import { getAuthenticatedUser } from "./auth.services";

export const createPost = async (data: unknown) => {
  const user = await getAuthenticatedUser();
  const post = await prisma.post.create({
    data: {
      ...data,
      views: 0,
      published: false,
      approved: false,
      user_id: user.id,
    },
  });
  return post;
};

export const createCategory = async (name: string) => {
  await prisma.category.create({ data: { name } });
};

export const getCategories = async () => {
  const categories = await prisma.category.findMany();
  return categories;
};

export const createReview = async (data: {
  post_id: number;
  user_id: number;
}) => {
  const { post_id, user_id } = data;
  const review = await prisma.review.create({
    data: {
      post_id,
      user_id,
    },
  });
  return review;
};
