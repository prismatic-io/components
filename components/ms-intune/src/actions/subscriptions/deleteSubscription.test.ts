import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { msIntuneOAuth2 } from "../../connections";
import { deleteSubscriptionExamplePayload } from "../../examplePayloads";
import { deleteSubscription } from "./deleteSubscription";
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
describe("deleteSubscription", () => {
  afterEach(() => nock.cleanAll());
  test("deletes the subscription and returns the fixed success payload", async () => {
    const scope = nock(HOST).delete(PATH).reply(204);
    const { result } = await invoke(deleteSubscription, {
      connection,
      subscriptionId: SUBSCRIPTION_ID,
    });
    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(deleteSubscriptionExamplePayload.data);
  });
  test("surfaces the failure when the subscription does not exist", async () => {
    nock(HOST)
      .delete(PATH)
      .reply(404, { error: { code: "ResourceNotFound" } });
    await expect(
      invoke(deleteSubscription, {
        connection,
        subscriptionId: SUBSCRIPTION_ID,
      }),
    ).rejects.toThrow();
  });
});
