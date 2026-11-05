import { createConnection, invokeDataSource } from "@prismatic-io/spectral/testing";
import nock from "nock";
import { aemOAuthServerToServer } from "../connections";
import { MAX_DATA_SOURCE_ITEMS, MAX_PAGE_LIMIT } from "../constants";
import { searchAssetsExamplePayload, selectAssetExamplePayload } from "../examplePayloads";
import { selectAsset } from "./selectAsset";

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
const [hit] = searchAssetsExamplePayload.data.hits.results;
const emptyMatchBody = { query: [{ match: { text: "" } }], limit: MAX_PAGE_LIMIT };

describe("selectAsset", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());

  test("searches every asset and returns each as a key/label element", async () => {
    nock(BASE)
      .post("/adobe/assets/search", emptyMatchBody)
      .reply(200, { hits: { results: [hit] } });
    const result = await invokeDataSource(selectAsset, { connection });
    expect(result).toEqual(selectAssetExamplePayload);
  });

  test("falls back to the asset name, then the asset ID, and sorts by label", async () => {
    nock(BASE)
      .post("/adobe/assets/search", emptyMatchBody)
      .reply(200, {
        hits: {
          results: [
            { assetId: "urn:aaid:aem:no-metadata" },
            { assetId: "urn:aaid:aem:name-only", repositoryMetadata: { "repo:name": "a.png" } },
          ],
        },
      });
    const result = await invokeDataSource(selectAsset, { connection });
    expect(result).toEqual({
      result: [
        { key: "urn:aaid:aem:name-only", label: "a.png" },
        { key: "urn:aaid:aem:no-metadata", label: "urn:aaid:aem:no-metadata" },
      ],
    });
  });

  test("stops following the cursor once the item cap is reached", async () => {
    const pagesToCap = MAX_DATA_SOURCE_ITEMS / MAX_PAGE_LIMIT;
    let page = 0;
    const scope = nock(BASE)
      .post("/adobe/assets/search")
      .times(pagesToCap)
      .reply(200, () => {
        page++;
        return {
          hits: {
            results: Array.from({ length: MAX_PAGE_LIMIT }, (_, i) => ({
              ...hit,
              assetId: `urn:aaid:aem:asset-${page}-${i}`,
            })),
          },
          cursor: `cursor-${page}`,
        };
      });
    const { result } = await invokeDataSource(selectAsset, { connection });
    expect(result).toHaveLength(MAX_DATA_SOURCE_ITEMS);
    expect(scope.isDone()).toBe(true);
    expect(page).toBe(pagesToCap);
  });
});
