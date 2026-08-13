import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { msIntuneOAuth2 } from "../../connections";
import { MANAGED_APPS_FILTER } from "../../constants";
import { listManagedAppsExamplePayload } from "../../examplePayloads";
import { listManagedApps } from "./listManagedApps";
const HOST = "https://graph.microsoft.com";
const PATH = "/beta/deviceAppManagement/mobileApps";
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
const listReply = listManagedAppsExamplePayload.data;
const [firstApp] = listReply.value;
const secondApp = { ...firstApp, id: "4bdc5d30-5d30-4bdc-305d-dc4b305ddc4c" };
const emptyPagination = {
  $top: undefined,
  $skip: undefined,
  $skipToken: undefined,
};
const defaultFilters = {
  $filter: MANAGED_APPS_FILTER,
  $select: undefined,
  $expand: undefined,
  $orderBy: undefined,
  $count: false,
  $search: undefined,
  $format: undefined,
};
describe("listManagedApps", () => {
  afterEach(() => nock.cleanAll());
  test("forwards the default managed-app filter and returns a single page when Fetch All is false", async () => {
    const scope = nock(HOST)
      .get(PATH)
      .query({ $filter: MANAGED_APPS_FILTER, $count: "false" })
      .reply(200, listReply);
    const { result } = await invoke(listManagedApps, {
      connection,
      fetchAll: false,
      pagination: emptyPagination,
      filters: defaultFilters,
    });
    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(listReply);
  });
  test("follows @odata.nextLink and concatenates every page when Fetch All is true", async () => {
    nock(HOST)
      .get(PATH)
      .query({ $filter: MANAGED_APPS_FILTER, $count: "false" })
      .reply(200, {
        value: [firstApp],
        "@odata.nextLink": `${HOST}${PATH}?$skiptoken=page-2`,
      });
    nock(HOST)
      .get(PATH)
      .query({ $skiptoken: "page-2" })
      .reply(200, { value: [secondApp] });
    const { result } = await invoke(listManagedApps, {
      connection,
      fetchAll: true,
      pagination: emptyPagination,
      filters: defaultFilters,
    });
    expect(result.data).toEqual({ value: [firstApp, secondApp] });
  });
  test("surfaces the failure when the API rejects the request", async () => {
    nock(HOST)
      .get(PATH)
      .query({ $count: "false" })
      .reply(403, { error: { code: "Authorization_RequestDenied" } });
    await expect(
      invoke(listManagedApps, {
        connection,
        fetchAll: false,
        pagination: emptyPagination,
        filters: { ...defaultFilters, $filter: undefined },
      }),
    ).rejects.toThrow();
  });
});
