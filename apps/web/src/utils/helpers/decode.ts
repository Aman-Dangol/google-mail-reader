import type { Mail } from "@repo/shared-types/utils/api-mail-types";
import { MIME_TYPES } from "@src/utils/types/mime-type";

export const decodeGoogleBase64 = (encoded: string) => {
  const santinitized = encoded?.replace(/-/g, "+").replace(/_/g, "/");

  const toDecode = Uint8Array.from(atob(santinitized), (c) => c.charCodeAt(0));
  return new TextDecoder("utf-8").decode(toDecode);
};

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
  let fallBack = "";

  if (payload?.body?.data) {
    const decoded = decodeGoogleBase64(payload.body.data);

    if (payload.mimeType === MIME_TYPES.PLAIN)
      return `<pre  style="
    white-space: pre-wrap; font-family: inherit">${decoded}</pre>`;

    return decoded;
  }
  const getNestedHtml = (payload: Mail["payload"]): string => {
    if (!payload) return "";

    if (payload.mimeType === MIME_TYPES.HTML) {
      return decodeGoogleBase64(payload.body?.data ?? "");
    }
    if (payload.mimeType === MIME_TYPES.PLAIN) {
      fallBack = decodeGoogleBase64(payload.body?.data ?? "");
    }

    if (payload.parts?.length) {
      for (const part of payload.parts) {
        const html = getNestedHtml(part);

        if (html) {
          return html;
        }
      }
    }

    return "";
  };

  const data = getNestedHtml(payload);
  return data || fallBack;
};
