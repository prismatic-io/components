import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { msIntuneOAuth2 } from "../../connections";
import { deleteManagedDeviceExamplePayload } from "../../examplePayloads";
import { deleteManagedDevice } from "./deleteManagedDevice";
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
const deleteReply = deleteManagedDeviceExamplePayload.data;
describe("deleteManagedDevice", () => {
  afterEach(() => nock.cleanAll());
  test("issues a DELETE for the managed device and returns the response body", async () => {
    const scope = nock(HOST).delete(PATH).reply(200, deleteReply);
    const { result } = await invoke(deleteManagedDevice, {
      connection,
      managedDeviceId: DEVICE_ID,
    });
    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(deleteReply);
  });
  test("surfaces the failure when the managed device does not exist", async () => {
    nock(HOST)
      .delete(PATH)
      .reply(404, { error: { code: "ResourceNotFound" } });
    await expect(
      invoke(deleteManagedDevice, { connection, managedDeviceId: DEVICE_ID }),
    ).rejects.toThrow();
  });
});
