import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { msIntuneOAuth2 } from "../../connections";
import { deleteUser } from "./deleteUser";
const HOST = "https://graph.microsoft.com";
const USER_ID = "87d349ed-44d7-43e1-9a83-5f2406dee5bd";
const PATH = `/v1.0/users/${USER_ID}`;
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
describe("deleteUser", () => {
  afterEach(() => nock.cleanAll());
  test("deletes the user and returns the empty 204 body", async () => {
    const scope = nock(HOST).delete(PATH).reply(204);
    const { result } = await invoke(deleteUser, {
      connection,
      userId: USER_ID,
    });
    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual("");
  });
  test("surfaces the failure when the user does not exist", async () => {
    nock(HOST)
      .delete(PATH)
      .reply(404, { error: { code: "Request_ResourceNotFound" } });
    await expect(
      invoke(deleteUser, {
        connection,
        userId: USER_ID,
      }),
    ).rejects.toThrow();
  });
});
