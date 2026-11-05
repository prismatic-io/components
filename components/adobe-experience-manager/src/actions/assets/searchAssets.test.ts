import { createConnection, invoke } from "@prismatic-io/spectral/testing";
import nock from "nock";
import { aemOAuthServerToServer } from "../../connections";
import { MAX_FETCH_ALL_PAGES } from "../../constants";
import { searchAssetsExamplePayload } from "../../examplePayloads";
import { searchAssets } from "./searchAssets";

const exampleAssetSearchHit = searchAssetsExamplePayload.data.hits.results[0];

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
  pagination: { cursor: undefined, limit: 10 },
  folderIds: [] as string[],
  mimeTypes: [] as string[],
  modifiedAfter: undefined,
  modifiedBefore: undefined,
  filters: { searchText: undefined, sortField: undefined, sortOrder: "ASC" },
};

describe("searchAssets", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());

  test("always sends a match clause, even with no search text", async () => {
    let body: Record<string, unknown> = {};
    nock(BASE)
      .post("/adobe/assets/search", (sent) => {
        body = sent;
        return true;
      })
      .reply(200, searchAssetsExamplePayload.data);
    const { result } = await invoke(searchAssets, params);
    expect(result).toEqual(searchAssetsExamplePayload);
    expect(body).toEqual({ query: [{ match: { text: "" } }], limit: 10 });
  });

  test("searches with the Filters group left unset", async () => {
    let body: Record<string, unknown> = {};
    nock(BASE)
      .post("/adobe/assets/search", (sent) => {
        body = sent;
        return true;
      })
      .reply(200, searchAssetsExamplePayload.data);
    const { result } = await invoke(searchAssets, {
      ...params,
      filters: undefined as unknown as typeof params.filters,
    });
    expect(result).toEqual(searchAssetsExamplePayload);
    expect(body).toEqual({ query: [{ match: { text: "" } }], limit: 10 });
  });

  test("adds term, range and sort clauses from the filters", async () => {
    let body: Record<string, unknown> = {};
    nock(BASE)
      .post("/adobe/assets/search", (sent) => {
        body = sent;
        return true;
      })
      .reply(200, searchAssetsExamplePayload.data);
    await invoke(searchAssets, {
      ...params,
      folderIds: ["urn:aaid:aem:folder-1"],
      mimeTypes: ["image/jpeg"],
      modifiedAfter: "2026-01-01T00:00:00.000Z",
      modifiedBefore: "2026-02-01T00:00:00.000Z",
      filters: {
        searchText: "city",
        sortField: "repositoryMetadata.repo:modifyDate",
        sortOrder: "DESC",
      },
    });
    expect(body).toEqual({
      query: [
        { match: { text: "city" } },
        { term: { "repositoryMetadata.repo:ancestors": ["urn:aaid:aem:folder-1"] } },
        { term: { "repositoryMetadata.dc:format": ["image/jpeg"] } },
        {
          range: {
            "repositoryMetadata.repo:modifyDate": {
              gte: "2026-01-01T00:00:00.000Z",
              lt: "2026-02-01T00:00:00.000Z",
            },
          },
        },
      ],
      sort: [{ field: "repositoryMetadata.repo:modifyDate", order: "DESC" }],
      limit: 10,
    });
  });

  test("with Fetch All, drains the cursor", async () => {
    const second = { ...exampleAssetSearchHit, assetId: "urn:aaid:aem:second" };
    const cursors: unknown[] = [];
    nock(BASE)
      .post("/adobe/assets/search", (sent) => {
        cursors.push(sent.cursor);
        return sent.limit === 50 && sent.cursor === undefined;
      })
      .reply(200, searchAssetsExamplePayload.data)
      .post("/adobe/assets/search", (sent) => {
        cursors.push(sent.cursor);
        return sent.cursor === searchAssetsExamplePayload.data.cursor;
      })
      .reply(200, { hits: { results: [second] } });
    const { result } = await invoke(searchAssets, { ...params, fetchAll: true });
    expect(result).toEqual({ data: { hits: { results: [exampleAssetSearchHit, second] } } });
    expect(nock.isDone()).toBe(true);
  });

  test("with Fetch All, stops at the page cap and returns the cursor to continue from", async () => {
    nock(BASE)
      .post("/adobe/assets/search")
      .times(MAX_FETCH_ALL_PAGES)
      .reply(200, { hits: { results: [exampleAssetSearchHit] }, cursor: "next-page" });
    const { result } = await invoke(searchAssets, { ...params, fetchAll: true });
    expect(result.data.hits?.results).toHaveLength(MAX_FETCH_ALL_PAGES);
    expect(result.data.cursor).toBe("next-page");
    expect(nock.isDone()).toBe(true);
  }, 15_000);

  test("surfaces an API error", async () => {
    nock(BASE).post("/adobe/assets/search").reply(400, { title: "Invalid query" });
    await expect(invoke(searchAssets, params)).rejects.toThrow(
      "Request failed with status code 400",
    );
  });
});
