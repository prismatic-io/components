import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { lookBackDateClean } from "./clean";

describe("lookBackDateClean", () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date("2026-10-12T12:00:00.000Z"));
  });
  afterEach(() => vi.useRealTimers());

  test("returns an empty string for an empty value", () => {
    expect(lookBackDateClean(undefined)).toBe("");
    expect(lookBackDateClean(null)).toBe("");
    expect(lookBackDateClean("  ")).toBe("");
  });

  test("normalizes a valid past date to an ISO instant", () => {
    expect(lookBackDateClean("2026-01-01")).toBe("2026-01-01T00:00:00.000Z");
  });

  test("rejects a wrong format", () => {
    expect(() => lookBackDateClean("01/01/2026")).toThrow(
      /Look-back Date must be/,
    );
    expect(() => lookBackDateClean(20260101)).toThrow(/Look-back Date must be/);
  });

  test("rejects a non-calendar date", () => {
    expect(() => lookBackDateClean("2026-02-31")).toThrow(
      /Look-back Date must be/,
    );
  });

  test("rejects a future date", () => {
    expect(() => lookBackDateClean("2026-12-31")).toThrow(
      /Look-back Date cannot be a future date/,
    );
  });
});
