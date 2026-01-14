import { cn } from "@/lib/utils";
import Link from "next/link";
import { FunctionComponent } from "react";

export type ButtonProps = {
  variant?: "primary" | "secondary" | "tertiary" | "outline";
  children: React.ReactNode;
  href?: string;
  className?: string;
  [key: string]: unknown;
};

export const Button: FunctionComponent<ButtonProps> = ({
  variant = "primary",
  children,
  href,
  className,
  ...props
}) => {
  const variantClasses = {
    primary: "bg-primary text-secondary",
    secondary: "bg-secondary text-primary",
    tertiary: "bg-tertiary text-primary",
    outline: "border border-primary text-primary",
  };

  if (href) {
    return (
      <Link
        href={href}
        className={cn(
          `px-6 py-4 h-12 rounded-full font-semibold hover:opacity-90 transition-opacity flex items-center justify-center leading-none`,
          variantClasses[variant],
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
        `px-6 py-4 h-12 rounded-full font-semibold hover:opacity-90 transition-opacity flex items-center justify-center leading-none`,
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
