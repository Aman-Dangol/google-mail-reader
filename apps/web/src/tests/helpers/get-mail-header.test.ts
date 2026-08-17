import type { Mail } from "@repo/shared-types/utils/api-mail-types";
import { describe, expect, it } from "vitest";
import { getMailHeader } from "@src/utils/helpers/get-mail-header";

describe("getMailHeader", () => {
  const mail = {
    payload: {
      headers: [
        { name: "From", value: "sender@example.com" },
        { name: "Subject", value: "Hello there" },
        { name: "To", value: "recipient@example.com" },
      ],
    },
  } as Mail;

  it("returns the matching header case-insensitively", () => {
    expect(getMailHeader(mail, "subject")).toEqual({
      name: "Subject",
      value: "Hello there",
    });
  });

  it("returns a not found placeholder when the header is missing", () => {
    expect(getMailHeader(mail, "bcc")).toEqual({
      name: "Header Not Found",
      value: "",
    });
  });

  it("keeps the original header casing from the payload", () => {
    expect(getMailHeader(mail, "from")).toEqual({
      name: "From",
      value: "sender@example.com",
    });
  });
});
