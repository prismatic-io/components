import { getDeviceInputs } from "./devices";
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
describe("getDeviceInputs.deviceId.clean", () => {
  const clean = cleanOf(getDeviceInputs.deviceId);
  test("coerces the device id to a string", () => {
    expect(clean("dvc_1bced782734040a581d")).toBe("dvc_1bced782734040a581d");
    expect(clean(123456)).toBe("123456");
  });
  test("coerces a missing value to an empty string rather than rejecting it", () => {
    expect(clean(undefined)).toBe("");
    expect(clean(null)).toBe("");
  });
});
