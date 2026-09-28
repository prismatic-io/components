import {
  asJsonObject,
  cleanNumber,
  cleanString,
  lookBackDateClean,
} from "./clean";
describe("cleanString", () => {
  test.each<[string, unknown, string]>([
    ["a filled string", "hello", "hello"],
    ["a string needing no trim", "  spaced  ", "  spaced  "],
    ["a number", 123, "123"],
  ])("%s resolves to its string form", (_label, raw, expected) => {
    expect(cleanString(raw)).toBe(expected);
  });
  test.each<[string, unknown]>([
    ["an empty string", ""],
    ["undefined", undefined],
    ["null", null],
    ["zero", 0],
  ])("%s resolves to undefined", (_label, raw) => {
    expect(cleanString(raw)).toBeUndefined();
  });
});
describe("cleanNumber", () => {
  test("coerces a numeric string", () => {
    expect(cleanNumber("5")).toBe(5);
  });
  test.each<[string, unknown]>([
    ["an empty string", ""],
    ["undefined", undefined],
    ["null", null],
    ["zero as a string", "0"],
    ["zero", 0],
  ])("%s resolves to undefined rather than 0", (_label, raw) => {
    expect(cleanNumber(raw)).toBeUndefined();
  });
  test("propagates the coercion failure for a non-numeric value", () => {
    expect(() => cleanNumber("abc")).toThrow(/cannot be coerced to a number/);
  });
});
describe("asJsonObject", () => {
  test("returns a shallow copy so the caller can extend it safely", () => {
    const input = { sku: "ABC-123", price: 10 };
    const result = asJsonObject(input, "Product");
    expect(result).toEqual(input);
    expect(result).not.toBe(input);
  });
  test("preserves nested values by reference, copying only the top level", () => {
    const nested = { weight: 2 };
    const result = asJsonObject(
      { sku: "ABC-123", extension: nested },
      "Product",
    );
    expect(result.extension).toBe(nested);
  });
  test.each<[string, unknown]>([
    ["a string that never parsed", "{ not json"],
    ["an array", [{ sku: "ABC-123" }]],
    ["null", null],
    ["a number", 42],
    ["undefined", undefined],
  ])("%s throws naming the input", (_label, raw) => {
    expect(() => asJsonObject(raw, "Product")).toThrow(
      "Product must be valid JSON.",
    );
  });
});
describe("lookBackDateClean", () => {
  test.each<[string, unknown]>([
    ["undefined", undefined],
    ["null", null],
    ["an empty string", ""],
    ["whitespace only", "   "],
  ])("%s resolves to undefined", (_label, raw) => {
    expect(lookBackDateClean(raw)).toBeUndefined();
  });
  test("normalizes a calendar date to an ISO 8601 instant at UTC midnight", () => {
    expect(lookBackDateClean("2020-01-01")).toBe("2020-01-01T00:00:00.000Z");
  });
  test("trims surrounding whitespace before matching", () => {
    expect(lookBackDateClean("  2020-01-01  ")).toBe(
      "2020-01-01T00:00:00.000Z",
    );
  });
  test.each<[string, unknown]>([
    ["a day the month does not have", "2020-02-31"],
    ["a month that does not exist", "2020-13-01"],
    ["a slash-separated date", "01/01/2020"],
    ["single-digit month and day", "2020-1-1"],
    ["an ISO instant rather than a date", "2020-01-01T00:00:00.000Z"],
    ["a non-string value", 20200101],
  ])("%s is rejected as malformed", (_label, raw) => {
    expect(() => lookBackDateClean(raw)).toThrow(
      /must be a date in YYYY-MM-DD format/,
    );
  });
  test("rejects a future date with its own message", () => {
    expect(() => lookBackDateClean("2099-01-01")).toThrow(
      /cannot be a future date/,
    );
  });
});
