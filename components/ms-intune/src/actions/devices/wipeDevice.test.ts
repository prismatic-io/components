import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { msIntuneOAuth2 } from "../../connections";
import { wipeDevice } from "./wipeDevice";
const HOST = "https://graph.microsoft.com";
const DEVICE_ID = "705c034c-034c-705c-4c03-5c704c035c70";
const PATH = `/v1.0/deviceManagement/managedDevices/${DEVICE_ID}/wipe`;
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
describe("wipeDevice", () => {
  afterEach(() => nock.cleanAll());
  test("posts to the wipe path with no body and returns the empty response untouched", async () => {
    const scope = nock(HOST).post(PATH).reply(204);
    const { result } = await invoke(wipeDevice, {
      connection,
      managedDeviceId: DEVICE_ID,
    });
    expect(scope.isDone()).toBe(true);
    expect(result.data).toBe("");
  });
  test("surfaces the failure when the wipe request is rejected", async () => {
    nock(HOST)
      .post(PATH)
      .reply(400, { error: { code: "BadRequest" } });
    await expect(
      invoke(wipeDevice, { connection, managedDeviceId: DEVICE_ID }),
    ).rejects.toThrow();
  });
});
