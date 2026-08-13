import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { msIntuneOAuth2 } from "../../connections";
import { updateManagedAppExamplePayload } from "../../examplePayloads";
import { updateManagedApp } from "./updateManagedApp";
const HOST = "https://graph.microsoft.com";
const MOBILE_APP_ID = "9b263b46-3b46-9b26-463b-269b463b269b";
const PATH = `/beta/deviceAppManagement/mobileApps/${MOBILE_APP_ID}`;
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
const appReply = updateManagedAppExamplePayload.data;
const emptyAdditionalFields = {
  publisher: undefined,
  largeIconType: undefined,
  largeIconValue: undefined,
  privacyInformationUrl: undefined,
  informationUrl: undefined,
  owner: undefined,
  developer: undefined,
  notes: undefined,
  specificPlatformProperties: undefined,
};
describe("updateManagedApp", () => {
  afterEach(() => nock.cleanAll());
  test("patches only the supplied fields and merges the nested platform properties", async () => {
    const scope = nock(HOST)
      .patch(PATH, {
        "@odata.type": "#microsoft.graph.officeSuiteApp",
        displayName: "Office Suite App",
        description: "This is an Office Suite app.",
        isFeatured: false,
        notes: "An example note.",
        roleScopeTagIds: ["0"],
      })
      .reply(200, appReply);
    const { result } = await invoke(updateManagedApp, {
      connection,
      mobileAppId: MOBILE_APP_ID,
      odataTypeApp: "#microsoft.graph.officeSuiteApp",
      isFeatured: false,
      displayName: "Office Suite App",
      description: "This is an Office Suite app.",
      additionalFields: {
        ...emptyAdditionalFields,
        notes: "An example note.",
        largeIconType: undefined,
        specificPlatformProperties: { roleScopeTagIds: ["0"] },
      },
    });
    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(appReply);
  });
  test("surfaces the failure when the managed app does not exist", async () => {
    nock(HOST)
      .patch(PATH)
      .reply(404, { error: { code: "ResourceNotFound" } });
    await expect(
      invoke(updateManagedApp, {
        connection,
        mobileAppId: MOBILE_APP_ID,
        odataTypeApp: "#microsoft.graph.officeSuiteApp",
        isFeatured: false,
        displayName: "Office Suite App",
        description: "This is an Office Suite app.",
        additionalFields: emptyAdditionalFields,
      }),
    ).rejects.toThrow();
  });
});
