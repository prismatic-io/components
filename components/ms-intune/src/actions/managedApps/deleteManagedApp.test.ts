import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { msIntuneOAuth2 } from "../../connections";
import { deleteManagedApp } from "./deleteManagedApp";
const HOST = "https://graph.microsoft.com";
const MOBILE_APP_ID = "e0741df2-bae3-4649-9599-c47026da1234";
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
describe("deleteManagedApp", () => {
  afterEach(() => nock.cleanAll());
  test("deletes the managed app and returns the empty 204 body", async () => {
    const scope = nock(HOST).delete(PATH).reply(204);
    const { result } = await invoke(deleteManagedApp, {
      connection,
      mobileAppId: MOBILE_APP_ID,
    });
    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual("");
  });
  test("surfaces the failure when the managed app does not exist", async () => {
    nock(HOST)
      .delete(PATH)
      .reply(404, { error: { code: "ResourceNotFound" } });
    await expect(
      invoke(deleteManagedApp, { connection, mobileAppId: MOBILE_APP_ID }),
    ).rejects.toThrow();
  });
});
