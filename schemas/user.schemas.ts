import { z } from "zod";
export const createUserSchema = z.object({
  full_name: z.string().min(3),
  email: z.email(),
  role: z.enum(["writer", "reviewer"]),
});
