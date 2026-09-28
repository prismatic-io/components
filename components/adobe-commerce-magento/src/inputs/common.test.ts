import {
  fetchAll,
  searchCriteriaConditionType,
  searchCriteriaCurrentPage,
  searchCriteriaField,
  searchCriteriaPageSize,
  searchCriteriaSortDirection,
  searchCriteriaSortField,
  searchCriteriaValue,
} from "./common";
describe("common inputs: happy-path normalization", () => {
  test.each<
    [string, ((value: unknown) => unknown) | undefined, unknown, unknown]
  >([
    ["fetchAll (true)", fetchAll.clean, "true", true],
    ["fetchAll (false)", fetchAll.clean, "false", false],
    [
      "searchCriteriaConditionType",
      searchCriteriaConditionType.clean,
      "gteq",
      "gteq",
    ],
    [
      "searchCriteriaField",
      searchCriteriaField.clean,
      "updated_at",
      "updated_at",
    ],
    [
      "searchCriteriaValue",
      searchCriteriaValue.clean,
      "2026-01-01 00:00:00",
      "2026-01-01 00:00:00",
    ],
    [
      "searchCriteriaSortDirection",
      searchCriteriaSortDirection.clean,
      "DESC",
      "DESC",
    ],
    [
      "searchCriteriaSortField",
      searchCriteriaSortField.clean,
      "created_at",
      "created_at",
    ],
  ])("%s normalizes a valid value", (_label, clean, raw, expected) => {
    expect(clean?.(raw)).toEqual(expected);
  });
  test.each<[string, ((value: unknown) => unknown) | undefined]>([
    ["searchCriteriaConditionType", searchCriteriaConditionType.clean],
    ["searchCriteriaField", searchCriteriaField.clean],
    ["searchCriteriaValue", searchCriteriaValue.clean],
    ["searchCriteriaSortDirection", searchCriteriaSortDirection.clean],
    ["searchCriteriaSortField", searchCriteriaSortField.clean],
  ])('%s resolves an empty string to undefined rather than ""', (_label, clean) => {
    expect(clean?.("")).toBeUndefined();
  });
});
describe("searchCriteriaCurrentPage.clean", () => {
  test("coerces a numeric string to a number", () => {
    expect(searchCriteriaCurrentPage.clean?.("2")).toBe(2);
  });
  test("resolves an empty string to undefined rather than 0", () => {
    expect(searchCriteriaCurrentPage.clean?.("")).toBeUndefined();
  });
  test("resolves an explicit zero to undefined, since page 0 does not exist", () => {
    expect(searchCriteriaCurrentPage.clean?.("0")).toBeUndefined();
  });
  test("throws on a non-numeric string", () => {
    expect(() => searchCriteriaCurrentPage.clean?.("not-a-page")).toThrow();
  });
});
describe("searchCriteriaPageSize.clean", () => {
  test("coerces a numeric string to a number", () => {
    expect(searchCriteriaPageSize.clean?.("50")).toBe(50);
  });
  test("resolves an empty string to undefined rather than 0", () => {
    expect(searchCriteriaPageSize.clean?.("")).toBeUndefined();
  });
  test("resolves an explicit zero to undefined, since a zero page size returns nothing", () => {
    expect(searchCriteriaPageSize.clean?.("0")).toBeUndefined();
  });
  test("throws on a non-numeric string", () => {
    expect(() => searchCriteriaPageSize.clean?.("not-a-size")).toThrow();
  });
});
