import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { msIntuneOAuth2 } from "../../connections";
import { listDirectoryAuditExamplePayload } from "../../examplePayloads";
import { listDirectoryAudits } from "./listDirectoryAudits";
const HOST = "https://graph.microsoft.com";
const PATH = "/v1.0/auditLogs/directoryaudits";
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
const listReply = listDirectoryAuditExamplePayload.data;
const [firstAudit] = listReply.value;
const secondAudit = { ...firstAudit, id: "id-2" };
const emptyPagination = { $top: undefined, $skipToken: undefined };
const emptyFilters = { $filter: undefined, $orderBy: undefined };
describe("listDirectoryAudits", () => {
  afterEach(() => nock.cleanAll());
  test("returns a single page of directory audits when Fetch All is false", async () => {
    nock(HOST).get(PATH).reply(200, listReply);
    const { result } = await invoke(listDirectoryAudits, {
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
      .reply(200, {
        "@odata.context": listReply["@odata.context"],
        value: [firstAudit],
        "@odata.nextLink": `${HOST}${PATH}?$skiptoken=page-2`,
      });
    nock(HOST)
      .get(PATH)
      .query({ $skiptoken: "page-2" })
      .reply(200, {
        "@odata.context": listReply["@odata.context"],
        value: [secondAudit],
      });
    const { result } = await invoke(listDirectoryAudits, {
      connection,
      fetchAll: true,
      pagination: emptyPagination,
      filters: emptyFilters,
    });
    expect(result.data).toEqual({
      "@odata.context": listReply["@odata.context"],
      value: [firstAudit, secondAudit],
    });
  });
  test("surfaces the failure when the API rejects the request", async () => {
    nock(HOST)
      .get(PATH)
      .reply(403, { error: { code: "Authorization_RequestDenied" } });
    await expect(
      invoke(listDirectoryAudits, {
        connection,
        fetchAll: false,
        pagination: emptyPagination,
        filters: emptyFilters,
      }),
    ).rejects.toThrow();
  });
});
