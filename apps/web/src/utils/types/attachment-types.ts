import type { Mail } from "@repo/shared-types/utils/api-mail-types";

export type AttachmentData = NonNullable<Mail["payload"]>["body"] & {
  fileName: string;
};
