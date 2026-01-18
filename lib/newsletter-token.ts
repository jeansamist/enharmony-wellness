import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "default-secret-change-me";

export const generateUnsubscribeToken = (email: string) => {
  return jwt.sign({ email }, SECRET, { expiresIn: "30d" });
};

export const verifyUnsubscribeToken = (token: string): string | null => {
  try {
    const decoded = jwt.verify(token, SECRET) as { email: string };
    return decoded.email;
  } catch (error) {
    return null;
  }
};
