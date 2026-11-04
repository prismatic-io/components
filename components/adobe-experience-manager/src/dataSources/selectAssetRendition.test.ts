import {
  createConnection,
  invokeDataSource,
} from "@prismatic-io/spectral/testing";
import nock from "nock";
import { aemOAuthServerToServer } from "../connections";
import {
  listAssetRenditionsExamplePayload,
  selectAssetRenditionExamplePayload,
} from "../examplePayloads";
import { selectAssetRendition } from "./selectAssetRendition";

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
const { assetId } = listAssetRenditionsExamplePayload.data;

describe("selectAssetRendition", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());

  test("returns each rendition of the asset, sorted by name", async () => {
    nock(BASE)
      .get(`/adobe/assets/${encodeURIComponent(assetId)}/renditions`)
      .reply(200, listAssetRenditionsExamplePayload.data);
    const result = await invokeDataSource(selectAssetRendition, {
      connection,
      assetId,
    });
    expect(result).toEqual(selectAssetRenditionExamplePayload);
  });

  test("returns an empty list when the asset has no renditions", async () => {
    nock(BASE)
      .get(`/adobe/assets/${encodeURIComponent(assetId)}/renditions`)
      .reply(200, { assetId, items: [] });
    const result = await invokeDataSource(selectAssetRendition, {
      connection,
      assetId,
    });
    expect(result).toEqual({ result: [] });
  });
});
