import { createConnection, invoke } from "@prismatic-io/spectral/testing";
import nock from "nock";
import { aemOAuthServerToServer } from "../../connections";
import { downloadAssetRenditionExamplePayload } from "../../examplePayloads";
import { downloadAssetRendition } from "./downloadAssetRendition";

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
const renditionName = "cq5dam.web.1280.1280.jpeg";
const path = `/adobe/assets/${encodeURIComponent(assetId)}/renditions/${renditionName}/as/city.jpeg`;

describe("downloadAssetRendition", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());

  test("returns the rendition binary as a Buffer with its content type", async () => {
    nock(BASE).get(path).reply(200, downloadAssetRenditionExamplePayload.data, {
      "Content-Type": downloadAssetRenditionExamplePayload.contentType,
    });
    const { result } = await invoke(downloadAssetRendition, {
      connection,
      assetId,
      renditionName,
      seoName: "city.jpeg",
    });
    expect(Buffer.isBuffer(result.data)).toBe(true);
    expect(result).toEqual(downloadAssetRenditionExamplePayload);
  });

  test("surfaces a 404 for an unknown rendition", async () => {
    nock(BASE).get(path).reply(404);
    await expect(
      invoke(downloadAssetRendition, { connection, assetId, renditionName, seoName: "city.jpeg" }),
    ).rejects.toThrow("Request failed with status code 404");
  });
});
