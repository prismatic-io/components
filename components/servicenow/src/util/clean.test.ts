import { describe, expect, test } from "vitest";
import { cleanJsonInput, cleanStringInput, lookBackDateClean } from "./clean";
describe("cleanStringInput", () => {
  test("valid string returns toString result", () => {
    expect(cleanStringInput("hello")).toBe("hello");
    expect(cleanStringInput(" 42 ")).toBe(" 42 ");
    expect(cleanStringInput(123)).toBe("123");
  });
  test("falsy value returns undefined", () => {
    expect(cleanStringInput("")).toBeUndefined();
    expect(cleanStringInput(null)).toBeUndefined();
    expect(cleanStringInput(undefined)).toBeUndefined();
    expect(cleanStringInput(0)).toBeUndefined();
  });
});
describe("cleanJsonInput", () => {
  test("object with keys returns toObject result", () => {
    const input = { foo: "bar", baz: 1 };
    const result = cleanJsonInput(input);
    expect(result).toEqual(input);
  });
  test("empty object returns undefined", () => {
    expect(cleanJsonInput({})).toBeUndefined();
  });
});
describe("lookBackDateClean", () => {
  test("empty values return an empty string, which means no initial sync", () => {
    expect(lookBackDateClean(undefined)).toBe("");
    expect(lookBackDateClean(null)).toBe("");
    expect(lookBackDateClean("")).toBe("");
    expect(lookBackDateClean("   ")).toBe("");
  });
  test("a YYYY-MM-DD date normalizes to an ISO timestamp", () => {
    expect(lookBackDateClean("2026-01-01")).toBe("2026-01-01T00:00:00.000Z");
    expect(lookBackDateClean(" 2026-01-01 ")).toBe("2026-01-01T00:00:00.000Z");
  });
  test("a non-matching format is rejected", () => {
    expect(() => lookBackDateClean("2024-01-01T00:00:00Z")).toThrow(
      /YYYY-MM-DD format/,
    );
    expect(() => lookBackDateClean("01-01-2026")).toThrow(/YYYY-MM-DD format/);
    expect(() => lookBackDateClean(20260101)).toThrow(/YYYY-MM-DD format/);
  });
  test("a well-formed but non-calendar date is rejected", () => {
    expect(() => lookBackDateClean("2026-02-31")).toThrow(/YYYY-MM-DD format/);
    expect(() => lookBackDateClean("2026-13-01")).toThrow(/YYYY-MM-DD format/);
  });
  test("a future date is rejected", () => {
    const nextYear = new Date().getUTCFullYear() + 1;
    expect(() => lookBackDateClean(`${nextYear}-01-01`)).toThrow(
      /cannot be a future date/,
    );
  });
  test("errors address the input by its display label", () => {
    expect(() => lookBackDateClean("nope")).toThrow(/^Look-back Date /);
  });
});
