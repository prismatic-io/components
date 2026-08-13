import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { msIntuneOAuth2 } from "../../connections";
import { ODATA_TYPES } from "../../constants";
import { updateManagedDeviceExamplePayload } from "../../examplePayloads";
import { updateManagedDevice } from "./updateManagedDevice";
const HOST = "https://graph.microsoft.com";
const DEVICE_ID = "705c034c-034c-705c-4c03-5c704c035c70";
const PATH = `/beta/deviceManagement/managedDevices/${DEVICE_ID}`;
const ACCESS_TOKEN = "test-access-token";
const DEVICE_NAME = "John-Laptop";
const NOTES = "Device issued to John Doe in Marketing department";
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
const updateReply = updateManagedDeviceExamplePayload.data;
describe("updateManagedDevice", () => {
  afterEach(() => nock.cleanAll());
  test("patches the beta endpoint with the OData type, name, notes, and extra fields", async () => {
    const scope = nock(HOST)
      .patch(PATH, {
        "@odata.type": ODATA_TYPES.MANAGED_DEVICE,
        managedDeviceName: DEVICE_NAME,
        notes: NOTES,
        serialNumber: "SN-1234567890",
      })
      .reply(200, updateReply);
    const { result } = await invoke(updateManagedDevice, {
      connection,
      managedDeviceId: DEVICE_ID,
      managedDeviceName: DEVICE_NAME,
      notes: NOTES,
      extraFields: { serialNumber: "SN-1234567890" },
    });
    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(updateReply);
  });
  test("surfaces the failure when the update is rejected", async () => {
    nock(HOST)
      .patch(PATH)
      .reply(400, { error: { code: "BadRequest" } });
    await expect(
      invoke(updateManagedDevice, {
        connection,
        managedDeviceId: DEVICE_ID,
        managedDeviceName: DEVICE_NAME,
        notes: NOTES,
        extraFields: undefined,
      }),
    ).rejects.toThrow();
  });
});
