import { createProductInputs } from "./products";

describe("createProduct priceValue clean", () => {
  const clean = createProductInputs.priceValue.clean;

  it("converts a numeric string to a number", () => {
    expect(clean("1300")).toBe(1300);
    expect(clean("12.5")).toBe(12.5);
  });

  it("throws on a non-numeric value", () => {
    expect(() => clean("abc")).toThrow();
  });
});
