import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { msIntuneOAuth2 } from "../../connections";
import { NO_RESPONSE_SUCCESSFULL_PAYLOAD } from "../../constants";
import { deleteGroupExamplePayload } from "../../examplePayloads";
import { deleteGroup } from "./deleteGroup";
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
describe("deleteGroup", () => {
  afterEach(() => nock.cleanAll());
  test("deletes the group and returns the fixed success payload", async () => {
    const scope = nock(HOST).delete(PATH).reply(204);
    const { result } = await invoke(deleteGroup, {
      connection,
      groupId: GROUP_ID,
    });
    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(NO_RESPONSE_SUCCESSFULL_PAYLOAD);
    expect(result.data).toEqual(deleteGroupExamplePayload.data);
  });
  test("surfaces the failure when the group cannot be deleted", async () => {
    nock(HOST)
      .delete(PATH)
      .reply(404, { error: { code: "Request_ResourceNotFound" } });
    await expect(
      invoke(deleteGroup, { connection, groupId: GROUP_ID }),
    ).rejects.toThrow();
  });
});
