import { invokeDataSource } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { STORE_HOST, storeConnection } from "../testHelpers";
import { selectOrder } from "./selectOrder";
beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => nock.cleanAll());
describe("selectOrder", () => {
  test("builds label/key pairs from increment_id, status and grand_total, ordered by label", async () => {
    nock(STORE_HOST)
      .get("/rest/default/V1/orders")
      .query(true)
      .reply(200, {
        items: [
          {
            entity_id: 2,
            increment_id: "000000002",
            status: "complete",
            grand_total: 10,
          },
          {
            entity_id: 1,
            increment_id: "000000001",
            status: "pending",
            grand_total: 49.99,
          },
        ],
      });
    const result = await invokeDataSource(selectOrder, {
      connectionInput: storeConnection(),
    });
    expect(result.result).toEqual([
      { label: "#000000001 - pending ($49.99)", key: "1" },
      { label: "#000000002 - complete ($10)", key: "2" },
    ]);
  });
  test("returns an empty array rather than throwing when the store has no orders", async () => {
    nock(STORE_HOST)
      .get("/rest/default/V1/orders")
      .query(true)
      .reply(200, { items: [] });
    const result = await invokeDataSource(selectOrder, {
      connectionInput: storeConnection(),
    });
    expect(result.result).toEqual([]);
  });
});
