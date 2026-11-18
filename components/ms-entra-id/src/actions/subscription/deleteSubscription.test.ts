import { invoke } from "@prismatic-io/spectral/dist/testing";
import { getSubscriptionExamplePayload } from "../../examplePayloads";
import {
  API_PATH,
  connection,
  graphError,
  mockGraph,
  resetNock,
} from "../../testHelpers";
import { deleteSubscription } from "./deleteSubscription";

const SUBSCRIPTION_ID = getSubscriptionExamplePayload.data.id;

describe("deleteSubscription", () => {
  afterEach(resetNock);

  test("happy path returns the delete record on 204", async () => {
    const scope = mockGraph()
      .delete(`${API_PATH}/subscriptions/${SUBSCRIPTION_ID}`)
      .reply(204);
    const { result } = await invoke(deleteSubscription, {
      connection,
      subscriptionId: SUBSCRIPTION_ID,
    });
    expect(result).toEqual({
      data: {
        success: true,
        id: SUBSCRIPTION_ID,
        message: "Subscription deleted successfully",
      },
    });
    expect(scope.isDone()).toBe(true);
  });

  test("error path surfaces the failure", async () => {
    mockGraph()
      .delete(`${API_PATH}/subscriptions/${SUBSCRIPTION_ID}`)
      .reply(404, graphError);
    await expect(
      invoke(deleteSubscription, {
        connection,
        subscriptionId: SUBSCRIPTION_ID,
      }),
    ).rejects.toThrow();
  });
});
