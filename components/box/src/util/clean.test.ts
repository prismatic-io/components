import {
  cleanCommaSeparatedString,
  cleanString,
  lookBackDateClean,
  toStringList,
} from "./clean";

describe("lookBackDateClean", () => {
  test("returns an empty string for a blank value", () => {
    expect(lookBackDateClean("")).toBe("");
    expect(lookBackDateClean(undefined)).toBe("");
  });

  test("returns a valid past date with surrounding whitespace trimmed", () => {
    expect(lookBackDateClean("2026-01-01")).toBe("2026-01-01");
    expect(lookBackDateClean(" 2026-01-01 ")).toBe("2026-01-01");
  });

  test("throws on a value that is not YYYY-MM-DD", () => {
    expect(() => lookBackDateClean("01/01/2026")).toThrow(
      "Look-back Date must be in YYYY-MM-DD format.",
    );
  });

  test("throws on a date that does not exist on the calendar", () => {
    expect(() => lookBackDateClean("2026-02-30")).toThrow(
      'Look-back Date "2026-02-30" is not a valid calendar date.',
    );
  });

  test("throws on a future date", () => {
    expect(() => lookBackDateClean("2999-01-01")).toThrow(
      "Look-back Date cannot be a future date.",
    );
  });
});

describe("cleanCommaSeparatedString", () => {
  test("trims each item and drops the empty ones", () => {
    expect(cleanCommaSeparatedString(" a, ,b ")).toBe("a,b");
  });

  test("returns undefined for a falsy value", () => {
    expect(cleanCommaSeparatedString("")).toBeUndefined();
    expect(cleanCommaSeparatedString(undefined)).toBeUndefined();
  });
});

describe("cleanString", () => {
  test("coerces a value to a string", () => {
    expect(cleanString("type,id,name")).toBe("type,id,name");
    expect(cleanString(42)).toBe("42");
  });

  test("returns undefined for a falsy value", () => {
    expect(cleanString("")).toBeUndefined();
    expect(cleanString(undefined)).toBeUndefined();
  });
});

describe("toStringList", () => {
  test("coerces every value list item to a string", () => {
    expect(toStringList(["FILE.UPLOADED", 42])).toEqual([
      "FILE.UPLOADED",
      "42",
    ]);
  });

  test("returns an empty list for an absent value", () => {
    expect(toStringList(undefined)).toEqual([]);
  });
});
