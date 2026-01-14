"use server";

import { signInSchema } from "@/schemas/auth.schemas";
import { generatePassword } from "@/services/auth.services";
import { sendSignInEmail } from "@/services/mail.services";

export const signInAction = async (formData: FormData) => {
  const validatedFields = signInSchema.safeParse({
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return {
      error:
        validatedFields.error.flatten().fieldErrors.email?.[0] ||
        "Invalid input",
    };
  }

  const { email } = validatedFields.data;
  const pass = await generatePassword(email);
  if (!pass) {
    return { error: "Failed to authenticate. Please try again." };
  }

  const signInLink = `http://localhost:3000/api/auth/sign-in?email=${encodeURIComponent(
    email
  )}&code=${encodeURIComponent(pass)}`;
  const signInEmailSent = await sendSignInEmail(email, signInLink);
  if (!signInEmailSent) {
    return { error: "Failed to send sign-in email. Please try again." };
  }
  return null;
  // Perform sign-in logic here
};
