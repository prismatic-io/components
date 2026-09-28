import type { ParsedUrlQuery } from "node:querystring";
import nock from "nock";
import {
  MAX_POLL_PAGES,
  POLL_PAGE_SIZE,
  POLL_RESOURCE_CONFIG,
  POLL_RESOURCE_TYPES,
} from "../constants";
import { STORE_HOST, storeConnection } from "../testHelpers";
import { fetchMagentoRecordsSince } from "./polling";
beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => nock.cleanAll());
const BASE_PATH = "/rest/default/V1";
const CURSOR = "2020-01-01T00:00:00.000Z";
const pathFor = (resourceType: string) =>
  `${BASE_PATH}${POLL_RESOURCE_CONFIG[resourceType as (typeof POLL_RESOURCE_TYPES)[number]].endpoint}`;
const onPage = (page: string) => (query: ParsedUrlQuery) =>
  query["searchCriteria[currentPage]"] === page;
const fullPage = Array.from({ length: POLL_PAGE_SIZE }, (_, index) => ({
  entity_id: index,
  updated_at: "2020-01-02 00:00:00",
}));
describe("fetchMagentoRecordsSince: resource resolution", () => {
  test("rejects a resource type the config map does not carry", async () => {
    await expect(
      fetchMagentoRecordsSince(storeConnection(), "invoices", CURSOR, false),
    ).rejects.toThrow("Unsupported resource type: invoices");
  });
  test.each([
    ...POLL_RESOURCE_TYPES,
  ])("polls %s at its configured endpoint", async (type) => {
    const scope = nock(STORE_HOST)
      .get(pathFor(type))
      .query(true)
      .reply(200, { items: [] });
    await fetchMagentoRecordsSince(storeConnection(), type, CURSOR, false);
    expect(scope.isDone()).toBe(true);
  });
});
describe("fetchMagentoRecordsSince: query contract", () => {
  test("filters on updated_at gteq the cursor, sorted ASC, one full page at a time", async () => {
    const scope = nock(STORE_HOST)
      .get(pathFor("orders"))
      .query({
        "searchCriteria[filterGroups][0][filters][0][field]": "updated_at",
        "searchCriteria[filterGroups][0][filters][0][conditionType]": "gteq",
        "searchCriteria[filterGroups][0][filters][0][value]":
          "2020-01-01 00:00:00",
        "searchCriteria[sortOrders][0][field]": "updated_at",
        "searchCriteria[sortOrders][0][direction]": "ASC",
        "searchCriteria[pageSize]": String(POLL_PAGE_SIZE),
        "searchCriteria[currentPage]": "1",
      })
      .reply(200, { items: [] });
    await fetchMagentoRecordsSince(storeConnection(), "orders", CURSOR, false);
    expect(scope.isDone()).toBe(true);
  });
});
describe("fetchMagentoRecordsSince: backlog handling", () => {
  test("returns a short page as a complete, untruncated result", async () => {
    const records = [{ entity_id: 1, updated_at: "2020-01-02 00:00:00" }];
    nock(STORE_HOST)
      .get(pathFor("orders"))
      .query(true)
      .reply(200, { items: records });
    const result = await fetchMagentoRecordsSince(
      storeConnection(),
      "orders",
      CURSOR,
      false,
    );
    expect(result).toEqual({ records, truncated: false });
  });
  test("resolves a body with no items to an empty, untruncated result", async () => {
    nock(STORE_HOST)
      .get(pathFor("orders"))
      .query(true)
      .reply(200, { total_count: 0 });
    const result = await fetchMagentoRecordsSince(
      storeConnection(),
      "orders",
      CURSOR,
      false,
    );
    expect(result).toEqual({ records: [], truncated: false });
  });
  test("accumulates across pages until one comes back short", async () => {
    nock(STORE_HOST)
      .get(pathFor("orders"))
      .query(onPage("1"))
      .reply(200, { items: fullPage });
    nock(STORE_HOST)
      .get(pathFor("orders"))
      .query(onPage("2"))
      .reply(200, {
        items: [{ entity_id: 999, updated_at: "2020-01-03 00:00:00" }],
      });
    const result = await fetchMagentoRecordsSince(
      storeConnection(),
      "orders",
      CURSOR,
      false,
    );
    expect(result.records).toHaveLength(POLL_PAGE_SIZE + 1);
    expect(result.truncated).toBe(false);
  });
  test(`reports truncated once MAX_POLL_PAGES (${MAX_POLL_PAGES}) full pages are read`, async () => {
    nock(STORE_HOST)
      .get(pathFor("orders"))
      .query(true)
      .times(MAX_POLL_PAGES)
      .reply(200, { items: fullPage });
    const result = await fetchMagentoRecordsSince(
      storeConnection(),
      "orders",
      CURSOR,
      false,
    );
    expect(result.truncated).toBe(true);
    expect(result.records).toHaveLength(MAX_POLL_PAGES * POLL_PAGE_SIZE);
  });
});
