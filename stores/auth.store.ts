import { getAuthenticatedUser } from "@/services/auth.services";
import { create } from "zustand";
type AuthStoreType = {
  user: undefined | null | Awaited<ReturnType<typeof getAuthenticatedUser>>;
  getUserOrFail: () => NonNullable<
    Awaited<ReturnType<typeof getAuthenticatedUser>>
  >;
  setUser: (
    user: Awaited<ReturnType<typeof getAuthenticatedUser>> | null
  ) => void;
};

export const useAuthStore = create<AuthStoreType>((set, current) => ({
  user: undefined,
  getUserOrFail() {
    const user = current().user;
    if (!user) throw new Error("User is undefined");
    return user;
  },
  setUser(user) {
    set({ user });
  },
}));
