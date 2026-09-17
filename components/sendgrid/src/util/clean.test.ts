import { describe, expect, it } from "vitest";
import {
  cleanArrayCodeInput,
  cleanContactsArrayInput,
  cleanDataInput,
  cleanFieldMappingsInput,
  cleanStringInput,
  cleanValueListInput,
} from "./clean";
describe("cleanStringInput", () => {
  it("returns string for truthy string value", () => {
    expect(cleanStringInput("hello")).toBe("hello");
  });
  it("returns string for truthy number value", () => {
    expect(cleanStringInput(42)).toBe("42");
  });
  it("returns undefined for undefined", () => {
    expect(cleanStringInput(undefined)).toBeUndefined();
  });
  it("returns undefined for null", () => {
    expect(cleanStringInput(null)).toBeUndefined();
  });
  it("returns undefined for empty string", () => {
    expect(cleanStringInput("")).toBeUndefined();
  });
  it("returns undefined for 0", () => {
    expect(cleanStringInput(0)).toBeUndefined();
  });
});
describe("cleanValueListInput", () => {
  it("returns mapped string array for string array", () => {
    expect(cleanValueListInput(["a", "b", "c"])).toEqual(["a", "b", "c"]);
  });
  it("converts number array elements to strings", () => {
    expect(cleanValueListInput([1, 2, 3])).toEqual(["1", "2", "3"]);
  });
  it("returns empty array for undefined", () => {
    expect(cleanValueListInput(undefined)).toEqual([]);
  });
  it("returns empty array for null", () => {
    expect(cleanValueListInput(null)).toEqual([]);
  });
  it("returns empty array for non-array value", () => {
    expect(cleanValueListInput("not an array")).toEqual([]);
  });
  it("returns empty array for empty array", () => {
    expect(cleanValueListInput([])).toEqual([]);
  });
});
describe("cleanArrayCodeInput", () => {
  it("parses valid JSON array string", () => {
    const input = '[{"key": "value"}, {"key": "value2"}]';
    expect(cleanArrayCodeInput(input, "Test")).toEqual([
      { key: "value" },
      { key: "value2" },
    ]);
  });
  it("returns array object as-is", () => {
    const input = [{ key: "value" }];
    expect(cleanArrayCodeInput(input, "Test")).toEqual([{ key: "value" }]);
  });
  it("throws for non-array object", () => {
    const input = { key: "value" };
    expect(() => cleanArrayCodeInput(input, "Test")).toThrow(
      "Invalid array for Test input.",
    );
  });
  it("throws for non-array string value", () => {
    expect(() => cleanArrayCodeInput("not json", "Test")).toThrow(
      "Invalid array for Test input.",
    );
  });
  it("returns undefined for undefined", () => {
    expect(cleanArrayCodeInput(undefined, "Test")).toBeUndefined();
  });
  it("returns undefined for null", () => {
    expect(cleanArrayCodeInput(null, "Test")).toBeUndefined();
  });
  it("returns undefined for empty string", () => {
    expect(cleanArrayCodeInput("", "Test")).toBeUndefined();
  });
});
describe("cleanFieldMappingsInput", () => {
  it("parses valid JSON string of strings and nulls", () => {
    expect(cleanFieldMappingsInput('["a", null, "b"]')).toEqual([
      "a",
      null,
      "b",
    ]);
  });
  it("returns already-parsed array as-is", () => {
    expect(cleanFieldMappingsInput(["a", null, "b"])).toEqual(["a", null, "b"]);
  });
  it("throws for array with non-string/null elements", () => {
    expect(() => cleanFieldMappingsInput([1, 2])).toThrow(
      "Field Mappings must be an array of strings or null",
    );
  });
  it("throws for non-array value", () => {
    expect(() => cleanFieldMappingsInput('{"key": "value"}')).toThrow(
      "Field Mappings must be an array of strings or null",
    );
  });
  it("throws for invalid JSON string", () => {
    expect(() => cleanFieldMappingsInput("not json")).toThrow(
      "Invalid JSON format for Field Mappings",
    );
  });
});
describe("cleanContactsArrayInput", () => {
  it("parses valid JSON array string", () => {
    const input = '[{"email": "test@example.com"}]';
    expect(cleanContactsArrayInput(input)).toEqual([
      { email: "test@example.com" },
    ]);
  });
  it("returns already-parsed array as-is", () => {
    const input = [{ email: "test@example.com" }];
    expect(cleanContactsArrayInput(input)).toEqual([
      { email: "test@example.com" },
    ]);
  });
  it("throws for non-array object", () => {
    expect(() =>
      cleanContactsArrayInput({ email: "test@example.com" }),
    ).toThrow("Contacts input must be an array");
  });
  it("throws for non-array string", () => {
    expect(() => cleanContactsArrayInput('"just a string"')).toThrow(
      "Contacts input must be an array",
    );
  });
  it("throws for invalid JSON string", () => {
    expect(() => cleanContactsArrayInput("not json")).toThrow(
      "Invalid JSON format for Contacts",
    );
  });
});
describe("cleanDataInput", () => {
  it("returns toData result for truthy value", () => {
    const result = cleanDataInput("some data");
    expect(result).toBeDefined();
  });
  it("returns undefined for undefined", () => {
    expect(cleanDataInput(undefined)).toBeUndefined();
  });
  it("returns undefined for null", () => {
    expect(cleanDataInput(null)).toBeUndefined();
  });
  it("returns undefined for empty string", () => {
    expect(cleanDataInput("")).toBeUndefined();
  });
});
