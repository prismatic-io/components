import { describe, expect, test } from "vitest";
import { jsonInputClean, toOptionalString, valueListInputClean } from "./clean";
describe("toOptionalString", () => {
  test("returns the string form of a non-empty value", () => {
    expect(toOptionalString("abc")).toBe("abc");
    expect(toOptionalString(123)).toBe("123");
  });
  test("returns undefined for an empty string", () => {
    expect(toOptionalString("")).toBeUndefined();
  });
  test("returns undefined for null and undefined", () => {
    expect(toOptionalString(null)).toBeUndefined();
    expect(toOptionalString(undefined)).toBeUndefined();
  });
});
describe("jsonInputClean", () => {
  test("parses a valid JSON string via JSON.parse", () => {
    expect(jsonInputClean('{"a":1,"b":[2,3]}')).toEqual({ a: 1, b: [2, 3] });
  });
  test("returns undefined for null", () => {
    expect(jsonInputClean(null)).toBeUndefined();
  });
  test("returns undefined for an empty string", () => {
    expect(jsonInputClean("")).toBeUndefined();
  });
  test("throws on invalid JSON", () => {
    expect(() => jsonInputClean("{not valid json")).toThrow();
  });
});
describe("valueListInputClean", () => {
  test("returns a non-empty array not equal to the sentinel", () => {
    expect(valueListInputClean(["a", "b"])).toEqual(["a", "b"]);
  });
  test("returns undefined for the ['000xxx'] sentinel", () => {
    expect(valueListInputClean(["000xxx"])).toBeUndefined();
  });
  test("returns undefined for an empty array", () => {
    expect(valueListInputClean([])).toBeUndefined();
  });
  test("returns undefined for a non-array value", () => {
    expect(valueListInputClean("not-an-array")).toBeUndefined();
  });
});
