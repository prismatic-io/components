import { pollChangesInputs } from "./triggers";
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
describe("pollChangesInputs.pollResourceType.clean", () => {
  const clean = cleanOf(pollChangesInputs.pollResourceType);
  test("returns the selected resource name as a string", () => {
    expect(clean("Devices")).toBe("Devices");
    expect(clean("Groups")).toBe("Groups");
  });
  test("passes an out-of-model value through instead of rejecting it", () => {
    expect(clean("Packages")).toBe("Packages");
    expect(clean(undefined)).toBe("");
  });
});
