import { describe, expect, it } from "vitest";
import {
  keyValPairListToObject,
  lookBackDateClean,
  toObjectOrEmpty,
  toOptionalNumber,
  toOptionalObject,
  toOptionalString,
} from "./inputsClean";
describe("toOptionalString", () => {
  it("returns the string for a non-empty value", () => {
    expect(toOptionalString("hello")).toBe("hello");
  });
  it("returns undefined for an empty string", () => {
    expect(toOptionalString("")).toBeUndefined();
  });
  it("returns undefined for null/undefined", () => {
    expect(toOptionalString(null)).toBeUndefined();
    expect(toOptionalString(undefined)).toBeUndefined();
  });
});
describe("toOptionalNumber", () => {
  it("returns the number for a truthy value", () => {
    expect(toOptionalNumber("42")).toBe(42);
    expect(toOptionalNumber(7)).toBe(7);
  });
  it("returns undefined for a falsy value", () => {
    expect(toOptionalNumber("")).toBeUndefined();
    expect(toOptionalNumber(null)).toBeUndefined();
    expect(toOptionalNumber(undefined)).toBeUndefined();
  });
});
describe("toOptionalObject", () => {
  it("parses a JSON string to an object", () => {
    expect(toOptionalObject('{"a":1}')).toEqual({ a: 1 });
  });
  it("returns undefined for falsy values", () => {
    expect(toOptionalObject("")).toBeUndefined();
    expect(toOptionalObject(null)).toBeUndefined();
  });
});
describe("toObjectOrEmpty", () => {
  it("parses a JSON string to an object", () => {
    expect(toObjectOrEmpty('{"key":"val"}')).toEqual({ key: "val" });
  });
  it("returns empty object for falsy values", () => {
    expect(toObjectOrEmpty("")).toEqual({});
    expect(toObjectOrEmpty(null)).toEqual({});
    expect(toObjectOrEmpty(undefined)).toEqual({});
  });
});
describe("keyValPairListToObject", () => {
  it("converts key-value pairs to an object", () => {
    const pairs = [
      { key: "name", value: "Monday" },
      { key: "version", value: "2" },
    ];
    expect(keyValPairListToObject(pairs)).toEqual({
      name: "Monday",
      version: "2",
    });
  });
});
describe("lookBackDateClean", () => {
  it("returns empty string for empty input", () => {
    expect(lookBackDateClean("")).toBe("");
    expect(lookBackDateClean(null)).toBe("");
    expect(lookBackDateClean(undefined)).toBe("");
  });
  it("returns valid YYYY-MM-DD dates", () => {
    expect(lookBackDateClean("2026-01-01")).toBe("2026-01-01");
    expect(lookBackDateClean("2025-12-31")).toBe("2025-12-31");
  });
  it("trims whitespace", () => {
    expect(lookBackDateClean("  2025-06-15  ")).toBe("2025-06-15");
  });
  it("throws on invalid format", () => {
    expect(() => lookBackDateClean("01-01-2026")).toThrow("YYYY-MM-DD format");
    expect(() => lookBackDateClean("2026/01/01")).toThrow("YYYY-MM-DD format");
    expect(() => lookBackDateClean("not-a-date")).toThrow("YYYY-MM-DD format");
  });
  it("throws on invalid calendar date", () => {
    expect(() => lookBackDateClean("2026-02-31")).toThrow(
      "not a valid calendar date",
    );
    expect(() => lookBackDateClean("2026-13-01")).toThrow(
      "not a valid calendar date",
    );
  });
  it("throws on future date", () => {
    expect(() => lookBackDateClean("2099-01-01")).toThrow(
      "cannot be a future date",
    );
  });
});
