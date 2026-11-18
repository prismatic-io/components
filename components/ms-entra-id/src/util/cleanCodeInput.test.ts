import { cleanCodeInput } from ".";

describe("cleanCodeInput", () => {
  it("parses a JSON string into an object", () => {
    expect(
      cleanCodeInput('{"department":"Sales"}', "Additional Properties"),
    ).toEqual({
      department: "Sales",
    });
  });

  it("passes an object through", () => {
    expect(
      cleanCodeInput({ department: "Sales" }, "Additional Properties"),
    ).toEqual({
      department: "Sales",
    });
  });

  it("returns undefined for an empty value", () => {
    expect(cleanCodeInput("", "Additional Properties")).toBeUndefined();
  });

  it("rejects text that is not JSON instead of passing it through", () => {
    expect(() => cleanCodeInput("not json", "Additional Properties")).toThrow(
      "Invalid code for Additional Properties input.",
    );
  });
});
