import { cn } from "@/lib/utils";
import { ComponentProps, FunctionComponent } from "react";

export type InputProps = ComponentProps<"input">;

export const Input: FunctionComponent<InputProps> = ({
  className,
  ...props
}) => {
  return (
    <input
      className={cn(
        "px-6 py-4 h-12 rounded-full hover:opacity-90 transition-opacity flex items-center justify-center leading-none w-full text-tertiary bg-white border border-tertiary/15 focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-tertiary/70",
        className
      )}
      {...props}
    />
  );
};
