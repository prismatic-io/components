import { invokeDataSource } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { STORE_HOST, storeConnection } from "../testHelpers";
import { selectCustomer } from "./selectCustomer";
beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => nock.cleanAll());
describe("selectCustomer", () => {
  test("builds label/key pairs from firstname, lastname and email, ordered by label", async () => {
    nock(STORE_HOST)
      .get("/rest/default/V1/customers/search")
      .query(true)
      .reply(200, {
        items: [
          {
            id: 1,
            firstname: "John",
            lastname: "Doe",
            email: "john@example.com",
          },
          {
            id: 2,
            firstname: "Alice",
            lastname: "Adams",
            email: "alice@example.com",
          },
        ],
      });
    const result = await invokeDataSource(selectCustomer, {
      connectionInput: storeConnection(),
    });
    expect(result.result).toEqual([
      { label: "Alice Adams (alice@example.com)", key: "2" },
      { label: "John Doe (john@example.com)", key: "1" },
    ]);
  });
  test("returns an empty array rather than throwing when the store has no customers", async () => {
    nock(STORE_HOST)
      .get("/rest/default/V1/customers/search")
      .query(true)
      .reply(200, { items: [] });
    const result = await invokeDataSource(selectCustomer, {
      connectionInput: storeConnection(),
    });
    expect(result.result).toEqual([]);
  });
});
