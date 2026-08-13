import { invokeDataSource } from "@prismatic-io/spectral/dist/testing";
import { listTransactionsResponse } from "../examplePayloads/transactions";
import {
  apiPath,
  elementKeys,
  elementLabels,
  emptyListBody,
  listBody,
  rampNock,
  resetNock,
  terminatePaging,
  testConnection,
} from "../testHarness";
import { selectTransaction } from "./transaction";
const PATH = apiPath("transactions");
describe("selectTransaction", () => {
  afterEach(resetNock);
  test("maps the transaction list into dropdown elements", async () => {
    rampNock()
      .get(PATH)
      .query(true)
      .reply(200, terminatePaging(listTransactionsResponse));
    const { result } = await invokeDataSource(selectTransaction, {
      connection: testConnection,
    });
    expect(result).toEqual([
      { key: "fd14cd6a-846e-4994-9315-5a59e6bb465f", label: "Vanta - $0.9" },
    ]);
  });
  test("renders the label as merchant name and amount divided by one hundred", async () => {
    rampNock()
      .get(PATH)
      .query(true)
      .reply(200, listBody([{ id: "1", merchant_name: "Acme", amount: 4999 }]));
    const { result } = await invokeDataSource(selectTransaction, {
      connection: testConnection,
    });
    expect(elementLabels(result)).toEqual(["Acme - $49.99"]);
  });
  test("sorts by id ascending regardless of reply order", async () => {
    rampNock()
      .get(PATH)
      .query(true)
      .reply(
        200,
        listBody([
          { id: "c", merchant_name: "Zulu", amount: 300 },
          { id: "a", merchant_name: "Alpha", amount: 100 },
          { id: "b", merchant_name: "Bravo", amount: 200 },
        ]),
      );
    const { result } = await invokeDataSource(selectTransaction, {
      connection: testConnection,
    });
    expect(elementKeys(result)).toEqual(["a", "b", "c"]);
  });
  test("returns an empty list when the API returns no records", async () => {
    rampNock().get(PATH).query(true).reply(200, emptyListBody());
    const { result } = await invokeDataSource(selectTransaction, {
      connection: testConnection,
    });
    expect(result).toEqual([]);
  });
});
