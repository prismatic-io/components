import { pollChangesInputs } from "./triggers";
describe("pollChanges retailerId clean", () => {
  const clean = pollChangesInputs.retailerId.clean;
  it("converts a provided value to a number", () => {
    expect(clean("34")).toBe(34);
  });
  it("maps an empty string and undefined to undefined", () => {
    expect(clean("")).toBeUndefined();
    expect(clean(undefined)).toBeUndefined();
  });
});
