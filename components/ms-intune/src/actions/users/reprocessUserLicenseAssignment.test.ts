import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { msIntuneOAuth2 } from "../../connections";
import { reprocessLicenseAssignmentExamplePayload } from "../../examplePayloads";
import { reprocessUserLicenseAssignment } from "./reprocessUserLicenseAssignment";
const HOST = "https://graph.microsoft.com";
const USER_ID = "87d349ed-44d7-43e1-9a83-5f2406dee5bd";
const PATH = `/v1.0/users/${USER_ID}/reprocessLicenseAssignment`;
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
const reprocessedUser = reprocessLicenseAssignmentExamplePayload.data;
describe("reprocessUserLicenseAssignment", () => {
  afterEach(() => nock.cleanAll());
  test("posts to the reprocess endpoint with no body and returns the user", async () => {
    const scope = nock(HOST).post(PATH).reply(202, reprocessedUser);
    const { result } = await invoke(reprocessUserLicenseAssignment, {
      connection,
      userId: USER_ID,
    });
    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(reprocessedUser);
  });
  test("surfaces the failure when the user does not exist", async () => {
    nock(HOST)
      .post(PATH)
      .reply(404, { error: { code: "Request_ResourceNotFound" } });
    await expect(
      invoke(reprocessUserLicenseAssignment, {
        connection,
        userId: USER_ID,
      }),
    ).rejects.toThrow();
  });
});
