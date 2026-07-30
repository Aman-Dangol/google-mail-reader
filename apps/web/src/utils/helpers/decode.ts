import type { Mail } from "@repo/shared-types/utils/api-mail-types";
import { MIME_TYPES } from "@src/utils/types/mime-type";

export const decodeGoogleBase64 = (encoded: string) => {
  const santinitized = encoded?.replace(/-/g, "+").replace(/_/g, "/");

  const toDecode = Uint8Array.from(atob(santinitized), (c) => c.charCodeAt(0));
  return new TextDecoder("utf-8").decode(toDecode);
};
console.log("object");

export const decodeGoogleBase64Bytes = (
  encoded: string,
): Uint8Array<ArrayBuffer> => {
  const sanitized = encoded.replace(/-/g, "+").replace(/_/g, "/");
  const bytes = Uint8Array.from(atob(sanitized), (c) => c.charCodeAt(0));

  return bytes;
};

export const handleDownloadGoogleBase64String = ({
  data,
  fileName,
}: {
  data: string;
  fileName: string;
}) => {
  const decoded = decodeGoogleBase64Bytes(data);

  const url = URL.createObjectURL(
    new Blob([decoded], { type: "application/octet-stream" }),
  );

  const link = document.createElement("a");
  link.href = url;
  link.download = fileName ?? "attachment";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
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
