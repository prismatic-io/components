import {
  createConnection,
  invokeDataSource,
} from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { msIntuneOAuth2 } from "../connections";
import { listSubscriptionsExamplePayload } from "../examplePayloads";
import { selectSubscription } from "./selectSubscription";
const HOST = "https://graph.microsoft.com";
const ACCESS_TOKEN = "test-access-token";
const PATH = "/v1.0/subscriptions";
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
describe("selectSubscription", () => {
  afterEach(() => nock.cleanAll());
  test("maps the subscription list to composed label/key elements wrapped in result", async () => {
    nock(HOST).get(PATH).reply(200, listReply);
    const { result } = await invokeDataSource(selectSubscription, {
      connection,
    });
    expect(Array.isArray(result)).toBe(true);
    expect(result).toEqual([
      {
        label: "Users (updated,deleted)",
        key: "0fc0d6db-0073-42e5-a186-853da75fb308",
      },
    ]);
    for (const element of result) {
      expect(element).toHaveProperty("label");
      expect(element).toHaveProperty("key");
    }
  });
  test("returns an empty result array when the API returns no subscriptions", async () => {
    nock(HOST).get(PATH).reply(200, { value: [] });
    const { result } = await invokeDataSource(selectSubscription, {
      connection,
    });
    expect(result).toEqual([]);
  });
});
