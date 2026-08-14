import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { sfmcOAuth2ClientCredentials } from "../../connections/sfmcOAuth2ClientCredentials";
import { AUTOMATIONS_PATH } from "../../constants";
import { executeAutomationActivitiesExamplePayload } from "../../examplePayloads";
import { executeAutomationActivities } from "./executeAutomationActivities";
const BASE_URL = "https://mc-test.rest.marketingcloudapis.com";
const AUTOMATION_ID = "6b6ec44f-aaf1-4d3d-9f05-074a0328a9ee";
const RUN_ALL_ONCE_PATH = `${AUTOMATIONS_PATH}/${AUTOMATION_ID}/actions/runallonce`;
const connection = createConnection(
  sfmcOAuth2ClientCredentials,
  {},
  { access_token: "test-access-token", rest_instance_url: BASE_URL },
);
describe("executeAutomationActivities", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  test("posts an empty body and returns the bare status string", async () => {
    const scope = nock(BASE_URL)
      .post(RUN_ALL_ONCE_PATH, {})
      .reply(200, executeAutomationActivitiesExamplePayload.data);
    const { result } = await invoke(executeAutomationActivities, {
      connection,
      automationId: AUTOMATION_ID,
    });
    expect(scope.isDone()).toBe(true);
    expect(result.data).toBe("Automation Started Successfully");
    expect(result.data).toEqual(executeAutomationActivitiesExamplePayload.data);
  });
  test("surfaces an API error when the automation cannot be started", async () => {
    nock(BASE_URL)
      .post(RUN_ALL_ONCE_PATH)
      .reply(400, { message: "Automation is already running" });
    await expect(
      invoke(executeAutomationActivities, {
        connection,
        automationId: AUTOMATION_ID,
      }),
    ).rejects.toThrow();
  });
});
