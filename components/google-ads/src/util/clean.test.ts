import {
  cleanCustomerId,
  cleanString,
  lookBackDateClean,
  toOptionalCustomerId,
  toOptionalInt,
  toStringList,
  valueListInputClean,
} from "./clean";
describe("cleanCustomerId", () => {
  test("strips dashes from the hyphenated UI form", () => {
    expect(cleanCustomerId("111-222-4444")).toBe("1112224444");
  });
  test("strips the customers/ resource-name prefix", () => {
    expect(cleanCustomerId("customers/1234567890")).toBe("1234567890");
  });
  test("coerces a number to its digit string", () => {
    expect(cleanCustomerId(1234567890)).toBe("1234567890");
  });
  test("returns an empty string for absent input", () => {
    expect(cleanCustomerId(undefined)).toBe("");
    expect(cleanCustomerId(null)).toBe("");
    expect(cleanCustomerId("")).toBe("");
  });
  test("stringifies a non-string value rather than rejecting it", () => {
    expect(cleanCustomerId({})).toBe("[object Object]");
  });
});
describe("toOptionalCustomerId", () => {
  test("strips dashes from the hyphenated UI form", () => {
    expect(toOptionalCustomerId("111-222-4444")).toBe("1112224444");
  });
  test("strips the customers/ resource-name prefix", () => {
    expect(toOptionalCustomerId("customers/1234567890")).toBe("1234567890");
  });
  test("returns undefined for absent input", () => {
    expect(toOptionalCustomerId(undefined)).toBeUndefined();
    expect(toOptionalCustomerId(null)).toBeUndefined();
    expect(toOptionalCustomerId("")).toBeUndefined();
  });
});
describe("cleanString", () => {
  test("passes a non-empty string through", () => {
    expect(cleanString("Example Account")).toBe("Example Account");
  });
  test("returns undefined for an empty string", () => {
    expect(cleanString("")).toBeUndefined();
  });
  test("returns undefined for absent input", () => {
    expect(cleanString(undefined)).toBeUndefined();
    expect(cleanString(null)).toBeUndefined();
  });
});
describe("valueListInputClean", () => {
  test("builds a semicolon-joined customer_id filter fragment", () => {
    expect(valueListInputClean(["111-222-3333", "444"])).toBe(
      "customer_id:1112223333;customer_id:444",
    );
  });
  test("returns undefined for an empty list", () => {
    expect(valueListInputClean([])).toBeUndefined();
  });
  test("returns undefined for the placeholder-only list", () => {
    expect(valueListInputClean(["000xxx"])).toBeUndefined();
  });
  test("returns undefined for a non-array value", () => {
    expect(valueListInputClean("111-222-3333")).toBeUndefined();
    expect(valueListInputClean(undefined)).toBeUndefined();
  });
});
describe("toOptionalInt", () => {
  test("parses a numeric string", () => {
    expect(toOptionalInt("80")).toBe(80);
  });
  test("returns undefined for falsy input", () => {
    expect(toOptionalInt("")).toBeUndefined();
    expect(toOptionalInt(undefined)).toBeUndefined();
    expect(toOptionalInt(0)).toBeUndefined();
  });
  test("throws on a non-numeric string", () => {
    expect(() => toOptionalInt("abc")).toThrow();
  });
});
describe("lookBackDateClean", () => {
  test("returns a valid YYYY-MM-DD date unchanged", () => {
    expect(lookBackDateClean("2026-01-01")).toBe("2026-01-01");
  });
  test("returns an empty string for absent or empty input", () => {
    expect(lookBackDateClean(undefined)).toBe("");
    expect(lookBackDateClean(null)).toBe("");
    expect(lookBackDateClean("")).toBe("");
    expect(lookBackDateClean("   ")).toBe("");
  });
  test("throws for a malformed date string", () => {
    expect(() => lookBackDateClean("01/01/2026")).toThrow(/YYYY-MM-DD format/);
  });
  test("throws for a non-calendar date", () => {
    expect(() => lookBackDateClean("2026-02-31")).toThrow(/YYYY-MM-DD format/);
  });
  test("throws for a future date", () => {
    const future = new Date();
    future.setFullYear(future.getFullYear() + 5);
    const futureDate = future.toISOString().slice(0, 10);
    expect(() => lookBackDateClean(futureDate)).toThrow(/future date/);
  });
  test("throws for a Date object or a number", () => {
    expect(() => lookBackDateClean(new Date(Date.UTC(2026, 0, 1)))).toThrow(
      /YYYY-MM-DD format/,
    );
    expect(() => lookBackDateClean(20260101)).toThrow(/YYYY-MM-DD format/);
  });
});
describe("toStringList", () => {
  test("passes an array through unchanged", () => {
    const value = ["1234567890", "5555555555"];
    expect(toStringList(value)).toEqual(value);
  });
  test("returns an empty array for a non-array value", () => {
    expect(toStringList("1234567890")).toEqual([]);
  });
  test("returns an empty array for absent input", () => {
    expect(toStringList(undefined)).toEqual([]);
  });
});
