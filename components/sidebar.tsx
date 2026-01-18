"use client";
import { useMobile } from "@/hooks/useMobile";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth.store";
import { useSidebarStore } from "@/stores/sidebar.store";
import {
  GaugeIcon,
  GearIcon,
  PencilIcon,
  ThumbsUpIcon,
  UsersThreeIcon,
  EnvelopeSimpleIcon,
} from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FunctionComponent, useEffect, useMemo } from "react";
import { Button } from "./ui/button";

export const Sidebar: FunctionComponent = () => {
  const { getUserOrFail } = useAuthStore();
  const user = useMemo(() => getUserOrFail(), [getUserOrFail]);
  const isMobile = useMobile();
  const { isOpen, setOpen } = useSidebarStore();

  // Open sidebar by default if not mobile
  useEffect(() => {
    setOpen(!isMobile);
  }, [isMobile, setOpen]);

  const pathname = usePathname();

  const LINKS = useMemo(
    () => [
      { href: "/app/dashboard", label: "Dashboard", icon: GaugeIcon },
      { href: "/app/posts", label: "Posts", icon: PencilIcon },
      { href: "/app/reviews", label: "Reviews", icon: ThumbsUpIcon },
      user.role === "admin"
        ? {
            href: "/app/users",
            label: "Users management",
            icon: UsersThreeIcon,
          }
        : null,
      user.role === "admin"
        ? {
            href: "/app/newsletter",
            label: "Newsletter",
            icon: EnvelopeSimpleIcon,
          }
        : null,
      { href: "/app/settings", label: "Settings", icon: GearIcon },
    ],
    [user.role]
  );

  return (
    <>
      {/* Backdrop on mobile */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 z-40 bg-tertiary/30 backdrop-blur-3xl transition-opacity duration-300"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "bg-secondary border-r border-tertiary/10 flex flex-col h-screen transition-all duration-300 ease-in-out",
          // Width and position logic
          isMobile
            ? "fixed inset-0 z-50 w-sm transform" // mobile full screen
            : "relative shrink-0", // desktop
          isOpen
            ? "translate-x-0 max-w-sm w-10/12" // open
            : isMobile
              ? "-translate-x-full" // hidden on mobile
              : "w-0 overflow-hidden" // collapse on desktop
        )}
      >
        {/* Logo */}
        <div className="h-24 flex items-center justify-center border-b border-tertiary/10 px-4">
          <Link href="/app/dashboard">
            <Image
              src="/enharmony-wellness-logo.svg"
              alt="EnHarmony Wellness Logo"
              width={240}
              height={30}
              className="w-60 h-auto transition-all duration-300"
            />
          </Link>
        </div>

        {/* Links */}
        <div className="flex-1 space-y-2 overflow-y-auto p-6 transition-all duration-300">
          {(LINKS.filter(Boolean) as NonNullable<(typeof LINKS)[number]>[]).map(
            (link, index) => {
              const isActive = pathname.includes(link.href);
              return (
                <Button
                  key={index}
                  variant={isActive ? "primary" : "ghost"}
                  href={link.href}
                  className="w-full justify-start gap-4"
                >
                  <link.icon weight={isActive ? "fill" : "regular"} size={24} />
                  {link.label}
                </Button>
              );
            }
          )}
        </div>

        {/* User */}
        <div className="h-24 flex items-center border-t border-tertiary/10 p-6 gap-6 transition-all duration-300 overflow-hidden">
          <Image
            src={`https://tapback.co/api/avatar/${encodeURIComponent(
              user.full_name
            )}`}
            alt="User Avatar"
            width={40}
            height={40}
            className="w-10 h-10 rounded-full"
          />
          <div className="transition-opacity duration-300">
            <div className="font-bold text-lg">{user.full_name}</div>
            <div className="text-sm text-primary">{user.role}</div>
          </div>
        </div>
      </div>
    </>
  );
};
