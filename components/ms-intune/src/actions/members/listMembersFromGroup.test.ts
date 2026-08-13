import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { msIntuneOAuth2 } from "../../connections";
import { listMembersExamplePayload } from "../../examplePayloads";
import { listMembersFromGroup } from "./listMembersFromGroup";
const HOST = "https://graph.microsoft.com";
const GROUP_ID = "02bd9fd6-8f93-4758-87c3-1fb73740a315";
const PATH = `/v1.0/groups/${GROUP_ID}/members`;
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
const listReply = listMembersExamplePayload.data;
const [firstMember] = listReply.value;
const secondMember = {
  id: "66666666-7777-8888-9999-000000000000",
  mail: "user2@contoso.com",
};
const emptyFilters = {
  $filter: undefined,
  $count: false,
  $select: undefined,
  $search: undefined,
  $expand: undefined,
};
describe("listMembersFromGroup", () => {
  afterEach(() => nock.cleanAll());
  test("returns a single page of members when Fetch All is false", async () => {
    const scope = nock(HOST)
      .get(PATH)
      .query({ $count: "false", $select: "id,mail" })
      .reply(200, listReply);
    const { result } = await invoke(listMembersFromGroup, {
      connection,
      fetchAll: false,
      groupId: GROUP_ID,
      $top: undefined,
      filters: { ...emptyFilters, $select: "id,mail" },
    });
    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(listReply);
  });
  test("follows @odata.nextLink and concatenates every page when Fetch All is true", async () => {
    nock(HOST)
      .get(PATH)
      .query({ $count: "false" })
      .reply(200, {
        value: [firstMember],
        "@odata.nextLink": `${HOST}${PATH}?$skiptoken=page-2`,
      });
    nock(HOST)
      .get(PATH)
      .query({ $skiptoken: "page-2" })
      .reply(200, { value: [secondMember] });
    const { result } = await invoke(listMembersFromGroup, {
      connection,
      fetchAll: true,
      groupId: GROUP_ID,
      $top: "1",
      filters: emptyFilters,
    });
    expect(result.data).toEqual({ value: [firstMember, secondMember] });
  });
  test("surfaces the failure when the group does not exist", async () => {
    nock(HOST)
      .get(PATH)
      .query({ $count: "false" })
      .reply(404, { error: { code: "Request_ResourceNotFound" } });
    await expect(
      invoke(listMembersFromGroup, {
        connection,
        fetchAll: false,
        groupId: GROUP_ID,
        $top: undefined,
        filters: emptyFilters,
      }),
    ).rejects.toThrow();
  });
});
