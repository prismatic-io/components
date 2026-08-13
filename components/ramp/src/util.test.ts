import {
  cleanBoolean,
  cleanCode,
  cleanKeyValueList,
  cleanNumber,
  cleanString,
} from "./util";
const falsyValues: [string, unknown][] = [
  ["undefined", undefined],
  ["null", null],
  ["empty string", ""],
  ["zero", 0],
  ["false", false],
  ["NaN", Number.NaN],
];
describe("cleanString", () => {
  test.each(falsyValues)("returns undefined for %s", (_label, value) => {
    expect(cleanString(value)).toBeUndefined();
  });
  test("coerces a truthy value to a string", () => {
    expect(cleanString("2907e304-cac2-4abf-84c4-b3b454ae3b8c")).toBe(
      "2907e304-cac2-4abf-84c4-b3b454ae3b8c",
    );
    expect(cleanString(42)).toBe("42");
    expect(cleanString(true)).toBe("true");
  });
  test("does not throw on an object; stringifies it instead", () => {
    expect(cleanString({ a: 1 })).toBe("[object Object]");
  });
});
describe("cleanNumber", () => {
  test.each(falsyValues)("returns undefined for %s", (_label, value) => {
    expect(cleanNumber(value)).toBeUndefined();
  });
  test("coerces a numeric value to a number", () => {
    expect(cleanNumber("50")).toBe(50);
    expect(cleanNumber(50)).toBe(50);
    expect(cleanNumber("3.22")).toBe(3.22);
  });
  test("throws when the value cannot be coerced to a number", () => {
    expect(() => cleanNumber("abc")).toThrow(
      "Value 'abc' cannot be coerced to a number.",
    );
  });
});
describe("cleanBoolean", () => {
  test.each(falsyValues)("returns undefined for %s", (_label, value) => {
    expect(cleanBoolean(value)).toBeUndefined();
  });
  test("returns false for the truthy strings that denote false", () => {
    expect(cleanBoolean("false")).toBe(false);
    expect(cleanBoolean("no")).toBe(false);
    expect(cleanBoolean("f")).toBe(false);
  });
  test("returns true for values that denote true", () => {
    expect(cleanBoolean("true")).toBe(true);
    expect(cleanBoolean("yes")).toBe(true);
    expect(cleanBoolean(true)).toBe(true);
  });
  test("does not throw on an unrecognized string; coerces it to true", () => {
    expect(cleanBoolean("maybe")).toBe(true);
  });
});
describe("cleanCode", () => {
  test.each(falsyValues)("returns undefined for %s", (_label, value) => {
    expect(cleanCode(value)).toBeUndefined();
  });
  test("parses a JSON string into an object", () => {
    expect(cleanCode('{"foo":"bar","baz":123}')).toEqual({
      foo: "bar",
      baz: 123,
    });
  });
  test("parses a JSON array string into an array", () => {
    expect(cleanCode('[{"id":"1"}]')).toEqual([{ id: "1" }]);
  });
  test("passes a value that is already an object through unchanged", () => {
    const value = { foo: "bar" };
    expect(cleanCode(value)).toBe(value);
  });
  test("returns malformed JSON unchanged instead of throwing", () => {
    expect(cleanCode("{not json")).toBe("{not json");
  });
});
describe("cleanKeyValueList", () => {
  test.each(falsyValues)("returns undefined for %s", (_label, value) => {
    expect(cleanKeyValueList(value)).toBeUndefined();
  });
  test("collapses a key/value pair list into an object", () => {
    expect(
      cleanKeyValueList([
        { key: "limit", value: "10" },
        { key: "offset", value: "0" },
      ]),
    ).toEqual({ limit: "10", offset: "0" });
  });
  test("returns an empty object for an empty pair list", () => {
    expect(cleanKeyValueList([])).toEqual({});
  });
  test("raises a TypeError when handed a truthy non-list", () => {
    expect(() => cleanKeyValueList("not-a-list")).toThrow(TypeError);
  });
});
