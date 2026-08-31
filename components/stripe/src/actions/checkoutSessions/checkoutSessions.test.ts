import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { stripeConnection } from "../../connections/apiKey";
import {
  createCheckoutSessionExamplePayload,
  listCheckoutSessionLineItemsExamplePayload,
  listCheckoutSessionsExamplePayload,
} from "../../examplePayloads/checkoutSessions";
import { createCheckoutSession } from "./createCheckoutSession";
import { expireCheckoutSession } from "./expireCheckoutSession";
import { getCheckoutSession } from "./getCheckoutSession";
import { listCheckoutSessionLineItems } from "./listCheckoutSessionLineItems";
import { listCheckoutSessions } from "./listCheckoutSessions";
import { updateCheckoutSession } from "./updateCheckoutSession";
const BASE = "https://api.stripe.com";
const conn = createConnection(stripeConnection, { apiKey: "sk_test_123" });
const params = (values: Record<string, unknown>) => values as never;
const SESSION_ID = createCheckoutSessionExamplePayload.data.id;
afterEach(() => nock.cleanAll());
describe("createCheckoutSession", () => {
  it("creates the session and returns it", async () => {
    const scope = nock(BASE)
      .post("/v1/checkout/sessions")
      .reply(200, createCheckoutSessionExamplePayload.data);
    const { result } = await invoke(
      createCheckoutSession,
      params({
        successUrl: "https://example.com/success",
        cancelUrl: "https://example.com/cancel",
        mode: "payment",
        lineItems: [{ price: "price_1MoBy5LkdIwHu7ixZhnattbH", quantity: 2 }],
        bodyParams: {},
        stripeConnection: conn,
      }),
    );
    expect(result.data).toEqual(createCheckoutSessionExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  it("surfaces a Stripe error response", async () => {
    nock(BASE)
      .post("/v1/checkout/sessions")
      .reply(400, {
        error: {
          type: "invalid_request_error",
          message: "You must provide at least one line item",
        },
      });
    await expect(
      invoke(
        createCheckoutSession,
        params({
          successUrl: "https://example.com/success",
          mode: "payment",
          lineItems: [],
          bodyParams: {},
          stripeConnection: conn,
        }),
      ),
    ).rejects.toThrow("at least one line item");
  });
});
describe("getCheckoutSession", () => {
  it("returns the session for the supplied ID", async () => {
    const scope = nock(BASE)
      .get(`/v1/checkout/sessions/${SESSION_ID}`)
      .reply(200, createCheckoutSessionExamplePayload.data);
    const { result } = await invoke(
      getCheckoutSession,
      params({ sessionId: SESSION_ID, stripeConnection: conn }),
    );
    expect(result.data).toEqual(createCheckoutSessionExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  it("surfaces a Stripe error response", async () => {
    nock(BASE)
      .get("/v1/checkout/sessions/cs_missing")
      .reply(404, {
        error: {
          type: "invalid_request_error",
          message: "No such checkout session",
        },
      });
    await expect(
      invoke(
        getCheckoutSession,
        params({ sessionId: "cs_missing", stripeConnection: conn }),
      ),
    ).rejects.toThrow("No such checkout session");
  });
});
describe("listCheckoutSessions", () => {
  it("returns a single page of sessions", async () => {
    const scope = nock(BASE)
      .get("/v1/checkout/sessions")
      .query({ limit: "10" })
      .reply(200, listCheckoutSessionsExamplePayload.data);
    const { result } = await invoke(
      listCheckoutSessions,
      params({
        fetchAll: false,
        pagination: { limit: 10 },
        stripeConnection: conn,
      }),
    );
    expect(result.data).toEqual(listCheckoutSessionsExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  it("surfaces a Stripe error response", async () => {
    nock(BASE)
      .get("/v1/checkout/sessions")
      .query(true)
      .reply(400, {
        error: { type: "invalid_request_error", message: "Invalid limit" },
      });
    await expect(
      invoke(
        listCheckoutSessions,
        params({ fetchAll: false, pagination: {}, stripeConnection: conn }),
      ),
    ).rejects.toThrow("Invalid limit");
  });
});
describe("listCheckoutSessionLineItems", () => {
  it("returns the session's line items", async () => {
    const scope = nock(BASE)
      .get(`/v1/checkout/sessions/${SESSION_ID}/line_items`)
      .query({ limit: "10" })
      .reply(200, listCheckoutSessionLineItemsExamplePayload.data);
    const { result } = await invoke(
      listCheckoutSessionLineItems,
      params({
        sessionId: SESSION_ID,
        pagination: { limit: 10 },
        stripeConnection: conn,
      }),
    );
    expect(result.data).toEqual(
      listCheckoutSessionLineItemsExamplePayload.data,
    );
    expect(scope.isDone()).toBe(true);
  });
  it("surfaces a Stripe error response", async () => {
    nock(BASE)
      .get("/v1/checkout/sessions/cs_missing/line_items")
      .query(true)
      .reply(404, {
        error: {
          type: "invalid_request_error",
          message: "No such checkout session",
        },
      });
    await expect(
      invoke(
        listCheckoutSessionLineItems,
        params({
          sessionId: "cs_missing",
          pagination: {},
          stripeConnection: conn,
        }),
      ),
    ).rejects.toThrow("No such checkout session");
  });
});
describe("updateCheckoutSession", () => {
  it("updates the session metadata and returns the session", async () => {
    const scope = nock(BASE)
      .post(`/v1/checkout/sessions/${SESSION_ID}`)
      .reply(200, createCheckoutSessionExamplePayload.data);
    const { result } = await invoke(
      updateCheckoutSession,
      params({
        sessionId: SESSION_ID,
        metadata: { orderId: "6735" },
        stripeConnection: conn,
      }),
    );
    expect(result.data).toEqual(createCheckoutSessionExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  it("surfaces a Stripe error response", async () => {
    nock(BASE)
      .post("/v1/checkout/sessions/cs_missing")
      .reply(404, {
        error: {
          type: "invalid_request_error",
          message: "No such checkout session",
        },
      });
    await expect(
      invoke(
        updateCheckoutSession,
        params({
          sessionId: "cs_missing",
          metadata: {},
          stripeConnection: conn,
        }),
      ),
    ).rejects.toThrow("No such checkout session");
  });
});
describe("expireCheckoutSession", () => {
  it("expires the session and returns it", async () => {
    const scope = nock(BASE)
      .post(`/v1/checkout/sessions/${SESSION_ID}/expire`)
      .reply(200, {
        ...createCheckoutSessionExamplePayload.data,
        status: "expired",
      });
    const { result } = await invoke(
      expireCheckoutSession,
      params({ sessionId: SESSION_ID, stripeConnection: conn }),
    );
    expect(result.data).toEqual({
      ...createCheckoutSessionExamplePayload.data,
      status: "expired",
    });
    expect(scope.isDone()).toBe(true);
  });
  it("surfaces a Stripe error response", async () => {
    nock(BASE)
      .post("/v1/checkout/sessions/cs_missing/expire")
      .reply(400, {
        error: {
          type: "invalid_request_error",
          message: "You may only expire an open session",
        },
      });
    await expect(
      invoke(
        expireCheckoutSession,
        params({ sessionId: "cs_missing", stripeConnection: conn }),
      ),
    ).rejects.toThrow("only expire an open session");
  });
});
