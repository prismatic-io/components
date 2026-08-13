import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { msIntuneOAuth2 } from "../../connections";
import { getMobileAppAssignmentExamplePayload } from "../../examplePayloads";
import { updateMobileAppAssignment } from "./updateMobileAppAssignment";
const HOST = "https://graph.microsoft.com";
const MOBILE_APP_ID = "0177548a-548a-0177-8a54-77018a547701";
const ASSIGNMENT_ID = "591620b7-20b7-5916-b720-1659b7201659";
const PATH = `/v1.0/deviceAppManagement/mobileApps/${MOBILE_APP_ID}/assignments/${ASSIGNMENT_ID}`;
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
describe("updateMobileAppAssignment", () => {
  afterEach(() => nock.cleanAll());
  test("patches the assignment with the same envelope shape createMobileAppAssignment posts", async () => {
    const scope = nock(HOST)
      .patch(PATH, {
        intent: "available",
        target: {
          "@odata.type": "microsoft.graph.groupAssignmentTarget",
        },
        settings: {
          "@odata.type": "microsoft.graph.iosLobAppAssignmentSettings",
          useDeviceContext: true,
        },
      })
      .reply(200, assignmentReply);
    const { result } = await invoke(updateMobileAppAssignment, {
      connection,
      mobileAppId: MOBILE_APP_ID,
      mobileAppAssignmentId: ASSIGNMENT_ID,
      intent: "available",
      target: "microsoft.graph.groupAssignmentTarget",
      settings: "microsoft.graph.iosLobAppAssignmentSettings",
    });
    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(assignmentReply);
  });
  test("surfaces the failure when the assignment does not exist", async () => {
    nock(HOST)
      .patch(PATH)
      .reply(404, { error: { code: "ResourceNotFound" } });
    await expect(
      invoke(updateMobileAppAssignment, {
        connection,
        mobileAppId: MOBILE_APP_ID,
        mobileAppAssignmentId: ASSIGNMENT_ID,
        intent: "available",
        target: "microsoft.graph.groupAssignmentTarget",
        settings: "microsoft.graph.iosLobAppAssignmentSettings",
      }),
    ).rejects.toThrow();
  });
});
