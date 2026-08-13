import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { msIntuneOAuth2 } from "../../connections";
import { listMobileAppAssignmentsExamplePayload } from "../../examplePayloads";
import { listMobileAppAssignments } from "./listMobileAppAssignments";
const HOST = "https://graph.microsoft.com";
const MOBILE_APP_ID = "0177548a-548a-0177-8a54-77018a547701";
const PATH = `/v1.0/deviceAppManagement/mobileApps/${MOBILE_APP_ID}/assignments`;
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
const listReply = listMobileAppAssignmentsExamplePayload.data;
const [firstAssignment] = listReply.value;
const secondAssignment = {
  ...firstAssignment,
  id: "591620b7-20b7-5916-b720-1659b7201660",
};
const emptyOdataParams = {
  $filter: undefined,
  $select: undefined,
  $expand: undefined,
  $orderBy: undefined,
  $top: undefined,
  $skip: undefined,
  $count: false,
  $search: undefined,
  $format: undefined,
  $skipToken: undefined,
};
describe("listMobileAppAssignments", () => {
  afterEach(() => nock.cleanAll());
  test("returns a single page of assignments when Fetch All is false", async () => {
    const scope = nock(HOST)
      .get(PATH)
      .query({ $count: "false", $top: "1" })
      .reply(200, listReply);
    const { result } = await invoke(listMobileAppAssignments, {
      connection,
      mobileAppId: MOBILE_APP_ID,
      fetchAll: false,
      ...emptyOdataParams,
      $top: "1",
    });
    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(listReply);
  });
  test("follows @odata.nextLink and concatenates every page when Fetch All is true", async () => {
    nock(HOST)
      .get(PATH)
      .query({ $count: "false" })
      .reply(200, {
        value: [firstAssignment],
        "@odata.nextLink": `${HOST}${PATH}?$skiptoken=page-2`,
      });
    nock(HOST)
      .get(PATH)
      .query({ $skiptoken: "page-2" })
      .reply(200, { value: [secondAssignment] });
    const { result } = await invoke(listMobileAppAssignments, {
      connection,
      mobileAppId: MOBILE_APP_ID,
      fetchAll: true,
      ...emptyOdataParams,
      $top: "1",
    });
    expect(result.data).toEqual({
      value: [firstAssignment, secondAssignment],
    });
  });
  test("surfaces the failure when the mobile app does not exist", async () => {
    nock(HOST)
      .get(PATH)
      .query({ $count: "false" })
      .reply(404, { error: { code: "ResourceNotFound" } });
    await expect(
      invoke(listMobileAppAssignments, {
        connection,
        mobileAppId: MOBILE_APP_ID,
        fetchAll: false,
        ...emptyOdataParams,
      }),
    ).rejects.toThrow();
  });
});
