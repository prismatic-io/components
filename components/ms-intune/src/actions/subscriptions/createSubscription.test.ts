import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { msIntuneOAuth2 } from "../../connections";
import { getSubscriptionExamplePayload } from "../../examplePayloads";
import { createSubscription } from "./createSubscription";
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
const [createdSubscription] = getSubscriptionExamplePayload.data;
const NOTIFICATION_URL = "https://example.com/webhook";
const LIFECYCLE_URL = "https://example.com/lifecycle";
const EXPIRATION = "2025-12-31T23:59:59.0000000Z";
const baseParams = {
  connection,
  changeType: ["created"],
  notificationUrl: NOTIFICATION_URL,
  resource: "users",
  expirationDateTime: EXPIRATION,
  lifecycleNotificationUrl: LIFECYCLE_URL,
  bodyFields: { clientState: "secret" },
};
describe("createSubscription", () => {
  afterEach(() => nock.cleanAll());
  test("lists existing subscriptions, then creates one per change type", async () => {
    const listScope = nock(HOST).get(PATH).reply(200, { value: [] });
    const createScope = nock(HOST)
      .post(PATH, {
        changeType: "created",
        notificationUrl: NOTIFICATION_URL,
        resource: "users",
        expirationDateTime: EXPIRATION,
        clientState: "secret",
        lifecycleNotificationUrl: LIFECYCLE_URL,
      })
      .reply(201, createdSubscription);
    const { result } = await invoke(createSubscription, baseParams);
    expect(listScope.isDone()).toBe(true);
    expect(createScope.isDone()).toBe(true);
    expect(result.data).toEqual([createdSubscription]);
  });
  test("surfaces the failure when the API rejects the subscription", async () => {
    nock(HOST).get(PATH).reply(200, { value: [] });
    nock(HOST)
      .post(PATH)
      .reply(400, { error: { code: "InvalidRequest" } });
    await expect(invoke(createSubscription, baseParams)).rejects.toThrow();
  });
});
