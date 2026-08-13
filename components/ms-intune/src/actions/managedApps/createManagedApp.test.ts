import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { msIntuneOAuth2 } from "../../connections";
import { createManagedAppExamplePayload } from "../../examplePayloads";
import { createManagedApp } from "./createManagedApp";
const HOST = "https://graph.microsoft.com";
const PATH = "/beta/deviceAppManagement/mobileApps";
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
const appReply = createManagedAppExamplePayload.data;
const emptyAdditionalFields = {
  publisher: undefined,
  largeIconType: undefined,
  largeIconValue: undefined,
  privacyInformationUrl: undefined,
  informationUrl: undefined,
  owner: undefined,
  developer: undefined,
  notes: undefined,
};
const specificPlatformProperties = {
  autoAcceptEula: true,
  productIds: ["o365BusinessRetail"],
};
describe("createManagedApp", () => {
  afterEach(() => nock.cleanAll());
  test("assembles the largeIcon from its two Additional Fields children and merges the platform properties", async () => {
    const scope = nock(HOST)
      .post(PATH, {
        "@odata.type": "#microsoft.graph.officeSuiteApp",
        displayName: "Office Suite App",
        description: "This is an Office Suite app.",
        publisher: "Microsoft",
        largeIcon: {
          "@odata.type": "microsoft.graph.mimeContent",
          type: "image/png",
          value: "dmFsdWU=",
        },
        isFeatured: true,
        autoAcceptEula: true,
        productIds: ["o365BusinessRetail"],
      })
      .reply(201, appReply);
    const { result } = await invoke(createManagedApp, {
      connection,
      odataTypeApp: "#microsoft.graph.officeSuiteApp",
      displayName: "Office Suite App",
      description: "This is an Office Suite app.",
      isFeatured: true,
      specificPlatformProperties,
      additionalFields: {
        ...emptyAdditionalFields,
        publisher: "Microsoft",
        largeIconType: "image/png",
        largeIconValue: "dmFsdWU=",
      },
    });
    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(appReply);
  });
  test("surfaces the failure when the API rejects the request", async () => {
    nock(HOST)
      .post(PATH)
      .reply(400, { error: { code: "BadRequest" } });
    await expect(
      invoke(createManagedApp, {
        connection,
        odataTypeApp: "#microsoft.graph.officeSuiteApp",
        displayName: "Office Suite App",
        description: "This is an Office Suite app.",
        isFeatured: true,
        specificPlatformProperties,
        additionalFields: emptyAdditionalFields,
      }),
    ).rejects.toThrow();
  });
});
