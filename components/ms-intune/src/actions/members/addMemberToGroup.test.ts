import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { msIntuneOAuth2 } from "../../connections";
import { addMemberToGroupExamplePayload } from "../../examplePayloads";
import { addMemberToGroup } from "./addMemberToGroup";
const HOST = "https://graph.microsoft.com";
const GROUP_ID = "02bd9fd6-8f93-4758-87c3-1fb73740a315";
const MEMBER_ID = "a1b2c3d4-e5f6-7890-abcd-ef1234567890";
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
describe("addMemberToGroup", () => {
  afterEach(() => nock.cleanAll());
  test("expands a bare member ID into a directoryObjects binding and returns the fixed message", async () => {
    const scope = nock(HOST)
      .patch(PATH, {
        "members@odata.bind": [`${HOST}/v1.0/directoryObjects/${MEMBER_ID}`],
      })
      .reply(204);
    const { result } = await invoke(addMemberToGroup, {
      connection,
      groupId: GROUP_ID,
      memberId: MEMBER_ID,
    });
    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(addMemberToGroupExamplePayload.data);
  });
  test("surfaces the failure when the group rejects the member", async () => {
    nock(HOST)
      .patch(PATH)
      .reply(400, { error: { code: "Request_BadRequest" } });
    await expect(
      invoke(addMemberToGroup, {
        connection,
        groupId: GROUP_ID,
        memberId: MEMBER_ID,
      }),
    ).rejects.toThrow();
  });
});
