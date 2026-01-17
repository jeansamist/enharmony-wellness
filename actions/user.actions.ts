import { createUserSchema } from "@/schemas/user.schemas";
import { isCurrentUserAdmin } from "@/services/auth.services";
import { createUser } from "@/services/user.services";
import { redirect, RedirectType } from "next/navigation";

export const createUserAction = async (formData: FormData) => {
  const isAdmin = await isCurrentUserAdmin();
  if (!isAdmin) {
    return {
      error: "You are not authorized to create a user",
    };
  }
  const validatedFields = createUserSchema.safeParse({
    email: formData.get("email"),
    full_name: formData.get("full_name"),
    role: formData.get("role"),
  });
  if (!validatedFields.success) {
    return {
      error:
        validatedFields.error.flatten().fieldErrors.email?.[0] ||
        "Invalid input",
    };
  }

  const { email, full_name, role } = validatedFields.data;
  await createUser({ email, full_name, role });
  redirect("/app/users", RedirectType.push);
};
