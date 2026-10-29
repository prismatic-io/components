import { lookBackDateClean } from "./index";

describe("lookBackDateClean", () => {
  test("returns an empty string for an empty value", () => {
    expect(lookBackDateClean(undefined)).toBe("");
    expect(lookBackDateClean("")).toBe("");
    expect(lookBackDateClean("   ")).toBe("");
  });

  test("normalizes a valid date to an ISO timestamp", () => {
    expect(lookBackDateClean(" 2026-01-01 ")).toBe("2026-01-01T00:00:00.000Z");
  });

  test("rejects a malformed or non-calendar date", () => {
    expect(() => lookBackDateClean("01/01/2026")).toThrow(
      "Look-back Date must be a date in YYYY-MM-DD format",
    );
    expect(() => lookBackDateClean("2026-02-31")).toThrow(
      "Look-back Date must be a date in YYYY-MM-DD format",
    );
  });

  test("rejects a future date", () => {
    expect(() => lookBackDateClean("2999-01-01")).toThrow(
      "Look-back Date cannot be a future date",
    );
  });
});
