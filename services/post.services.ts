"use server";

import { PostType } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { getAuthenticatedUser } from "./auth.services";

export const createPost = async (data: {
  type: PostType;
  cover: string;
  video_url: string | null;
  title: string;
  description: string;
  slug: string;
  content: string;
  read_time: number;
  category_id: bigint;
}) => {
  const user = await getAuthenticatedUser();

  const post = await prisma.post.create({
    data: {
      ...data,
      views: 0,
      published: false,
      approved: false,
      user_id: user!.id,
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

export const getPostById = async (id: number) => {
  const post = await prisma.post.findUnique({ where: { id } });
  return post;
};

export const getPosts = async () => {
  const user = await getAuthenticatedUser();
  if (!user) {
    return [];
  }
  if (user.role === "admin") {
    const posts = await prisma.post.findMany({
      include: {
        category: true,
        user: true,
        reviews: {
          include: {
            user: true,
          },
        },
      },
    });
    return posts;
  }
  const posts = await prisma.post.findMany({
    where: {
      user_id: user.id,
    },
    include: {
      category: true,
      user: true,
      reviews: {
        include: {
          user: true,
        },
      },
    },
  });
  return posts;
};
export const getPostBySlug = async (slug: string) => {
  const user = await getAuthenticatedUser();
  const post = await prisma.post.findFirst({
    where: { slug },
    include: {
      category: true,
      user: true,
      reviews: { include: { user: true } },
    },
  });
  // Check if the post is approved and if the user is authorized to view it. Only published posts are visible by default for everyone
  if (post) {
    if (post.published) {
      if (!user) {
        post.views += 1;
        await prisma.post.update({
          where: { id: post.id },
          data: { views: post.views },
        });
      }
      return post;
    }
    if (user) {
      if (user.role === "admin") {
        return post;
      }
      if (user.id === post.user_id) {
        return post;
      }
      if (post.reviews.some((review) => review.user_id === user.id)) {
        return post;
      }
    }
    return null;
  }

  return null;
};

export const deletePostBySlug = async (slug: string) => {
  const post = getPostBySlug(slug);

  const user = await getAuthenticatedUser();
};
