import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { msIntuneOAuth2 } from "../../connections";
import { getSubscriptionExamplePayload } from "../../examplePayloads";
import { getSubscription } from "./getSubscription";
const HOST = "https://graph.microsoft.com";
const SUBSCRIPTION_ID = "7f105c7d-2dc5-4530-97cd-4e7ae6534c07";
const PATH = `/v1.0/subscriptions/${SUBSCRIPTION_ID}`;
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
const [subscription] = getSubscriptionExamplePayload.data;
describe("getSubscription", () => {
  afterEach(() => nock.cleanAll());
  test("returns the subscription for the supplied ID", async () => {
    const scope = nock(HOST).get(PATH).reply(200, subscription);
    const { result } = await invoke(getSubscription, {
      connection,
      subscriptionId: SUBSCRIPTION_ID,
    });
    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(subscription);
  });
  test("surfaces the failure when the subscription does not exist", async () => {
    nock(HOST)
      .get(PATH)
      .reply(404, { error: { code: "ResourceNotFound" } });
    await expect(
      invoke(getSubscription, {
        connection,
        subscriptionId: SUBSCRIPTION_ID,
      }),
    ).rejects.toThrow();
  });
});
