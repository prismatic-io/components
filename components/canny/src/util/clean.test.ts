import {
  lookBackDateClean,
  toObjectOrEmpty,
  toOptionalNumber,
  toOptionalObject,
  toOptionalString,
} from "./clean";
describe("toOptionalString", () => {
  test("coerces a truthy value to a string", () => {
    expect(toOptionalString("abc")).toBe("abc");
    expect(toOptionalString(42)).toBe("42");
  });
  test("returns undefined for every falsy value", () => {
    expect(toOptionalString("")).toBeUndefined();
    expect(toOptionalString(0)).toBeUndefined();
    expect(toOptionalString(false)).toBeUndefined();
    expect(toOptionalString(undefined)).toBeUndefined();
    expect(toOptionalString(null)).toBeUndefined();
  });
  test("does not trim surrounding whitespace", () => {
    expect(toOptionalString(" 42 ")).toBe(" 42 ");
  });
});
describe("toOptionalNumber", () => {
  test("coerces a numeric string to a number and tolerates padding", () => {
    expect(toOptionalNumber("42")).toBe(42);
    expect(toOptionalNumber(" 7 ")).toBe(7);
  });
  test("returns undefined for every falsy value", () => {
    expect(toOptionalNumber("")).toBeUndefined();
    expect(toOptionalNumber(0)).toBeUndefined();
    expect(toOptionalNumber(false)).toBeUndefined();
    expect(toOptionalNumber(undefined)).toBeUndefined();
  });
  test('keeps the string "0" but drops the number 0', () => {
    expect(toOptionalNumber("0")).toBe(0);
    expect(toOptionalNumber(0)).toBeUndefined();
  });
  test("throws on a value that cannot be coerced", () => {
    expect(() => toOptionalNumber("abc")).toThrow(
      "Value 'abc' cannot be coerced to a number.",
    );
  });
});
describe("toOptionalObject", () => {
  test("parses a JSON string and passes an object through", () => {
    expect(toOptionalObject('{"a":1}')).toStrictEqual({ a: 1 });
    expect(toOptionalObject('["x"]')).toStrictEqual(["x"]);
    expect(toOptionalObject({ a: 1 })).toStrictEqual({ a: 1 });
  });
  test("returns undefined for every falsy value", () => {
    expect(toOptionalObject("")).toBeUndefined();
    expect(toOptionalObject(0)).toBeUndefined();
    expect(toOptionalObject(false)).toBeUndefined();
    expect(toOptionalObject(undefined)).toBeUndefined();
  });
  test("returns malformed JSON unchanged instead of throwing", () => {
    expect(toOptionalObject("{nope")).toBe("{nope");
  });
});
describe("toObjectOrEmpty", () => {
  test("parses a JSON string and passes an object through", () => {
    expect(toObjectOrEmpty('{"a":1}')).toStrictEqual({ a: 1 });
    expect(toObjectOrEmpty({ a: 1 })).toStrictEqual({ a: 1 });
  });
  test("returns an empty object for every falsy value", () => {
    expect(toObjectOrEmpty("")).toStrictEqual({});
    expect(toObjectOrEmpty(0)).toStrictEqual({});
    expect(toObjectOrEmpty(false)).toStrictEqual({});
    expect(toObjectOrEmpty(undefined)).toStrictEqual({});
  });
  test("returns malformed JSON unchanged instead of throwing", () => {
    expect(toObjectOrEmpty("{nope")).toBe("{nope");
  });
});
describe("lookBackDateClean", () => {
  test("returns an empty string when no date is supplied", () => {
    expect(lookBackDateClean(undefined)).toBe("");
    expect(lookBackDateClean(null)).toBe("");
    expect(lookBackDateClean("")).toBe("");
    expect(lookBackDateClean("   ")).toBe("");
  });
  test("normalizes a valid past date to a UTC ISO timestamp", () => {
    expect(lookBackDateClean("2026-01-01")).toBe("2026-01-01T00:00:00.000Z");
    expect(lookBackDateClean("  2026-01-01  ")).toBe(
      "2026-01-01T00:00:00.000Z",
    );
  });
  test("rejects a malformed format", () => {
    expect(() => lookBackDateClean("01/01/2026")).toThrow(
      "Look-back Date must be a date in YYYY-MM-DD format. Received: 01/01/2026",
    );
    expect(() => lookBackDateClean("2026-1-1")).toThrow(
      "Look-back Date must be a date in YYYY-MM-DD format. Received: 2026-1-1",
    );
    expect(() => lookBackDateClean("2026-01-01T00:00:00Z")).toThrow(
      "Look-back Date must be a date in YYYY-MM-DD format",
    );
  });
  test("rejects a non-string value even when it names a real date", () => {
    expect(() => lookBackDateClean(new Date("2026-01-01"))).toThrow(
      "Look-back Date must be a date in YYYY-MM-DD format",
    );
    expect(() => lookBackDateClean(20260101)).toThrow(
      "Look-back Date must be a date in YYYY-MM-DD format. Received: 20260101",
    );
  });
  test("rejects a well-formed date that is not on the calendar", () => {
    expect(() => lookBackDateClean("2026-02-31")).toThrow(
      "Look-back Date must be a date in YYYY-MM-DD format. Received: 2026-02-31",
    );
    expect(() => lookBackDateClean("2026-13-01")).toThrow(
      "Look-back Date must be a date in YYYY-MM-DD format. Received: 2026-13-01",
    );
  });
  test("rejects a future date", () => {
    const future = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
    const formatted = future.toISOString().slice(0, 10);
    expect(() => lookBackDateClean(formatted)).toThrow(
      `Look-back Date cannot be a future date. Received: ${formatted}`,
    );
  });
});
