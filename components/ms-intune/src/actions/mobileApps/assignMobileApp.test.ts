import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { msIntuneOAuth2 } from "../../connections";
import { assignMobileApp } from "./assignMobileApp";
const HOST = "https://graph.microsoft.com";
const MOBILE_APP_ID = "0177548a-548a-0177-8a54-77018a547701";
const GROUP_ID = "02bd9fd6-8f93-4758-87c3-1fb73740a315";
const PATH = `/v1.0/deviceAppManagement/mobileApps/${MOBILE_APP_ID}/assign`;
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
const assignReply = {
  value: [
    {
      "@odata.type": "#microsoft.graph.mobileAppAssignment",
      id: "591620b7-20b7-5916-b720-1659b7201659",
      intent: "required",
      target: { "@odata.type": "microsoft.graph.groupAssignmentTarget" },
    },
  ],
};
describe("assignMobileApp", () => {
  afterEach(() => nock.cleanAll());
  test("posts the group ID as the assignment id and returns the API response", async () => {
    const scope = nock(HOST)
      .post(PATH, {
        mobileAppAssignments: [
          {
            intent: "required",
            target: {
              "@odata.type": "microsoft.graph.groupAssignmentTarget",
            },
            settings: {
              "@odata.type":
                "microsoft.graph.windowsUniversalAppXAppAssignmentSettings",
              useDeviceContext: true,
            },
            id: GROUP_ID,
          },
        ],
      })
      .reply(200, assignReply);
    const { result } = await invoke(assignMobileApp, {
      connection,
      mobileAppId: MOBILE_APP_ID,
      groupId: GROUP_ID,
      intent: "required",
      target: "microsoft.graph.groupAssignmentTarget",
      settings: "microsoft.graph.windowsUniversalAppXAppAssignmentSettings",
    });
    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(assignReply);
  });
  test("surfaces the failure when the API rejects the assignment", async () => {
    nock(HOST)
      .post(PATH)
      .reply(400, { error: { code: "BadRequest" } });
    await expect(
      invoke(assignMobileApp, {
        connection,
        mobileAppId: MOBILE_APP_ID,
        groupId: GROUP_ID,
        intent: "required",
        target: "microsoft.graph.groupAssignmentTarget",
        settings: "microsoft.graph.windowsUniversalAppXAppAssignmentSettings",
      }),
    ).rejects.toThrow();
  });
});
