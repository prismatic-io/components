import {
  cleanArrayCodeInput,
  cleanBooleanInput,
  cleanCodeInput,
} from "./index";
describe("cleanCodeInput", () => {
  test("returns a parsed object for a valid JSON object string", () => {
    expect(cleanCodeInput('{"a":1}', "Additional Fields")).toEqual({ a: 1 });
  });
  test("returns an already-parsed object unchanged", () => {
    const obj = { a: 1, b: [2, 3] };
    expect(cleanCodeInput(obj, "Additional Fields")).toEqual(obj);
  });
  test("returns undefined for an empty/falsy value", () => {
    expect(cleanCodeInput(undefined, "Additional Fields")).toBeUndefined();
    expect(cleanCodeInput("", "Additional Fields")).toBeUndefined();
  });
  test("returns a malformed JSON string unchanged instead of throwing", () => {
    expect(cleanCodeInput("{bad", "Additional Fields")).toBe("{bad");
  });
});
describe("cleanArrayCodeInput", () => {
  test("returns the array for a valid JSON array string", () => {
    expect(cleanArrayCodeInput("[1,2,3]", "Filters")).toEqual([1, 2, 3]);
  });
  test("returns an already-parsed array unchanged", () => {
    const arr = [{ field: "a", op: "=", value: "b" }];
    expect(cleanArrayCodeInput(arr, "Filters")).toEqual(arr);
  });
  test("returns undefined for an empty/falsy value", () => {
    expect(cleanArrayCodeInput(undefined, "Filters")).toBeUndefined();
    expect(cleanArrayCodeInput("", "Filters")).toBeUndefined();
  });
  test("throws Invalid array when the parsed value is a non-array object", () => {
    expect(() => cleanArrayCodeInput('{"a":1}', "Filters")).toThrow(
      "Invalid array for Filters input.",
    );
  });
  test("throws Invalid array for a malformed JSON string", () => {
    expect(() => cleanArrayCodeInput("{bad", "Filters")).toThrow(
      "Invalid array for Filters input.",
    );
  });
});
describe("cleanBooleanInput", () => {
  test("coerces a truthy value to a boolean", () => {
    expect(cleanBooleanInput("true")).toBe(true);
    expect(cleanBooleanInput(true)).toBe(true);
  });
  test("coerces the string 'false' to boolean false", () => {
    expect(cleanBooleanInput("false")).toBe(false);
  });
  test("returns undefined for an empty/falsy value", () => {
    expect(cleanBooleanInput(undefined)).toBeUndefined();
    expect(cleanBooleanInput("")).toBeUndefined();
    expect(cleanBooleanInput(false)).toBeUndefined();
  });
});
