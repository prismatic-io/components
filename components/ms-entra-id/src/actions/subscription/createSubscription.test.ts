import { invoke } from "@prismatic-io/spectral/dist/testing";
import { createSubscriptionExamplePayload } from "../../examplePayloads";
import {
  API_PATH,
  connection,
  graphError,
  mockGraph,
  resetNock,
} from "../../testHelpers";
import { createSubscription } from "./createSubscription";

const {
  changeType,
  notificationUrl,
  resource,
  expirationDateTime,
  clientState,
} = createSubscriptionExamplePayload.data;

const params = {
  connection,
  changeType,
  notificationUrl,
  resource,
  expirationDateTime,
  additionalProperties: { clientState },
  headers: { "x-custom": "abc" },
};

describe("createSubscription", () => {
  afterEach(resetNock);

  test("happy path posts the subscription with additional properties and headers", async () => {
    const scope = mockGraph()
      .matchHeader("x-custom", "abc")
      .post(`${API_PATH}/subscriptions`, {
        changeType,
        notificationUrl,
        resource,
        expirationDateTime,
        clientState,
      })
      .reply(201, createSubscriptionExamplePayload.data);
    const { result } = await invoke(createSubscription, params);
    expect(result).toEqual(createSubscriptionExamplePayload);
    expect(scope.isDone()).toBe(true);
  });

  test("error path surfaces the failure", async () => {
    mockGraph().post(`${API_PATH}/subscriptions`).reply(400, graphError);
    await expect(invoke(createSubscription, params)).rejects.toThrow();
  });
});
