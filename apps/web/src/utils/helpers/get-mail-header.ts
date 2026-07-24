import type { Mail } from "@repo/shared-types/utils/api-mail-types";

export const getMailHeader = (mail: Mail, searchHeader: string) => {
  const header = mail.payload?.headers?.find(
    (item) => item.name?.toLowerCase() === searchHeader.toLowerCase(),
  );

  if (!header) return { name: "Header Not Found", value: "" };

  return header;
};
