import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { stripeConnection } from "../../connections/apiKey";
import {
  attachCardExamplePayload,
  createCardExamplePayload,
  detachCardExamplePayload,
  getCardExamplePayload,
  listCardsExamplePayload,
  updateCardExamplePayload,
} from "../../examplePayloads/cards";
import { attachCard } from "./attachCard";
import { createCard } from "./createCard";
import { detachCard } from "./detachCard";
import { getCard } from "./getCard";
import { listCards } from "./listCards";
import { updateCard } from "./updateCard";
const BASE = "https://api.stripe.com";
const conn = createConnection(stripeConnection, { apiKey: "sk_test_123" });
const params = (values: Record<string, unknown>) => values as never;
const billingAddress = {
  billingCity: "San Francisco",
  billingCountry: "US",
  billingAddress1: "354 Oyster Point Blvd",
  billingAddress2: undefined,
  postalCode: "94080",
  state: "CA",
};
const contactInfo = {
  billingEmail: "jenny.rosen@example.com",
  billingName: "Jenny Rosen",
  phone: undefined,
};
afterEach(() => nock.cleanAll());
describe("getCard", () => {
  it("returns the payment method for the supplied ID", async () => {
    const scope = nock(BASE)
      .get("/v1/payment_methods/pm_1MqM05LkdIwHu7ixlDxxO6Mc")
      .reply(200, getCardExamplePayload.data);
    const { result } = await invoke(
      getCard,
      params({
        paymentId: "pm_1MqM05LkdIwHu7ixlDxxO6Mc",
        stripeConnection: conn,
      }),
    );
    expect(result.data).toEqual(getCardExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  it("surfaces a Stripe error response", async () => {
    nock(BASE)
      .get("/v1/payment_methods/pm_missing")
      .reply(404, {
        error: {
          type: "invalid_request_error",
          message: "No such PaymentMethod",
        },
      });
    await expect(
      invoke(
        getCard,
        params({ paymentId: "pm_missing", stripeConnection: conn }),
      ),
    ).rejects.toThrow("No such PaymentMethod");
  });
});
describe("listCards", () => {
  it("returns the customer's card payment methods", async () => {
    const scope = nock(BASE)
      .get("/v1/payment_methods")
      .query({ customer: "cus_NffrFeUfNV2Hib", type: "card", limit: "10" })
      .reply(200, listCardsExamplePayload.data);
    const { result } = await invoke(
      listCards,
      params({
        customerId: "cus_NffrFeUfNV2Hib",
        pagination: { limit: 10 },
        stripeConnection: conn,
      }),
    );
    expect(result.data).toEqual(listCardsExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  it("surfaces a Stripe error response", async () => {
    nock(BASE)
      .get("/v1/payment_methods")
      .query(true)
      .reply(400, {
        error: { type: "invalid_request_error", message: "No such customer" },
      });
    await expect(
      invoke(
        listCards,
        params({
          customerId: "cus_missing",
          pagination: {},
          stripeConnection: conn,
        }),
      ),
    ).rejects.toThrow("No such customer");
  });
});
describe("createCard", () => {
  it("creates the payment method and attaches it when a customer is supplied", async () => {
    const created = nock(BASE)
      .post("/v1/payment_methods")
      .reply(200, createCardExamplePayload.data);
    const attached = nock(BASE)
      .post("/v1/payment_methods/pm_1MqM05LkdIwHu7ixlDxxO6Mc/attach")
      .reply(200, attachCardExamplePayload.data);
    const { result } = await invoke(
      createCard,
      params({
        customerId: "cus_NffrFeUfNV2Hib",
        cardNumber: "4242424242424242",
        expMonth: 8,
        expYear: 2030,
        cvc: "314",
        billingAddress,
        contactInfo,
        metadata: {},
        stripeConnection: conn,
      }),
    );
    expect(result.data).toEqual(attachCardExamplePayload.data);
    expect(created.isDone()).toBe(true);
    expect(attached.isDone()).toBe(true);
  });
  it("surfaces a Stripe error response", async () => {
    nock(BASE)
      .post("/v1/payment_methods")
      .reply(402, {
        error: {
          type: "card_error",
          message: "Your card number is incorrect.",
        },
      });
    await expect(
      invoke(
        createCard,
        params({
          customerId: undefined,
          cardNumber: "4000000000000002",
          expMonth: 8,
          expYear: 2030,
          cvc: "314",
          billingAddress,
          contactInfo,
          metadata: {},
          stripeConnection: conn,
        }),
      ),
    ).rejects.toThrow("Your card number is incorrect.");
  });
});
describe("updateCard", () => {
  it("updates the payment method and returns it", async () => {
    const scope = nock(BASE)
      .post("/v1/payment_methods/pm_1MqM05LkdIwHu7ixlDxxO6Mc")
      .reply(200, updateCardExamplePayload.data);
    const { result } = await invoke(
      updateCard,
      params({
        paymentId: "pm_1MqM05LkdIwHu7ixlDxxO6Mc",
        expMonth: 12,
        expYear: 2031,
        billingAddress,
        contactInfo,
        metadata: {},
        stripeConnection: conn,
      }),
    );
    expect(result.data).toEqual(updateCardExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  it("surfaces a Stripe error response", async () => {
    nock(BASE)
      .post("/v1/payment_methods/pm_missing")
      .reply(404, {
        error: {
          type: "invalid_request_error",
          message: "No such PaymentMethod",
        },
      });
    await expect(
      invoke(
        updateCard,
        params({
          paymentId: "pm_missing",
          expMonth: 12,
          expYear: 2031,
          billingAddress,
          contactInfo,
          metadata: {},
          stripeConnection: conn,
        }),
      ),
    ).rejects.toThrow("No such PaymentMethod");
  });
});
describe("attachCard", () => {
  it("attaches the payment method to the customer", async () => {
    const scope = nock(BASE)
      .post("/v1/payment_methods/pm_1MqM05LkdIwHu7ixlDxxO6Mc/attach")
      .reply(200, attachCardExamplePayload.data);
    const { result } = await invoke(
      attachCard,
      params({
        paymentId: "pm_1MqM05LkdIwHu7ixlDxxO6Mc",
        customerId: "cus_NffrFeUfNV2Hib",
        stripeConnection: conn,
      }),
    );
    expect(result.data).toEqual(attachCardExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  it("surfaces a Stripe error response", async () => {
    nock(BASE)
      .post("/v1/payment_methods/pm_1/attach")
      .reply(400, {
        error: {
          type: "invalid_request_error",
          message: "No such customer: 'cus_missing'",
        },
      });
    await expect(
      invoke(
        attachCard,
        params({
          paymentId: "pm_1",
          customerId: "cus_missing",
          stripeConnection: conn,
        }),
      ),
    ).rejects.toThrow("No such customer");
  });
});
describe("detachCard", () => {
  it("detaches the payment method and returns it with no customer", async () => {
    const scope = nock(BASE)
      .post("/v1/payment_methods/pm_1MqM05LkdIwHu7ixlDxxO6Mc/detach")
      .reply(200, detachCardExamplePayload.data);
    const { result } = await invoke(
      detachCard,
      params({
        paymentId: "pm_1MqM05LkdIwHu7ixlDxxO6Mc",
        stripeConnection: conn,
      }),
    );
    expect(result.data).toEqual(detachCardExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  it("surfaces a Stripe error response", async () => {
    nock(BASE)
      .post("/v1/payment_methods/pm_1/detach")
      .reply(400, {
        error: {
          type: "invalid_request_error",
          message:
            "The payment method you provided is not attached to a customer.",
        },
      });
    await expect(
      invoke(detachCard, params({ paymentId: "pm_1", stripeConnection: conn })),
    ).rejects.toThrow("not attached to a customer");
  });
});
