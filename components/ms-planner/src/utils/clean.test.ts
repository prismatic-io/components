import { describe, expect, test } from "vitest";
import {
  cleanCategoryLabels,
  cleanChecklistItems,
  cleanOptionalNumber,
  cleanReferences,
  cleanStringInput,
  cleanStringList,
} from "./clean";
describe("cleanOptionalNumber", () => {
  test("maps an unset input to undefined rather than 0", () => {
    expect(cleanOptionalNumber(undefined)).toBeUndefined();
    expect(cleanOptionalNumber(null)).toBeUndefined();
    expect(cleanOptionalNumber("")).toBeUndefined();
  });
  test("preserves a real zero from either a number or a string", () => {
    expect(cleanOptionalNumber(0)).toBe(0);
    expect(cleanOptionalNumber("0")).toBe(0);
  });
  test("coerces other values to a number", () => {
    expect(cleanOptionalNumber("50")).toBe(50);
    expect(cleanOptionalNumber(100)).toBe(100);
  });
  test("throws on a value that is not numeric", () => {
    expect(() => cleanOptionalNumber("abc")).toThrow(
      "Value 'abc' cannot be coerced to a number.",
    );
  });
});
describe("cleanStringInput", () => {
  test("maps an unset or blank input to undefined so it is omitted rather than sent as ''", () => {
    expect(cleanStringInput(undefined)).toBeUndefined();
    expect(cleanStringInput(null)).toBeUndefined();
    expect(cleanStringInput("")).toBeUndefined();
  });
  test("coerces a supplied value to a string", () => {
    expect(cleanStringInput("value")).toBe("value");
    expect(cleanStringInput(42)).toBe("42");
  });
});
describe("cleanStringList", () => {
  test("returns undefined for an unset or empty value", () => {
    expect(cleanStringList(undefined)).toBeUndefined();
    expect(cleanStringList(null)).toBeUndefined();
    expect(cleanStringList("")).toBeUndefined();
    expect(cleanStringList([])).toBeUndefined();
  });
  test("wraps a single value in an array", () => {
    expect(cleanStringList("user-a")).toEqual(["user-a"]);
  });
  test("coerces entries to strings and drops the empty ones", () => {
    expect(cleanStringList(["user-a", "", "user-b"])).toEqual([
      "user-a",
      "user-b",
    ]);
  });
});
describe("cleanCategoryLabels", () => {
  test("converts the key-value list into a category-to-label map", () => {
    expect(
      cleanCategoryLabels([{ key: "category1", value: "Blocked" }]),
    ).toEqual({
      category1: "Blocked",
    });
  });
  test("returns an empty map for an unset input", () => {
    expect(cleanCategoryLabels(undefined)).toBeUndefined();
  });
});
describe("cleanChecklistItems", () => {
  test("maps each row to a title and an isChecked flag parsed from a string value", () => {
    expect(
      cleanChecklistItems([
        { key: "Draft the brief", value: "false" },
        { key: "Book the venue", value: "true" },
      ]),
    ).toEqual([
      { title: "Draft the brief", isChecked: false },
      { title: "Book the venue", isChecked: true },
    ]);
  });
  test("keeps two rows with the same title as separate items", () => {
    expect(
      cleanChecklistItems([
        { key: "Review", value: "true" },
        { key: "Review", value: "false" },
      ]),
    ).toEqual([
      { title: "Review", isChecked: true },
      { title: "Review", isChecked: false },
    ]);
  });
  test("returns an empty list for an unset input", () => {
    expect(cleanChecklistItems(undefined)).toBeUndefined();
  });
});
describe("cleanReferences", () => {
  test("maps each row to a url and an alias", () => {
    expect(
      cleanReferences([
        { key: "https://example.com/spec", value: "Product spec" },
      ]),
    ).toEqual([{ url: "https://example.com/spec", alias: "Product spec" }]);
  });
  test("returns an empty list for an unset input", () => {
    expect(cleanReferences(undefined)).toBeUndefined();
  });
});
