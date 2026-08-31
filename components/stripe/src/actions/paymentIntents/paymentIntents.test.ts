import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { stripeConnection } from "../../connections/apiKey";
import {
  cancelPaymentIntentExamplePayload,
  capturePaymentIntentExamplePayload,
  confirmPaymentIntentExamplePayload,
  createPaymentIntentExamplePayload,
  getPaymentIntentExamplePayload,
  listPaymentIntentsExamplePayload,
  searchPaymentIntentsExamplePayload,
  updatePaymentIntentExamplePayload,
} from "../../examplePayloads/paymentIntents";
import { cancelPaymentIntent } from "./cancelPaymentIntent";
import { capturePaymentIntent } from "./capturePaymentIntent";
import { confirmPaymentIntent } from "./confirmPaymentIntent";
import { createPaymentIntent } from "./createPaymentIntent";
import { getPaymentIntent } from "./getPaymentIntent";
import { listPaymentIntents } from "./listPaymentIntents";
import { searchPaymentIntent } from "./searchPaymentIntent";
import { updatePaymentIntent } from "./updatePaymentIntent";
const BASE = "https://api.stripe.com";
const conn = createConnection(stripeConnection, { apiKey: "sk_test_123" });
const params = (values: Record<string, unknown>) => values as never;
const PI_ID = "pi_3MmlLrLkdIwHu7ix01zsk9pV";
afterEach(() => nock.cleanAll());
describe("createPaymentIntent", () => {
  it("creates the payment intent and returns it", async () => {
    const scope = nock(BASE)
      .post("/v1/payment_intents")
      .reply(200, createPaymentIntentExamplePayload.data);
    const { result } = await invoke(
      createPaymentIntent,
      params({
        amount: 2000,
        currency: "usd",
        metadata: {},
        transferOptions: {},
        additionalFields: {},
        stripeConnection: conn,
      }),
    );
    expect(result.data).toEqual(createPaymentIntentExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  it("surfaces a Stripe error response", async () => {
    nock(BASE)
      .post("/v1/payment_intents")
      .reply(400, {
        error: {
          type: "invalid_request_error",
          message: "Invalid currency: xyz",
        },
      });
    await expect(
      invoke(
        createPaymentIntent,
        params({
          amount: 2000,
          currency: "xyz",
          metadata: {},
          transferOptions: {},
          additionalFields: {},
          stripeConnection: conn,
        }),
      ),
    ).rejects.toThrow("Invalid currency");
  });
});
describe("getPaymentIntent", () => {
  it("returns the payment intent for the supplied ID", async () => {
    const scope = nock(BASE)
      .get(`/v1/payment_intents/${PI_ID}`)
      .reply(200, getPaymentIntentExamplePayload.data);
    const { result } = await invoke(
      getPaymentIntent,
      params({ paymentIntent: PI_ID, stripeConnection: conn }),
    );
    expect(result.data).toEqual(getPaymentIntentExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  it("surfaces a Stripe error response", async () => {
    nock(BASE)
      .get("/v1/payment_intents/pi_missing")
      .reply(404, {
        error: {
          type: "invalid_request_error",
          message: "No such payment_intent",
        },
      });
    await expect(
      invoke(
        getPaymentIntent,
        params({ paymentIntent: "pi_missing", stripeConnection: conn }),
      ),
    ).rejects.toThrow("No such payment_intent");
  });
});
describe("listPaymentIntents", () => {
  it("returns the payment intent list", async () => {
    const scope = nock(BASE)
      .get("/v1/payment_intents")
      .query({ limit: "10" })
      .reply(200, listPaymentIntentsExamplePayload.data);
    const { result } = await invoke(
      listPaymentIntents,
      params({ pagination: { limit: 10 }, stripeConnection: conn }),
    );
    expect(result.data).toEqual(listPaymentIntentsExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  it("surfaces a Stripe error response", async () => {
    nock(BASE)
      .get("/v1/payment_intents")
      .query(true)
      .reply(400, {
        error: { type: "invalid_request_error", message: "No such customer" },
      });
    await expect(
      invoke(
        listPaymentIntents,
        params({
          customerId: "cus_missing",
          pagination: {},
          stripeConnection: conn,
        }),
      ),
    ).rejects.toThrow("No such customer");
  });
});
describe("searchPaymentIntent", () => {
  it("returns the search result for the supplied query", async () => {
    const scope = nock(BASE)
      .get("/v1/payment_intents/search")
      .query({ query: "status:'succeeded'", limit: "10" })
      .reply(200, searchPaymentIntentsExamplePayload.data);
    const { result } = await invoke(
      searchPaymentIntent,
      params({
        query: "status:'succeeded'",
        pagination: { limit: 10 },
        stripeConnection: conn,
      }),
    );
    expect(result.data).toEqual(searchPaymentIntentsExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  it("surfaces a Stripe error response", async () => {
    nock(BASE)
      .get("/v1/payment_intents/search")
      .query(true)
      .reply(400, {
        error: {
          type: "invalid_request_error",
          message: "Invalid search query",
        },
      });
    await expect(
      invoke(
        searchPaymentIntent,
        params({ query: "bad query", pagination: {}, stripeConnection: conn }),
      ),
    ).rejects.toThrow("Invalid search query");
  });
});
describe("updatePaymentIntent", () => {
  it("updates the payment intent and returns it", async () => {
    const scope = nock(BASE)
      .post(`/v1/payment_intents/${PI_ID}`)
      .reply(200, updatePaymentIntentExamplePayload.data);
    const { result } = await invoke(
      updatePaymentIntent,
      params({
        paymentIntentId: PI_ID,
        amount: 2500,
        description: "Updated description",
        metadata: {},
        transferOptions: {},
        additionalFields: {},
        stripeConnection: conn,
      }),
    );
    expect(result.data).toEqual(updatePaymentIntentExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  it("surfaces a Stripe error response", async () => {
    nock(BASE)
      .post("/v1/payment_intents/pi_missing")
      .reply(404, {
        error: {
          type: "invalid_request_error",
          message: "No such payment_intent",
        },
      });
    await expect(
      invoke(
        updatePaymentIntent,
        params({
          paymentIntentId: "pi_missing",
          metadata: {},
          transferOptions: {},
          additionalFields: {},
          stripeConnection: conn,
        }),
      ),
    ).rejects.toThrow("No such payment_intent");
  });
});
describe("confirmPaymentIntent", () => {
  it("confirms the payment intent and returns it", async () => {
    const scope = nock(BASE)
      .post(`/v1/payment_intents/${PI_ID}/confirm`)
      .reply(200, confirmPaymentIntentExamplePayload.data);
    const { result } = await invoke(
      confirmPaymentIntent,
      params({
        paymentIntentId: PI_ID,
        paymentMethod: "pm_card_visa",
        additionalFields: {},
        stripeConnection: conn,
      }),
    );
    expect(result.data).toEqual(confirmPaymentIntentExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  it("surfaces a Stripe error response", async () => {
    nock(BASE)
      .post("/v1/payment_intents/pi_missing/confirm")
      .reply(402, {
        error: { type: "card_error", message: "Your card was declined." },
      });
    await expect(
      invoke(
        confirmPaymentIntent,
        params({
          paymentIntentId: "pi_missing",
          additionalFields: {},
          stripeConnection: conn,
        }),
      ),
    ).rejects.toThrow("Your card was declined.");
  });
});
describe("capturePaymentIntent", () => {
  it("captures the payment intent and returns it", async () => {
    const scope = nock(BASE)
      .post(`/v1/payment_intents/${PI_ID}/capture`)
      .reply(200, capturePaymentIntentExamplePayload.data);
    const { result } = await invoke(
      capturePaymentIntent,
      params({
        paymentIntentId: PI_ID,
        amountToCapture: 2000,
        metadata: {},
        additionalFields: {},
        stripeConnection: conn,
      }),
    );
    expect(result.data).toEqual(capturePaymentIntentExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  it("surfaces a Stripe error response", async () => {
    nock(BASE)
      .post("/v1/payment_intents/pi_missing/capture")
      .reply(400, {
        error: {
          type: "invalid_request_error",
          message:
            "This PaymentIntent could not be captured because it has already been captured.",
        },
      });
    await expect(
      invoke(
        capturePaymentIntent,
        params({
          paymentIntentId: "pi_missing",
          metadata: {},
          additionalFields: {},
          stripeConnection: conn,
        }),
      ),
    ).rejects.toThrow("already been captured");
  });
});
describe("cancelPaymentIntent", () => {
  it("cancels the payment intent and returns it", async () => {
    const scope = nock(BASE)
      .post(`/v1/payment_intents/${PI_ID}/cancel`)
      .reply(200, cancelPaymentIntentExamplePayload.data);
    const { result } = await invoke(
      cancelPaymentIntent,
      params({
        paymentIntentId: PI_ID,
        cancellationReason: "requested_by_customer",
        stripeConnection: conn,
      }),
    );
    expect(result.data).toEqual(cancelPaymentIntentExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  it("surfaces a Stripe error response", async () => {
    nock(BASE)
      .post("/v1/payment_intents/pi_missing/cancel")
      .reply(400, {
        error: {
          type: "invalid_request_error",
          message:
            "You cannot cancel this PaymentIntent because it has a status of succeeded.",
        },
      });
    await expect(
      invoke(
        cancelPaymentIntent,
        params({ paymentIntentId: "pi_missing", stripeConnection: conn }),
      ),
    ).rejects.toThrow("cannot cancel this PaymentIntent");
  });
});
