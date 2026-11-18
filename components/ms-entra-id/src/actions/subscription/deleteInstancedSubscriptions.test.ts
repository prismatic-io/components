import { invoke } from "@prismatic-io/spectral/dist/testing";
import { listSubscriptionsExamplePayload } from "../../examplePayloads";
import {
  API_PATH,
  connection,
  graphError,
  mockGraph,
  resetNock,
} from "../../testHelpers";
import { deleteInstancedSubscriptions } from "./deleteInstancedSubscriptions";

const [instanceSubscription] = listSubscriptionsExamplePayload.data.value;
const otherSubscription = {
  ...instanceSubscription,
  id: "other-subscription-id",
  notificationUrl: "https://hooks.example.com/other-instance",
};
const context = {
  webhookUrls: { Flow: instanceSubscription.notificationUrl },
};

describe("deleteInstancedSubscriptions", () => {
  afterEach(resetNock);

  test("happy path deletes only the subscriptions pointing at this instance", async () => {
    const scope = mockGraph()
      .get(`${API_PATH}/subscriptions`)
      .reply(200, {
        ...listSubscriptionsExamplePayload.data,
        value: [instanceSubscription, otherSubscription],
      })
      .delete(`${API_PATH}/subscriptions/${instanceSubscription.id}`)
      .reply(204);
    const { result } = await invoke(
      deleteInstancedSubscriptions,
      { connection },
      context,
    );
    expect(result).toEqual({
      data: { subscriptionsRemoved: [instanceSubscription.id] },
    });
    expect(scope.isDone()).toBe(true);
  });

  test("error path surfaces the failure", async () => {
    mockGraph()
      .get(`${API_PATH}/subscriptions`)
      .reply(200, listSubscriptionsExamplePayload.data)
      .delete(`${API_PATH}/subscriptions/${instanceSubscription.id}`)
      .reply(404, graphError);
    await expect(
      invoke(deleteInstancedSubscriptions, { connection }, context),
    ).rejects.toThrow();
  });
});
