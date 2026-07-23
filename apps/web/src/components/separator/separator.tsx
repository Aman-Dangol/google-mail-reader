import { Separator as RadixSeparator } from "radix-ui";

export const Separator = () => (
  <RadixSeparator.Root className="my-2 bg-fg-primary data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px" />
);
