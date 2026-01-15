import { z } from "zod";
export const createPostSchema = z.object({
  title: z.string(),
  content: z.string(),
  description: z.string(),
  reviewer: z.coerce.number(),
  category: z.coerce.number(),
  cover: z.string(),
  read_time: z.coerce.number(),
  video_url: z.string().optional(),
  slug: z.string(),
  type: z.enum(["text", "video"]),
});

export const createCategorySchema = z.object({
  name: z.string(),
});
