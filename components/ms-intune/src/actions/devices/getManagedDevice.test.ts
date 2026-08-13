import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { msIntuneOAuth2 } from "../../connections";
import { getManagedDeviceExamplePayload } from "../../examplePayloads";
import { getManagedDevice } from "./getManagedDevice";
const HOST = "https://graph.microsoft.com";
const DEVICE_ID = "705c034c-034c-705c-4c03-5c704c035c70";
const PATH = `/v1.0/deviceManagement/managedDevices/${DEVICE_ID}`;
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
const deviceReply = getManagedDeviceExamplePayload.data;
describe("getManagedDevice", () => {
  afterEach(() => nock.cleanAll());
  test("returns the managed device for the requested ID", async () => {
    const scope = nock(HOST).get(PATH).reply(200, deviceReply);
    const { result } = await invoke(getManagedDevice, {
      connection,
      managedDeviceId: DEVICE_ID,
    });
    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(deviceReply);
  });
  test("surfaces the failure when the managed device does not exist", async () => {
    nock(HOST)
      .get(PATH)
      .reply(404, { error: { code: "ResourceNotFound" } });
    await expect(
      invoke(getManagedDevice, { connection, managedDeviceId: DEVICE_ID }),
    ).rejects.toThrow();
  });
});
