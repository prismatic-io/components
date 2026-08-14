import {
  filters,
  group,
  includes,
  listDefaultInputs,
  pagination,
} from "./common";
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
const childOf = (structured: unknown, key: string): unknown =>
  (
    structured as {
      inputs: Record<string, unknown>;
    }
  ).inputs[key];
describe("includes.clean", () => {
  const clean = cleanOf(includes);
  test("returns the supplied resource list as a string", () => {
    expect(clean("networking,processors")).toBe("networking,processors");
  });
  test("returns undefined for a falsy value rather than rejecting it", () => {
    expect(clean("")).toBeUndefined();
    expect(clean(undefined)).toBeUndefined();
  });
});
describe("group.clean", () => {
  const clean = cleanOf(group);
  test("coerces the group id to a string", () => {
    expect(clean("grp_1bced782734040a581d")).toBe("grp_1bced782734040a581d");
    expect(clean(123456)).toBe("123456");
  });
  test("returns undefined for a falsy value rather than rejecting it", () => {
    expect(clean("")).toBeUndefined();
    expect(clean(undefined)).toBeUndefined();
  });
});
describe("filters.inputs.sort.clean", () => {
  const clean = cleanOf(childOf(filters, "sort"));
  test("returns the supplied sort expression", () => {
    expect(clean("insertedAtDesc")).toBe("insertedAtDesc");
  });
  test("returns undefined for a falsy value rather than rejecting it", () => {
    expect(clean("")).toBeUndefined();
    expect(clean(undefined)).toBeUndefined();
  });
});
describe("filters.inputs.filter.clean", () => {
  const clean = cleanOf(childOf(filters, "filter"));
  test("passes the filter expression through as a string", () => {
    expect(clean(JSON.stringify({ hostname: "~hostname" }))).toBe(
      '{"hostname":"~hostname"}',
    );
  });
  test("returns undefined for a falsy value rather than rejecting it", () => {
    expect(clean("")).toBeUndefined();
    expect(clean(undefined)).toBeUndefined();
  });
});
describe("pagination.inputs.page.clean", () => {
  const clean = cleanOf(childOf(pagination, "page"));
  test("coerces a numeric page to a number", () => {
    expect(clean("2")).toBe(2);
    expect(clean(2)).toBe(2);
  });
  test("throws on a non-numeric page", () => {
    expect(() => clean("abc")).toThrow(
      "Value 'abc' cannot be coerced to a number.",
    );
  });
});
describe("pagination.inputs.pageSize.clean", () => {
  const clean = cleanOf(childOf(pagination, "pageSize"));
  test("coerces a numeric page size to a number", () => {
    expect(clean("100")).toBe(100);
  });
  test("throws on a non-numeric page size", () => {
    expect(() => clean("all")).toThrow(
      "Value 'all' cannot be coerced to a number.",
    );
  });
});
describe("listDefaultInputs.customQueryParams.clean", () => {
  const clean = cleanOf(listDefaultInputs.customQueryParams);
  test("folds a key/value pair list into an object", () => {
    expect(
      clean([
        { key: "hostname", value: "LAB01" },
        { key: "os", value: "windows" },
      ]),
    ).toEqual({ hostname: "LAB01", os: "windows" });
  });
  test("returns undefined for a falsy value rather than rejecting it", () => {
    expect(clean(undefined)).toBeUndefined();
    expect(clean("")).toBeUndefined();
  });
});
describe("listDefaultInputs.fetchAll.clean", () => {
  const clean = cleanOf(listDefaultInputs.fetchAll);
  test("coerces the documented truthy and falsy spellings", () => {
    expect(clean("true")).toBe(true);
    expect(clean("yes")).toBe(true);
    expect(clean("false")).toBe(false);
    expect(clean("no")).toBe(false);
  });
  test("coerces an unrecognized value to false rather than rejecting it", () => {
    expect(clean(undefined)).toBe(false);
    expect(clean("maybe")).toBe(true);
  });
});
