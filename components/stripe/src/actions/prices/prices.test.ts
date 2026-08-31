import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { stripeConnection } from "../../connections/apiKey";
import {
  createPriceExamplePayload,
  getPriceExamplePayload,
  listPricesExamplePayload,
  updatePriceExamplePayload,
} from "../../examplePayloads/prices";
import { createPrice } from "./createPrice";
import { getPrice } from "./getPrice";
import { listPrices } from "./listPrices";
import { updatePrice } from "./updatePrice";
const BASE = "https://api.stripe.com";
const conn = createConnection(stripeConnection, { apiKey: "sk_test_123" });
const params = (values: Record<string, unknown>) => values as never;
const PRICE_ID = "price_1MoBy5LkdIwHu7ixZhnattbH";
afterEach(() => nock.cleanAll());
describe("createPrice", () => {
  it("creates the price and returns it", async () => {
    const scope = nock(BASE)
      .post("/v1/prices")
      .reply(200, createPriceExamplePayload.data);
    const { result } = await invoke(
      createPrice,
      params({
        productId: "prod_NWjs8kKbJWmuuc",
        currency: "usd",
        unitPrice: 1000,
        active: true,
        nickname: "Standard Monthly",
        recurringInterval: "month",
        metadata: {},
        fieldValues: {},
        stripeConnection: conn,
      }),
    );
    expect(result.data).toEqual(createPriceExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  it("surfaces a Stripe error response", async () => {
    nock(BASE)
      .post("/v1/prices")
      .reply(400, {
        error: { type: "invalid_request_error", message: "No such product" },
      });
    await expect(
      invoke(
        createPrice,
        params({
          productId: "prod_missing",
          currency: "usd",
          unitPrice: 1000,
          active: true,
          metadata: {},
          fieldValues: {},
          stripeConnection: conn,
        }),
      ),
    ).rejects.toThrow("No such product");
  });
});
describe("getPrice", () => {
  it("returns the price for the supplied ID", async () => {
    const scope = nock(BASE)
      .get(`/v1/prices/${PRICE_ID}`)
      .reply(200, getPriceExamplePayload.data);
    const { result } = await invoke(
      getPrice,
      params({ priceId: PRICE_ID, stripeConnection: conn }),
    );
    expect(result.data).toEqual(getPriceExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  it("surfaces a Stripe error response", async () => {
    nock(BASE)
      .get("/v1/prices/price_missing")
      .reply(404, {
        error: { type: "invalid_request_error", message: "No such price" },
      });
    await expect(
      invoke(
        getPrice,
        params({ priceId: "price_missing", stripeConnection: conn }),
      ),
    ).rejects.toThrow("No such price");
  });
});
describe("listPrices", () => {
  it("returns the price list", async () => {
    const scope = nock(BASE)
      .get("/v1/prices")
      .query({ limit: "10" })
      .reply(200, listPricesExamplePayload.data);
    const { result } = await invoke(
      listPrices,
      params({ pagination: { limit: 10 }, stripeConnection: conn }),
    );
    expect(result.data).toEqual(listPricesExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  it("surfaces a Stripe error response", async () => {
    nock(BASE)
      .get("/v1/prices")
      .query(true)
      .reply(400, {
        error: { type: "invalid_request_error", message: "Invalid limit" },
      });
    await expect(
      invoke(listPrices, params({ pagination: {}, stripeConnection: conn })),
    ).rejects.toThrow("Invalid limit");
  });
});
describe("updatePrice", () => {
  it("updates the price and returns it", async () => {
    const scope = nock(BASE)
      .post(`/v1/prices/${PRICE_ID}`)
      .reply(200, updatePriceExamplePayload.data);
    const { result } = await invoke(
      updatePrice,
      params({
        priceId: PRICE_ID,
        active: false,
        nickname: "Retired Monthly",
        metadata: {},
        fieldValues: {},
        stripeConnection: conn,
      }),
    );
    expect(result.data).toEqual(updatePriceExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  it("surfaces a Stripe error response", async () => {
    nock(BASE)
      .post("/v1/prices/price_missing")
      .reply(404, {
        error: { type: "invalid_request_error", message: "No such price" },
      });
    await expect(
      invoke(
        updatePrice,
        params({
          priceId: "price_missing",
          active: true,
          metadata: {},
          fieldValues: {},
          stripeConnection: conn,
        }),
      ),
    ).rejects.toThrow("No such price");
  });
});
