import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { sfmcOAuth2ClientCredentials } from "../../connections/sfmcOAuth2ClientCredentials";
import { AUTOMATIONS_PATH } from "../../constants";
import { listAutomationsExamplePayload } from "../../examplePayloads";
import { listAutomations } from "./listAutomations";
const BASE_URL = "https://mc-test.rest.marketingcloudapis.com";
const connection = createConnection(
  sfmcOAuth2ClientCredentials,
  {},
  { access_token: "test-access-token", rest_instance_url: BASE_URL },
);
const params = {
  connection,
  fetchAll: false,
  pagination: { page: 1, pageSize: 25 },
};
describe("listAutomations", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  test("requests a single page with the caller's page params and returns it verbatim", async () => {
    const scope = nock(BASE_URL)
      .get(AUTOMATIONS_PATH)
      .query({ $pageSize: "25", $page: "1" })
      .reply(200, listAutomationsExamplePayload.data);
    const { result } = await invoke(listAutomations, params);
    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(listAutomationsExamplePayload.data);
  });
  test("surfaces an API error when the list request fails", async () => {
    nock(BASE_URL)
      .get(AUTOMATIONS_PATH)
      .query(true)
      .reply(500, { message: "Internal Server Error" });
    await expect(invoke(listAutomations, params)).rejects.toThrow();
  });
});
