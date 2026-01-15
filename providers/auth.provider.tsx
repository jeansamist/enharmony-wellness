"use client";

import { User } from "@/generated/prisma/client";
import { useAuthStore } from "@/stores/auth.store";
import { ReactNode, useRef } from "react";

type AuthProviderProps = {
  initialUser: User | null;
  children: ReactNode;
};

export default function AuthProvider({
  initialUser,
  children,
}: AuthProviderProps) {
  const initialized = useRef(false);

  if (!initialized.current) {
    useAuthStore.setState({
      user: initialUser,
    });
    initialized.current = true;
  }

  return <>{children}</>;
}
