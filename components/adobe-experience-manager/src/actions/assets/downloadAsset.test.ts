import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { aemOAuthServerToServer } from "../../connections";
import { downloadAssetExamplePayload } from "../../examplePayloads";
import { downloadAsset } from "./downloadAsset";

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
const assetId = "urn:aaid:aem:asset-1";

describe("downloadAsset", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());

  test("returns the original binary as a Buffer with its content type", async () => {
    nock(BASE)
      .get(`/adobe/assets/${encodeURIComponent(assetId)}/original/as/city.jpeg`)
      .reply(200, downloadAssetExamplePayload.data, {
        "Content-Type": downloadAssetExamplePayload.contentType,
      });
    const { result } = await invoke(downloadAsset, {
      connection,
      assetId,
      seoName: "city.jpeg",
    });
    expect(Buffer.isBuffer(result.data)).toBe(true);
    expect(result).toEqual(downloadAssetExamplePayload);
  });

  test("falls back to application/octet-stream without a content type", async () => {
    nock(BASE)
      .get(`/adobe/assets/${encodeURIComponent(assetId)}/original/as/file.bin`)
      .reply(200, () => Buffer.from([1, 2, 3]), {});
    const { result } = await invoke(downloadAsset, {
      connection,
      assetId,
      seoName: "file.bin",
    });
    expect(result.data).toEqual(Buffer.from([1, 2, 3]));
    expect(result.contentType).toBe("application/octet-stream");
  });

  test("surfaces a 404 for an unknown asset", async () => {
    nock(BASE)
      .get(`/adobe/assets/${encodeURIComponent(assetId)}/original/as/city.jpeg`)
      .reply(404);
    await expect(
      invoke(downloadAsset, { connection, assetId, seoName: "city.jpeg" }),
    ).rejects.toThrow("Request failed with status code 404");
  });
});
