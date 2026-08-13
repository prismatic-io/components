import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { msIntuneOAuth2 } from "../../connections";
import { addMembersToGroupExamplePayload } from "../../examplePayloads";
import { addMembersToGroup } from "./addMembersToGroup";
const HOST = "https://graph.microsoft.com";
const GROUP_ID = "02bd9fd6-8f93-4758-87c3-1fb73740a315";
const FIRST_MEMBER_ID = "a1b2c3d4-e5f6-7890-abcd-ef1234567890";
const SECOND_MEMBER_ID = "b2c3d4e5-f678-9012-3456-789012345678";
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
describe("addMembersToGroup", () => {
  afterEach(() => nock.cleanAll());
  test("prefers Dynamic Member IDs over the comma-separated list and binds each ID", async () => {
    const scope = nock(HOST)
      .patch(PATH, {
        "members@odata.bind": [
          `${HOST}/v1.0/directoryObjects/${FIRST_MEMBER_ID}`,
          `${HOST}/v1.0/directoryObjects/${SECOND_MEMBER_ID}`,
        ],
      })
      .reply(204);
    const { result } = await invoke(addMembersToGroup, {
      connection,
      groupId: GROUP_ID,
      memberIdsString: "ignored-because-the-array-wins",
      memberIds: [FIRST_MEMBER_ID, SECOND_MEMBER_ID],
    });
    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(addMembersToGroupExamplePayload.data);
  });
  test("surfaces the failure when the group rejects the members", async () => {
    nock(HOST)
      .patch(PATH)
      .reply(400, { error: { code: "Request_BadRequest" } });
    await expect(
      invoke(addMembersToGroup, {
        connection,
        groupId: GROUP_ID,
        memberIdsString: undefined,
        memberIds: [FIRST_MEMBER_ID],
      }),
    ).rejects.toThrow();
  });
});
