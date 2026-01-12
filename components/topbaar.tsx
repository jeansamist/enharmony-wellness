"use client";
import { CaretDownIcon } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { FunctionComponent, useMemo } from "react";

export const Topbar: FunctionComponent = () => {
  const LINKS = useMemo(
    () => [
      { href: "/", label: "Home" },
      {
        href: "#",
        label: "Wellness",
        links: [
          { href: "/wellness/coaching", label: "Coaching" },
          { href: "/wellness/therapy", label: "Therapy" },
        ],
      },
      {
        href: "#",
        label: "Holistic Care",
        links: [
          { href: "/holistic/nutrition", label: "Nutrition" },
          { href: "/holistic/fitness", label: "Fitness" },
        ],
      },
      { href: "/guides", label: "Guides" },
      { href: "/videos", label: "Videos" },
      { href: "/about", label: "About Us" },
    ],
    []
  );
  return (
    <div className={"h-24"}>
      <div className="container mx-auto px-6 h-full flex items-center justify-between">
        <Link href={"/"}>
          <Image
            src={"/enharmony-wellness-logo.svg"}
            alt={"EnHarmony Wellness Logo"}
            width={240}
            height={30}
          />
        </Link>
        <div className="flex gap-6">
          {LINKS.map((link) => (
            <div key={link.href} className="relative group">
              <Link
                href={link.href}
                className="text-foreground/70 hover:text-primary font-semibold flex items-center gap-1"
              >
                {link.label}
                {link.links && <CaretDownIcon />}
              </Link>
              {link.links && (
                <div className="absolute top-full left-0 mt-2 bg-secondary rounded-2xl opacity-0 overflow-hidden w-2xs group-hover:opacity-100 transition-opacity z-10">
                  {link.links.map((sublink) => (
                    <Link
                      key={sublink.href}
                      href={sublink.href}
                      className="block px-4 py-2 text-tertiary hover:bg-primary hover:text-secondary"
                    >
                      {sublink.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
