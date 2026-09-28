import { invokeDataSource } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { STORE_HOST, storeConnection } from "../testHelpers";
import { selectTransaction } from "./selectTransaction";
beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => nock.cleanAll());
describe("selectTransaction", () => {
  test("builds label/key pairs from txn_id, txn_type and order_id, ordered by label", async () => {
    nock(STORE_HOST)
      .get("/rest/default/V1/transactions")
      .query(true)
      .reply(200, {
        items: [
          {
            transaction_id: 1,
            txn_id: "txn-abc123",
            txn_type: "capture",
            order_id: 1,
          },
          {
            transaction_id: 2,
            txn_id: "txn-aaa000",
            txn_type: "refund",
            order_id: 2,
          },
        ],
      });
    const result = await invokeDataSource(selectTransaction, {
      connectionInput: storeConnection(),
    });
    expect(result.result).toEqual([
      { label: "txn-aaa000 (refund - Order #2)", key: "2" },
      { label: "txn-abc123 (capture - Order #1)", key: "1" },
    ]);
  });
  test("returns an empty array rather than throwing when the store has no transactions", async () => {
    nock(STORE_HOST)
      .get("/rest/default/V1/transactions")
      .query(true)
      .reply(200, { items: [] });
    const result = await invokeDataSource(selectTransaction, {
      connectionInput: storeConnection(),
    });
    expect(result.result).toEqual([]);
  });
});
