import { describe, expect, test } from "vitest";
import {
  lookBackDateClean,
  toDynamicValues,
  toExpandList,
  toFilteredStringList,
  toOptionalNumber,
  toOptionalString,
  toPicklistLowerCase,
  toPicklistStrings,
  toStringList,
} from "./cleanInput";
describe("toOptionalString", () => {
  test("valid non-empty string returns trimmed string", () => {
    const result = toOptionalString("  hello  ");
    expect(result).toBe("  hello  ");
  });
  test("falsy value returns undefined", () => {
    expect(toOptionalString("")).toBeUndefined();
    expect(toOptionalString(null)).toBeUndefined();
    expect(toOptionalString(undefined)).toBeUndefined();
    expect(toOptionalString(0)).toBeUndefined();
    expect(toOptionalString(false)).toBeUndefined();
  });
});
describe("toOptionalNumber", () => {
  test("valid numeric string returns number", () => {
    expect(toOptionalNumber("42")).toBe(42);
    expect(toOptionalNumber(100)).toBe(100);
  });
  test("falsy value returns undefined", () => {
    expect(toOptionalNumber("")).toBeUndefined();
    expect(toOptionalNumber(null)).toBeUndefined();
    expect(toOptionalNumber(undefined)).toBeUndefined();
    expect(toOptionalNumber(0)).toBeUndefined();
    expect(toOptionalNumber(false)).toBeUndefined();
  });
});
describe("toStringList", () => {
  test("valid string array returns mapped strings", () => {
    const result = toStringList(["a", "b", "c"]);
    expect(result).toEqual(["a", "b", "c"]);
  });
  test("empty array returns undefined", () => {
    expect(toStringList([])).toBeUndefined();
  });
  test("non-array returns undefined", () => {
    expect(toStringList("not-array")).toBeUndefined();
    expect(toStringList(null)).toBeUndefined();
    expect(toStringList(42)).toBeUndefined();
  });
});
describe("toExpandList", () => {
  test("valid string array returns Expand[] objects", () => {
    const result = toExpandList(["contact", "account"]);
    expect(result).toEqual([{ property: "contact" }, { property: "account" }]);
  });
  test("empty array returns undefined", () => {
    expect(toExpandList([])).toBeUndefined();
  });
});
describe("toPicklistStrings", () => {
  test("valid picklist returns string array", () => {
    const result = toPicklistStrings(["one", "two"]);
    expect(result).toEqual(["one", "two"]);
  });
  test("non-picklist returns empty array", () => {
    expect(toPicklistStrings("not-array")).toEqual([]);
    expect(toPicklistStrings(null)).toEqual([]);
    expect(toPicklistStrings(42)).toEqual([]);
  });
});
describe("toPicklistLowerCase", () => {
  test("valid picklist returns lowercased trimmed array", () => {
    const result = toPicklistLowerCase(["  Account  ", "Contact"]);
    expect(result).toEqual(["account", "contact"]);
  });
  test("non-picklist returns empty array", () => {
    expect(toPicklistLowerCase("not-array")).toEqual([]);
    expect(toPicklistLowerCase(null)).toEqual([]);
  });
});
describe("toDynamicValues", () => {
  test("valid object returns flattened record", () => {
    const result = toDynamicValues({ name: "test", count: 5 });
    expect(result).toEqual({ name: "test", count: 5 });
  });
  test("falsy value returns empty object", () => {
    expect(toDynamicValues(null)).toEqual({});
    expect(toDynamicValues(undefined)).toEqual({});
    expect(toDynamicValues("")).toEqual({});
    expect(toDynamicValues(0)).toEqual({});
    expect(toDynamicValues(false)).toEqual({});
  });
});
describe("lookBackDateClean", () => {
  test("valid YYYY-MM-DD date returns the string", () => {
    expect(lookBackDateClean("2025-01-15")).toBe("2025-01-15");
  });
  test("invalid format throws", () => {
    expect(() => lookBackDateClean("01-15-2025")).toThrow(
      "Look-back Date must be a date in YYYY-MM-DD format",
    );
    expect(() => lookBackDateClean("not-a-date")).toThrow(
      "Look-back Date must be a date in YYYY-MM-DD format",
    );
  });
  test("future date throws", () => {
    expect(() => lookBackDateClean("2099-12-31")).toThrow(
      "Look-back Date cannot be a future date",
    );
  });
  test("falsy value returns undefined", () => {
    expect(lookBackDateClean("")).toBeUndefined();
    expect(lookBackDateClean(null)).toBeUndefined();
    expect(lookBackDateClean(undefined)).toBeUndefined();
  });
  test("impossible calendar date throws", () => {
    expect(() => lookBackDateClean("2024-02-30")).toThrow(
      "Look-back Date must be a date in YYYY-MM-DD format",
    );
  });
});
describe("toFilteredStringList", () => {
  test("valid string array returns filtered non-empty strings", () => {
    const result = toFilteredStringList(["hello", "world"]);
    expect(result).toEqual(["hello", "world"]);
  });
  test("empty/all-falsy array returns undefined", () => {
    expect(toFilteredStringList([])).toBeUndefined();
    expect(toFilteredStringList(["", "", ""])).toBeUndefined();
  });
});
