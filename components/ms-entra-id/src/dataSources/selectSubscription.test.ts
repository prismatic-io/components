import { invokeDataSource } from "@prismatic-io/spectral/dist/testing";
import { listSubscriptionsExamplePayload } from "../examplePayloads";
import { API_PATH, connection, mockGraph, resetNock } from "../testHelpers";
import { selectSubscription } from "./selectSubscription";

describe("selectSubscription", () => {
  afterEach(resetNock);

  test("maps subscriptions to { key, label } elements labeled by resource", async () => {
    mockGraph()
      .get(`${API_PATH}/subscriptions`)
      .reply(200, listSubscriptionsExamplePayload.data);
    const { result } = await invokeDataSource(selectSubscription, {
      connection,
    });
    expect(result).toEqual(
      listSubscriptionsExamplePayload.data.value.map(({ id, resource }) => ({
        key: id,
        label: resource,
      })),
    );
  });

  test("returns an empty list when there are no subscriptions", async () => {
    mockGraph().get(`${API_PATH}/subscriptions`).reply(200, { value: [] });
    const { result } = await invokeDataSource(selectSubscription, {
      connection,
    });
    expect(result).toEqual([]);
  });
});
