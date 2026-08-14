import { createDeploymentInputs } from "./deployments";
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
describe("createDeploymentInputs.packageInput.clean", () => {
  const clean = cleanOf(createDeploymentInputs.packageInput);
  test("coerces the package id to a string", () => {
    expect(clean("pkg_1bced782734040a581d")).toBe("pkg_1bced782734040a581d");
  });
  test("coerces a missing value to an empty string rather than rejecting it", () => {
    expect(clean(undefined)).toBe("");
  });
});
describe("createDeploymentInputs.targets.clean", () => {
  const clean = cleanOf(createDeploymentInputs.targets);
  test("passes the comma-delimited target list through as a string", () => {
    expect(clean("grp_123abc,dvc_123abc")).toBe("grp_123abc,dvc_123abc");
    expect(clean(" dvc_1 , dvc_2 ")).toBe(" dvc_1 , dvc_2 ");
  });
  test("coerces a missing value to an empty string rather than rejecting it", () => {
    expect(clean(undefined)).toBe("");
  });
});
