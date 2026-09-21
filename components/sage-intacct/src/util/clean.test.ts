import { describe, expect, it } from "vitest";
import {
  cleanCodeInput,
  cleanBooleanInput,
  cleanCustomFields,
  cleanFieldsList,
  cleanLookBackDate,
} from "./clean";
describe("cleanCodeInput", () => {
  it("returns empty object for falsy input", () => {
    expect(cleanCodeInput("")).toEqual({});
    expect(cleanCodeInput(null)).toEqual({});
    expect(cleanCodeInput(undefined)).toEqual({});
  });
  it("parses a JSON string into an object", () => {
    expect(cleanCodeInput('{"key":"value"}')).toEqual({ key: "value" });
  });
  it("passes through an object as-is", () => {
    const obj = { key: "value" };
    expect(cleanCodeInput(obj)).toEqual(obj);
  });
});
describe("cleanBooleanInput", () => {
  it("returns undefined for falsy input", () => {
    expect(cleanBooleanInput("")).toBeUndefined();
    expect(cleanBooleanInput(null)).toBeUndefined();
    expect(cleanBooleanInput(undefined)).toBeUndefined();
  });
  it("converts truthy string to boolean", () => {
    expect(cleanBooleanInput("true")).toBe(true);
    expect(cleanBooleanInput("false")).toBe(false);
  });
});
describe("cleanCustomFields", () => {
  it("parses a valid JSON array", () => {
    expect(cleanCustomFields('[{"name":"foo"}]')).toEqual([{ name: "foo" }]);
  });
  it("throws for non-array JSON", () => {
    expect(() => cleanCustomFields('{"name":"foo"}')).toThrow(
      "Custom Fields invalid JSON",
    );
  });
  it("throws for invalid JSON", () => {
    expect(() => cleanCustomFields("not json")).toThrow(
      "Custom Fields invalid JSON",
    );
  });
  it("returns empty array for falsy/empty input", () => {
    expect(cleanCustomFields("")).toEqual([]);
    expect(cleanCustomFields(null)).toEqual([]);
    expect(cleanCustomFields(undefined)).toEqual([]);
  });
});
describe("cleanLookBackDate", () => {
  it("returns undefined for empty/falsy input", () => {
    expect(cleanLookBackDate("")).toBeUndefined();
    expect(cleanLookBackDate(null)).toBeUndefined();
    expect(cleanLookBackDate(undefined)).toBeUndefined();
  });
  it("parses a valid YYYY-MM-DD date to ISO string", () => {
    expect(cleanLookBackDate("2024-01-15")).toBe("2024-01-15T00:00:00.000Z");
  });
  it("throws for non-YYYY-MM-DD format", () => {
    expect(() => cleanLookBackDate("01/15/2024")).toThrow("YYYY-MM-DD");
    expect(() => cleanLookBackDate("2024-1-5")).toThrow("YYYY-MM-DD");
    expect(() => cleanLookBackDate("not-a-date")).toThrow("YYYY-MM-DD");
  });
  it("throws for invalid calendar dates", () => {
    expect(() => cleanLookBackDate("2024-02-30")).toThrow("YYYY-MM-DD");
    expect(() => cleanLookBackDate("2024-13-01")).toThrow("YYYY-MM-DD");
  });
  it("throws for future dates", () => {
    expect(() => cleanLookBackDate("2099-01-01")).toThrow("future date");
  });
  it("trims whitespace", () => {
    expect(cleanLookBackDate("  2024-06-01  ")).toBe(
      "2024-06-01T00:00:00.000Z",
    );
  });
});
describe("cleanFieldsList", () => {
  it("converts array of values to string array", () => {
    expect(cleanFieldsList(["a", "b"])).toEqual(["a", "b"]);
  });
  it("returns empty array for empty array", () => {
    expect(cleanFieldsList([])).toEqual([]);
  });
  it("returns empty array for falsy input", () => {
    expect(cleanFieldsList(null)).toEqual([]);
    expect(cleanFieldsList(undefined)).toEqual([]);
  });
});
