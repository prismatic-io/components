import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { stripeConnection } from "../../connections/apiKey";
import {
  createSubscriptionExamplePayload,
  deleteSubscriptionExamplePayload,
  getSubscriptionExamplePayload,
  listSubscriptionsExamplePayload,
  updateSubscriptionExamplePayload,
} from "../../examplePayloads/subscriptions";
import { createSubscription } from "./createSubscription";
import { deleteSubscription } from "./deleteSubscription";
import { getSubscription } from "./getSubscription";
import { listSubscriptions } from "./listSubscriptions";
import { updateSubscription } from "./updateSubscription";
const BASE = "https://api.stripe.com";
const conn = createConnection(stripeConnection, { apiKey: "sk_test_123" });
const params = (values: Record<string, unknown>) => values as never;
const SUBSCRIPTION_ID = "sub_1MowQVLkdIwHu7ixeRlqHVzs";
afterEach(() => nock.cleanAll());
describe("createSubscription", () => {
  it("creates the subscription and returns it", async () => {
    const scope = nock(BASE)
      .post("/v1/subscriptions")
      .reply(200, createSubscriptionExamplePayload.data);
    const { result } = await invoke(
      createSubscription,
      params({
        customerId: "cus_NffrFeUfNV2Hib",
        priceId: "price_1MoBy5LkdIwHu7ixZhnattbH",
        quantity: 1,
        collectionMethod: "charge_automatically",
        metadata: {},
        fieldValues: {},
        stripeConnection: conn,
      }),
    );
    expect(result.data).toEqual(createSubscriptionExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  it("surfaces a Stripe error response", async () => {
    nock(BASE)
      .post("/v1/subscriptions")
      .reply(400, {
        error: { type: "invalid_request_error", message: "No such customer" },
      });
    await expect(
      invoke(
        createSubscription,
        params({
          customerId: "cus_missing",
          priceId: "price_1MoBy5LkdIwHu7ixZhnattbH",
          quantity: 1,
          metadata: {},
          fieldValues: {},
          stripeConnection: conn,
        }),
      ),
    ).rejects.toThrow("No such customer");
  });
});
describe("getSubscription", () => {
  it("returns the subscription for the supplied ID", async () => {
    const scope = nock(BASE)
      .get(`/v1/subscriptions/${SUBSCRIPTION_ID}`)
      .reply(200, getSubscriptionExamplePayload.data);
    const { result } = await invoke(
      getSubscription,
      params({ subscriptionId: SUBSCRIPTION_ID, stripeConnection: conn }),
    );
    expect(result.data).toEqual(getSubscriptionExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  it("surfaces a Stripe error response", async () => {
    nock(BASE)
      .get("/v1/subscriptions/sub_missing")
      .reply(404, {
        error: {
          type: "invalid_request_error",
          message: "No such subscription",
        },
      });
    await expect(
      invoke(
        getSubscription,
        params({ subscriptionId: "sub_missing", stripeConnection: conn }),
      ),
    ).rejects.toThrow("No such subscription");
  });
});
describe("listSubscriptions", () => {
  it("returns the subscription list", async () => {
    const scope = nock(BASE)
      .get("/v1/subscriptions")
      .query({ limit: "10" })
      .reply(200, listSubscriptionsExamplePayload.data);
    const { result } = await invoke(
      listSubscriptions,
      params({ pagination: { limit: 10 }, stripeConnection: conn }),
    );
    expect(result.data).toEqual(listSubscriptionsExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  it("surfaces a Stripe error response", async () => {
    nock(BASE)
      .get("/v1/subscriptions")
      .query(true)
      .reply(400, {
        error: { type: "invalid_request_error", message: "Invalid limit" },
      });
    await expect(
      invoke(
        listSubscriptions,
        params({ pagination: {}, stripeConnection: conn }),
      ),
    ).rejects.toThrow("Invalid limit");
  });
});
describe("updateSubscription", () => {
  it("updates the subscription and returns it", async () => {
    const scope = nock(BASE)
      .post(`/v1/subscriptions/${SUBSCRIPTION_ID}`)
      .reply(200, updateSubscriptionExamplePayload.data);
    const { result } = await invoke(
      updateSubscription,
      params({
        subscriptionId: SUBSCRIPTION_ID,
        subscriptionPriceId: "price_1MoBy5LkdIwHu7ixZhnattbH",
        quantity: 2,
        metadata: {},
        fieldValues: {},
        stripeConnection: conn,
      }),
    );
    expect(result.data).toEqual(updateSubscriptionExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  it("surfaces a Stripe error response", async () => {
    nock(BASE)
      .post("/v1/subscriptions/sub_missing")
      .reply(404, {
        error: {
          type: "invalid_request_error",
          message: "No such subscription",
        },
      });
    await expect(
      invoke(
        updateSubscription,
        params({
          subscriptionId: "sub_missing",
          quantity: 1,
          metadata: {},
          fieldValues: {},
          stripeConnection: conn,
        }),
      ),
    ).rejects.toThrow("No such subscription");
  });
});
describe("deleteSubscription", () => {
  it("cancels the subscription and returns it", async () => {
    const scope = nock(BASE)
      .delete(`/v1/subscriptions/${SUBSCRIPTION_ID}`)
      .reply(200, deleteSubscriptionExamplePayload.data);
    const { result } = await invoke(
      deleteSubscription,
      params({ subscriptionId: SUBSCRIPTION_ID, stripeConnection: conn }),
    );
    expect(result.data).toEqual(deleteSubscriptionExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  it("surfaces a Stripe error response", async () => {
    nock(BASE)
      .delete("/v1/subscriptions/sub_missing")
      .reply(404, {
        error: {
          type: "invalid_request_error",
          message: "No such subscription",
        },
      });
    await expect(
      invoke(
        deleteSubscription,
        params({ subscriptionId: "sub_missing", stripeConnection: conn }),
      ),
    ).rejects.toThrow("No such subscription");
  });
});
