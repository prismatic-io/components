import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { sfmcOAuth2ClientCredentials } from "../../connections/sfmcOAuth2ClientCredentials";
import { ASSET_QUERY_PATH } from "../../constants";
import { queryAssetsExamplePayload } from "../../examplePayloads";
import { queryAssets } from "./queryAssets";
const BASE_URL = "https://mc-test.rest.marketingcloudapis.com";
const connection = createConnection(
  sfmcOAuth2ClientCredentials,
  {},
  { access_token: "test-access-token", rest_instance_url: BASE_URL },
);
const assetQuery = {
  property: "name",
  simpleOperator: "like",
  value: "Welcome%",
};
const params = {
  connection,
  assetQuery,
  assetFields: "id, name , assetType",
  pagination: { page: 1, pageSize: 25 },
};
describe("queryAssets", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  test("posts the page, query and trimmed field list, and returns the matches", async () => {
    const scope = nock(BASE_URL)
      .post(ASSET_QUERY_PATH, {
        page: { page: 1, pageSize: 25 },
        query: assetQuery,
        fields: ["id", "name", "assetType"],
      })
      .reply(200, queryAssetsExamplePayload.data);
    const { result } = await invoke(queryAssets, params);
    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(queryAssetsExamplePayload.data);
  });
  test("surfaces an API error when the query is rejected", async () => {
    nock(BASE_URL)
      .post(ASSET_QUERY_PATH)
      .reply(400, { message: "Invalid query property" });
    await expect(invoke(queryAssets, params)).rejects.toThrow();
  });
});
