import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { sfmcOAuth2ClientCredentials } from "../../connections/sfmcOAuth2ClientCredentials";
import { ASSETS_PATH } from "../../constants";
import { getAssetExamplePayload } from "../../examplePayloads";
import { getAsset } from "./getAsset";
const BASE_URL = "https://mc-test.rest.marketingcloudapis.com";
const connection = createConnection(
  sfmcOAuth2ClientCredentials,
  {},
  { access_token: "test-access-token", rest_instance_url: BASE_URL },
);
describe("getAsset", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  test("returns the asset for the requested ID", async () => {
    const scope = nock(BASE_URL)
      .get(`${ASSETS_PATH}/151239`)
      .reply(200, getAssetExamplePayload.data);
    const { result } = await invoke(getAsset, {
      connection,
      assetId: "151239",
    });
    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(getAssetExamplePayload.data);
  });
  test("surfaces an API error when the asset is not found", async () => {
    nock(BASE_URL)
      .get(`${ASSETS_PATH}/151239`)
      .reply(404, { message: "Not Found" });
    await expect(
      invoke(getAsset, { connection, assetId: "151239" }),
    ).rejects.toThrow();
  });
});
