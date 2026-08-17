import { twMerge, type ClassNameValue } from "tailwind-merge";

export const mergeClass = (...ClassNames: ClassNameValue[]) => {
  return twMerge(...ClassNames);
};
