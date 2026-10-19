import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { lookBackDateClean } from "./clean";
const NOW = "2026-06-10T00:00:00.000Z";
describe("lookBackDateClean", () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date(NOW));
  });
  afterEach(() => {
    vi.useRealTimers();
  });
  test("normalizes a valid date to an ISO 8601 string", () => {
    expect(lookBackDateClean("2026-01-01")).toBe("2026-01-01T00:00:00.000Z");
  });
  test("returns an empty string when unset", () => {
    expect(lookBackDateClean("")).toBe("");
    expect(lookBackDateClean(undefined)).toBe("");
  });
  test("throws on a value that is not in YYYY-MM-DD format", () => {
    expect(() => lookBackDateClean("01/01/2026")).toThrow(/Look-back Date/);
  });
  test("throws on a date that is not on the calendar", () => {
    expect(() => lookBackDateClean("2026-02-31")).toThrow(/Look-back Date/);
  });
  test("throws on a future date", () => {
    expect(() => lookBackDateClean("2026-06-11")).toThrow(
      /Look-back Date cannot be a future date/,
    );
  });
  test("throws on a value that is not a string", () => {
    expect(() => lookBackDateClean(20260101)).toThrow(/Look-back Date/);
  });
});
