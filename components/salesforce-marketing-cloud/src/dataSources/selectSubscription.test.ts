import {
  createConnection,
  invokeDataSource,
} from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { sfmcOAuth2ClientCredentials } from "../connections/sfmcOAuth2ClientCredentials";
import { listSubscriptionsExamplePayload } from "../examplePayloads";
import { selectSubscription } from "./selectSubscription";
const BASE_URL = "https://mc-test.rest.marketingcloudapis.com";
const ENS_SUBSCRIPTIONS_PATH = "/platform/v1/ens-subscriptions";
const connection = createConnection(
  sfmcOAuth2ClientCredentials,
  {},
  { access_token: "test-access-token", rest_instance_url: BASE_URL },
);
describe("selectSubscription", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  test("maps the listed subscriptions to label and key elements", async () => {
    nock(BASE_URL)
      .get(ENS_SUBSCRIPTIONS_PATH)
      .reply(200, listSubscriptionsExamplePayload.data);
    const { result } = await invokeDataSource(selectSubscription, {
      connection,
    });
    expect(result).toEqual([
      {
        label: "Example Subscription",
        key: "6807835e-a82f-498e-a0b9-55d6bde4814d",
      },
    ]);
  });
  test("returns an empty array when the API reports no subscriptions", async () => {
    nock(BASE_URL).get(ENS_SUBSCRIPTIONS_PATH).reply(200, []);
    const { result } = await invokeDataSource(selectSubscription, {
      connection,
    });
    expect(result).toEqual([]);
  });
});
