import { cn } from "@/lib/utils";
import { ComponentProps, FunctionComponent } from "react";

export type SelectProps = ComponentProps<"select"> & {
  options: { value: string; label: string }[];
};

export const Select: FunctionComponent<SelectProps> = ({
  className,
  options,
  ...props
}) => {
  return (
    <select
      className={cn(
        "px-6 0 h-12 rounded-full hover:opacity-90 transition-opacity flex items-center justify-center w-full text-tertiary bg-white border border-tertiary/15 focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-tertiary/70",
        className
      )}
      {...props}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
