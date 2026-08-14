import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { sfmcOAuth2ClientCredentials } from "../../connections/sfmcOAuth2ClientCredentials";
import { AUTOMATIONS_PATH } from "../../constants";
import { getAutomationExamplePayload } from "../../examplePayloads";
import { getAutomation } from "./getAutomation";
const BASE_URL = "https://mc-test.rest.marketingcloudapis.com";
const AUTOMATION_ID = "6b6ec44f-aaf1-4d3d-9f05-074a0328a9ee";
const connection = createConnection(
  sfmcOAuth2ClientCredentials,
  {},
  { access_token: "test-access-token", rest_instance_url: BASE_URL },
);
describe("getAutomation", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  test("returns the automation for the requested ID", async () => {
    const scope = nock(BASE_URL)
      .get(`${AUTOMATIONS_PATH}/${AUTOMATION_ID}`)
      .reply(200, getAutomationExamplePayload.data);
    const { result } = await invoke(getAutomation, {
      connection,
      automationId: AUTOMATION_ID,
    });
    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(getAutomationExamplePayload.data);
  });
  test("surfaces an API error when the automation is not found", async () => {
    nock(BASE_URL)
      .get(`${AUTOMATIONS_PATH}/${AUTOMATION_ID}`)
      .reply(404, { message: "Automation not found" });
    await expect(
      invoke(getAutomation, { connection, automationId: AUTOMATION_ID }),
    ).rejects.toThrow();
  });
});
