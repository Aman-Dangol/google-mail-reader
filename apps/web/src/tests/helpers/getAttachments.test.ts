import type { Mail } from "@repo/shared-types/utils/api-mail-types";
import { describe, expect, it } from "vitest";
import { getAttachements } from "@src/utils/helpers/get-attachments";

describe("getAttachements", () => {
  it("returns an empty list when the payload has no attachments", () => {
    const payload: Mail["payload"] = {
      mimeType: "text/plain",
      body: { size: 42 },
      parts: [
        {
          mimeType: "text/plain",
          filename: "",
          body: { size: 10 },
        },
      ],
    };

    expect(getAttachements(payload)).toEqual([]);
  });

  it("collects attachments from nested parts and adds the filename", () => {
    const payload: Mail["payload"] = {
      mimeType: "multipart/mixed",
      body: { size: 0 },
      parts: [
        {
          partId: "0",
          mimeType: "multipart/alternative",
          filename: "",
          body: { size: 0 },
          parts: [
            {
              partId: "0.0",
              mimeType: "text/plain",
              filename: "",
              body: { size: 35, data: "hello" },
            },
            {
              partId: "0.1",
              mimeType: "application/pdf",
              filename: "nested-report.pdf",
              body: {
                attachmentId: "nested-123",
                size: 250,
              },
            },
          ],
        },
        {
          partId: "1",
          mimeType: "application/octet-stream",
          filename: "invoice.pdf",
          body: {
            attachmentId: "invoice-456",
            size: 245760,
          },
        },
      ],
    };

    expect(getAttachements(payload)).toEqual([
      {
        attachmentId: "nested-123",
        size: 250,
        fileName: "nested-report.pdf",
      },
      {
        attachmentId: "invoice-456",
        size: 245760,
        fileName: "invoice.pdf",
      },
    ]);
  });
});
