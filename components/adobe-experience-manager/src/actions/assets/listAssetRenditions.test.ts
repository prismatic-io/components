import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { aemOAuthServerToServer } from "../../connections";
import { listAssetRenditionsExamplePayload } from "../../examplePayloads";
import { listAssetRenditions } from "./listAssetRenditions";

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
const assetId = listAssetRenditionsExamplePayload.data.assetId;

describe("listAssetRenditions", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());

  test("returns the asset's renditions", async () => {
    nock(BASE)
      .get(`/adobe/assets/${encodeURIComponent(assetId)}/renditions`)
      .reply(200, listAssetRenditionsExamplePayload.data);
    const { result } = await invoke(listAssetRenditions, {
      connection,
      assetId,
    });
    expect(result).toEqual(listAssetRenditionsExamplePayload);
  });

  test("surfaces a 404 for an unknown asset", async () => {
    nock(BASE)
      .get("/adobe/assets/missing/renditions")
      .reply(404, { title: "Not Found" });
    await expect(
      invoke(listAssetRenditions, { connection, assetId: "missing" }),
    ).rejects.toThrow("Request failed with status code 404");
  });
});
