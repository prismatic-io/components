import {
  cleanStringValueListInput,
  lookBackDateClean,
  toOptionalObject,
  toOptionalString,
} from "./clean";
describe("toOptionalObject", () => {
  test.each([
    ['{"a":1}', { a: 1 }],
    ['[{"op":"replace"}]', [{ op: "replace" }]],
    [{ a: 1 }, { a: 1 }],
  ])("parses %j", (input, expected) => {
    expect(toOptionalObject(input)).toEqual(expected);
  });
  test.each([
    [""],
    [undefined],
    [null],
    [0],
  ])("returns undefined for falsy %j", (input) => {
    expect(toOptionalObject(input)).toBeUndefined();
  });
  test.each([
    ["{not json"],
    ['{"a":'],
    ["abc"],
  ])("returns invalid JSON %j unchanged (spectral toObject passes it through)", (input) => {
    expect(toOptionalObject(input)).toBe(input);
  });
});
describe("toOptionalString", () => {
  test("returns the string for a truthy value and undefined for empty", () => {
    expect(toOptionalString("abc")).toBe("abc");
    expect(toOptionalString("")).toBeUndefined();
    expect(toOptionalString(undefined)).toBeUndefined();
  });
});
describe("cleanStringValueListInput", () => {
  test.each([
    [undefined],
    [null],
    [""],
    ["a,b"],
    [{ a: 1 }],
  ])("returns undefined for falsy or non-array %j", (input) => {
    expect(cleanStringValueListInput(input)).toBeUndefined();
  });
  test("drops empty items and stringifies the rest", () => {
    expect(cleanStringValueListInput(["a", "", null, "b", 3])).toEqual([
      "a",
      "b",
      "3",
    ]);
  });
  test("returns [] for an empty array", () => {
    expect(cleanStringValueListInput([])).toEqual([]);
  });
});
describe("lookBackDateClean", () => {
  test.each([
    [""],
    ["   "],
    [undefined],
  ])("returns '' for empty %j", (input) => {
    expect(lookBackDateClean(input)).toBe("");
  });
  test("returns the UTC-midnight ISO timestamp for a valid past date", () => {
    expect(lookBackDateClean("2024-02-29")).toBe("2024-02-29T00:00:00.000Z");
    expect(lookBackDateClean(" 2025-01-15 ")).toBe("2025-01-15T00:00:00.000Z");
  });
  test.each([
    ["2024/01/01"],
    ["01-01-2024"],
    ["2024-1-1"],
    ["yesterday"],
  ])("throws a Look-back Date format error for %j", (input) => {
    expect(() => lookBackDateClean(input)).toThrow(/Look-back Date/);
  });
  test.each([
    ["2026-02-31"],
    ["2025-02-29"],
    ["2024-13-01"],
  ])("throws for non-calendar date %j", (input) => {
    expect(() => lookBackDateClean(input)).toThrow(/Look-back Date/);
  });
  test("throws for a future date", () => {
    const nextYear = new Date().getUTCFullYear() + 1;
    expect(() => lookBackDateClean(`${nextYear}-01-01`)).toThrow(
      /Look-back Date cannot be a future date/,
    );
  });
});
