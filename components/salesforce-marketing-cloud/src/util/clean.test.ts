import { toNumberArray, toOptionalNumber, toOptionalString } from "./clean";
describe("toOptionalString", () => {
  test("returns the stringified value for a truthy input", () => {
    expect(toOptionalString("hello")).toBe("hello");
    expect(toOptionalString(42)).toBe("42");
    expect(toOptionalString(true)).toBe("true");
  });
  test("returns undefined for falsy input", () => {
    expect(toOptionalString("")).toBeUndefined();
    expect(toOptionalString(undefined)).toBeUndefined();
    expect(toOptionalString(null)).toBeUndefined();
    expect(toOptionalString(0)).toBeUndefined();
    expect(toOptionalString(false)).toBeUndefined();
  });
});
describe("toOptionalNumber", () => {
  test("returns the numeric value for a truthy input", () => {
    expect(toOptionalNumber("42")).toBe(42);
    expect(toOptionalNumber(" 7 ")).toBe(7);
    expect(toOptionalNumber(3.5)).toBe(3.5);
  });
  test("returns undefined for falsy input", () => {
    expect(toOptionalNumber("")).toBeUndefined();
    expect(toOptionalNumber(undefined)).toBeUndefined();
    expect(toOptionalNumber(null)).toBeUndefined();
    expect(toOptionalNumber(0)).toBeUndefined();
    expect(toOptionalNumber("0")).toBe(0);
  });
  test("throws when the value is not convertible to a number", () => {
    expect(() => toOptionalNumber("not-a-number")).toThrow();
  });
});
describe("toNumberArray", () => {
  test("splits a comma-separated string into numbers", () => {
    expect(toNumberArray("1,2,3")).toEqual([1, 2, 3]);
  });
  test("trims whitespace around each entry", () => {
    expect(toNumberArray(" 1 , 2 ,3 ")).toEqual([1, 2, 3]);
  });
  test("returns a single-element array for a lone value", () => {
    expect(toNumberArray("5")).toEqual([5]);
  });
  test("returns undefined for falsy input", () => {
    expect(toNumberArray("")).toBeUndefined();
    expect(toNumberArray(undefined)).toBeUndefined();
    expect(toNumberArray(null)).toBeUndefined();
  });
  test("the NaN filter is unreachable: bad segments throw, blank segments become 0", () => {
    expect(() => toNumberArray("1,abc,3")).toThrow();
    expect(toNumberArray("1,,3")).toEqual([1, 0, 3]);
    expect(toNumberArray("1,,3")).not.toEqual([1, 3]);
  });
});
