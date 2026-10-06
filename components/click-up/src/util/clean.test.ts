import {
  cleanCommaSeparatedString,
  cleanNumber,
  cleanNumberArray,
  cleanString,
  cleanStringArray,
  cleanStringByRequired,
  toKeyValuePairList,
  toTimestampIfDate,
} from "./clean";
describe("cleanNumber", () => {
  test("coerces a numeric string to a number", () => {
    expect(cleanNumber("42")).toBe(42);
    expect(cleanNumber(7)).toBe(7);
  });
  test("returns undefined for an empty value", () => {
    expect(cleanNumber("")).toBeUndefined();
    expect(cleanNumber(undefined)).toBeUndefined();
    expect(cleanNumber(0)).toBeUndefined();
  });
  test("throws on a non-numeric value", () => {
    expect(() => cleanNumber("abc")).toThrow("cannot be coerced to a number");
  });
});
describe("cleanCommaSeparatedString", () => {
  test("splits, strips whitespace, and coerces each entry to a number", () => {
    expect(cleanCommaSeparatedString("1, 2 ,3")).toEqual([1, 2, 3]);
  });
  test("returns undefined for an empty value", () => {
    expect(cleanCommaSeparatedString("")).toBeUndefined();
    expect(cleanCommaSeparatedString(undefined)).toBeUndefined();
  });
  test("throws on a non-numeric entry", () => {
    expect(() => cleanCommaSeparatedString("1,abc")).toThrow(
      "cannot be coerced to a number",
    );
  });
});
describe("cleanNumberArray", () => {
  test("coerces every entry to a number", () => {
    expect(cleanNumberArray(["1", "22"])).toEqual([1, 22]);
  });
  test("returns undefined for a non-array value", () => {
    expect(cleanNumberArray("1")).toBeUndefined();
    expect(cleanNumberArray(undefined)).toBeUndefined();
  });
  test("throws on a non-numeric entry", () => {
    expect(() => cleanNumberArray(["x"])).toThrow(
      "cannot be coerced to a number",
    );
  });
});
describe("cleanStringArray", () => {
  test("coerces every entry to a string", () => {
    expect(cleanStringArray(["a", 2])).toEqual(["a", "2"]);
  });
  test("returns undefined for a non-array value (never throws)", () => {
    expect(cleanStringArray("a")).toBeUndefined();
    expect(cleanStringArray(undefined)).toBeUndefined();
  });
});
describe("cleanString", () => {
  test("coerces a value to a string without trimming", () => {
    expect(cleanString("abc")).toBe("abc");
    expect(cleanString(12)).toBe("12");
    expect(cleanString(" a ")).toBe(" a ");
  });
  test("returns undefined for an empty value (never throws)", () => {
    expect(cleanString("")).toBeUndefined();
    expect(cleanString(undefined)).toBeUndefined();
    expect(cleanString(null)).toBeUndefined();
  });
});
describe("cleanStringByRequired", () => {
  test("required: coerces an empty value to an empty string", () => {
    const clean = cleanStringByRequired(true);
    expect(clean("abc")).toBe("abc");
    expect(clean(undefined)).toBe("");
  });
  test("optional: returns undefined for an empty value", () => {
    const clean = cleanStringByRequired(false);
    expect(clean("abc")).toBe("abc");
    expect(clean(undefined)).toBeUndefined();
  });
});
describe("toKeyValuePairList", () => {
  test("passes an array through unchanged", () => {
    const list = [{ key: "a", value: "1" }];
    expect(toKeyValuePairList(list)).toBe(list);
  });
  test("returns undefined for a non-array value (never throws)", () => {
    expect(toKeyValuePairList("a")).toBeUndefined();
    expect(toKeyValuePairList(undefined)).toBeUndefined();
  });
});
describe("toTimestampIfDate", () => {
  test("converts a Date to Unix milliseconds", () => {
    expect(toTimestampIfDate(new Date("2026-01-01T00:00:00.000Z"))).toBe(
      1767225600000,
    );
  });
  test("passes every non-Date value through unchanged (never throws)", () => {
    expect(toTimestampIfDate("2026-01-01")).toBe("2026-01-01");
    expect(toTimestampIfDate(1767225600000)).toBe(1767225600000);
    expect(toTimestampIfDate(undefined)).toBeUndefined();
  });
});
