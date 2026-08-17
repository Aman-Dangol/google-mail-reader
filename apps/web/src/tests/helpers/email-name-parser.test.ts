import { nameEmailParser } from "@src/utils/helpers/email-name-parser";
import { describe, expect, it } from "vitest";

describe("it parses a google mail formated string to name and email", () => {
  const googleformatedString = "test user <test@user.com>";

  const expectedObj = { name: "test user", email: "test@user.com" };

  it("returns correct username and email", () => {
    const res = nameEmailParser(googleformatedString);

    expect(res).toEqual(expectedObj);
  });
});
