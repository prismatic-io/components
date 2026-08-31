import {
  createConnection,
  invokeDataSource,
} from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { stripeConnection } from "../connections/apiKey";
import { listBalanceTransactionsExamplePayload } from "../examplePayloads/balanceTransactions";
import { listCardsExamplePayload } from "../examplePayloads/cards";
import { listChargesExamplePayload } from "../examplePayloads/charges";
import { listCheckoutSessionsExamplePayload } from "../examplePayloads/checkoutSessions";
import { listCustomersExamplePayload } from "../examplePayloads/customers";
import { listDisputesExamplePayload } from "../examplePayloads/disputes";
import { listInvoicesExamplePayload } from "../examplePayloads/invoices";
import { listPaymentIntentsExamplePayload } from "../examplePayloads/paymentIntents";
import { listPricesExamplePayload } from "../examplePayloads/prices";
import { listProductsExamplePayload } from "../examplePayloads/products";
import { listSubscriptionsExamplePayload } from "../examplePayloads/subscriptions";
import { selectBalanceTransaction } from "./selectBalanceTransaction";
import { selectCard } from "./selectCard";
import { selectCharge } from "./selectCharge";
import { selectCheckoutSession } from "./selectCheckoutSession";
import { selectCustomer } from "./selectCustomer";
import { selectDispute } from "./selectDispute";
import { selectInvoice } from "./selectInvoice";
import { selectPaymentIntent } from "./selectPaymentIntent";
import { selectPrice } from "./selectPrice";
import { selectProduct } from "./selectProduct";
import { selectSubscription } from "./selectSubscription";
const BASE = "https://api.stripe.com";
const conn = createConnection(stripeConnection, { apiKey: "sk_test_123" });
const params = (values: Record<string, unknown>) => values as never;
const emptyList = (url: string) => ({
  object: "list",
  url,
  has_more: false,
  data: [],
});
const labelAt = (result: unknown, index: number) =>
  (result as Array<Record<string, unknown>>)[index].label;
const expectPicklist = (result: unknown, keys: string[]) => {
  const elements = result as Array<Record<string, unknown>>;
  expect(elements.map((element) => element.key)).toEqual(keys);
  for (const element of elements) {
    expect(Object.keys(element).sort()).toEqual(["key", "label"]);
    expect(typeof element.label).toBe("string");
    expect(element.label).not.toBe("");
  }
};
afterEach(() => nock.cleanAll());
describe("selectBalanceTransaction", () => {
  it("returns a key/label pair per balance transaction", async () => {
    nock(BASE)
      .get("/v1/balance_transactions")
      .query(true)
      .reply(200, listBalanceTransactionsExamplePayload.data);
    const { result } = await invokeDataSource(
      selectBalanceTransaction,
      params({ stripeConnection: conn }),
    );
    expectPicklist(result, ["txn_1MiN3gLkdIwHu7ixxapQrznl"]);
    expect(labelAt(result, 0)).toBe("Payment for Invoice INV-001 - 2000 USD");
  });
  it("returns an empty picklist when Stripe has no balance transactions", async () => {
    nock(BASE)
      .get("/v1/balance_transactions")
      .query(true)
      .reply(200, emptyList("/v1/balance_transactions"));
    const { result } = await invokeDataSource(
      selectBalanceTransaction,
      params({ stripeConnection: conn }),
    );
    expect(result).toEqual([]);
  });
});
describe("selectCard", () => {
  it("returns a key/label pair per card payment method", async () => {
    nock(BASE)
      .get("/v1/payment_methods")
      .query(true)
      .reply(200, listCardsExamplePayload.data);
    const { result } = await invokeDataSource(
      selectCard,
      params({ stripeConnection: conn, customerId: "cus_NffrFeUfNV2Hib" }),
    );
    expectPicklist(result, ["pm_1MqM05LkdIwHu7ixlDxxO6Mc"]);
    expect(labelAt(result, 0)).toBe("VISA ****4242 (8/2030)");
  });
  it("returns an empty picklist when the customer has no cards", async () => {
    nock(BASE)
      .get("/v1/payment_methods")
      .query(true)
      .reply(200, emptyList("/v1/payment_methods"));
    const { result } = await invokeDataSource(
      selectCard,
      params({ stripeConnection: conn, customerId: "cus_NffrFeUfNV2Hib" }),
    );
    expect(result).toEqual([]);
  });
});
describe("selectCharge", () => {
  it("returns a key/label pair per charge", async () => {
    nock(BASE)
      .get("/v1/charges")
      .query(true)
      .reply(200, listChargesExamplePayload.data);
    const { result } = await invokeDataSource(
      selectCharge,
      params({ stripeConnection: conn }),
    );
    expectPicklist(result, ["ch_3MmlLrLkdIwHu7ix0snN0B15"]);
    expect(labelAt(result, 0)).toBe("Subscription payment - 2000 USD");
  });
  it("returns an empty picklist when Stripe has no charges", async () => {
    nock(BASE)
      .get("/v1/charges")
      .query(true)
      .reply(200, emptyList("/v1/charges"));
    const { result } = await invokeDataSource(
      selectCharge,
      params({ stripeConnection: conn }),
    );
    expect(result).toEqual([]);
  });
});
describe("selectCheckoutSession", () => {
  it("returns a key/label pair per checkout session", async () => {
    nock(BASE)
      .get("/v1/checkout/sessions")
      .query(true)
      .reply(200, listCheckoutSessionsExamplePayload.data);
    const { result } = await invokeDataSource(
      selectCheckoutSession,
      params({ stripeConnection: conn }),
    );
    expectPicklist(result, [
      "cs_test_b1Gk9xQvR3mLpT7wZnY4dHsJ2fCaX8eUoN6iKbMv0rQtLyPh5jWgD1SzAu",
    ]);
  });
  it("returns an empty picklist when Stripe has no checkout sessions", async () => {
    nock(BASE)
      .get("/v1/checkout/sessions")
      .query(true)
      .reply(200, emptyList("/v1/checkout/sessions"));
    const { result } = await invokeDataSource(
      selectCheckoutSession,
      params({ stripeConnection: conn }),
    );
    expect(result).toEqual([]);
  });
});
describe("selectCustomer", () => {
  it("returns a key/label pair per customer", async () => {
    nock(BASE)
      .get("/v1/customers")
      .query(true)
      .reply(200, listCustomersExamplePayload.data);
    const { result } = await invokeDataSource(
      selectCustomer,
      params({ stripeConnection: conn }),
    );
    expectPicklist(result, ["cus_NffrFeUfNV2Hib"]);
    expect(labelAt(result, 0)).toBe("jenny.rosen@example.com");
  });
  it("returns an empty picklist when Stripe has no customers", async () => {
    nock(BASE)
      .get("/v1/customers")
      .query(true)
      .reply(200, emptyList("/v1/customers"));
    const { result } = await invokeDataSource(
      selectCustomer,
      params({ stripeConnection: conn }),
    );
    expect(result).toEqual([]);
  });
});
describe("selectDispute", () => {
  it("returns a key/label pair per dispute", async () => {
    nock(BASE)
      .get("/v1/disputes")
      .query(true)
      .reply(200, listDisputesExamplePayload.data);
    const { result } = await invokeDataSource(
      selectDispute,
      params({ stripeConnection: conn }),
    );
    expectPicklist(result, ["dp_1MtJUT2eZvKYlo2CNaw2HvEv"]);
  });
  it("returns an empty picklist when Stripe has no disputes", async () => {
    nock(BASE)
      .get("/v1/disputes")
      .query(true)
      .reply(200, emptyList("/v1/disputes"));
    const { result } = await invokeDataSource(
      selectDispute,
      params({ stripeConnection: conn }),
    );
    expect(result).toEqual([]);
  });
});
describe("selectInvoice", () => {
  it("returns a key/label pair per invoice", async () => {
    nock(BASE)
      .get("/v1/invoices")
      .query(true)
      .reply(200, listInvoicesExamplePayload.data);
    const { result } = await invokeDataSource(
      selectInvoice,
      params({ stripeConnection: conn }),
    );
    expectPicklist(result, ["in_1MtHbELkdIwHu7ixl4OzzPMv"]);
  });
  it("returns an empty picklist when Stripe has no invoices", async () => {
    nock(BASE)
      .get("/v1/invoices")
      .query(true)
      .reply(200, emptyList("/v1/invoices"));
    const { result } = await invokeDataSource(
      selectInvoice,
      params({ stripeConnection: conn }),
    );
    expect(result).toEqual([]);
  });
});
describe("selectPaymentIntent", () => {
  it("returns a key/label pair per payment intent", async () => {
    nock(BASE)
      .get("/v1/payment_intents")
      .query(true)
      .reply(200, listPaymentIntentsExamplePayload.data);
    const { result } = await invokeDataSource(
      selectPaymentIntent,
      params({ stripeConnection: conn }),
    );
    expectPicklist(result, ["pi_3MmlLrLkdIwHu7ix01zsk9pV"]);
  });
  it("returns an empty picklist when Stripe has no payment intents", async () => {
    nock(BASE)
      .get("/v1/payment_intents")
      .query(true)
      .reply(200, emptyList("/v1/payment_intents"));
    const { result } = await invokeDataSource(
      selectPaymentIntent,
      params({ stripeConnection: conn }),
    );
    expect(result).toEqual([]);
  });
});
describe("selectPrice", () => {
  it("returns a key/label pair per price", async () => {
    nock(BASE)
      .get("/v1/prices")
      .query(true)
      .reply(200, listPricesExamplePayload.data);
    const { result } = await invokeDataSource(
      selectPrice,
      params({ stripeConnection: conn }),
    );
    expectPicklist(result, ["price_1MoBy5LkdIwHu7ixZhnattbH"]);
    expect(labelAt(result, 0)).toBe("Standard Monthly - usd - recurring");
  });
  it("returns an empty picklist when Stripe has no prices", async () => {
    nock(BASE)
      .get("/v1/prices")
      .query(true)
      .reply(200, emptyList("/v1/prices"));
    const { result } = await invokeDataSource(
      selectPrice,
      params({ stripeConnection: conn }),
    );
    expect(result).toEqual([]);
  });
});
describe("selectProduct", () => {
  it("returns a key/label pair per product", async () => {
    nock(BASE)
      .get("/v1/products")
      .query(true)
      .reply(200, listProductsExamplePayload.data);
    const { result } = await invokeDataSource(
      selectProduct,
      params({ stripeConnection: conn }),
    );
    expectPicklist(result, ["prod_NWjs8kKbJWmuuc"]);
    expect(labelAt(result, 0)).toBe("T-shirt");
  });
  it("returns an empty picklist when Stripe has no products", async () => {
    nock(BASE)
      .get("/v1/products")
      .query(true)
      .reply(200, emptyList("/v1/products"));
    const { result } = await invokeDataSource(
      selectProduct,
      params({ stripeConnection: conn }),
    );
    expect(result).toEqual([]);
  });
});
describe("selectSubscription", () => {
  it("returns a key/label pair per subscription", async () => {
    nock(BASE)
      .get("/v1/subscriptions")
      .query(true)
      .reply(200, listSubscriptionsExamplePayload.data);
    const { result } = await invokeDataSource(
      selectSubscription,
      params({ stripeConnection: conn }),
    );
    expectPicklist(result, ["sub_1MowQVLkdIwHu7ixeRlqHVzs"]);
  });
  it("returns an empty picklist when Stripe has no subscriptions", async () => {
    nock(BASE)
      .get("/v1/subscriptions")
      .query(true)
      .reply(200, emptyList("/v1/subscriptions"));
    const { result } = await invokeDataSource(
      selectSubscription,
      params({ stripeConnection: conn }),
    );
    expect(result).toEqual([]);
  });
});
