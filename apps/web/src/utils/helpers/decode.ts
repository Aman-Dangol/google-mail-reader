import type { Mail } from "@repo/shared-types/utils/api-mail-types";
import { MIME_TYPES } from "@src/utils/types/mime-type";

export const decodeGoogleBase64 = (encoded: string) => {
  const santinitized = encoded?.replace(/-/g, "+").replace(/_/g, "/");

  const toDecode = Uint8Array.from(atob(santinitized), (c) => c.charCodeAt(0));
  return new TextDecoder("utf-8").decode(toDecode);
};

export const getDecodedHtml = (payload?: Mail["payload"]): string => {
  if (!payload) return "";

  if (payload.mimeType === MIME_TYPES.HTML) {
    return decodeGoogleBase64(payload.body?.data ?? "");
  }

  if (payload.parts?.length) {
    for (const part of payload.parts) {
      const html = getDecodedHtml(part);

      if (html) {
        return html;
      }
    }
  }
  return "";
};
