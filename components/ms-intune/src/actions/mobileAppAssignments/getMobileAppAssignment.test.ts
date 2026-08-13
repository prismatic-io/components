import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { msIntuneOAuth2 } from "../../connections";
import { getMobileAppAssignmentExamplePayload } from "../../examplePayloads";
import { getMobileAppAssignment } from "./getMobileAppAssignment";
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
describe("getMobileAppAssignment", () => {
  afterEach(() => nock.cleanAll());
  test("reads the assignment nested under its mobile app", async () => {
    const scope = nock(HOST).get(PATH).reply(200, assignmentReply);
    const { result } = await invoke(getMobileAppAssignment, {
      connection,
      mobileAppId: MOBILE_APP_ID,
      mobileAppAssignmentId: ASSIGNMENT_ID,
    });
    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(assignmentReply);
  });
  test("surfaces the failure when the assignment does not exist", async () => {
    nock(HOST)
      .get(PATH)
      .reply(404, { error: { code: "ResourceNotFound" } });
    await expect(
      invoke(getMobileAppAssignment, {
        connection,
        mobileAppId: MOBILE_APP_ID,
        mobileAppAssignmentId: ASSIGNMENT_ID,
      }),
    ).rejects.toThrow();
  });
});
