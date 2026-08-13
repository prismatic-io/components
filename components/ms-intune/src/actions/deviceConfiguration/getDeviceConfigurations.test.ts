import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { msIntuneOAuth2 } from "../../connections";
import { getDeviceConfigurationExamplePayload } from "../../examplePayloads";
import { getDeviceConfigurations } from "./getDeviceConfigurations";
const HOST = "https://graph.microsoft.com";
const CONFIGURATION_ID = "34977265-7265-3497-6572-973465729734";
const PATH = `/v1.0/deviceManagement/deviceConfigurations/${CONFIGURATION_ID}`;
const ACCESS_TOKEN = "test-access-token";
const connection = createConnection(
  msIntuneOAuth2,
  {
    authorizeUrl:
      "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
    tokenUrl: "https://login.microsoftonline.com/common/oauth2/v2.0/token",
    clientId: "test-client-id",
    clientSecret: "test-client-secret",
  },
  { access_token: ACCESS_TOKEN },
);
const configurationReply = getDeviceConfigurationExamplePayload.data;
describe("getDeviceConfigurations", () => {
  afterEach(() => nock.cleanAll());
  test("returns the device configuration for the requested ID", async () => {
    const scope = nock(HOST).get(PATH).reply(200, configurationReply);
    const { result } = await invoke(getDeviceConfigurations, {
      connection,
      deviceConfigurationId: CONFIGURATION_ID,
    });
    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(configurationReply);
  });
  test("surfaces the failure when the device configuration does not exist", async () => {
    nock(HOST)
      .get(PATH)
      .reply(404, { error: { code: "ResourceNotFound" } });
    await expect(
      invoke(getDeviceConfigurations, {
        connection,
        deviceConfigurationId: CONFIGURATION_ID,
      }),
    ).rejects.toThrow();
  });
});
