import {
  API_VERSION,
  HUBSPOT_DATE_PROPERTIES,
  SEARCH_ENDPOINTS,
  hubspotPaths,
} from "./constants";
describe("hubspotPaths", () => {
  test("pins the date-based API version", () => {
    expect(API_VERSION).toBe("2026-09");
  });
  test.each([
    [hubspotPaths.objects("contacts"), "/crm/objects/2026-09/contacts"],
    [hubspotPaths.objects("deals", "/123"), "/crm/objects/2026-09/deals/123"],
    [
      hubspotPaths.objects("contacts", "/batch/create"),
      "/crm/objects/2026-09/contacts/batch/create",
    ],
    [
      hubspotPaths.objects("p1_x", "/search"),
      "/crm/objects/2026-09/p1_x/search",
    ],
    [hubspotPaths.schemas(), "/crm-object-schemas/2026-09/schemas"],
    [hubspotPaths.schemas("/p1_x"), "/crm-object-schemas/2026-09/schemas/p1_x"],
    [hubspotPaths.properties("deals"), "/crm/properties/2026-09/deals"],
    [hubspotPaths.imports(), "/crm/imports/2026-09"],
    [hubspotPaths.imports("/42/cancel"), "/crm/imports/2026-09/42/cancel"],
    [
      hubspotPaths.exports("/export/async"),
      "/crm/exports/2026-09/export/async",
    ],
    [
      hubspotPaths.appWebhooks(7, "/settings"),
      "/app-webhooks/2026-09/7/settings",
    ],
    [
      hubspotPaths.appWebhooks("7", "/subscriptions/9"),
      "/app-webhooks/2026-09/7/subscriptions/9",
    ],
    [hubspotPaths.oauthToken, "/oauth/2026-09/token"],
    [hubspotPaths.oauthIntrospect, "/oauth/2026-09/token/introspect"],
    [hubspotPaths.accountDetails, "/account-info/2026-09/details"],
  ])("builds %s", (actual, expected) => {
    expect(actual).toBe(expected);
  });
});
describe("stored Search Endpoint dropdown values", () => {
  test("stay byte-identical so a stored configuration still matches the dropdown", () => {
    expect(SEARCH_ENDPOINTS.map((e) => e.value)).toContain(
      "/crm/v3/objects/contacts/search",
    );
    expect(SEARCH_ENDPOINTS.map((e) => e.value)).toContain(
      "/crm/v3/objects/{objectType}/search",
    );
    expect(SEARCH_ENDPOINTS).toHaveLength(14);
  });
  test("every dropdown object type has a date-property entry, except custom objects", () => {
    const missing = SEARCH_ENDPOINTS.map((e) => e.value.split("/")[4]).filter(
      (type) => type !== "{objectType}" && !(type in HUBSPOT_DATE_PROPERTIES),
    );
    expect(missing).toEqual([]);
  });
});
