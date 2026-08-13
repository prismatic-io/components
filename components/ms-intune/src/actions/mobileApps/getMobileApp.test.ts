import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { msIntuneOAuth2 } from "../../connections";
import { getMobileAppExamplePayload } from "../../examplePayloads";
import { getMobileApp } from "./getMobileApp";
const HOST = "https://graph.microsoft.com";
const MOBILE_APP_ID = "0177548a-548a-0177-8a54-77018a547701";
const PATH = `/v1.0/deviceAppManagement/mobileApps/${MOBILE_APP_ID}`;
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
const appReply = getMobileAppExamplePayload.data;
describe("getMobileApp", () => {
  afterEach(() => nock.cleanAll());
  test("reads the mobile app and returns the response body untouched", async () => {
    const scope = nock(HOST).get(PATH).reply(200, appReply);
    const { result } = await invoke(getMobileApp, {
      connection,
      mobileAppId: MOBILE_APP_ID,
    });
    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(appReply);
  });
  test("surfaces the failure when the mobile app does not exist", async () => {
    nock(HOST)
      .get(PATH)
      .reply(404, { error: { code: "ResourceNotFound" } });
    await expect(
      invoke(getMobileApp, { connection, mobileAppId: MOBILE_APP_ID }),
    ).rejects.toThrow();
  });
});
