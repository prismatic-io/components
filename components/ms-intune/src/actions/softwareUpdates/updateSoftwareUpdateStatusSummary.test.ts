import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { msIntuneOAuth2 } from "../../connections";
import { updateSoftwareUpdateStatusSummaryExamplePayload } from "../../examplePayloads";
import { updateSoftwareUpdateStatusSummary } from "./updateSoftwareUpdateStatusSummary";
const HOST = "https://graph.microsoft.com";
const PATH = "/v1.0/deviceManagement/softwareUpdateStatusSummary";
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
const summary = updateSoftwareUpdateStatusSummaryExamplePayload.data;
const deviceCounts = {
  compliantDeviceCount: 4,
  nonCompliantDeviceCount: 7,
  remediatedDeviceCount: 5,
  errorDeviceCount: 0,
  unknownDeviceCount: 2,
  conflictDeviceCount: 3,
  notApplicableDeviceCount: 8,
};
const userCounts = {
  compliantUserCount: 2,
  nonCompliantUserCount: 5,
  remediatedUserCount: 3,
  errorUserCount: 14,
  unknownUserCount: 0,
  conflictUserCount: 1,
  notApplicableUserCount: 6,
};
describe("updateSoftwareUpdateStatusSummary", () => {
  afterEach(() => nock.cleanAll());
  test("flattens the count groups into the PATCH body and returns the updated summary", async () => {
    const scope = nock(HOST)
      .patch(PATH, {
        displayName: "Display Name value",
        ...deviceCounts,
        ...userCounts,
      })
      .reply(200, summary);
    const { result } = await invoke(updateSoftwareUpdateStatusSummary, {
      connection,
      displayName: "Display Name value",
      deviceCounts,
      userCounts,
    });
    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(summary);
  });
  test("surfaces the failure when the API rejects the update", async () => {
    nock(HOST)
      .patch(PATH)
      .reply(400, { error: { code: "BadRequest" } });
    await expect(
      invoke(updateSoftwareUpdateStatusSummary, {
        connection,
        displayName: "Display Name value",
        deviceCounts,
        userCounts,
      }),
    ).rejects.toThrow();
  });
});
