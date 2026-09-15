import {
  cleanBooleanInput,
  cleanCodeInput,
  cleanKeyValueListInput,
  cleanNumberInput,
  cleanNumberValueListInput,
  cleanStringInput,
  cleanStringValueListInput,
  lookBackDateClean,
  mapModelValues,
} from "./cleanInput";
describe("cleanCodeInput", () => {
  test("parses a JSON string into an object", () => {
    expect(cleanCodeInput('{"street":"1 Main St","zip":"73301"}')).toEqual({
      street: "1 Main St",
      zip: "73301",
    });
  });
  test("passes an already-parsed object through unchanged", () => {
    const value = { typeId: 0, value: "string" };
    expect(cleanCodeInput(value)).toEqual(value);
  });
  test("returns undefined for a falsy value so the field is omitted", () => {
    expect(cleanCodeInput("")).toBeUndefined();
    expect(cleanCodeInput(undefined)).toBeUndefined();
    expect(cleanCodeInput(null)).toBeUndefined();
    expect(cleanCodeInput(0)).toBeUndefined();
  });
  test("returns a malformed JSON string unchanged instead of throwing", () => {
    expect(cleanCodeInput("{not valid json")).toBe("{not valid json");
  });
});
describe("cleanNumberInput", () => {
  test("coerces a numeric string to a number", () => {
    expect(cleanNumberInput(" 42 ")).toBe(42);
    expect(cleanNumberInput("10978752986")).toBe(10978752986);
  });
  test("returns undefined for a falsy value so the field is omitted", () => {
    expect(cleanNumberInput("")).toBeUndefined();
    expect(cleanNumberInput(undefined)).toBeUndefined();
  });
  test("throws when the value cannot be coerced to a number", () => {
    expect(() => cleanNumberInput("abc")).toThrow(
      "Value 'abc' cannot be coerced to a number.",
    );
  });
});
describe("cleanNumberValueListInput", () => {
  test("coerces every element of a valuelist collection", () => {
    expect(cleanNumberValueListInput(["1", "2", "3"])).toEqual([1, 2, 3]);
  });
  test("returns undefined for a falsy value so the field is omitted", () => {
    expect(cleanNumberValueListInput("")).toBeUndefined();
    expect(cleanNumberValueListInput(undefined)).toBeUndefined();
  });
  test("returns undefined for a truthy non-array rather than throwing", () => {
    expect(cleanNumberValueListInput("123")).toBeUndefined();
    expect(cleanNumberValueListInput({ a: 1 })).toBeUndefined();
  });
  test("throws when an element cannot be coerced to a number", () => {
    expect(() => cleanNumberValueListInput(["1", "abc"])).toThrow(
      "Value 'abc' cannot be coerced to a number.",
    );
  });
});
describe("cleanKeyValueListInput", () => {
  test("collapses a key/value pair list into an object, and omits a falsy value", () => {
    expect(
      cleanKeyValueListInput([
        { key: "status", value: "Posted" },
        { key: "page", value: "2" },
      ]),
    ).toEqual({ status: "Posted", page: "2" });
    expect(cleanKeyValueListInput("")).toBeUndefined();
    expect(cleanKeyValueListInput(undefined)).toBeUndefined();
  });
  test("raises the SDK's TypeError for a truthy non-array", () => {
    expect(() => cleanKeyValueListInput("status=Posted")).toThrow(TypeError);
  });
});
describe("cleanStringInput and cleanStringValueListInput", () => {
  test("stringifies any truthy value, and omits a falsy one", () => {
    expect(cleanStringInput(42)).toBe("42");
    expect(cleanStringInput(" +FieldName ")).toBe(" +FieldName ");
    expect(cleanStringInput({ a: 1 })).toBe("[object Object]");
    expect(cleanStringInput("")).toBeUndefined();
    expect(cleanStringInput(undefined)).toBeUndefined();
  });
  test("stringifies every element of a valuelist, and returns undefined for a non-array", () => {
    expect(cleanStringValueListInput([1, "two"])).toEqual(["1", "two"]);
    expect(cleanStringValueListInput("")).toBeUndefined();
    expect(cleanStringValueListInput("not-an-array")).toBeUndefined();
  });
});
describe("cleanBooleanInput", () => {
  test("coerces recognized strings and never rejects an unrecognized one", () => {
    expect(cleanBooleanInput("true")).toBe(true);
    expect(cleanBooleanInput("false")).toBe(false);
    expect(cleanBooleanInput("maybe")).toBe(true);
    expect(cleanBooleanInput("")).toBeUndefined();
    expect(cleanBooleanInput(undefined)).toBeUndefined();
  });
});
describe("lookBackDateClean", () => {
  test('returns "" for blank input, meaning no initial sync', () => {
    expect(lookBackDateClean(undefined)).toBe("");
    expect(lookBackDateClean(null)).toBe("");
    expect(lookBackDateClean("")).toBe("");
    expect(lookBackDateClean("   ")).toBe("");
  });
  test("normalizes a calendar date to millisecond ISO at UTC midnight", () => {
    expect(lookBackDateClean("2026-01-01")).toBe("2026-01-01T00:00:00.000Z");
    expect(lookBackDateClean(" 2026-01-01 ")).toBe("2026-01-01T00:00:00.000Z");
  });
  test("rejects anything that is not a YYYY-MM-DD string", () => {
    expect(() => lookBackDateClean("01/01/2026")).toThrow(
      "Look-back Date must be a date in YYYY-MM-DD format.",
    );
    expect(() => lookBackDateClean("2026-1-1")).toThrow(
      "Look-back Date must be a date in YYYY-MM-DD format.",
    );
    expect(() => lookBackDateClean("2026-01-01T00:00:00Z")).toThrow(
      "Look-back Date must be a date in YYYY-MM-DD format.",
    );
    expect(() => lookBackDateClean(20260101)).toThrow(
      "Look-back Date must be a date in YYYY-MM-DD format.",
    );
    expect(() => lookBackDateClean(new Date("2026-01-01"))).toThrow(
      "Look-back Date must be a date in YYYY-MM-DD format.",
    );
  });
  test("rejects a non-calendar date the pattern alone would admit", () => {
    expect(() => lookBackDateClean("2026-02-31")).toThrow(
      "Look-back Date must be a date in YYYY-MM-DD format.",
    );
  });
  test("rejects a future date", () => {
    expect(() => lookBackDateClean("2999-01-01")).toThrow(
      "Look-back Date cannot be a future date.",
    );
  });
});
describe("mapModelValues", () => {
  test("maps values to label/value entries in the order given", () => {
    expect(mapModelValues(["Pending", "Posted", "Exported"])).toEqual([
      { value: "Pending", label: "Pending" },
      { value: "Posted", label: "Posted" },
      { value: "Exported", label: "Exported" },
    ]);
  });
  test("prepends an empty entry when addEmptyValue is true", () => {
    expect(mapModelValues(["Low", "Normal"], true)).toEqual([
      { value: "", label: "Empty" },
      { value: "Low", label: "Low" },
      { value: "Normal", label: "Normal" },
    ]);
  });
});
