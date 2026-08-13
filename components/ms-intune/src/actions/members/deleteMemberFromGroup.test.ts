import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { msIntuneOAuth2 } from "../../connections";
import { DELETE_MEMBERS_RESPONSE_MESSAGE } from "../../constants";
import { deleteMemberFromGroupExamplePayload } from "../../examplePayloads";
import { deleteMemberFromGroup } from "./deleteMemberFromGroup";
const HOST = "https://graph.microsoft.com";
const GROUP_ID = "02bd9fd6-8f93-4758-87c3-1fb73740a315";
const MEMBER_ID = "a1b2c3d4-e5f6-7890-abcd-ef1234567890";
const PATH = `/v1.0/groups/${GROUP_ID}/members/${MEMBER_ID}/$ref`;
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
describe("deleteMemberFromGroup", () => {
  afterEach(() => nock.cleanAll());
  test("deletes the membership reference and returns the fixed success message", async () => {
    const scope = nock(HOST).delete(PATH).reply(204);
    const { result } = await invoke(deleteMemberFromGroup, {
      connection,
      groupId: GROUP_ID,
      memberId: MEMBER_ID,
    });
    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(DELETE_MEMBERS_RESPONSE_MESSAGE);
    expect(result.data).toEqual(deleteMemberFromGroupExamplePayload.data);
  });
  test("surfaces the failure when the member is not in the group", async () => {
    nock(HOST)
      .delete(PATH)
      .reply(404, { error: { code: "Request_ResourceNotFound" } });
    await expect(
      invoke(deleteMemberFromGroup, {
        connection,
        groupId: GROUP_ID,
        memberId: MEMBER_ID,
      }),
    ).rejects.toThrow();
  });
});
