import { describe, expect, test } from "vitest";
import { lookBackDateClean } from "./clean";
describe("lookBackDateClean", () => {
  test("normalizes a valid date to the ISO instant the trigger consumes", () => {
    expect(lookBackDateClean("2026-01-01")).toBe("2026-01-01T00:00:00.000Z");
    expect(lookBackDateClean("  2026-01-01  ")).toBe(
      "2026-01-01T00:00:00.000Z",
    );
  });
  test("returns the EMPTY STRING for an unset input, never undefined", () => {
    for (const unset of [undefined, null, "", "   "]) {
      expect(lookBackDateClean(unset)).toBe("");
    }
  });
  test("rejects anything that is not YYYY-MM-DD, naming the input by its label", () => {
    for (const bad of [
      "2026-01-01T00:00:00Z",
      "01/01/2026",
      "2026-1-1",
      "not-a-date",
    ]) {
      expect(() => lookBackDateClean(bad)).toThrow(
        /Look-back Date must be a date in YYYY-MM-DD format/,
      );
    }
  });
  test("rejects a date that matches the shape but is not on the calendar", () => {
    expect(() => lookBackDateClean("2026-02-31")).toThrow(
      /must be a date in YYYY-MM-DD format/,
    );
  });
  test("rejects a future date", () => {
    const nextYear = new Date().getUTCFullYear() + 1;
    expect(() => lookBackDateClean(`${nextYear}-01-01`)).toThrow(
      /Look-back Date cannot be a future date/,
    );
  });
  test("rejects non-string values rather than coercing them", () => {
    for (const bad of [20260101, new Date("2026-01-01"), {}, ["2026-01-01"]]) {
      expect(() => lookBackDateClean(bad)).toThrow(/Look-back Date/);
    }
  });
});
