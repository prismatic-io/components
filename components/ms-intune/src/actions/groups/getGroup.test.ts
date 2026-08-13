import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { msIntuneOAuth2 } from "../../connections";
import { getGroupExamplePayload } from "../../examplePayloads";
import { getGroup } from "./getGroup";
const HOST = "https://graph.microsoft.com";
const GROUP_ID = "02bd9fd6-8f93-4758-87c3-1fb73740a315";
const PATH = `/v1.0/groups/${GROUP_ID}`;
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
const groupReply = getGroupExamplePayload.data;
describe("getGroup", () => {
  afterEach(() => nock.cleanAll());
  test("reads the group and returns the response body untouched", async () => {
    const scope = nock(HOST).get(PATH).reply(200, groupReply);
    const { result } = await invoke(getGroup, {
      connection,
      groupId: GROUP_ID,
    });
    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(groupReply);
  });
  test("surfaces the failure when the group does not exist", async () => {
    nock(HOST)
      .get(PATH)
      .reply(404, { error: { code: "Request_ResourceNotFound" } });
    await expect(
      invoke(getGroup, { connection, groupId: GROUP_ID }),
    ).rejects.toThrow();
  });
});
