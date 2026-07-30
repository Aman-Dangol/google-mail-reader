import type { Mail } from "@repo/shared-types/utils/api-mail-types";
import type { AttachmentData } from "@src/utils/types/attachment-types";

export const getAttachements = (
  payload: Mail["payload"],
  currentAttachments: AttachmentData[] = [],
): AttachmentData[] => {
  if (payload?.body?.attachmentId) {
    currentAttachments.push({
      ...payload.body,
      fileName: payload.filename ?? "",
    });
  }

  if (payload?.parts?.length) {
    for (const part of payload.parts) {
      getAttachements(part, currentAttachments);
    }
  }

  return currentAttachments;
};
