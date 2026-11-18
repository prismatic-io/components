import { invoke } from "@prismatic-io/spectral/dist/testing";
import { getSubscriptionExamplePayload } from "../../examplePayloads";
import {
  API_PATH,
  connection,
  graphError,
  mockGraph,
  resetNock,
} from "../../testHelpers";
import { getSubscription } from "./getSubscription";

const SUBSCRIPTION_ID = getSubscriptionExamplePayload.data.id;

describe("getSubscription", () => {
  afterEach(resetNock);

  test("happy path returns the subscription", async () => {
    mockGraph()
      .get(`${API_PATH}/subscriptions/${SUBSCRIPTION_ID}`)
      .reply(200, getSubscriptionExamplePayload.data);
    const { result } = await invoke(getSubscription, {
      connection,
      subscriptionId: SUBSCRIPTION_ID,
    });
    expect(result).toEqual(getSubscriptionExamplePayload);
  });

  test("error path surfaces the failure", async () => {
    mockGraph()
      .get(`${API_PATH}/subscriptions/${SUBSCRIPTION_ID}`)
      .reply(404, graphError);
    await expect(
      invoke(getSubscription, { connection, subscriptionId: SUBSCRIPTION_ID }),
    ).rejects.toThrow();
  });
});
