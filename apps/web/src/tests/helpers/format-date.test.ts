import { formatDate } from "@src/utils/helpers/format-date";
import { describe, expect, it } from "vitest";

describe("it formats date to return month(name) and day", () => {
  const date = new Date("2026-01-01");
  const output = "January 1";

  it("retune Jan 01", () => {
    const res = formatDate(date.getTime().toString());

    expect(res).toBe(output);
  });
});
