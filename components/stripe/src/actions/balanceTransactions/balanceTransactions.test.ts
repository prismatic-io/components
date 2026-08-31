import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { stripeConnection } from "../../connections/apiKey";
import {
  getBalanceTransactionExamplePayload,
  listBalanceTransactionsExamplePayload,
} from "../../examplePayloads/balanceTransactions";
import { getBalanceTransaction } from "./getBalanceTransaction";
import { listBalanceTransactions } from "./listBalanceTransactions";
const BASE = "https://api.stripe.com";
const conn = createConnection(stripeConnection, { apiKey: "sk_test_123" });
const params = (values: Record<string, unknown>) => values as never;
afterEach(() => nock.cleanAll());
describe("getBalanceTransaction", () => {
  it("returns the balance transaction for the supplied ID", async () => {
    const scope = nock(BASE)
      .get("/v1/balance_transactions/txn_1MiN3gLkdIwHu7ixxapQrznl")
      .reply(200, getBalanceTransactionExamplePayload.data);
    const { result } = await invoke(
      getBalanceTransaction,
      params({
        balanceTransactionId: "txn_1MiN3gLkdIwHu7ixxapQrznl",
        stripeConnection: conn,
      }),
    );
    expect(result.data).toEqual(getBalanceTransactionExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  it("surfaces a Stripe error response", async () => {
    nock(BASE)
      .get("/v1/balance_transactions/txn_missing")
      .reply(404, {
        error: {
          type: "invalid_request_error",
          message: "No such balancetransaction",
        },
      });
    await expect(
      invoke(
        getBalanceTransaction,
        params({ balanceTransactionId: "txn_missing", stripeConnection: conn }),
      ),
    ).rejects.toThrow("No such balancetransaction");
  });
});
describe("listBalanceTransactions", () => {
  it("returns the balance transaction list", async () => {
    const scope = nock(BASE)
      .get("/v1/balance_transactions")
      .query({ currency: "usd", limit: "10" })
      .reply(200, listBalanceTransactionsExamplePayload.data);
    const { result } = await invoke(
      listBalanceTransactions,
      params({
        currency: "usd",
        pagination: { limit: 10 },
        stripeConnection: conn,
      }),
    );
    expect(result.data).toEqual(listBalanceTransactionsExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  it("surfaces a Stripe error response", async () => {
    nock(BASE)
      .get("/v1/balance_transactions")
      .query(true)
      .reply(400, {
        error: {
          type: "invalid_request_error",
          message: "Invalid currency: xyz",
        },
      });
    await expect(
      invoke(
        listBalanceTransactions,
        params({ currency: "xyz", pagination: {}, stripeConnection: conn }),
      ),
    ).rejects.toThrow("Invalid currency");
  });
});
