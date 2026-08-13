import { invokeDataSource } from "@prismatic-io/spectral/dist/testing";
import { listBillsResponse } from "../examplePayloads/bills";
import {
  apiPath,
  elementKeys,
  emptyListBody,
  listBody,
  rampNock,
  resetNock,
  terminatePaging,
  testConnection,
} from "../testHarness";
import { selectBill } from "./bill";
const PATH = apiPath("bills");
describe("selectBill", () => {
  afterEach(resetNock);
  test("maps the bill list into dropdown elements", async () => {
    rampNock()
      .get(PATH)
      .query(true)
      .reply(200, terminatePaging(listBillsResponse));
    const { result } = await invokeDataSource(selectBill, {
      connection: testConnection,
    });
    expect(result).toEqual([
      { key: "6e3816e3-0e53-42ae-b075-bdb0adff10c4", label: "432 - OPEN" },
    ]);
  });
  test("sorts by id ascending regardless of reply order", async () => {
    rampNock()
      .get(PATH)
      .query(true)
      .reply(
        200,
        listBody([
          { id: "c", invoice_number: "003", status: "OPEN" },
          { id: "a", invoice_number: "001", status: "PAID" },
          { id: "b", invoice_number: "002", status: "OPEN" },
        ]),
      );
    const { result } = await invokeDataSource(selectBill, {
      connection: testConnection,
    });
    expect(elementKeys(result)).toEqual(["a", "b", "c"]);
  });
  test("returns an empty list when the API returns no records", async () => {
    rampNock().get(PATH).query(true).reply(200, emptyListBody());
    const { result } = await invokeDataSource(selectBill, {
      connection: testConnection,
    });
    expect(result).toEqual([]);
  });
});
