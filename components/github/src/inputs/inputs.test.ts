import {
  fetchAll,
  hookIdInput,
  organization,
  owner,
  page,
  perPage,
  repo,
} from ".";
describe("inputs SDK-passthrough cleans", () => {
  test("owner.clean coerces to a string (util.types.toString)", () => {
    expect(owner.clean?.(" octocat ")).toBe(" octocat ");
    expect(owner.clean?.(42)).toBe("42");
  });
  test("repo.clean coerces to a string (util.types.toString)", () => {
    expect(repo.clean?.("Hello-World")).toBe("Hello-World");
  });
  test("organization.clean coerces to a string (util.types.toString)", () => {
    expect(organization.clean?.("octocat")).toBe("octocat");
  });
  test("hookIdInput.clean coerces to a number (util.types.toNumber)", () => {
    expect(hookIdInput.clean?.("12345678")).toBe(12345678);
  });
  test("perPage.clean coerces to a number and blanks to undefined (toOptionalNumber)", () => {
    expect(perPage.clean?.("30")).toBe(30);
    expect(perPage.clean?.("")).toBeUndefined();
  });
  test("page.clean coerces to a number and blanks to undefined (toOptionalNumber)", () => {
    expect(page.clean?.("1")).toBe(1);
    expect(page.clean?.("")).toBeUndefined();
  });
  test("fetchAll.clean coerces to a boolean (util.types.toBool)", () => {
    expect(fetchAll.clean?.("true")).toBe(true);
    expect(fetchAll.clean?.("false")).toBe(false);
  });
});
