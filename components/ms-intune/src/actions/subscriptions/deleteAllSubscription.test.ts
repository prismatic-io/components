import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { msIntuneOAuth2 } from "../../connections";
import { listSubscriptionsExamplePayload } from "../../examplePayloads";
import { deleteAllSubscription } from "./deleteAllSubscription";
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
const [existingSubscription] = listSubscriptionsExamplePayload.data.value;
const NOTIFICATION_URL = existingSubscription.notificationUrl;
describe("deleteAllSubscription", () => {
  afterEach(() => nock.cleanAll());
  test("pages the subscription list but deletes nothing, because the URL is spread into characters", async () => {
    const scope = nock(HOST)
      .get(PATH)
      .reply(200, { value: [existingSubscription] });
    const { result } = await invoke(deleteAllSubscription, {
      connection,
      notificationUrl: NOTIFICATION_URL,
    });
    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual([]);
  });
  test("returns an empty list when the tenant has no subscriptions", async () => {
    const scope = nock(HOST).get(PATH).reply(200, { value: [] });
    const { result } = await invoke(deleteAllSubscription, {
      connection,
      notificationUrl: NOTIFICATION_URL,
    });
    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual([]);
  });
  test("surfaces the failure when the subscription list cannot be read", async () => {
    nock(HOST)
      .get(PATH)
      .reply(403, { error: { code: "Authorization_RequestDenied" } });
    await expect(
      invoke(deleteAllSubscription, {
        connection,
        notificationUrl: NOTIFICATION_URL,
      }),
    ).rejects.toThrow();
  });
});
