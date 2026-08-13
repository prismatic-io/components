import {
  createConnection,
  invokeDataSource,
} from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { msIntuneOAuth2 } from "../connections";
import { listDeviceConfigurationsExamplePayload } from "../examplePayloads";
import { selectDeviceConfiguration } from "./selectDeviceConfiguration";
const HOST = "https://graph.microsoft.com";
const ACCESS_TOKEN = "test-access-token";
const PATH = "/v1.0/deviceManagement/deviceConfigurations";
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
const listReply = listDeviceConfigurationsExamplePayload.data;
describe("selectDeviceConfiguration", () => {
  afterEach(() => nock.cleanAll());
  test("maps the configuration list to label/key elements wrapped in result", async () => {
    nock(HOST).get(PATH).reply(200, listReply);
    const { result } = await invokeDataSource(selectDeviceConfiguration, {
      connection,
    });
    expect(Array.isArray(result)).toBe(true);
    expect(result).toEqual([
      {
        label: "Display Name value",
        key: "34977265-7265-3497-6572-973465729734",
      },
    ]);
    for (const element of result) {
      expect(element).toHaveProperty("label");
      expect(element).toHaveProperty("key");
    }
  });
  test("returns an empty result array when the API returns no configurations", async () => {
    nock(HOST).get(PATH).reply(200, { value: [] });
    const { result } = await invokeDataSource(selectDeviceConfiguration, {
      connection,
    });
    expect(result).toEqual([]);
  });
});
