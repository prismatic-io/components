import {
  searchEndpointObjectType,
  toCurrentSearchEndpoint,
} from "./searchEndpoint";

describe("searchEndpointObjectType", () => {
  test.each([
    ["/crm/v3/objects/contacts/search", "contacts"],
    ["/crm/objects/2026-09/contacts/search", "contacts"],
    ["/crm/objects/2027-03/line_items/search", "line_items"],
    ["/CRM/V3/Objects/Contacts/Search", "contacts"],
    ["/crm/v3/objects/{objectType}/search", "{objecttype}"],
    ["/crm/objects/2026-09/{objectType}/search", "{objecttype}"],
  ])("parses %s to %s", (endpoint, expected) => {
    expect(searchEndpointObjectType(endpoint)).toBe(expected);
  });

  test.each([
    "",
    "/crm/v3/objects/contacts",
    "/crm/v3/objects/contacts/search/extra",
    "/crm/v4/objects/contacts/search",
    "/crm/objects/2026/contacts/search",
    "https://api.hubapi.com/crm/v3/objects/contacts/search",
    "junk",
  ])("returns undefined for %p", (endpoint) => {
    expect(searchEndpointObjectType(endpoint)).toBeUndefined();
  });
});

describe("toCurrentSearchEndpoint", () => {
  test("rewrites a legacy stored value to the dated path", () => {
    expect(toCurrentSearchEndpoint("/crm/v3/objects/contacts/search")).toBe(
      "/crm/objects/2026-09/contacts/search",
    );
  });

  test("keeps a dated stored value on the current version", () => {
    expect(toCurrentSearchEndpoint("/crm/objects/2026-09/deals/search")).toBe(
      "/crm/objects/2026-09/deals/search",
    );
  });

  test("moves a value stored under an older dated version to the current one", () => {
    expect(toCurrentSearchEndpoint("/crm/objects/2025-01/deals/search")).toBe(
      "/crm/objects/2026-09/deals/search",
    );
  });

  test("lower-cases the object type and accepts any case in the fixed segments", () => {
    expect(toCurrentSearchEndpoint("/CRM/V3/OBJECTS/Contacts/SEARCH")).toBe(
      "/crm/objects/2026-09/contacts/search",
    );
  });

  test("keeps the custom-objects placeholder for later substitution", () => {
    expect(toCurrentSearchEndpoint("/crm/v3/objects/{objectType}/search")).toBe(
      "/crm/objects/2026-09/{objectType}/search",
    );
  });

  test("throws a clear error for an unrecognized value", () => {
    expect(() => toCurrentSearchEndpoint("/something/else")).toThrow(
      /Unrecognized search endpoint "\/something\/else"/,
    );
  });
});
