import { cn } from "@/lib/utils";
import { ComponentProps, FunctionComponent } from "react";

export type LabelProps = ComponentProps<"label">;

export const Label: FunctionComponent<LabelProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <label
      className={cn("block font-semibold leading-normal", className)}
      {...props}
    >
      {children}
    </label>
  );
};
