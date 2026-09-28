import { describe, expect, it } from "vitest";
import {
  cleanStringInput,
  cleanNumberInput,
  cleanValueListInput,
  cleanBooleanInput,
  cleanCodeInput,
  cleanArrayCodeInput,
  cleanDate,
  lookBackDateClean,
  bufferToDataUri,
} from "./clean";
describe("cleanStringInput", () => {
  it("returns a string for truthy string input", () => {
    expect(cleanStringInput("hello")).toBe("hello");
  });
  it("returns undefined for empty string", () => {
    expect(cleanStringInput("")).toBeUndefined();
  });
  it("returns undefined for null/undefined", () => {
    expect(cleanStringInput(null)).toBeUndefined();
    expect(cleanStringInput(undefined)).toBeUndefined();
  });
  it("coerces numbers to string", () => {
    expect(cleanStringInput(42)).toBe("42");
  });
});
describe("cleanNumberInput", () => {
  it("returns a number for truthy input", () => {
    expect(cleanNumberInput("42")).toBe(42);
    expect(cleanNumberInput(42)).toBe(42);
  });
  it("returns undefined for falsy input", () => {
    expect(cleanNumberInput(0)).toBeUndefined();
    expect(cleanNumberInput("")).toBeUndefined();
    expect(cleanNumberInput(null)).toBeUndefined();
  });
});
describe("cleanValueListInput", () => {
  it("returns the array when non-empty", () => {
    expect(cleanValueListInput(["a", "b"])).toEqual(["a", "b"]);
  });
  it("returns undefined for empty array", () => {
    expect(cleanValueListInput([])).toBeUndefined();
  });
  it("returns undefined for non-array", () => {
    expect(cleanValueListInput("not-an-array")).toBeUndefined();
    expect(cleanValueListInput(null)).toBeUndefined();
  });
});
describe("cleanBooleanInput", () => {
  it("returns boolean for truthy input", () => {
    expect(cleanBooleanInput(true)).toBe(true);
    expect(cleanBooleanInput("true")).toBe(true);
  });
  it("returns undefined for falsy input", () => {
    expect(cleanBooleanInput(false)).toBeUndefined();
    expect(cleanBooleanInput("")).toBeUndefined();
    expect(cleanBooleanInput(null)).toBeUndefined();
  });
});
describe("cleanCodeInput", () => {
  it("parses a JSON string to an object", () => {
    expect(cleanCodeInput('{"key":"value"}', "test")).toEqual({ key: "value" });
  });
  it("returns an object directly", () => {
    expect(cleanCodeInput({ key: "value" }, "test")).toEqual({ key: "value" });
  });
  it("returns undefined for falsy input", () => {
    expect(cleanCodeInput("", "test")).toBeUndefined();
    expect(cleanCodeInput(null, "test")).toBeUndefined();
  });
  it("returns the coerced value for a plain string (toObject does not throw)", () => {
    const result = cleanCodeInput("not-json", "MyInput");
    expect(result).toBeDefined();
  });
});
describe("cleanArrayCodeInput", () => {
  it("parses a JSON array string", () => {
    expect(cleanArrayCodeInput("[1, 2, 3]", "test")).toEqual([1, 2, 3]);
  });
  it("returns an array directly", () => {
    expect(cleanArrayCodeInput([1, 2], "test")).toEqual([1, 2]);
  });
  it("returns undefined for falsy input", () => {
    expect(cleanArrayCodeInput("", "test")).toBeUndefined();
    expect(cleanArrayCodeInput(null, "test")).toBeUndefined();
  });
  it("throws when parsed value is not an array", () => {
    expect(() => cleanArrayCodeInput('{"key":"value"}', "Items")).toThrow(
      "Invalid array for Items input.",
    );
  });
  it("throws on non-array non-JSON string (coerced to non-array object)", () => {
    expect(() => cleanArrayCodeInput("bad-json", "Items")).toThrow(
      "Invalid array for Items input.",
    );
  });
});
describe("cleanDate", () => {
  it("parses a valid date string", () => {
    const result = cleanDate("2024-01-15T10:00:00Z", "test");
    expect(result).toBeInstanceOf(Date);
    expect(result?.toISOString()).toBe("2024-01-15T10:00:00.000Z");
  });
  it("returns undefined for falsy input", () => {
    expect(cleanDate("", "test")).toBeUndefined();
    expect(cleanDate(null, "test")).toBeUndefined();
  });
  it("throws on invalid date", () => {
    expect(() => cleanDate("not-a-date", "StartDate")).toThrow(
      "Invalid date for StartDate input.",
    );
  });
});
describe("lookBackDateClean", () => {
  it("returns empty string for empty/falsy input", () => {
    expect(lookBackDateClean("")).toBe("");
    expect(lookBackDateClean(null)).toBe("");
    expect(lookBackDateClean(undefined)).toBe("");
  });
  it("returns a valid YYYY-MM-DD date unchanged", () => {
    expect(lookBackDateClean("2024-06-15")).toBe("2024-06-15");
  });
  it("trims whitespace", () => {
    expect(lookBackDateClean("  2024-06-15  ")).toBe("2024-06-15");
  });
  it("rejects non-YYYY-MM-DD format", () => {
    expect(() => lookBackDateClean("06/15/2024")).toThrow("YYYY-MM-DD format");
    expect(() => lookBackDateClean("2024-6-15")).toThrow("YYYY-MM-DD format");
    expect(() => lookBackDateClean("not-a-date")).toThrow("YYYY-MM-DD format");
  });
  it("rejects invalid calendar dates", () => {
    expect(() => lookBackDateClean("2024-02-31")).toThrow(
      "not a valid calendar date",
    );
    expect(() => lookBackDateClean("2024-13-01")).toThrow(
      "not a valid calendar date",
    );
  });
  it("rejects future dates", () => {
    const futureYear = new Date().getFullYear() + 1;
    expect(() => lookBackDateClean(`${futureYear}-01-01`)).toThrow(
      "future date",
    );
  });
  it("accepts today's date", () => {
    const today = new Date().toISOString().slice(0, 10);
    expect(lookBackDateClean(today)).toBe(today);
  });
});
describe("bufferToDataUri", () => {
  it("converts a buffer to a data URI", () => {
    const buf = Buffer.from("hello");
    const result = bufferToDataUri(buf, "text/plain");
    expect(result).toBe("data:text/plain;base64,aGVsbG8=");
  });
  it("handles image/png mime type", () => {
    const buf = Buffer.from([0x89, 0x50, 0x4e, 0x47]);
    const result = bufferToDataUri(buf, "image/png");
    expect(result).toMatch(/^data:image\/png;base64,/);
  });
});
