import { describe, expect, test } from "vitest";
import { cleanString, cleanOrganizationInput } from "./clean";
import { LIVE_API_URL } from "../constants";
const ORG_BASE = `${LIVE_API_URL}/organizations/`;
describe("cleanString", () => {
  test("returns string as-is (no trimming) for valid input", () => {
    expect(cleanString("  hello  ")).toBe("  hello  ");
  });
  test("returns string for plain input", () => {
    expect(cleanString("hello")).toBe("hello");
  });
  test("returns undefined for empty string", () => {
    expect(cleanString("")).toBeUndefined();
  });
  test("returns undefined for null", () => {
    expect(cleanString(null)).toBeUndefined();
  });
  test("returns undefined for undefined", () => {
    expect(cleanString(undefined)).toBeUndefined();
  });
  test("returns string representation of number", () => {
    expect(cleanString(42)).toBe("42");
  });
});
describe("cleanOrganizationInput", () => {
  test("prepends base path for bare org ID", () => {
    expect(cleanOrganizationInput("ABCDEF123456")).toBe(
      `${ORG_BASE}ABCDEF123456`,
    );
  });
  test("passes through full URI unchanged", () => {
    const fullUri = `${ORG_BASE}ABCDEF123456`;
    expect(cleanOrganizationInput(fullUri)).toBe(fullUri);
  });
  test("returns toString result for non-string input", () => {
    expect(cleanOrganizationInput(123)).toBe("123");
  });
  test("returns empty string for empty string input", () => {
    expect(cleanOrganizationInput("")).toBe(ORG_BASE);
  });
});
