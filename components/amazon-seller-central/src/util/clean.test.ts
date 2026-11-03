import {
  jsonInputClean,
  toOptionalString,
  valueListInputClean,
  valueListStringInputClean,
} from "./clean";

describe("jsonInputClean", () => {
  it("parses valid JSON string", () => {
    expect(jsonInputClean('{"key": "value"}')).toEqual({ key: "value" });
  });

  it("parses JSON array string", () => {
    expect(jsonInputClean("[1, 2, 3]")).toEqual([1, 2, 3]);
  });

  it("returns undefined for empty string", () => {
    expect(jsonInputClean("")).toBeUndefined();
  });

  it("returns undefined for whitespace-only string", () => {
    expect(jsonInputClean("   ")).toBeUndefined();
  });

  it("returns undefined for non-string values", () => {
    expect(jsonInputClean(123)).toBeUndefined();
    expect(jsonInputClean(null)).toBeUndefined();
    expect(jsonInputClean(undefined)).toBeUndefined();
  });

  it("throws on invalid JSON", () => {
    expect(() => jsonInputClean("{invalid}")).toThrow();
  });
});

describe("valueListStringInputClean", () => {
  it("returns comma-separated string for non-empty array", () => {
    expect(valueListStringInputClean(["a", "b", "c"])).toBe("a,b,c");
  });

  it("returns single value for one-element array", () => {
    expect(valueListStringInputClean(["only"])).toBe("only");
  });

  it("returns undefined for empty array", () => {
    expect(valueListStringInputClean([])).toBeUndefined();
  });

  it("returns undefined for non-array", () => {
    expect(valueListStringInputClean("string")).toBeUndefined();
    expect(valueListStringInputClean(null)).toBeUndefined();
  });
});

describe("valueListInputClean", () => {
  it("returns the array for non-empty array", () => {
    const arr = ["a", "b"];
    expect(valueListInputClean(arr)).toBe(arr);
  });

  it("returns undefined for empty array", () => {
    expect(valueListInputClean([])).toBeUndefined();
  });

  it("returns undefined for non-array", () => {
    expect(valueListInputClean("string")).toBeUndefined();
  });
});

describe("toOptionalString", () => {
  it("returns string for truthy value", () => {
    expect(toOptionalString("hello")).toBe("hello");
  });

  it("returns string for number", () => {
    expect(toOptionalString(42)).toBe("42");
  });

  it("returns undefined for empty string", () => {
    expect(toOptionalString("")).toBeUndefined();
  });

  it("returns undefined for null", () => {
    expect(toOptionalString(null)).toBeUndefined();
  });

  it("returns undefined for undefined", () => {
    expect(toOptionalString(undefined)).toBeUndefined();
  });
});
