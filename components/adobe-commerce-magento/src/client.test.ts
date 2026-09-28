import { ConnectionError } from "@prismatic-io/spectral";
import nock from "nock";
import {
  getClient,
  getConfig,
  normalizeStoreUrl,
  resolveRequestUrl,
  toRawRequestParams,
  toSignatureParams,
} from "./client";
import type { ObservedRequest } from "./testHelpers";
import {
  isOauth1Header,
  MARKETPLACE_HOST,
  MARKETPLACE_SESSION_TOKEN,
  marketplaceConnection,
  STORE_CREDENTIALS,
  STORE_HOST,
  storeConnection,
  verifyOauth1Signature,
} from "./testHelpers";
beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => nock.cleanAll());
describe("normalizeStoreUrl", () => {
  const connection = storeConnection();
  test.each([
    ["an origin", "https://store.example.com"],
    ["a trailing slash", "https://store.example.com/"],
    ["several trailing slashes", "https://store.example.com///"],
    ["a trailing /rest segment", "https://store.example.com/rest"],
    ["no scheme", "store.example.com"],
    ["surrounding whitespace", "  https://store.example.com  "],
  ])("reduces %s to the origin", (_label, input) => {
    expect(normalizeStoreUrl(connection, input)).toBe(
      "https://store.example.com",
    );
  });
  test("preserves a non-default port", () => {
    expect(
      normalizeStoreUrl(connection, "https://store.example.com:8443"),
    ).toBe("https://store.example.com:8443");
  });
  test.each([
    ["http", "http://store.example.com"],
    ["ftp", "ftp://store.example.com"],
  ])("upgrades an explicit %s scheme to https", (_label, input) => {
    expect(normalizeStoreUrl(connection, input)).toBe(
      "https://store.example.com",
    );
  });
  test.each([
    ["an empty value", ""],
    ["a value that is not a URL", "not a url"],
  ])("throws a ConnectionError on %s", (_label, input) => {
    expect(() => normalizeStoreUrl(connection, input)).toThrow(ConnectionError);
  });
});
describe("resolveRequestUrl", () => {
  test.each([
    [
      "a leading slash on the path",
      "https://store.example.com/rest/default/V1",
      "/orders",
    ],
    [
      "no leading slash on the path",
      "https://store.example.com/rest/default/V1",
      "orders",
    ],
    [
      "a trailing slash on the base",
      "https://store.example.com/rest/default/V1/",
      "/orders",
    ],
  ])("joins %s into one URL", (_label, baseUrl, url) => {
    expect(resolveRequestUrl(baseUrl, url)).toBe(
      "https://store.example.com/rest/default/V1/orders",
    );
  });
  test("passes an absolute URL through untouched", () => {
    expect(
      resolveRequestUrl(
        "https://store.example.com",
        "https://other.example.com/x",
      ),
    ).toBe("https://other.example.com/x");
  });
  test("tolerates an absent path", () => {
    expect(resolveRequestUrl("https://store.example.com/rest", undefined)).toBe(
      "https://store.example.com/rest/",
    );
  });
});
describe("toSignatureParams", () => {
  test("returns an empty list when there are no params", () => {
    expect(toSignatureParams(undefined)).toEqual([]);
  });
  test("stringifies scalar values", () => {
    expect(
      toSignatureParams({ "searchCriteria[pageSize]": 10, fetchAll: false }),
    ).toEqual([
      ["searchCriteria[pageSize]", "10"],
      ["fetchAll", "false"],
    ]);
  });
  test.each([
    ["undefined", undefined],
    ["null", null],
  ])("omits a %s value", (_label, value) => {
    expect(toSignatureParams({ a: "1", b: value })).toEqual([["a", "1"]]);
  });
  test("expands an array the way Axios serializes it", () => {
    expect(toSignatureParams({ ids: [1, 2] })).toEqual([
      ["ids[]", "1"],
      ["ids[]", "2"],
    ]);
  });
});
describe("toRawRequestParams", () => {
  test("converts key/value entries into pairs", () => {
    expect(toRawRequestParams([{ key: "limit", value: "10" }])).toEqual([
      ["limit", "10"],
    ]);
  });
  test("treats a missing value as empty", () => {
    expect(toRawRequestParams([{ key: "flag" }])).toEqual([["flag", ""]]);
  });
  test.each([
    ["a non-array", { key: "limit" }],
    ["an entry without a key", [{ value: "10" }]],
    ["nothing", undefined],
  ])("ignores %s", (_label, input) => {
    expect(toRawRequestParams(input)).toEqual([]);
  });
});
describe("getClient with the store connection", () => {
  test("signs the request with OAuth 1.0a instead of presenting a bearer token", async () => {
    const scope = nock(STORE_HOST, {
      reqheaders: { authorization: isOauth1Header },
    })
      .get("/rest/default/V1/orders")
      .reply(200, { items: [] });
    const client = await getClient(storeConnection(), false);
    await client.get("/orders");
    expect(scope.isDone()).toBe(true);
  });
  test("never sends the consumer secret or the access token secret", async () => {
    let authorization = "";
    const scope = nock(STORE_HOST)
      .get("/rest/default/V1/orders")
      .reply(200, function () {
        authorization = this.req.getHeader("authorization") as string;
        return { items: [] };
      });
    const client = await getClient(storeConnection(), false);
    await client.get("/orders");
    expect(scope.isDone()).toBe(true);
    expect(authorization).not.toContain(STORE_CREDENTIALS.consumerSecret);
    expect(authorization).not.toContain(STORE_CREDENTIALS.accessTokenSecret);
  });
  test("signs each request separately rather than reusing one header", async () => {
    const headers: string[] = [];
    const scope = nock(STORE_HOST)
      .get("/rest/default/V1/orders")
      .twice()
      .reply(200, function () {
        headers.push(this.req.getHeader("authorization") as string);
        return { items: [] };
      });
    const client = await getClient(storeConnection(), false);
    await client.get("/orders");
    await client.get("/orders");
    expect(scope.isDone()).toBe(true);
    expect(headers[0]).not.toBe(headers[1]);
  });
  test("covers the query parameters in the signature", async () => {
    const headers: string[] = [];
    const capture = function (this: {
      req: {
        getHeader: (name: string) => unknown;
      };
    }) {
      headers.push(this.req.getHeader("authorization") as string);
      return { items: [] };
    };
    const scope = nock(STORE_HOST)
      .get("/rest/default/V1/orders")
      .query({ "searchCriteria[pageSize]": "10" })
      .reply(200, capture)
      .get("/rest/default/V1/orders")
      .query({ "searchCriteria[pageSize]": "20" })
      .reply(200, capture);
    const client = await getClient(storeConnection(), false);
    await client.get("/orders", {
      params: { "searchCriteria[pageSize]": "10" },
    });
    await client.get("/orders", {
      params: { "searchCriteria[pageSize]": "20" },
    });
    expect(scope.isDone()).toBe(true);
    const signature = (header: string) =>
      /oauth_signature="([^"]+)"/.exec(header)?.[1];
    expect(signature(headers[0])).not.toBe(signature(headers[1]));
  });
  test("uses a non-default store code in the path", async () => {
    const scope = nock(STORE_HOST)
      .get("/rest/es_mx/V1/orders")
      .reply(200, { items: [] });
    const client = await getClient(
      storeConnection({ storeCode: "es_mx" }),
      false,
    );
    await client.get("/orders");
    expect(scope.isDone()).toBe(true);
  });
  test.each([
    ["an empty store code", ""],
    ["a whitespace-only store code", "   "],
    ["an absent store code", undefined],
  ])("falls back to the default store code on %s", async (_label, storeCode) => {
    const scope = nock(STORE_HOST)
      .get("/rest/default/V1/orders")
      .reply(200, { items: [] });
    const client = await getClient(storeConnection({ storeCode }), false);
    await client.get("/orders");
    expect(scope.isDone()).toBe(true);
  });
  test("normalizes a store URL entered with a trailing slash", async () => {
    const scope = nock(STORE_HOST)
      .get("/rest/default/V1/orders")
      .reply(200, { items: [] });
    const client = await getClient(
      storeConnection({ storeUrl: `${STORE_HOST}/` }),
      false,
    );
    await client.get("/orders");
    expect(scope.isDone()).toBe(true);
  });
  test.each([
    ["Consumer Key", "consumerKey"],
    ["Consumer Secret", "consumerSecret"],
    ["Access Token", "accessToken"],
    ["Access Token Secret", "accessTokenSecret"],
  ])("reports a missing %s by name", async (label, field) => {
    await expect(
      getClient(storeConnection({ [field]: "" }), false),
    ).rejects.toThrow(label);
  });
  test("names every missing credential at once", async () => {
    const connection = storeConnection({
      consumerSecret: "",
      accessTokenSecret: "",
    });
    await expect(getConfig(connection, false)).rejects.toThrow(
      "Consumer Secret, Access Token Secret are required",
    );
  });
});
describe("the signature a store request carries", () => {
  const capture = (into: ObservedRequest[]) =>
    function (this: {
      req: {
        method: string;
        path: string;
        getHeader: (name: string) => unknown;
      };
    }) {
      into.push({
        method: this.req.method,
        url: `${STORE_HOST}${this.req.path}`,
        authorization: this.req.getHeader("authorization") as string,
      });
      return { items: [] };
    };
  test("verifies against an independent recomputation", async () => {
    const observed: ObservedRequest[] = [];
    const scope = nock(STORE_HOST)
      .get("/rest/default/V1/orders")
      .reply(200, capture(observed));
    const client = await getClient(storeConnection(), false);
    await client.get("/orders");
    expect(scope.isDone()).toBe(true);
    expect(verifyOauth1Signature(observed[0])).toBe(true);
  });
  test("verifies when the request carries bracketed search parameters", async () => {
    const observed: ObservedRequest[] = [];
    const scope = nock(STORE_HOST)
      .get("/rest/default/V1/orders")
      .query(true)
      .reply(200, capture(observed));
    const client = await getClient(storeConnection(), false);
    await client.get("/orders", {
      params: {
        "searchCriteria[pageSize]": 10,
        "searchCriteria[currentPage]": 2,
      },
    });
    expect(scope.isDone()).toBe(true);
    expect(verifyOauth1Signature(observed[0])).toBe(true);
  });
  test("verifies under a non-default store code", async () => {
    const observed: ObservedRequest[] = [];
    const scope = nock(STORE_HOST)
      .get("/rest/es_mx/V1/orders")
      .reply(200, capture(observed));
    const client = await getClient(
      storeConnection({ storeCode: "es_mx" }),
      false,
    );
    await client.get("/orders");
    expect(scope.isDone()).toBe(true);
    expect(verifyOauth1Signature(observed[0])).toBe(true);
  });
  test("rejects a signature altered by a single character", async () => {
    const observed: ObservedRequest[] = [];
    nock(STORE_HOST)
      .get("/rest/default/V1/orders")
      .reply(200, capture(observed));
    const client = await getClient(storeConnection(), false);
    await client.get("/orders");
    const tampered = observed[0].authorization.replace(
      /oauth_signature="(.)/,
      (_match, first: string) =>
        `oauth_signature="${first === "A" ? "B" : "A"}`,
    );
    expect(tampered).not.toBe(observed[0].authorization);
    expect(
      verifyOauth1Signature({ ...observed[0], authorization: tampered }),
    ).toBe(false);
  });
  test("rejects a request whose query parameter was altered in transit", async () => {
    const observed: ObservedRequest[] = [];
    nock(STORE_HOST)
      .get("/rest/default/V1/orders")
      .query(true)
      .reply(200, capture(observed));
    const client = await getClient(storeConnection(), false);
    await client.get("/orders", { params: { "searchCriteria[pageSize]": 10 } });
    const altered = observed[0].url.replace(
      "pageSize%5D=10",
      "pageSize%5D=1000",
    );
    expect(altered).not.toBe(observed[0].url);
    expect(verifyOauth1Signature({ ...observed[0], url: altered })).toBe(false);
  });
});
describe("getClient with the deprecated Marketplace connection", () => {
  test("still exchanges credentials for a session token and keeps the default store code", async () => {
    const tokenScope = nock(MARKETPLACE_HOST)
      .post("/rest/v1/app/session/token")
      .reply(200, { ust: MARKETPLACE_SESSION_TOKEN });
    const requestScope = nock(MARKETPLACE_HOST, {
      reqheaders: { authorization: `Bearer ${MARKETPLACE_SESSION_TOKEN}` },
    })
      .get("/rest/default/V1/orders")
      .reply(200, { items: [] });
    const client = await getClient(marketplaceConnection(), false);
    await client.get("/orders");
    expect(tokenScope.isDone()).toBe(true);
    expect(requestScope.isDone()).toBe(true);
  });
  test("reports a failed session token exchange", async () => {
    nock(MARKETPLACE_HOST)
      .post("/rest/v1/app/session/token")
      .reply(401, { message: "denied" });
    await expect(getClient(marketplaceConnection(), false)).rejects.toThrow(
      "Unable to obtain a session token.",
    );
  });
});
describe("getClient with an unrecognized connection", () => {
  test("throws a ConnectionError", async () => {
    const connection = { ...storeConnection(), key: "someOtherConnection" };
    await expect(getClient(connection, false)).rejects.toThrow(ConnectionError);
  });
});
