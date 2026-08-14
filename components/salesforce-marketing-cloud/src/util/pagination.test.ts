import { createConnection } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { createClient } from "../client";
import { sfmcOAuth2ClientCredentials } from "../connections/sfmcOAuth2ClientCredentials";
import type { PaginatedResponse } from "../types";
import { paginateResults } from "./pagination";
const BASE_URL = "https://mc-test.rest.marketingcloudapis.com";
const ENDPOINT = "/automation/v1/automations";
const connection = createConnection(
  sfmcOAuth2ClientCredentials,
  {},
  { access_token: "test-access-token", rest_instance_url: BASE_URL },
);
const buildClient = () => createClient(connection, false);
describe("paginateResults", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  test("single-page passthrough returns the first page verbatim when fetchAll is false", async () => {
    const body: PaginatedResponse = {
      count: 53,
      page: 2,
      pageSize: 10,
      links: { next: { href: "/automation/v1/automations?$page=3" } },
      items: [{ id: "a1" }, { id: "a2" }],
    };
    const scope = nock(BASE_URL)
      .get(ENDPOINT)
      .query({ $page: "2", $pageSize: "10" })
      .reply(200, body);
    const result = await paginateResults(buildClient(), ENDPOINT, false, {
      $page: 2,
      $pageSize: 10,
    });
    expect(result).toEqual(body);
    expect(scope.isDone()).toBe(true);
  });
  test("totalPages === 1 short-circuits and returns the first page verbatim", async () => {
    const body: PaginatedResponse = {
      count: 25,
      pageSize: 50,
      page: 1,
      links: { self: { href: "/automation/v1/automations?$page=1" } },
      items: [{ id: "a1" }],
    };
    const scope = nock(BASE_URL)
      .get(ENDPOINT)
      .query({ $page: "1", $pageSize: "500" })
      .reply(200, body);
    const result = await paginateResults(buildClient(), ENDPOINT, true, {});
    expect(result).toEqual(body);
    expect(result.links).toBeDefined();
    expect(result.pageSize).toBe(50);
    expect(scope.isDone()).toBe(true);
  });
  test("accumulates items across the batch-of-10 concurrency loop", async () => {
    const firstPage: PaginatedResponse = {
      count: 26,
      page: 1,
      pageSize: 2,
      links: { self: { href: "/automation/v1/automations?$page=1" } },
      items: [{ id: "item-1" }, { id: "item-2" }],
    };
    nock(BASE_URL)
      .get(ENDPOINT)
      .query({ $page: "1", $pageSize: "500" })
      .reply(200, firstPage);
    for (let page = 2; page <= 13; page++) {
      nock(BASE_URL)
        .get(ENDPOINT)
        .query({ $page: String(page), $pageSize: "500" })
        .reply(200, {
          count: 26,
          page,
          pageSize: 2,
          items: [{ id: `item-${page * 2 - 1}` }, { id: `item-${page * 2}` }],
        });
    }
    const result = await paginateResults(buildClient(), ENDPOINT, true, {});
    expect(result.items).toHaveLength(26);
    expect(result.items?.[0]).toEqual({ id: "item-1" });
    expect(result.items?.[25]).toEqual({ id: "item-26" });
    expect(nock.isDone()).toBe(true);
    expect(result.links).toBeUndefined();
    expect(result.page).toBe(1);
    expect(result.pageSize).toBe(26);
    expect(result.count).toBe(26);
  });
  test("honors a custom itemsField of definitions", async () => {
    const firstPage: PaginatedResponse = {
      count: 4,
      page: 1,
      pageSize: 2,
      requestId: "req-abc",
      definitions: [{ definitionKey: "d1" }, { definitionKey: "d2" }],
    };
    nock(BASE_URL)
      .get(ENDPOINT)
      .query({ $page: "1", $pageSize: "500" })
      .reply(200, firstPage);
    nock(BASE_URL)
      .get(ENDPOINT)
      .query({ $page: "2", $pageSize: "500" })
      .reply(200, {
        count: 4,
        page: 2,
        pageSize: 2,
        requestId: "req-abc",
        definitions: [{ definitionKey: "d3" }, { definitionKey: "d4" }],
      });
    const result = await paginateResults(
      buildClient(),
      ENDPOINT,
      true,
      {},
      { itemsField: "definitions" },
    );
    expect(result.definitions).toHaveLength(4);
    expect(result.definitions?.map((d) => d.definitionKey)).toEqual([
      "d1",
      "d2",
      "d3",
      "d4",
    ]);
    expect(result.items).toBeUndefined();
    expect(result.requestId).toBeUndefined();
    expect(nock.isDone()).toBe(true);
  });
  test("carries requestId through when named in preserveFields", async () => {
    nock(BASE_URL)
      .get(ENDPOINT)
      .query({ $page: "1", $pageSize: "500" })
      .reply(200, {
        count: 4,
        page: 1,
        pageSize: 2,
        requestId: "req-preserved",
        definitions: [{ definitionKey: "d1" }, { definitionKey: "d2" }],
      });
    nock(BASE_URL)
      .get(ENDPOINT)
      .query({ $page: "2", $pageSize: "500" })
      .reply(200, {
        count: 4,
        page: 2,
        pageSize: 2,
        requestId: "req-second-page-ignored",
        definitions: [{ definitionKey: "d3" }, { definitionKey: "d4" }],
      });
    const result = await paginateResults(
      buildClient(),
      ENDPOINT,
      true,
      {},
      { itemsField: "definitions", preserveFields: ["requestId"] },
    );
    expect(result.requestId).toBe("req-preserved");
    expect(result.definitions).toHaveLength(4);
    expect(nock.isDone()).toBe(true);
  });
  test("count of 0 falls past the single-page shortcut into envelope reconstruction", async () => {
    nock(BASE_URL)
      .get(ENDPOINT)
      .query({ $page: "1", $pageSize: "500" })
      .reply(200, { count: 0, page: 1, pageSize: 500, items: [] });
    const result = await paginateResults(buildClient(), ENDPOINT, true, {});
    expect(result).toEqual({ count: 0, page: 1, pageSize: 0, items: [] });
    expect(nock.isDone()).toBe(true);
  });
  test("an envelope missing count and pageSize yields NaN totalPages and silently skips the loop", async () => {
    nock(BASE_URL)
      .get(ENDPOINT)
      .query({ $page: "1", $pageSize: "500" })
      .reply(200, { items: [{ id: "only-one" }] });
    const result = await paginateResults(buildClient(), ENDPOINT, true, {});
    expect(result).toEqual({
      count: undefined,
      page: 1,
      pageSize: undefined,
      items: [{ id: "only-one" }],
    });
    expect(nock.isDone()).toBe(true);
  });
  test("the fetchAll literals override a caller-supplied $pageSize", async () => {
    const scope = nock(BASE_URL)
      .get(ENDPOINT)
      .query({ $page: "1", $pageSize: "500" })
      .reply(200, { count: 1, page: 1, pageSize: 1, items: [{ id: "a1" }] });
    await paginateResults(buildClient(), ENDPOINT, true, { $pageSize: 200 });
    expect(scope.isDone()).toBe(true);
  });
});
