import { EMAIL_REGEEX, TRIM_QUOTES_REGEX } from "@src/utils/regex/regex";

export const nameEmailParser = (string: string) => {
  const [, name, email] = string.match(EMAIL_REGEEX) ?? ["", "", ""];

  //remove initial quotation marks
  const cleanName = name?.replace(TRIM_QUOTES_REGEX, "");

  return { name: cleanName, email };
};
