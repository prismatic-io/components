import {
  createConnection,
  invokeDataSource,
} from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { sfmcOAuth2ClientCredentials } from "../connections/sfmcOAuth2ClientCredentials";
import { listAssetsExamplePayload } from "../examplePayloads";
import { selectAsset } from "./selectAsset";
const BASE_URL = "https://mc-test.rest.marketingcloudapis.com";
const ASSETS_PATH = "/asset/v1/content/assets";
const connection = createConnection(
  sfmcOAuth2ClientCredentials,
  {},
  { access_token: "test-access-token", rest_instance_url: BASE_URL },
);
const FETCH_ALL_QUERY = { $page: "1", $pageSize: "500" };
describe("selectAsset", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  test("maps the listed assets to label and key elements", async () => {
    const body = {
      ...listAssetsExamplePayload.data,
      count: 1,
      pageSize: 500,
    };
    nock(BASE_URL).get(ASSETS_PATH).query(FETCH_ALL_QUERY).reply(200, body);
    const { result } = await invokeDataSource(selectAsset, { connection });
    expect(result).toEqual([{ label: "Test", key: "151239" }]);
  });
  test("returns an empty array when the API reports no assets", async () => {
    nock(BASE_URL)
      .get(ASSETS_PATH)
      .query(FETCH_ALL_QUERY)
      .reply(200, { count: 0, page: 1, pageSize: 500, items: [] });
    const { result } = await invokeDataSource(selectAsset, { connection });
    expect(result).toEqual([]);
  });
});
