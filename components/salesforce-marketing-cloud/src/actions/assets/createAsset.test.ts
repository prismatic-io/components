import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { sfmcOAuth2ClientCredentials } from "../../connections/sfmcOAuth2ClientCredentials";
import { ASSETS_PATH } from "../../constants";
import { createAssetExamplePayload } from "../../examplePayloads";
import { createAsset } from "./createAsset";
const BASE_URL = "https://mc-test.rest.marketingcloudapis.com";
const connection = createConnection(
  sfmcOAuth2ClientCredentials,
  {},
  { access_token: "test-access-token", rest_instance_url: BASE_URL },
);
const params = {
  connection,
  assetName: "Welcome Email Template",
  assetTypeId: 209,
  assetDescription: "HTML email template for new subscriber welcome series",
  categoryId: 54975,
  assetContent: "<html><body>Hello</body></html>",
  assetExtraBody: {},
};
describe("createAsset", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  test("posts the mapped asset body and returns the created asset", async () => {
    const scope = nock(BASE_URL)
      .post(ASSETS_PATH, {
        name: "Welcome Email Template",
        assetType: { id: 209 },
        description: "HTML email template for new subscriber welcome series",
        category: { id: 54975 },
        content: "<html><body>Hello</body></html>",
      })
      .reply(201, createAssetExamplePayload.data);
    const { result } = await invoke(createAsset, params);
    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(createAssetExamplePayload.data);
  });
  test("surfaces an API error when the asset is rejected", async () => {
    nock(BASE_URL)
      .post(ASSETS_PATH)
      .reply(400, { message: "Invalid asset type" });
    await expect(invoke(createAsset, params)).rejects.toThrow();
  });
});
