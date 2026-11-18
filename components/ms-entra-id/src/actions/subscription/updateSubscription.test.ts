import { invoke } from "@prismatic-io/spectral/dist/testing";
import { updateSubscriptionExamplePayload } from "../../examplePayloads";
import {
  API_PATH,
  connection,
  graphError,
  mockGraph,
  resetNock,
} from "../../testHelpers";
import { updateSubscription } from "./updateSubscription";

const { id: SUBSCRIPTION_ID, expirationDateTime } =
  updateSubscriptionExamplePayload.data;

const params = {
  connection,
  subscriptionId: SUBSCRIPTION_ID,
  notificationUrl: undefined,
  expirationDateTime,
};

describe("updateSubscription", () => {
  afterEach(resetNock);

  test("happy path patches the subscription and leaves a blank Notification URL out", async () => {
    const scope = mockGraph()
      .patch(`${API_PATH}/subscriptions/${SUBSCRIPTION_ID}`, {
        expirationDateTime,
      })
      .reply(200, updateSubscriptionExamplePayload.data);
    const { result } = await invoke(updateSubscription, params);
    expect(result).toEqual(updateSubscriptionExamplePayload);
    expect(scope.isDone()).toBe(true);
  });

  test("error path surfaces the failure", async () => {
    mockGraph()
      .patch(`${API_PATH}/subscriptions/${SUBSCRIPTION_ID}`)
      .reply(400, graphError);
    await expect(invoke(updateSubscription, params)).rejects.toThrow();
  });
});
