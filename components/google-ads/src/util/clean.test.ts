import {
  cleanCustomerId,
  cleanString,
  toOptionalInt,
  toOptionalString,
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
describe("toOptionalString", () => {
  test("passes a string through", () => {
    expect(toOptionalString("HEX")).toBe("HEX");
  });
  test("stringifies a truthy non-string value", () => {
    expect(toOptionalString(80)).toBe("80");
  });
  test("returns undefined for falsy input", () => {
    expect(toOptionalString("")).toBeUndefined();
    expect(toOptionalString(undefined)).toBeUndefined();
    expect(toOptionalString(null)).toBeUndefined();
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
