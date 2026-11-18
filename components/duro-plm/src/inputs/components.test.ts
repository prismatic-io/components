import { getComponentByIdInputs } from "./components";

describe("componentId clean", () => {
  const clean = getComponentByIdInputs.componentId.clean;

  test("returns the ID as a string", () => {
    expect(clean("666c5a9528e821000815990e")).toBe("666c5a9528e821000815990e");
  });

  test("returns an empty string for an empty value", () => {
    expect(clean("")).toBe("");
  });
});
