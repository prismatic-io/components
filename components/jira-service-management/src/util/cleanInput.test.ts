import { describe, expect, test } from "vitest";
import { lookBackDateClean } from "./cleanInput";
describe("lookBackDateClean", () => {
  test("returns an empty string for empty input", () => {
    expect(lookBackDateClean(undefined)).toBe("");
    expect(lookBackDateClean(null)).toBe("");
    expect(lookBackDateClean("  ")).toBe("");
  });
  test("normalizes a valid past date to an ISO timestamp", () => {
    expect(lookBackDateClean("2026-01-01")).toBe("2026-01-01T00:00:00.000Z");
  });
  test("rejects a malformed or non-calendar date", () => {
    expect(() => lookBackDateClean("01/01/2026")).toThrow(
      /Look-back Date must be/,
    );
    expect(() => lookBackDateClean("2026-02-31")).toThrow(
      /Look-back Date must be/,
    );
  });
  test("rejects a future date", () => {
    expect(() => lookBackDateClean("2999-01-01")).toThrow(
      /cannot be a future date/,
    );
  });
});
