import {
  createConnection,
  invokeDataSource,
} from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { sfmcOAuth2ClientCredentials } from "../connections/sfmcOAuth2ClientCredentials";
import { listCampaignsExamplePayload } from "../examplePayloads";
import { selectCampaign } from "./selectCampaign";
const BASE_URL = "https://mc-test.rest.marketingcloudapis.com";
const CAMPAIGNS_PATH = "/hub/v1/campaigns";
const connection = createConnection(
  sfmcOAuth2ClientCredentials,
  {},
  { access_token: "test-access-token", rest_instance_url: BASE_URL },
);
const FETCH_ALL_QUERY = { $page: "1", $pageSize: "500" };
describe("selectCampaign", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  test("maps the listed campaigns to label and key elements", async () => {
    const body = {
      ...listCampaignsExamplePayload.data,
      count: 1,
      pageSize: 500,
    };
    nock(BASE_URL).get(CAMPAIGNS_PATH).query(FETCH_ALL_QUERY).reply(200, body);
    const { result } = await invokeDataSource(selectCampaign, { connection });
    expect(result).toEqual([{ label: "New campaign", key: "145" }]);
  });
  test("returns an empty array when the API reports no campaigns", async () => {
    nock(BASE_URL)
      .get(CAMPAIGNS_PATH)
      .query(FETCH_ALL_QUERY)
      .reply(200, { count: 0, page: 1, pageSize: 500, items: [] });
    const { result } = await invokeDataSource(selectCampaign, { connection });
    expect(result).toEqual([]);
  });
});
