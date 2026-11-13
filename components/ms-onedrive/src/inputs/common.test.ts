import { fetchAll, pagination } from "./common";

describe("pagination inputs", () => {
  test("cleans the page limit to a number", () => {
    expect(pagination.inputs.pageLimit.clean?.("100")).toBe(100);
  });

  test("cleans an empty page limit to undefined so the resolver treats it as unset", () => {
    expect(pagination.inputs.pageLimit.clean?.("")).toBeUndefined();
    expect(pagination.inputs.pageLimit.clean?.(undefined)).toBeUndefined();
  });

  test("rejects a non-numeric page limit", () => {
    expect(() => pagination.inputs.pageLimit.clean?.("abc")).toThrow(
      "Value 'abc' cannot be coerced to a number.",
    );
  });

  test("cleans an empty page token to undefined", () => {
    expect(pagination.inputs.pageToken.clean?.("")).toBeUndefined();
  });
});

describe("fetchAll input", () => {
  test("coerces true/false strings and treats blank as false", () => {
    expect(fetchAll.clean?.("true")).toBe(true);
    expect(fetchAll.clean?.("false")).toBe(false);
    expect(fetchAll.clean?.("")).toBe(false);
  });
});
