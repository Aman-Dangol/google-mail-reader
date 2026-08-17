import { getInitials } from "@src/utils/helpers/get-initials";
import { describe, expect, it } from "vitest";

describe("retuns initials of a name", () => {
  it("retuns empty string", () => {
    const name = "";
    expect(getInitials(name)).toBe("");
  });

  it("returns first and last name initals", () => {
    const name = "Test Userino";

    expect(getInitials(name)).toBe("TU");
  });

  it("returns only first name initial", () => {
    const name = "Test";
    expect(getInitials(name)).toBe("T");
  });
});
