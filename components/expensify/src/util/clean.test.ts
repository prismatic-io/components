import { describe, expect, it } from "vitest";
import { toOptionalBool } from "./clean";

describe("toOptionalBool", () => {
  it("returns undefined for an empty value", () => {
    expect(toOptionalBool(undefined)).toBeUndefined();
    expect(toOptionalBool(null)).toBeUndefined();
    expect(toOptionalBool("")).toBeUndefined();
  });

  it("keeps an explicit false", () => {
    expect(toOptionalBool(false)).toBe(false);
    expect(toOptionalBool("false")).toBe(false);
  });

  it("keeps an explicit true", () => {
    expect(toOptionalBool(true)).toBe(true);
    expect(toOptionalBool("true")).toBe(true);
  });
});
