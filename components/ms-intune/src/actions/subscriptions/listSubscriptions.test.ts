import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { msIntuneOAuth2 } from "../../connections";
import { listSubscriptionsExamplePayload } from "../../examplePayloads";
import { listSubscriptions } from "./listSubscriptions";
const HOST = "https://graph.microsoft.com";
const PATH = "/v1.0/subscriptions";
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
const listReply = listSubscriptionsExamplePayload.data;
const [firstSubscription] = listReply.value;
const secondSubscription = {
  ...firstSubscription,
  id: "7f105c7d-2dc5-4530-97cd-4e7ae6534c07",
};
describe("listSubscriptions", () => {
  afterEach(() => nock.cleanAll());
  test("returns a single page of subscriptions when Fetch All is false", async () => {
    const scope = nock(HOST).get(PATH).reply(200, listReply);
    const { result } = await invoke(listSubscriptions, {
      connection,
      fetchAll: false,
      $skipToken: undefined,
    });
    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(listReply);
  });
  test("follows @odata.nextLink and concatenates every page when Fetch All is true", async () => {
    nock(HOST)
      .get(PATH)
      .reply(200, {
        value: [firstSubscription],
        "@odata.nextLink": `${HOST}${PATH}?$skiptoken=page-2`,
      });
    nock(HOST)
      .get(PATH)
      .query({ $skiptoken: "page-2" })
      .reply(200, { value: [secondSubscription] });
    const { result } = await invoke(listSubscriptions, {
      connection,
      fetchAll: true,
      $skipToken: "page-1",
    });
    expect(result.data).toEqual({
      value: [firstSubscription, secondSubscription],
    });
  });
  test("surfaces the failure when the API rejects the request", async () => {
    nock(HOST)
      .get(PATH)
      .reply(403, { error: { code: "Authorization_RequestDenied" } });
    await expect(
      invoke(listSubscriptions, {
        connection,
        fetchAll: false,
        $skipToken: undefined,
      }),
    ).rejects.toThrow();
  });
});
