import {
  cleanArrayInput,
  cleanBodyInput,
  cleanBooleanStringInput,
  cleanCodeInput,
  cleanOptionalArrayInput,
  cleanOptionalNumberInput,
  cleanStringInput,
} from "./clean";

describe("cleanStringInput", () => {
  test("normalizes a truthy value to a string", () => {
    expect(cleanStringInput("device-123")).toBe("device-123");
    expect(cleanStringInput(42)).toBe("42");
    expect(cleanStringInput(true)).toBe("true");
  });

  test("returns undefined for falsy values", () => {
    expect(cleanStringInput("")).toBeUndefined();
    expect(cleanStringInput(0)).toBeUndefined();
    expect(cleanStringInput(null)).toBeUndefined();
    expect(cleanStringInput(undefined)).toBeUndefined();
  });

  test("does not validate: coerces any truthy value without throwing", () => {
    expect(cleanStringInput({ id: "abc" })).toBe("[object Object]");
    expect(cleanStringInput("  padded  ")).toBe("  padded  ");
  });
});

describe("cleanCodeInput", () => {
  test("parses a JSON string into an object", () => {
    expect(cleanCodeInput('{"displayName":"Test"}')).toEqual({
      displayName: "Test",
    });
    expect(cleanCodeInput('["a","b"]')).toEqual(["a", "b"]);
  });

  test("passes an already-parsed object through unchanged", () => {
    const value = { displayName: "Test" };
    expect(cleanCodeInput(value)).toBe(value);
  });

  test("returns undefined for falsy values", () => {
    expect(cleanCodeInput("")).toBeUndefined();
    expect(cleanCodeInput(null)).toBeUndefined();
    expect(cleanCodeInput(undefined)).toBeUndefined();
  });

  test("does not throw on malformed JSON: returns the raw value", () => {
    expect(cleanCodeInput("{not json")).toBe("{not json");
    expect(cleanCodeInput("123")).toBe(123);
  });
});

describe("cleanBodyInput", () => {
  test("parses a JSON string into an object", () => {
    expect(cleanBodyInput('{"displayName":"Test"}')).toEqual({
      displayName: "Test",
    });
  });

  test("passes an already-parsed object through unchanged", () => {
    const value = { displayName: "Test" };
    expect(cleanBodyInput(value)).toBe(value);
  });

  test("returns an empty object for falsy values", () => {
    expect(cleanBodyInput("")).toEqual({});
    expect(cleanBodyInput(null)).toEqual({});
    expect(cleanBodyInput(undefined)).toEqual({});
  });

  test("does not throw on malformed JSON: returns the raw value", () => {
    expect(cleanBodyInput("{not json")).toBe("{not json");
  });
});

describe("cleanArrayInput", () => {
  test("normalizes an array to string[]", () => {
    expect(cleanArrayInput(["created", "updated"])).toEqual([
      "created",
      "updated",
    ]);
    expect(cleanArrayInput('["created","deleted"]')).toEqual([
      "created",
      "deleted",
    ]);
    expect(cleanArrayInput([1, 2])).toEqual(["1", "2"]);
  });

  test("drops falsy members, because entries are cleaned with cleanStringInput", () => {
    expect(cleanArrayInput(["created", "", 0, "updated"])).toEqual([
      "created",
      "updated",
    ]);
    expect(cleanArrayInput([])).toEqual([]);
  });

  test("returns undefined for a falsy input", () => {
    expect(cleanArrayInput(undefined)).toBeUndefined();
    expect(cleanArrayInput("")).toBeUndefined();
    expect(cleanArrayInput(null)).toBeUndefined();
  });

  test("throws on a truthy non-array input", () => {
    expect(() => cleanArrayInput("created")).toThrow(
      "Change Type must be an array.",
    );
    expect(() => cleanArrayInput({ changeType: "created" })).toThrow(
      "Change Type must be an array.",
    );
  });
});

describe("cleanOptionalArrayInput", () => {
  test("normalizes an array to string[]", () => {
    expect(cleanOptionalArrayInput(["id-1", "id-2"])).toEqual(["id-1", "id-2"]);
    expect(cleanOptionalArrayInput('["id-1","id-2"]')).toEqual([
      "id-1",
      "id-2",
    ]);
    expect(cleanOptionalArrayInput(["id-1", "", null])).toEqual(["id-1"]);
  });

  test("returns undefined for falsy values", () => {
    expect(cleanOptionalArrayInput("")).toBeUndefined();
    expect(cleanOptionalArrayInput(null)).toBeUndefined();
    expect(cleanOptionalArrayInput(undefined)).toBeUndefined();
  });

  test("throws on a truthy non-array input", () => {
    expect(() => cleanOptionalArrayInput("id-1")).toThrow(
      "Member IDs must be an array.",
    );
    expect(() => cleanOptionalArrayInput({ id: "id-1" })).toThrow(
      "Member IDs must be an array.",
    );
  });
});

describe("cleanBooleanStringInput", () => {
  test("normalizes truthy/falsy strings to a boolean", () => {
    expect(cleanBooleanStringInput("true")).toBe(true);
    expect(cleanBooleanStringInput("yes")).toBe(true);
    expect(cleanBooleanStringInput("false")).toBe(false);
    expect(cleanBooleanStringInput("no")).toBe(false);
    expect(cleanBooleanStringInput(true)).toBe(true);
  });

  test("returns undefined for falsy values", () => {
    expect(cleanBooleanStringInput("")).toBeUndefined();
    expect(cleanBooleanStringInput(null)).toBeUndefined();
    expect(cleanBooleanStringInput(undefined)).toBeUndefined();
  });

  test("returns undefined for boolean false and true for unrecognized strings", () => {
    expect(cleanBooleanStringInput(false)).toBeUndefined();
    expect(cleanBooleanStringInput("maybe")).toBe(true);
  });
});

describe("cleanOptionalNumberInput", () => {
  test("accepts a saved string value and a number", () => {
    expect(cleanOptionalNumberInput("10")).toBe(10);
    expect(cleanOptionalNumberInput(10)).toBe(10);
  });

  test("keeps 0 so Skip 0 reaches the request", () => {
    expect(cleanOptionalNumberInput(0)).toBe(0);
    expect(cleanOptionalNumberInput("0")).toBe(0);
  });

  test("returns undefined for a blank value", () => {
    expect(cleanOptionalNumberInput("")).toBeUndefined();
    expect(cleanOptionalNumberInput(undefined)).toBeUndefined();
    expect(cleanOptionalNumberInput(null)).toBeUndefined();
  });

  test("throws on a value that is not a number", () => {
    expect(() => cleanOptionalNumberInput("ten")).toThrow();
  });
});
