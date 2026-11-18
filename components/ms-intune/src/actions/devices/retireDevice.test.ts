import { createConnection, invoke } from "@prismatic-io/spectral/testing";
import nock from "nock";
import { msIntuneOAuth2 } from "../../connections";
import { NO_RESPONSE_SUCCESSFUL_PAYLOAD } from "../../constants";
import { retireDevice } from "./retireDevice";

const HOST = "https://graph.microsoft.com";
const DEVICE_ID = "705c034c-034c-705c-4c03-5c704c035c70";
const PATH = `/v1.0/deviceManagement/managedDevices/${DEVICE_ID}/retire`;
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

describe("retireDevice", () => {
  afterEach(() => nock.cleanAll());

  test("posts to the retire path and returns the confirmation", async () => {
    const scope = nock(HOST).post(PATH).reply(204);

    const { result } = await invoke(retireDevice, {
      connection,
      managedDeviceId: DEVICE_ID,
    });

    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(NO_RESPONSE_SUCCESSFUL_PAYLOAD);
  });

  test("surfaces the failure when the retire request is rejected", async () => {
    nock(HOST)
      .post(PATH)
      .reply(404, { error: { code: "ResourceNotFound" } });

    await expect(
      invoke(retireDevice, { connection, managedDeviceId: DEVICE_ID }),
    ).rejects.toThrow();
  });
});
