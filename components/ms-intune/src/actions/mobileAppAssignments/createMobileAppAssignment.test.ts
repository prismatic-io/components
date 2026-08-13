import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { msIntuneOAuth2 } from "../../connections";
import { getMobileAppAssignmentExamplePayload } from "../../examplePayloads";
import { createMobileAppAssignment } from "./createMobileAppAssignment";
const HOST = "https://graph.microsoft.com";
const MOBILE_APP_ID = "0177548a-548a-0177-8a54-77018a547701";
const PATH = `/v1.0/deviceAppManagement/mobileApps/${MOBILE_APP_ID}/assignments`;
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
const assignmentReply = getMobileAppAssignmentExamplePayload.data;
describe("createMobileAppAssignment", () => {
  afterEach(() => nock.cleanAll());
  test("wraps the target and settings type names in @odata.type envelopes", async () => {
    const scope = nock(HOST)
      .post(PATH, {
        intent: "required",
        target: {
          "@odata.type": "microsoft.graph.allLicensedUsersAssignmentTarget",
        },
        settings: {
          "@odata.type":
            "microsoft.graph.windowsUniversalAppXAppAssignmentSettings",
          useDeviceContext: true,
        },
      })
      .reply(201, assignmentReply);
    const { result } = await invoke(createMobileAppAssignment, {
      connection,
      mobileAppId: MOBILE_APP_ID,
      intent: "required",
      target: "microsoft.graph.allLicensedUsersAssignmentTarget",
      settings: "microsoft.graph.windowsUniversalAppXAppAssignmentSettings",
    });
    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(assignmentReply);
  });
  test("surfaces the failure when the API rejects the assignment", async () => {
    nock(HOST)
      .post(PATH)
      .reply(400, { error: { code: "BadRequest" } });
    await expect(
      invoke(createMobileAppAssignment, {
        connection,
        mobileAppId: MOBILE_APP_ID,
        intent: "required",
        target: "microsoft.graph.allLicensedUsersAssignmentTarget",
        settings: "microsoft.graph.windowsUniversalAppXAppAssignmentSettings",
      }),
    ).rejects.toThrow();
  });
});
