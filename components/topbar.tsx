"use client";

import { CaretDownIcon, List, X } from "@phosphor-icons/react"; // Added List and X icons
import Image from "next/image";
import Link from "next/link";
import { FunctionComponent, useMemo, useState } from "react";
import { Button } from "./ui/button";

export const Topbar: FunctionComponent = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    <div className="h-16 sm:h-24 relative bg-background">
      <div className="container mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href={"/"} className="relative z-50">
          <Image
            src={"/enharmony-wellness-logo.svg"}
            alt={"EnHarmony Wellness Logo"}
            width={240}
            height={30}
            className="w-40 md:w-60 h-auto" // Responsive logo sizing
          />
        </Link>

        {/* --- Desktop Navigation (Hidden on mobile) --- */}
        <div className="hidden xl:flex gap-6 items-center">
          {LINKS.map((link, index) => (
            <div key={index} className="relative group">
              <Link
                href={link.href}
                className="text-foreground/70 hover:text-primary font-semibold flex items-center gap-1 py-2"
              >
                {link.label}
                {link.links && <CaretDownIcon />}
              </Link>
              {link.links && (
                <div className="absolute top-full left-0 mt-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="bg-secondary rounded-2xl overflow-hidden w-48 shadow-lg ring-1 ring-black/5">
                    {link.links.map((sublink) => (
                      <Link
                        key={sublink.href}
                        href={sublink.href}
                        className="block px-4 py-2 text-tertiary hover:bg-primary hover:text-secondary text-sm"
                      >
                        {sublink.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          <div className="flex gap-3 ml-4">
            <Button variant="outline" href="/#newsletter">
              Subscribe
            </Button>
            <Button variant="primary" href="/get-started">
              Sign in
            </Button>
          </div>
        </div>

        {/* --- Mobile Menu Trigger --- */}
        <button
          className="xl:hidden p-2 text-foreground/70 hover:text-primary z-50"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X size={28} weight="bold" />
          ) : (
            <List size={28} weight="bold" />
          )}
        </button>

        {/* --- Mobile Navigation Dropdown --- */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-background border-t border-border shadow-xl xl:hidden z-40 flex flex-col p-6 animate-in slide-in-from-top-5">
            <div className="flex flex-col gap-4">
              {LINKS.map((link, index) => (
                <div key={index}>
                  {link.links ? (
                    // Native HTML details/summary for accordion effect without libraries
                    <details className="group">
                      <summary className="list-none flex justify-between items-center text-lg font-semibold text-foreground/80 cursor-pointer">
                        {link.label}
                        <CaretDownIcon
                          className="transition-transform group-open:rotate-180"
                          size={20}
                        />
                      </summary>
                      <div className="mt-2 pl-4 flex flex-col gap-2 border-l-2 border-primary/20 ml-1">
                        {link.links.map((sublink) => (
                          <Link
                            key={sublink.href}
                            href={sublink.href}
                            className="text-foreground/70 py-1 hover:text-primary"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {sublink.label}
                          </Link>
                        ))}
                      </div>
                    </details>
                  ) : (
                    <Link
                      href={link.href}
                      className="block text-lg font-semibold text-foreground/80 hover:text-primary"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}

              <hr className="my-2 border-border" />

              <div className="flex flex-col gap-3">
                <Button
                  variant="outline"
                  href="/#newsletter"
                  className="w-full justify-center"
                >
                  Subscribe
                </Button>
                <Button
                  variant="primary"
                  href="/get-started"
                  className="w-full justify-center"
                >
                  Sign in
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
