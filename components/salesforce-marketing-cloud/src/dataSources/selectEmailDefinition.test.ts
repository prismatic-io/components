import {
  createConnection,
  invokeDataSource,
} from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { sfmcOAuth2ClientCredentials } from "../connections/sfmcOAuth2ClientCredentials";
import { listEmailDefinitionsExamplePayload } from "../examplePayloads";
import { selectEmailDefinition } from "./selectEmailDefinition";
const BASE_URL = "https://mc-test.rest.marketingcloudapis.com";
const EMAIL_DEFINITIONS_PATH = "/messaging/v1/email/definitions";
const connection = createConnection(
  sfmcOAuth2ClientCredentials,
  {},
  { access_token: "test-access-token", rest_instance_url: BASE_URL },
);
const FETCH_ALL_QUERY = { $page: "1", $pageSize: "500" };
describe("selectEmailDefinition", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  test("maps the listed email definitions to label and key elements", async () => {
    const body = {
      ...listEmailDefinitionsExamplePayload.data,
      count: 1,
      pageSize: 500,
    };
    nock(BASE_URL)
      .get(EMAIL_DEFINITIONS_PATH)
      .query(FETCH_ALL_QUERY)
      .reply(200, body);
    const { result } = await invokeDataSource(selectEmailDefinition, {
      connection,
    });
    expect(result).toEqual([
      { label: "Example Email Definition", key: "test-email-def" },
    ]);
  });
  test("returns an empty array when the API reports no email definitions", async () => {
    nock(BASE_URL)
      .get(EMAIL_DEFINITIONS_PATH)
      .query(FETCH_ALL_QUERY)
      .reply(200, {
        requestId: "92639bbb-7161-4c27-a08b-e5baf6fdef50",
        count: 0,
        page: 1,
        pageSize: 500,
        definitions: [],
      });
    const { result } = await invokeDataSource(selectEmailDefinition, {
      connection,
    });
    expect(result).toEqual([]);
  });
});
