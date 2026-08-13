import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { msIntuneOAuth2 } from "../../connections";
import { listManagedDevicesExamplePayload } from "../../examplePayloads";
import { listManagedDevices } from "./listManagedDevices";
const HOST = "https://graph.microsoft.com";
const PATH = "/v1.0/deviceManagement/managedDevices";
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
const listReply = listManagedDevicesExamplePayload.data;
const [firstDevice] = listReply.value;
const secondDevice = {
  ...firstDevice,
  id: "705c034c-034c-705c-4c03-5c704c035c71",
};
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
describe("listManagedDevices", () => {
  afterEach(() => nock.cleanAll());
  test("returns a single page of managed devices when Fetch All is false", async () => {
    nock(HOST).get(PATH).query({ $count: "false" }).reply(200, listReply);
    const { result } = await invoke(listManagedDevices, {
      connection,
      fetchAll: false,
      pagination: emptyPagination,
      filters: emptyFilters,
    });
    expect(result.data).toEqual(listReply);
  });
  test("follows @odata.nextLink and concatenates every page when Fetch All is true", async () => {
    nock(HOST)
      .get(PATH)
      .query({ $count: "false" })
      .reply(200, {
        value: [firstDevice],
        "@odata.nextLink": `${HOST}${PATH}?$skiptoken=page-2`,
      });
    nock(HOST)
      .get(PATH)
      .query({ $skiptoken: "page-2" })
      .reply(200, { value: [secondDevice] });
    const { result } = await invoke(listManagedDevices, {
      connection,
      fetchAll: true,
      pagination: emptyPagination,
      filters: emptyFilters,
    });
    expect(result.data).toEqual({ value: [firstDevice, secondDevice] });
  });
  test("surfaces the failure when the API rejects the request", async () => {
    nock(HOST)
      .get(PATH)
      .query({ $count: "false" })
      .reply(403, { error: { code: "Authorization_RequestDenied" } });
    await expect(
      invoke(listManagedDevices, {
        connection,
        fetchAll: false,
        pagination: emptyPagination,
        filters: emptyFilters,
      }),
    ).rejects.toThrow();
  });
});
