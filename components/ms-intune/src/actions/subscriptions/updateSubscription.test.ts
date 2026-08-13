import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { msIntuneOAuth2 } from "../../connections";
import { getSubscriptionExamplePayload } from "../../examplePayloads";
import { updateSubscription } from "./updateSubscription";
const HOST = "https://graph.microsoft.com";
const SUBSCRIPTION_ID = "7f105c7d-2dc5-4530-97cd-4e7ae6534c07";
const PATH = `/v1.0/subscriptions/${SUBSCRIPTION_ID}`;
const ACCESS_TOKEN = "test-access-token";
const NOTIFICATION_URL = "https://example.com/webhook";
const EXPIRATION = "2025-12-31T23:59:59.0000000Z";
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
describe("updateSubscription", () => {
  afterEach(() => nock.cleanAll());
  test("patches the expiration and notification URL and returns the subscription", async () => {
    const scope = nock(HOST)
      .patch(PATH, {
        expirationDateTime: EXPIRATION,
        notificationUrl: NOTIFICATION_URL,
      })
      .reply(200, subscription);
    const { result } = await invoke(updateSubscription, {
      connection,
      subscriptionId: SUBSCRIPTION_ID,
      expirationDateTime: EXPIRATION,
      notificationUrl: NOTIFICATION_URL,
    });
    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(subscription);
  });
  test("surfaces the failure when the API rejects the update", async () => {
    nock(HOST)
      .patch(PATH)
      .reply(400, { error: { code: "InvalidRequest" } });
    await expect(
      invoke(updateSubscription, {
        connection,
        subscriptionId: SUBSCRIPTION_ID,
        expirationDateTime: EXPIRATION,
        notificationUrl: NOTIFICATION_URL,
      }),
    ).rejects.toThrow();
  });
});
