"use server";
import { createCategorySchema, createPostSchema } from "@/schemas/post.schemas";
import { isCurrentUserAdmin } from "@/services/auth.services";
import { sendReviewNotificationEmail } from "@/services/mail.services";
import {
  createCategory,
  createPost,
  createReview,
} from "@/services/post.services";
import { getUserById } from "@/services/user.services";
import { redirect, RedirectType } from "next/navigation";
import { canCreatePost } from "./../services/auth.services";

export const createPostAction = async (formData: FormData) => {
  const canCreatePost_ = await canCreatePost();
  if (!canCreatePost_) {
    return {
      error: "You are not authorized to create a post",
    };
  }
  console.log("Post creation", formData);

  const validatedFields = createPostSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
    category: formData.get("category"),
    description: formData.get("description"),
    reviewer: formData.get("reviewer"),
    cover: formData.get("cover"),
    read_time: formData.get("read_time"),
    video_url: formData.get("video_url"),
    slug: formData.get("slug"),
    type: formData.get("type"),
  });

  console.log("safe data", validatedFields.error);
  if (!validatedFields.success) {
    return {
      error: "Invalid input",
    };
  }

  const data = {
    title: validatedFields.data.title,
    content: validatedFields.data.content,
    category_id: BigInt(validatedFields.data.category),
    description: validatedFields.data.description,
    cover: validatedFields.data.cover,
    read_time: validatedFields.data.read_time,
    video_url: validatedFields.data.video_url || null,
    slug: validatedFields.data.slug,
    type: validatedFields.data.type,
  };

  const post = await createPost(data);
  await createReview({
    post_id: Number(post.id),
    user_id: validatedFields.data.reviewer,
  });

  const reviewer = await getUserById(validatedFields.data.reviewer);
  if (reviewer) {
    const baseUrl = process.env.BACKEND_URL || "http://localhost:3000";
    const link = `${baseUrl}/app/posts/${post.slug}/edit`;
    await sendReviewNotificationEmail(reviewer.email, post.title, link);
  }

  redirect("/app/posts", RedirectType.push);
};
export const createCategoryAction = async (formData: FormData) => {
  const isAdmin = await isCurrentUserAdmin();
  if (!isAdmin) {
    return {
      error: "You are not authorized to create a user",
    };
  }
  const validatedFields = createCategorySchema.safeParse({
    name: formData.get("name"),
  });
  if (!validatedFields.success) {
    return {
      error:
        validatedFields.error.flatten().fieldErrors.name?.[0] ||
        "Invalid input",
    };
  }

  const { name } = validatedFields.data;
  await createCategory(name);
  redirect("/app/settings/categories", RedirectType.push);
};
