import {
  createConnection,
  invokeDataSource,
} from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { sfmcOAuth2ClientCredentials } from "../connections/sfmcOAuth2ClientCredentials";
import { listAutomationsExamplePayload } from "../examplePayloads";
import { selectAutomation } from "./selectAutomation";
const BASE_URL = "https://mc-test.rest.marketingcloudapis.com";
const AUTOMATIONS_PATH = "/automation/v1/automations";
const connection = createConnection(
  sfmcOAuth2ClientCredentials,
  {},
  { access_token: "test-access-token", rest_instance_url: BASE_URL },
);
const FETCH_ALL_QUERY = { $page: "1", $pageSize: "500" };
describe("selectAutomation", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  test("maps the listed automations to label and key elements", async () => {
    const body = {
      ...listAutomationsExamplePayload.data,
      count: 1,
      pageSize: 500,
    };
    nock(BASE_URL)
      .get(AUTOMATIONS_PATH)
      .query(FETCH_ALL_QUERY)
      .reply(200, body);
    const { result } = await invokeDataSource(selectAutomation, { connection });
    expect(result).toEqual([
      {
        label: "Example-Automation-24",
        key: "6b6ec44f-aaf1-4d3d-9f05-074a0328a9ee",
      },
    ]);
  });
  test("returns an empty array when the API reports no automations", async () => {
    nock(BASE_URL)
      .get(AUTOMATIONS_PATH)
      .query(FETCH_ALL_QUERY)
      .reply(200, { count: 0, page: 1, pageSize: 500, items: [] });
    const { result } = await invokeDataSource(selectAutomation, { connection });
    expect(result).toEqual([]);
  });
});
