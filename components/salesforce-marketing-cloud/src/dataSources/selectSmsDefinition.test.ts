import {
  createConnection,
  invokeDataSource,
} from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { sfmcOAuth2ClientCredentials } from "../connections/sfmcOAuth2ClientCredentials";
import { listSmsDefinitionsExamplePayload } from "../examplePayloads";
import { selectSmsDefinition } from "./selectSmsDefinition";
const BASE_URL = "https://mc-test.rest.marketingcloudapis.com";
const SMS_DEFINITIONS_PATH = "/messaging/v1/sms/definitions";
const connection = createConnection(
  sfmcOAuth2ClientCredentials,
  {},
  { access_token: "test-access-token", rest_instance_url: BASE_URL },
);
const FETCH_ALL_QUERY = { $page: "1", $pageSize: "500" };
describe("selectSmsDefinition", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  test("maps the listed SMS definitions to label and key elements", async () => {
    const body = {
      ...listSmsDefinitionsExamplePayload.data,
      count: 1,
      pageSize: 500,
    };
    nock(BASE_URL)
      .get(SMS_DEFINITIONS_PATH)
      .query(FETCH_ALL_QUERY)
      .reply(200, body);
    const { result } = await invokeDataSource(selectSmsDefinition, {
      connection,
    });
    expect(result).toEqual([
      { label: "Example SMS Definition", key: "example-sms-def" },
    ]);
  });
  test("returns an empty array when the API reports no SMS definitions", async () => {
    nock(BASE_URL).get(SMS_DEFINITIONS_PATH).query(FETCH_ALL_QUERY).reply(200, {
      requestId: "ba9633fa-5c8d-4c42-8efa-a16412ac0c53",
      count: 0,
      page: 1,
      pageSize: 500,
      definitions: [],
    });
    const { result } = await invokeDataSource(selectSmsDefinition, {
      connection,
    });
    expect(result).toEqual([]);
  });
});
