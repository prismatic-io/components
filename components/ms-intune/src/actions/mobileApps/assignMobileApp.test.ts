import { createConnection, invoke } from "@prismatic-io/spectral/testing";
import nock from "nock";
import { msIntuneOAuth2 } from "../../connections";
import { NO_RESPONSE_SUCCESSFUL_PAYLOAD } from "../../constants";
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

describe("assignMobileApp", () => {
  afterEach(() => nock.cleanAll());

  test("posts the group ID as the assignment target's groupId and returns the confirmation", async () => {
    const scope = nock(HOST)
      .post(PATH, {
        mobileAppAssignments: [
          {
            intent: "required",
            target: {
              "@odata.type": "microsoft.graph.groupAssignmentTarget",
              groupId: GROUP_ID,
            },
            settings: {
              "@odata.type":
                "microsoft.graph.windowsUniversalAppXAppAssignmentSettings",
              useDeviceContext: true,
            },
          },
        ],
      })
      .reply(204);

    const { result } = await invoke(assignMobileApp, {
      connection,
      mobileAppId: MOBILE_APP_ID,
      groupId: GROUP_ID,
      intent: "required",
      target: "microsoft.graph.groupAssignmentTarget",
      settings: "microsoft.graph.windowsUniversalAppXAppAssignmentSettings",
    });

    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(NO_RESPONSE_SUCCESSFUL_PAYLOAD);
  });

  test("leaves groupId out of the target for an all-licensed-users target", async () => {
    const scope = nock(HOST)
      .post(PATH, {
        mobileAppAssignments: [
          {
            intent: "available",
            target: {
              "@odata.type": "microsoft.graph.allLicensedUsersAssignmentTarget",
            },
            settings: {
              "@odata.type":
                "microsoft.graph.windowsUniversalAppXAppAssignmentSettings",
              useDeviceContext: true,
            },
          },
        ],
      })
      .reply(204);

    await invoke(assignMobileApp, {
      connection,
      mobileAppId: MOBILE_APP_ID,
      groupId: GROUP_ID,
      intent: "available",
      target: "microsoft.graph.allLicensedUsersAssignmentTarget",
      settings: "microsoft.graph.windowsUniversalAppXAppAssignmentSettings",
    });

    expect(scope.isDone()).toBe(true);
  });

  test("sends groupId for an exclusion group target written with a leading #", async () => {
    const scope = nock(HOST)
      .post(PATH, {
        mobileAppAssignments: [
          {
            intent: "required",
            target: {
              "@odata.type": "#microsoft.graph.exclusionGroupAssignmentTarget",
              groupId: GROUP_ID,
            },
            settings: {
              "@odata.type":
                "microsoft.graph.windowsUniversalAppXAppAssignmentSettings",
              useDeviceContext: true,
            },
          },
        ],
      })
      .reply(204);

    await invoke(assignMobileApp, {
      connection,
      mobileAppId: MOBILE_APP_ID,
      groupId: GROUP_ID,
      intent: "required",
      target: "#microsoft.graph.exclusionGroupAssignmentTarget",
      settings: "microsoft.graph.windowsUniversalAppXAppAssignmentSettings",
    });

    expect(scope.isDone()).toBe(true);
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
