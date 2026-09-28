import { describe, expect, it } from "vitest";
import { getIncludeParams } from "./pagination";
describe("getIncludeParams", () => {
  it("returns empty array when no fields are provided", () => {
    expect(getIncludeParams(undefined, undefined)).toEqual([]);
  });
  it("returns empty array for empty field arrays", () => {
    expect(getIncludeParams([], [])).toEqual([]);
  });
  it("includes 'profile' when fieldsProfile is non-empty", () => {
    expect(getIncludeParams(["email"], undefined)).toEqual(["profile"]);
  });
  it("includes 'metric' when fieldsMetric is non-empty", () => {
    expect(getIncludeParams(undefined, ["name"])).toEqual(["metric"]);
  });
  it("includes both when both are non-empty", () => {
    const result = getIncludeParams(["email"], ["name"]);
    expect(result).toContain("profile");
    expect(result).toContain("metric");
    expect(result).toHaveLength(2);
  });
});
