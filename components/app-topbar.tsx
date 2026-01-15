"use client";
import { useAuthStore } from "@/stores/auth.store";
import { useSidebarStore } from "@/stores/sidebar.store";
import { PencilSimpleIcon, SidebarIcon } from "@phosphor-icons/react";
import { usePathname } from "next/navigation";
import { FunctionComponent, useMemo } from "react";
import { Button } from "./ui/button";

export const AppTopbar: FunctionComponent = () => {
  const { toggle } = useSidebarStore();
  const pathname = usePathname();
  const { getUserOrFail } = useAuthStore();
  const user = useMemo(() => getUserOrFail(), [getUserOrFail]);

  const LINKS = useMemo(
    () => [
      { href: "/app/dashboard", label: "Dashboard" },
      { href: "/app/posts", label: "Posts" },
      { href: "/app/reviews", label: "Reviews" },
      user.role === "admin"
        ? {
            href: "/app/users",
            label: "Users management",
          }
        : null,
      { href: "/app/settings", label: "Settings" },
    ],
    [user.role]
  );

  return (
    <div
      className={
        "h-24 border-b border-tertiary/10 flex items-center px-6 md:px-12 bg-background gap-6 justify-between"
      }
    >
      <div className="flex items-center gap-4">
        <button className="opacity-70" onClick={toggle} type="button">
          <SidebarIcon size={24} />
        </button>
        <h3 className="font-bold text-xl opacity-70 leading-none">
          {
            LINKS.filter((l) => l !== null).find((l) =>
              pathname.includes(l?.href)
            )?.label
          }
        </h3>
      </div>
      <div className="flex items-center gap-4">
        <Button href="/app/posts/create" variant="primary" className="gap-2">
          <PencilSimpleIcon size={20} /> New post
        </Button>
      </div>
    </div>
  );
};
