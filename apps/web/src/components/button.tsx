import { mergeClass } from "@src/utils/tailwind-class-merge/classMerge";
import { type ComponentProps, type ReactNode } from "react";

interface Props extends ComponentProps<"button"> {
  children: string | ReactNode;
}

export const Button = ({ type = "button", children, ...props }: Props) => {
  const childElement =
    typeof children === "string" ? <span>{children}</span> : children;
  return (
    <button
      {...props}
      type={type}
      className={mergeClass(
        "bg-fg-primary text-bg-primary h-8 cursor-pointer rounded-sm p-1 text-sm",
        props.className,
      )}>
      {childElement}
    </button>
  );
};
