import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { lookBackDateClean } from "./connection";
describe("lookBackDateClean", () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date("2026-10-01T12:00:00.000Z"));
  });
  afterEach(() => {
    vi.useRealTimers();
  });
  test("trims a valid date and returns it as YYYY-MM-DD", () => {
    expect(lookBackDateClean("  2026-01-01 ")).toBe("2026-01-01");
  });
  test("returns an empty string for a blank or absent value", () => {
    expect(lookBackDateClean("")).toBe("");
    expect(lookBackDateClean("   ")).toBe("");
    expect(lookBackDateClean(undefined)).toBe("");
  });
  test("throws on a value that is not in YYYY-MM-DD format", () => {
    expect(() => lookBackDateClean("01/01/2026")).toThrow(
      "Look-back Date must be in YYYY-MM-DD format.",
    );
  });
  test("throws on a well-formed but impossible calendar date", () => {
    expect(() => lookBackDateClean("2026-02-30")).toThrow(
      'Look-back Date "2026-02-30" is not a valid calendar date.',
    );
    expect(() => lookBackDateClean("2026-02-31")).toThrow(/Look-back Date/);
  });
  test("throws on a future date", () => {
    expect(() => lookBackDateClean("2026-10-02")).toThrow(
      "Look-back Date cannot be a future date.",
    );
  });
});
