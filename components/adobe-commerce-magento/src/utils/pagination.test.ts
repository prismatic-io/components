import type { ParsedUrlQuery } from "node:querystring";
import nock from "nock";
import { getClient } from "../client";
import { MAX_PAGES } from "../constants";
import { STORE_HOST, storeConnection } from "../testHelpers";
import { paginateResults, removeUndefinedValuesFromObject } from "./pagination";
beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => nock.cleanAll());
const PATH = "/rest/default/V1/orders";
const ENDPOINT = "/orders";
const storeClient = () => getClient(storeConnection(), false);
const onPage = (page: string) => (query: ParsedUrlQuery) =>
  query["searchCriteria[currentPage]"] === page;
describe("removeUndefinedValuesFromObject", () => {
  test("drops undefined entries and keeps every other falsy value", () => {
    expect(
      removeUndefinedValuesFromObject({
        kept: "value",
        nullish: null,
        zero: 0,
        empty: "",
        untrue: false,
        absent: undefined,
      }),
    ).toEqual({
      kept: "value",
      nullish: null,
      zero: 0,
      empty: "",
      untrue: false,
    });
  });
  test("returns a new object rather than mutating the caller's", () => {
    const input = { kept: "value", absent: undefined };
    const result = removeUndefinedValuesFromObject(input);
    expect(result).not.toBe(input);
    expect(Object.keys(input)).toContain("absent");
  });
  test("resolves an empty object to an empty object", () => {
    expect(removeUndefinedValuesFromObject({})).toEqual({});
  });
});
describe("paginateResults: single page (fetchAll off)", () => {
  test("returns the response body untouched, envelope included", async () => {
    const body = {
      items: [{ entity_id: 1 }],
      total_count: 1,
      search_criteria: {},
    };
    nock(STORE_HOST).get(PATH).query(true).reply(200, body);
    const { data } = await paginateResults({
      client: await storeClient(),
      endpoint: ENDPOINT,
      queryParams: { "searchCriteria[pageSize]": "20" },
      fetchAll: false,
    });
    expect(data).toEqual(body);
  });
  test("forwards the caller's searchCriteria parameters untouched", async () => {
    const scope = nock(STORE_HOST)
      .get(PATH)
      .query({
        "searchCriteria[pageSize]": "20",
        "searchCriteria[currentPage]": "3",
      })
      .reply(200, { items: [] });
    await paginateResults({
      client: await storeClient(),
      endpoint: ENDPOINT,
      queryParams: {
        "searchCriteria[pageSize]": "20",
        "searchCriteria[currentPage]": "3",
      },
      fetchAll: false,
    });
    expect(scope.isDone()).toBe(true);
  });
  test("sends no query string at all when the caller passed no parameters", async () => {
    const scope = nock(STORE_HOST).get(PATH).reply(200, { items: [] });
    await paginateResults({
      client: await storeClient(),
      endpoint: ENDPOINT,
      fetchAll: false,
    });
    expect(scope.isDone()).toBe(true);
  });
});
describe("paginateResults: every page (fetchAll on)", () => {
  test("accumulates items across pages and returns only the items", async () => {
    nock(STORE_HOST)
      .get(PATH)
      .query(onPage("1"))
      .reply(200, {
        items: [{ entity_id: 1 }, { entity_id: 2 }],
        total_count: 3,
      });
    nock(STORE_HOST)
      .get(PATH)
      .query(onPage("2"))
      .reply(200, { items: [{ entity_id: 3 }], total_count: 3 });
    const { data } = await paginateResults({
      client: await storeClient(),
      endpoint: ENDPOINT,
      queryParams: { "searchCriteria[pageSize]": "2" },
      fetchAll: true,
    });
    expect(data).toEqual([
      { entity_id: 1 },
      { entity_id: 2 },
      { entity_id: 3 },
    ]);
  });
  test("stops on the first short page", async () => {
    const first = nock(STORE_HOST)
      .get(PATH)
      .query(onPage("1"))
      .reply(200, { items: [{ entity_id: 1 }] });
    const second = nock(STORE_HOST)
      .get(PATH)
      .query(onPage("2"))
      .reply(200, { items: [] });
    await paginateResults({
      client: await storeClient(),
      endpoint: ENDPOINT,
      queryParams: { "searchCriteria[pageSize]": "2" },
      fetchAll: true,
    });
    expect(first.isDone()).toBe(true);
    expect(second.isDone()).toBe(false);
  });
  test("overrides the caller's page cursor while keeping the filters", async () => {
    const scope = nock(STORE_HOST)
      .get(PATH)
      .query({
        "searchCriteria[filterGroups][0][filters][0][field]": "status",
        "searchCriteria[pageSize]": "2",
        "searchCriteria[currentPage]": "1",
      })
      .reply(200, { items: [] });
    await paginateResults({
      client: await storeClient(),
      endpoint: ENDPOINT,
      queryParams: {
        "searchCriteria[filterGroups][0][filters][0][field]": "status",
        "searchCriteria[pageSize]": "2",
        "searchCriteria[currentPage]": "99",
      },
      fetchAll: true,
    });
    expect(scope.isDone()).toBe(true);
  });
  test("resolves a body with no items to an empty list", async () => {
    nock(STORE_HOST).get(PATH).query(true).reply(200, { total_count: 0 });
    const { data } = await paginateResults({
      client: await storeClient(),
      endpoint: ENDPOINT,
      fetchAll: true,
    });
    expect(data).toEqual([]);
  });
  test(`stops at MAX_PAGES (${MAX_PAGES}) when no page is ever short`, async () => {
    nock(STORE_HOST)
      .get(PATH)
      .query(true)
      .times(MAX_PAGES)
      .reply(200, { items: [{ entity_id: 1 }] });
    const { data } = await paginateResults({
      client: await storeClient(),
      endpoint: ENDPOINT,
      queryParams: { "searchCriteria[pageSize]": "1" },
      fetchAll: true,
    });
    expect((data as unknown[]).length).toBe(MAX_PAGES);
  });
});
