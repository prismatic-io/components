import {
  toNumberArray,
  toOptionalBoolean,
  toOptionalNumber,
  toOptionalString,
  toStringArray,
} from "./clean";

describe("centralized clean functions", () => {
  test("toOptionalString returns undefined for empty values", () => {
    expect(toOptionalString("")).toBeUndefined();
    expect(toOptionalString(undefined)).toBeUndefined();
    expect(toOptionalString("abc")).toBe("abc");
  });

  test("toOptionalNumber returns undefined for empty values", () => {
    expect(toOptionalNumber("")).toBeUndefined();
    expect(toOptionalNumber("42")).toBe(42);
  });

  test("toOptionalBoolean distinguishes unset from false", () => {
    expect(toOptionalBoolean("")).toBeUndefined();
    expect(toOptionalBoolean("false")).toBe(false);
    expect(toOptionalBoolean("true")).toBe(true);
  });

  test("toStringArray keeps string arrays for JSON bodies", () => {
    expect(toStringArray(["1", "2"])).toEqual(["1", "2"]);
    expect(toStringArray([])).toBeUndefined();
  });

  test("toNumberArray converts entries to integers for JSON bodies", () => {
    expect(toNumberArray(["50891", "50892"])).toEqual([50891, 50892]);
    expect(toNumberArray([])).toBeUndefined();
  });
});
