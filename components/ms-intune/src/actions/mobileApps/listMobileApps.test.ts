import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { msIntuneOAuth2 } from "../../connections";
import { listMobileAppsExamplePayload } from "../../examplePayloads";
import { listMobileApps } from "./listMobileApps";
const HOST = "https://graph.microsoft.com";
const PATH = "/v1.0/deviceAppManagement/mobileApps";
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
const listReply = listMobileAppsExamplePayload.data;
const [firstApp] = listReply.value;
const secondApp = { ...firstApp, id: "0177548a-548a-0177-8a54-77018a547702" };
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
describe("listMobileApps", () => {
  afterEach(() => nock.cleanAll());
  test("returns a single page of mobile apps when Fetch All is false", async () => {
    const scope = nock(HOST)
      .get(PATH)
      .query({ $count: "false", $top: "1", $skip: "0" })
      .reply(200, listReply);
    const { result } = await invoke(listMobileApps, {
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
        value: [firstApp],
        "@odata.nextLink": `${HOST}${PATH}?$skiptoken=page-2`,
      });
    nock(HOST)
      .get(PATH)
      .query({ $skiptoken: "page-2" })
      .reply(200, { value: [secondApp] });
    const { result } = await invoke(listMobileApps, {
      connection,
      fetchAll: true,
      pagination: { ...emptyPagination, $top: "1", $skip: "0" },
      filters: emptyFilters,
    });
    expect(result.data).toEqual({ value: [firstApp, secondApp] });
  });
  test("surfaces the failure when the API rejects the request", async () => {
    nock(HOST)
      .get(PATH)
      .query({ $count: "false" })
      .reply(403, { error: { code: "Authorization_RequestDenied" } });
    await expect(
      invoke(listMobileApps, {
        connection,
        fetchAll: false,
        pagination: emptyPagination,
        filters: emptyFilters,
      }),
    ).rejects.toThrow();
  });
});
