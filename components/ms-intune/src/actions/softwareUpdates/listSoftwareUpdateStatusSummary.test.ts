import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { msIntuneOAuth2 } from "../../connections";
import { updateSoftwareUpdateStatusSummaryExamplePayload } from "../../examplePayloads";
import { listSoftwareUpdateStatusSummary } from "./listSoftwareUpdateStatusSummary";
const HOST = "https://graph.microsoft.com";
const PATH = "/v1.0/deviceManagement/softwareUpdateStatusSummary";
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
const summary = updateSoftwareUpdateStatusSummaryExamplePayload.data;
const emptyFilters = {
  $select: undefined,
  $expand: undefined,
  $search: undefined,
  $format: undefined,
};
describe("listSoftwareUpdateStatusSummary", () => {
  afterEach(() => nock.cleanAll());
  test("returns the status summary when Fetch All is false", async () => {
    const scope = nock(HOST).get(PATH).reply(200, summary);
    const { result } = await invoke(listSoftwareUpdateStatusSummary, {
      connection,
      fetchAll: false,
      $skipToken: undefined,
      filters: emptyFilters,
    });
    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(summary);
  });
  test("follows @odata.nextLink and concatenates every page when Fetch All is true", async () => {
    const firstPage = { ...summary, id: "page-1" };
    const secondPage = { ...summary, id: "page-2" };
    nock(HOST)
      .get(PATH)
      .reply(200, {
        value: [firstPage],
        "@odata.nextLink": `${HOST}${PATH}?$skiptoken=page-2`,
      });
    nock(HOST)
      .get(PATH)
      .query({ $skiptoken: "page-2" })
      .reply(200, { value: [secondPage] });
    const { result } = await invoke(listSoftwareUpdateStatusSummary, {
      connection,
      fetchAll: true,
      $skipToken: undefined,
      filters: emptyFilters,
    });
    expect(result.data).toEqual({ value: [firstPage, secondPage] });
  });
  test("surfaces the failure when the API rejects the request", async () => {
    nock(HOST)
      .get(PATH)
      .reply(403, { error: { code: "Authorization_RequestDenied" } });
    await expect(
      invoke(listSoftwareUpdateStatusSummary, {
        connection,
        fetchAll: false,
        $skipToken: undefined,
        filters: emptyFilters,
      }),
    ).rejects.toThrow();
  });
});
