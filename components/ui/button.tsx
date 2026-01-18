import { cn } from "@/lib/utils";
import Link from "next/link";
import { FunctionComponent } from "react";

export type ButtonProps = {
  variant?: "primary" | "secondary" | "tertiary" | "outline" | "ghost";
  children: React.ReactNode;
  href?: string;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "icon-sm" | "icon-md" | "icon-lg";
  [key: string]: unknown;
};

export const Button: FunctionComponent<ButtonProps> = ({
  variant = "primary",
  children,
  href,
  className,
  size = "md",
  ...props
}) => {
  const variantClasses = {
    primary: "bg-primary text-secondary",
    secondary: "bg-secondary text-primary",
    tertiary: "bg-tertiary text-primary",
    outline: "border border-primary text-primary",
    ghost:
      "bg-transparent text-tertiary/70 hover:text-tertiary hover:bg-tertiary/5",
  };
  const sizeClasses = {
    sm: "px-4 py-2 h-10 text-sm",
    md: "px-4 md:px-6 py-4 h-12 text-sm md:text-base",
    lg: "px-8 py-6 h-14 text-lg",
    xl: "px-10 py-8 h-16 text-xl",
    "icon-sm": "w-10 h-10 text-sm",
    "icon-md": "w-12 h-12 text-base",
    "icon-lg": "w-14 h-14 text-lg",
  };
  if (href) {
    return (
      <Link
        href={href}
        className={cn(
          `rounded-full font-semibold hover:opacity-90 transition-all flex items-center justify-center leading-none disabled:pointer-events-none disabled:opacity-50`,
          variantClasses[variant],
          sizeClasses[size],

          className
        )}
        {...props}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={cn(
        `rounded-full font-semibold hover:opacity-90 transition-opacity flex items-center justify-center leading-none disabled:pointer-events-none disabled:opacity-50`,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
