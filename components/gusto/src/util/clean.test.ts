import { toObject, toOptionalString } from "./clean";

describe("toObject", () => {
  it("parses a JSON string to an object", () => {
    expect(toObject('{"key": "value"}')).toEqual({ key: "value" });
  });

  it("returns empty object for falsy value", () => {
    expect(toObject(undefined)).toEqual({});
    expect(toObject(null)).toEqual({});
    expect(toObject("")).toEqual({});
  });
});

describe("toOptionalString", () => {
  it("converts a truthy value to string", () => {
    expect(toOptionalString("hello")).toBe("hello");
    expect(toOptionalString(123)).toBe("123");
  });

  it("returns undefined for falsy value", () => {
    expect(toOptionalString(undefined)).toBeUndefined();
    expect(toOptionalString(null)).toBeUndefined();
    expect(toOptionalString("")).toBeUndefined();
  });
});
