import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { msIntuneOAuth2 } from "../../connections";
import { listUsersExamplePayload } from "../../examplePayloads";
import { listUsers } from "./listUsers";
const HOST = "https://graph.microsoft.com";
const PATH = "/v1.0/users";
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
const listReply = listUsersExamplePayload.data;
const [firstUser, secondUser] = listReply.value;
const emptyPagination = {
  $top: undefined,
  $skip: undefined,
  $skipToken: undefined,
};
const emptyFilters = {
  $filter: undefined,
  $select: undefined,
  $expand: undefined,
  $orderBy: undefined,
  $count: false,
  $search: undefined,
  $format: undefined,
};
describe("listUsers", () => {
  afterEach(() => nock.cleanAll());
  test("returns a single page of users when Fetch All is false", async () => {
    const scope = nock(HOST)
      .get(PATH)
      .query({ $count: "false", $top: "1", $skip: "0" })
      .reply(200, listReply);
    const { result } = await invoke(listUsers, {
      connection,
      fetchAll: false,
      pagination: { ...emptyPagination, $top: "1", $skip: "0" },
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
        value: [firstUser],
        "@odata.nextLink": `${HOST}${PATH}?$skiptoken=page-2`,
      });
    nock(HOST)
      .get(PATH)
      .query({ $skiptoken: "page-2" })
      .reply(200, { value: [secondUser] });
    const { result } = await invoke(listUsers, {
      connection,
      fetchAll: true,
      pagination: { ...emptyPagination, $top: "1", $skip: "0" },
      filters: emptyFilters,
    });
    expect(result.data).toEqual({ value: [firstUser, secondUser] });
  });
  test("surfaces the failure when the API rejects the request", async () => {
    nock(HOST)
      .get(PATH)
      .query({ $count: "false" })
      .reply(403, { error: { code: "Authorization_RequestDenied" } });
    await expect(
      invoke(listUsers, {
        connection,
        fetchAll: false,
        pagination: emptyPagination,
        filters: emptyFilters,
      }),
    ).rejects.toThrow();
  });
});
