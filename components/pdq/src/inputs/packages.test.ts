import { getPackageInputs } from "./packages";
type CleanFn = (value: unknown) => unknown;
const cleanOf = (definition: unknown): CleanFn => {
  const clean = (
    definition as {
      clean?: CleanFn;
    }
  ).clean;
  if (typeof clean !== "function") {
    throw new Error("Input definition has no clean function.");
  }
  return clean;
};
describe("getPackageInputs.packageId.clean", () => {
  const clean = cleanOf(getPackageInputs.packageId);
  test("coerces the package id to a string", () => {
    expect(clean("pkg_1bced782734040a581d")).toBe("pkg_1bced782734040a581d");
    expect(clean(123456)).toBe("123456");
  });
  test("coerces a missing value to an empty string rather than rejecting it", () => {
    expect(clean(undefined)).toBe("");
    expect(clean(null)).toBe("");
  });
});
