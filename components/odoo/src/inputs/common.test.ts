import { modelSearch, nameSearch, pagination } from "./common";
const limitClean = pagination.inputs.limit.clean;
const offsetClean = pagination.inputs.offset.clean;
describe("pagination.limit.clean", () => {
  test("coerces a numeric string to a number", () => {
    expect(limitClean("10")).toBe(10);
  });
  test("throws on a non-numeric value", () => {
    expect(() => limitClean("ten")).toThrow(
      "Value 'ten' cannot be coerced to a number.",
    );
  });
  test("returns 0 for a blank or absent value", () => {
    expect(limitClean("")).toBe(0);
    expect(limitClean(undefined)).toBe(0);
  });
});
describe("pagination.offset.clean", () => {
  test("coerces a numeric string to a number", () => {
    expect(offsetClean("20")).toBe(20);
  });
  test("throws on a non-numeric value", () => {
    expect(() => offsetClean("twenty")).toThrow(
      "Value 'twenty' cannot be coerced to a number.",
    );
  });
});
describe("nameSearch.clean", () => {
  test("coerces a provided value to a string", () => {
    expect(nameSearch.clean("Partner")).toBe("Partner");
    expect(nameSearch.clean(42)).toBe("42");
  });
  test("returns undefined for a blank value", () => {
    expect(nameSearch.clean("")).toBeUndefined();
    expect(nameSearch.clean(undefined)).toBeUndefined();
    expect(nameSearch.clean(null)).toBeUndefined();
  });
  test("does not trim surrounding whitespace", () => {
    expect(nameSearch.clean("  Partner  ")).toBe("  Partner  ");
  });
});
describe("modelSearch.clean", () => {
  test("coerces a provided value to a string", () => {
    expect(modelSearch.clean("res.partner")).toBe("res.partner");
  });
  test("returns undefined for a blank value", () => {
    expect(modelSearch.clean("")).toBeUndefined();
    expect(modelSearch.clean(undefined)).toBeUndefined();
  });
});
