import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { msIntuneOAuth2 } from "../../connections";
import { getUserExamplePayload } from "../../examplePayloads";
import { getUser } from "./getUser";
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
const user = getUserExamplePayload.data;
describe("getUser", () => {
  afterEach(() => nock.cleanAll());
  test("forwards $select and returns the user", async () => {
    const scope = nock(HOST)
      .get(PATH)
      .query({ $select: "id,displayName,mail" })
      .reply(200, user);
    const { result } = await invoke(getUser, {
      connection,
      userId: USER_ID,
      $select: "id,displayName,mail",
    });
    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(user);
  });
  test("surfaces the failure when the user does not exist", async () => {
    nock(HOST)
      .get(PATH)
      .reply(404, { error: { code: "Request_ResourceNotFound" } });
    await expect(
      invoke(getUser, {
        connection,
        userId: USER_ID,
        $select: undefined,
      }),
    ).rejects.toThrow();
  });
});
