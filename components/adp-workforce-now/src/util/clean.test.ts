import {
  cleanKeyValPair,
  cleanNumber,
  cleanObject,
  cleanString,
} from "./clean";
describe("cleanString", () => {
  test("coerces a value to a string without trimming", () => {
    expect(cleanString("abc")).toBe("abc");
    expect(cleanString(42)).toBe("42");
    expect(cleanString("  a ")).toBe("  a ");
  });
  test("returns undefined for falsy values", () => {
    expect(cleanString("")).toBeUndefined();
    expect(cleanString(undefined)).toBeUndefined();
    expect(cleanString(null)).toBeUndefined();
  });
  test("stringifies an object as [object Object]", () => {
    expect(cleanString({ a: 1 })).toBe("[object Object]");
  });
});
describe("cleanNumber", () => {
  test("coerces numeric values", () => {
    expect(cleanNumber("5")).toBe(5);
    expect(cleanNumber(7)).toBe(7);
    expect(cleanNumber("0")).toBe(0);
  });
  test("returns undefined for falsy values", () => {
    expect(cleanNumber("")).toBeUndefined();
    expect(cleanNumber(undefined)).toBeUndefined();
  });
  test("drops a numeric 0 because it is falsy", () => {
    expect(cleanNumber(0)).toBeUndefined();
  });
  test("throws on a non-numeric string", () => {
    expect(() => cleanNumber("abc")).toThrow(
      "Value 'abc' cannot be coerced to a number.",
    );
  });
});
describe("cleanObject", () => {
  test("parses a JSON string and passes objects through", () => {
    expect(cleanObject('{"a":1}')).toEqual({ a: 1 });
    expect(cleanObject({ b: 2 })).toEqual({ b: 2 });
    expect(cleanObject([1])).toEqual([1]);
  });
  test("returns undefined for falsy values", () => {
    expect(cleanObject("")).toBeUndefined();
    expect(cleanObject(undefined)).toBeUndefined();
  });
  test("returns a non-JSON string unchanged instead of throwing", () => {
    expect(cleanObject("nope")).toBe("nope");
  });
});
describe("cleanKeyValPair", () => {
  test("converts a key/value list to an object", () => {
    expect(
      cleanKeyValPair([
        { key: "a", value: 1 },
        { key: "b", value: "x" },
      ]),
    ).toEqual({ a: 1, b: "x" });
    expect(cleanKeyValPair([])).toEqual({});
  });
  test("returns undefined for falsy values", () => {
    expect(cleanKeyValPair(undefined)).toBeUndefined();
    expect(cleanKeyValPair("")).toBeUndefined();
  });
  test("throws a TypeError for a non-list value", () => {
    expect(() => cleanKeyValPair("x")).toThrow(TypeError);
    expect(() => cleanKeyValPair({ a: 1 })).toThrow(TypeError);
  });
});
