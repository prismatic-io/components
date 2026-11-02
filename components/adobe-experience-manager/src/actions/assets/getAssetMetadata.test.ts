import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { aemOAuthServerToServer } from "../../connections";
import { getAssetMetadataExamplePayload } from "../../examplePayloads";
import { getAssetMetadata } from "./getAssetMetadata";

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
const assetId = getAssetMetadataExamplePayload.data.assetId;

describe("getAssetMetadata", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());

  test("returns the asset's metadata", async () => {
    nock(BASE)
      .get(`/adobe/assets/${encodeURIComponent(assetId)}/metadata`)
      .reply(200, getAssetMetadataExamplePayload.data);
    const { result } = await invoke(getAssetMetadata, { connection, assetId });
    expect(result).toEqual(getAssetMetadataExamplePayload);
  });

  test("surfaces a 404 for an unknown asset", async () => {
    nock(BASE)
      .get("/adobe/assets/missing/metadata")
      .reply(404, { title: "Not Found" });
    await expect(
      invoke(getAssetMetadata, { connection, assetId: "missing" }),
    ).rejects.toThrow("Request failed with status code 404");
  });
});
