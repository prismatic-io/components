import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { msIntuneOAuth2 } from "../../connections";
import { getDetectedAppExamplePayload } from "../../examplePayloads";
import { getDetectedApp } from "./getDetectedApp";
const HOST = "https://graph.microsoft.com";
const DETECTED_APP_ID = "caf60db6-0db6-caf6-b60d-f6cab60df6ca";
const PATH = `/beta/deviceManagement/detectedApps/${DETECTED_APP_ID}`;
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
const detectedAppReply = getDetectedAppExamplePayload.data;
describe("getDetectedApp", () => {
  afterEach(() => nock.cleanAll());
  test("reads the detected app from the beta endpoint", async () => {
    const scope = nock(HOST).get(PATH).reply(200, detectedAppReply);
    const { result } = await invoke(getDetectedApp, {
      connection,
      detectedAppId: DETECTED_APP_ID,
    });
    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(detectedAppReply);
  });
  test("surfaces the failure when the detected app does not exist", async () => {
    nock(HOST)
      .get(PATH)
      .reply(404, { error: { code: "ResourceNotFound" } });
    await expect(
      invoke(getDetectedApp, { connection, detectedAppId: DETECTED_APP_ID }),
    ).rejects.toThrow();
  });
});
