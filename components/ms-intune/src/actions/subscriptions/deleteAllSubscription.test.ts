import { createConnection, invoke } from "@prismatic-io/spectral/testing";
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

  test("deletes every subscription on the notification URL and returns their IDs", async () => {
    const otherSubscription = {
      ...existingSubscription,
      id: "0fc0d6db-0073-42e5-a186-853da75fb308",
      notificationUrl: "https://example.com/other-webhook",
    };
    const listScope = nock(HOST)
      .get(PATH)
      .reply(200, { value: [existingSubscription, otherSubscription] });
    const deleteScope = nock(HOST)
      .delete(`${PATH}/${existingSubscription.id}`)
      .reply(204);

    const { result } = await invoke(deleteAllSubscription, {
      connection,
      notificationUrl: NOTIFICATION_URL,
    });

    expect(listScope.isDone()).toBe(true);
    expect(deleteScope.isDone()).toBe(true);
    expect(result.data).toEqual([existingSubscription.id]);
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
