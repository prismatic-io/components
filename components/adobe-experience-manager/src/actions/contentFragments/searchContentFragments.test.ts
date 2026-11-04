import { createConnection, invoke } from "@prismatic-io/spectral/testing";
import nock from "nock";
import { aemOAuthServerToServer } from "../../connections";
import { searchContentFragmentsExamplePayload } from "../../examplePayloads";
import { searchContentFragments } from "./searchContentFragments";

const AEM_HOST = "author-p12345-e123456.adobeaemcloud.com";
const BASE = `https://${AEM_HOST}`;
const connection = createConnection(
  aemOAuthServerToServer,
  {
    aemHost: AEM_HOST,
    clientId: "test-client-id",
    clientSecret: "test-client-secret",
    scopes: "openid, AdobeID",
    tokenUrl: "https://ims-na1.adobelogin.com/ims/token/v3",
  },
  { access_token: "test-access-token" },
);

const params = {
  connection,
  fetchAll: false,
  pagination: { cursor: undefined, limit: 25 },
  path: "/wknd/en",
  onlyDirectChildren: true,
  statuses: ["PUBLISHED", "MODIFIED"],
  modelIds: ["model-1"],
  tags: [] as string[],
  locales: ["en"],
  dateRangeFilters: {
    modifiedAfter: "2026-01-01T00:00:00.000Z",
    modifiedBefore: undefined,
    publishedAfter: undefined,
    publishedBefore: undefined,
  },
  filters: { fullText: "surf", sortOn: "modified", sortOrder: "DESC" },
  projection: undefined,
  includeMetadata: false,
};

describe("searchContentFragments", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());

  test("sends the filter and sort as a URL-encoded JSON query", async () => {
    let sentQuery: Record<string, string> = {};
    nock(BASE)
      .get("/adobe/sites/cf/fragments/search")
      .query((query) => {
        sentQuery = query as Record<string, string>;
        return true;
      })
      .reply(200, searchContentFragmentsExamplePayload.data);
    const { result } = await invoke(searchContentFragments, params);
    expect(result).toEqual(searchContentFragmentsExamplePayload);
    expect(sentQuery.limit).toBe("25");
    expect(JSON.parse(sentQuery.query)).toEqual({
      filter: {
        path: "/wknd/en",
        onlyDirectChildren: true,
        status: ["PUBLISHED", "MODIFIED"],
        modelIds: ["model-1"],
        locale: ["en"],
        modified: { after: "2026-01-01T00:00:00.000Z" },
        fullText: { text: "surf" },
      },
      sort: [{ on: "modified", order: "DESC" }],
    });
  });

  test("searches with the Filters and Date Range Filters groups left unset", async () => {
    let query: Record<string, unknown> = {};
    nock(BASE)
      .get("/adobe/sites/cf/fragments/search")
      .query((sent) => {
        query = JSON.parse(String(sent.query));
        return true;
      })
      .reply(200, searchContentFragmentsExamplePayload.data);
    const { result } = await invoke(searchContentFragments, {
      ...params,
      dateRangeFilters: undefined as unknown as typeof params.dateRangeFilters,
      filters: undefined as unknown as typeof params.filters,
    });
    expect(result).toEqual(searchContentFragmentsExamplePayload);
    expect(query).not.toHaveProperty("sort");
    expect(query.filter).not.toHaveProperty("fullText");
    expect(query.filter).not.toHaveProperty("modified");
  });

  test("encodes the query parameter on the wire", async () => {
    let rawPath = "";
    nock(BASE)
      .get((path) => {
        rawPath = path;
        return path.startsWith("/adobe/sites/cf/fragments/search?");
      })
      .reply(200, searchContentFragmentsExamplePayload.data);
    await invoke(searchContentFragments, params);
    const encoded = rawPath.split("?")[1];
    expect(encoded).toContain("query=%7B%22filter%22");
    expect(encoded).not.toContain("{");
  });

  test("surfaces an API error", async () => {
    nock(BASE)
      .get("/adobe/sites/cf/fragments/search")
      .query(true)
      .reply(400, { title: "Invalid query" });
    await expect(invoke(searchContentFragments, params)).rejects.toThrow(
      "Request failed with status code 400",
    );
  });
});
