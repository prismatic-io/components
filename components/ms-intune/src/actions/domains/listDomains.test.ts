import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { msIntuneOAuth2 } from "../../connections";
import { listDomainsExamplePayload } from "../../examplePayloads";
import { listDomains } from "./listDomains";
const HOST = "https://graph.microsoft.com";
const PATH = "/v1.0/domains";
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
const listReply = listDomainsExamplePayload.data;
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
describe("listDomains", () => {
  afterEach(() => nock.cleanAll());
  test("forwards the OData pagination and filter params and returns the domain list", async () => {
    const scope = nock(HOST)
      .get(PATH)
      .query({ $top: "1", $filter: "isDefault eq true", $count: "false" })
      .reply(200, listReply);
    const { result } = await invoke(listDomains, {
      connection,
      pagination: { ...emptyPagination, $top: "1" },
      filters: { ...emptyFilters, $filter: "isDefault eq true" },
    });
    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(listReply);
  });
  test("surfaces the failure when the API rejects the request", async () => {
    nock(HOST)
      .get(PATH)
      .query({ $count: "false" })
      .reply(403, { error: { code: "Authorization_RequestDenied" } });
    await expect(
      invoke(listDomains, {
        connection,
        pagination: emptyPagination,
        filters: emptyFilters,
      }),
    ).rejects.toThrow();
  });
});
