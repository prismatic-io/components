import { describe, expect, test } from "vitest";
import { resolveRowCount } from "./inputs";
describe("resolveRowCount", () => {
  test("a blank input is undefined, so the caller keeps its own default", () => {
    expect(resolveRowCount("")).toBeUndefined();
    expect(resolveRowCount(undefined)).toBeUndefined();
    expect(resolveRowCount(null)).toBeUndefined();
  });
  test("a configured count is returned as a number", () => {
    expect(resolveRowCount("2500")).toBe(2500);
    expect(resolveRowCount(2500)).toBe(2500);
    expect(resolveRowCount("1")).toBe(1);
  });
  test("blankness is distinguished from a typed zero", () => {
    expect(resolveRowCount("")).toBeUndefined();
    expect(() => resolveRowCount("0")).toThrow(/greater than zero/);
  });
  test("a value that would break the page query is rejected at the input", () => {
    expect(() => resolveRowCount("0")).toThrow();
    expect(() => resolveRowCount("-5")).toThrow();
    expect(() => resolveRowCount("1.5")).toThrow(/whole number/);
  });
  test("either way, the error names the value the user entered", () => {
    expect(() => resolveRowCount("lots")).toThrow(
      /'lots' cannot be coerced to a number/,
    );
    expect(() => resolveRowCount("-5")).toThrow(/"-5"/);
  });
});
