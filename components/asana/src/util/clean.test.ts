import {
  lookBackDateClean,
  toCommaSeparatedList,
  toOptionalBool,
  toOptionalDate,
  toOptionalId,
  toOptionalInt,
  toOptionalObject,
  toOptionalString,
  toOptionalStringArray,
  toOptionalTrimmedString,
  toStringArray,
  validateId,
  validateUserId,
} from "./clean";
describe("toOptionalString", () => {
  it("returns undefined for falsy values", () => {
    expect(toOptionalString("")).toBeUndefined();
    expect(toOptionalString(null)).toBeUndefined();
    expect(toOptionalString(undefined)).toBeUndefined();
    expect(toOptionalString(0)).toBeUndefined();
  });
  it("returns string for truthy values", () => {
    expect(toOptionalString("hello")).toBe("hello");
    expect(toOptionalString(42)).toBe("42");
    expect(toOptionalString(true)).toBe("true");
  });
});
describe("validateId", () => {
  it("accepts numeric strings", () => {
    expect(validateId("375893453")).toBe("375893453");
  });
  it("trims whitespace", () => {
    expect(validateId("  375893453  ")).toBe("375893453");
  });
  it("accepts numeric values", () => {
    expect(validateId(375893453)).toBe("375893453");
  });
  it("throws for non-numeric strings", () => {
    expect(() => validateId("abc")).toThrow(
      'Asana global IDs are numbers. "abc" is not a valid Asana global ID.',
    );
  });
  it("throws for strings with mixed content", () => {
    expect(() => validateId("123abc")).toThrow("not a valid Asana global ID");
  });
  it("throws for empty string", () => {
    expect(() => validateId("")).toThrow("not a valid Asana global ID");
  });
});
describe("validateUserId", () => {
  it("accepts numeric strings", () => {
    expect(validateUserId(" 375893453 ")).toBe("375893453");
  });
  it("accepts me for the authenticated user", () => {
    expect(validateUserId(" me ")).toBe("me");
  });
  it("throws for other non-numeric strings", () => {
    expect(() => validateUserId("user@example.com")).toThrow(
      "not a valid Asana global ID",
    );
  });
});
describe("toOptionalDate", () => {
  it("returns undefined for falsy values", () => {
    expect(toOptionalDate("")).toBeUndefined();
    expect(toOptionalDate(null)).toBeUndefined();
    expect(toOptionalDate(undefined)).toBeUndefined();
  });
  it("returns a Date for truthy values", () => {
    const result = toOptionalDate("2024-01-15");
    expect(result).toBeInstanceOf(Date);
  });
});
describe("toOptionalId", () => {
  it("returns undefined for falsy values", () => {
    expect(toOptionalId("")).toBeUndefined();
    expect(toOptionalId(null)).toBeUndefined();
    expect(toOptionalId(undefined)).toBeUndefined();
  });
  it("returns validated id for valid numeric string", () => {
    expect(toOptionalId("375893453")).toBe("375893453");
  });
  it("throws for non-numeric truthy string", () => {
    expect(() => toOptionalId("abc")).toThrow("not a valid Asana global ID");
  });
});
describe("toCommaSeparatedList", () => {
  it("trims whitespace around items", () => {
    expect(toCommaSeparatedList("name , created_at , due_on")).toBe(
      "name,created_at,due_on",
    );
  });
  it("filters empty entries", () => {
    expect(toCommaSeparatedList("name,,created_at,")).toBe("name,created_at");
  });
  it("handles single item", () => {
    expect(toCommaSeparatedList("name")).toBe("name");
  });
  it("returns empty string for empty input", () => {
    expect(toCommaSeparatedList("")).toBe("");
  });
});
describe("toOptionalStringArray", () => {
  it("returns mapped strings for non-empty array", () => {
    expect(toOptionalStringArray(["a", "b", 3])).toEqual(["a", "b", "3"]);
  });
  it("returns undefined for empty array", () => {
    expect(toOptionalStringArray([])).toBeUndefined();
  });
  it("returns undefined for non-array", () => {
    expect(toOptionalStringArray("hello")).toBeUndefined();
    expect(toOptionalStringArray(null)).toBeUndefined();
    expect(toOptionalStringArray(undefined)).toBeUndefined();
  });
});
describe("toOptionalInt", () => {
  it("returns undefined for falsy values", () => {
    expect(toOptionalInt("")).toBeUndefined();
    expect(toOptionalInt(null)).toBeUndefined();
    expect(toOptionalInt(0)).toBeUndefined();
  });
  it("parses truthy values to int", () => {
    expect(toOptionalInt("42")).toBe(42);
    expect(toOptionalInt(42)).toBe(42);
  });
});
describe("toOptionalBool", () => {
  it("returns undefined for empty string", () => {
    expect(toOptionalBool("")).toBeUndefined();
  });
  it("returns boolean for non-empty values", () => {
    expect(toOptionalBool("true")).toBe(true);
    expect(toOptionalBool("false")).toBe(false);
    expect(toOptionalBool(true)).toBe(true);
    expect(toOptionalBool(false)).toBe(false);
  });
});
describe("toOptionalTrimmedString", () => {
  it("returns undefined for empty or whitespace-only strings", () => {
    expect(toOptionalTrimmedString("")).toBeUndefined();
    expect(toOptionalTrimmedString("   ")).toBeUndefined();
  });
  it("returns trimmed string", () => {
    expect(toOptionalTrimmedString("  hello  ")).toBe("hello");
  });
});
describe("toOptionalObject", () => {
  it("returns undefined for falsy values", () => {
    expect(toOptionalObject("")).toBeUndefined();
    expect(toOptionalObject(null)).toBeUndefined();
    expect(toOptionalObject(undefined)).toBeUndefined();
  });
  it("returns object for truthy values", () => {
    const obj = { key: "value" };
    expect(toOptionalObject(obj)).toEqual(obj);
  });
});
describe("toStringArray", () => {
  it("returns mapped strings for non-empty array", () => {
    expect(toStringArray(["a", "b", 3])).toEqual(["a", "b", "3"]);
  });
  it("returns empty array for empty array", () => {
    expect(toStringArray([])).toEqual([]);
  });
  it("returns empty array for non-array", () => {
    expect(toStringArray("hello")).toEqual([]);
    expect(toStringArray(null)).toEqual([]);
  });
});
describe("lookBackDateClean", () => {
  it("returns empty string for empty/null/undefined", () => {
    expect(lookBackDateClean(undefined)).toBe("");
    expect(lookBackDateClean(null)).toBe("");
    expect(lookBackDateClean("")).toBe("");
    expect(lookBackDateClean("   ")).toBe("");
  });
  it("normalizes a valid YYYY-MM-DD to ISO timestamp", () => {
    expect(lookBackDateClean("2026-01-01")).toBe("2026-01-01T00:00:00.000Z");
    expect(lookBackDateClean(" 2026-01-01 ")).toBe("2026-01-01T00:00:00.000Z");
  });
  it("rejects non-YYYY-MM-DD formats", () => {
    expect(() => lookBackDateClean("2024-01-01T00:00:00Z")).toThrow(
      /YYYY-MM-DD format/,
    );
    expect(() => lookBackDateClean("01-01-2026")).toThrow(/YYYY-MM-DD format/);
    expect(() => lookBackDateClean(20260101)).toThrow(/YYYY-MM-DD format/);
  });
  it("rejects non-calendar dates", () => {
    expect(() => lookBackDateClean("2026-02-31")).toThrow(/YYYY-MM-DD format/);
    expect(() => lookBackDateClean("2026-13-01")).toThrow(/YYYY-MM-DD format/);
  });
  it("rejects future dates", () => {
    const nextYear = new Date().getFullYear() + 1;
    expect(() => lookBackDateClean(`${nextYear}-01-01`)).toThrow(
      /cannot be a future date/,
    );
  });
  it("rejects non-string types", () => {
    expect(() => lookBackDateClean("nope")).toThrow(/^Look-back Date /);
  });
});
