import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { msIntuneOAuth2 } from "../../connections";
import { listGroupsExamplePayload } from "../../examplePayloads";
import { listGroups } from "./listGroups";
const HOST = "https://graph.microsoft.com";
const PATH = "/v1.0/groups";
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
const listReply = listGroupsExamplePayload.data;
const [firstGroup] = listReply.value;
const secondGroup = {
  ...firstGroup,
  id: "45b7d2e7-b882-4a80-ba97-10b7a63b8fa5",
};
const emptyFilters = {
  $count: false,
  $expand: undefined,
  $filter: undefined,
  $orderBy: undefined,
  $search: undefined,
  $select: undefined,
};
describe("listGroups", () => {
  afterEach(() => nock.cleanAll());
  test("sends the eventual-consistency header and returns a single page when Fetch All is false", async () => {
    const scope = nock(HOST)
      .matchHeader("ConsistencyLevel", "eventual")
      .get(PATH)
      .query({ $count: "false", $top: "1" })
      .reply(200, listReply);
    const { result } = await invoke(listGroups, {
      connection,
      fetchAll: false,
      $top: "1",
      filters: emptyFilters,
    });
    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(listReply);
  });
  test("follows @odata.nextLink and concatenates every page when Fetch All is true", async () => {
    nock(HOST)
      .get(PATH)
      .query({ $count: "false" })
      .reply(200, {
        value: [firstGroup],
        "@odata.nextLink": `${HOST}${PATH}?$skiptoken=page-2`,
      });
    nock(HOST)
      .get(PATH)
      .query({ $skiptoken: "page-2" })
      .reply(200, { value: [secondGroup] });
    const { result } = await invoke(listGroups, {
      connection,
      fetchAll: true,
      $top: "1",
      filters: emptyFilters,
    });
    expect(result.data).toEqual({ value: [firstGroup, secondGroup] });
  });
  test("surfaces the failure when the API rejects the request", async () => {
    nock(HOST)
      .get(PATH)
      .query({ $count: "false" })
      .reply(403, { error: { code: "Authorization_RequestDenied" } });
    await expect(
      invoke(listGroups, {
        connection,
        fetchAll: false,
        $top: undefined,
        filters: emptyFilters,
      }),
    ).rejects.toThrow();
  });
});
