"use server";
import { prisma } from "@/lib/prisma";
import { addDays } from "date-fns";
import * as jwt from "jsonwebtoken";
import { cookies } from "next/headers";

// Define the shape of your JWT payload
interface JwtPayloadWithUserId extends jwt.JwtPayload {
  userId: number;
}

export const signIn = async (email: string, password: string) => {
  // CHECK IF THE JWT SECRET IS DEFINED
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }
  const user = await prisma.user.findUnique({ where: { email, password } });
  if (!user) {
    return null;
  }
  // GENERATE A JWT TOKEN
  const token = jwt.sign({ userId: Number(user?.id) }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  (await cookies()).set("AUTH_TOKEN", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: addDays(new Date(), 30), // 30 days
  });
  await generatePassword(email); // Regenerate password after sign in
  return { token };
};

const getUserByEmail = (email: string) => {
  return prisma.user.findUnique({ where: { email } });
};

const getUserById = (id: number) => {
  return prisma.user.findUnique({ where: { id } });
};

export const generatePassword = async (email: string) => {
  const length = 12;
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";
  for (let i = 0, n = charset.length; i < length; ++i) {
    password += charset.charAt(Math.floor(Math.random() * n));
  }
  const user = await getUserByEmail(email);
  if (user) {
    user.password = password;
    await prisma.user.update({ where: { id: user.id }, data: user });
    return password;
  } else {
    return null;
  }
};

export const isAuthenticated = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("AUTH_TOKEN")?.value;
  console.log("[TOKEN]", token);

  if (!token) {
    return false;
  }
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }
    // Type assertion to tell TypeScript about the shape of your payload
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    ) as JwtPayloadWithUserId;
    await getUserById(decoded.userId);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getAuthenticatedUser = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("AUTH_TOKEN")?.value;

  if (!token) {
    return null;
  }
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    ) as JwtPayloadWithUserId;
    const user = await getUserById(decoded.userId);
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const signOut = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("AUTH_TOKEN");
};

export const isCurrentUserReviewer = async (id: number) => {
  const user = await getAuthenticatedUser();
  if (user?.role !== "reviewer") {
    return false;
  }
  return true;
};

export const isCurrentUserAdmin = async () => {
  const user = await getAuthenticatedUser();
  if (user?.role !== "admin") {
    return false;
  }
  return true;
};

export const canCreatePost = async () => {
  const user = await getAuthenticatedUser();
  if (user?.role === "reviewer") {
    return false;
  }
  return true;
};
