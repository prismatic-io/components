import { invoke } from "@prismatic-io/spectral/dist/testing";
import { listTransactionsResponse } from "../../examplePayloads/transactions";
import {
  apiPath,
  listActionParams,
  rampNock,
  resetNock,
  terminatePaging,
} from "../../testHarness";
import { listTransactions } from "./list";
const PATH = apiPath("transactions");
describe("listTransactions", () => {
  afterEach(resetNock);
  test("returns the list envelope untouched when Fetch All is off", async () => {
    rampNock().get(PATH).query({}).reply(200, listTransactionsResponse);
    const { result } = await invoke(listTransactions, listActionParams());
    expect(result.data).toEqual(listTransactionsResponse);
  });
  test("injects page_size 50 and returns the accumulated records when Fetch All is on", async () => {
    rampNock()
      .get(PATH)
      .query({ page_size: "50" })
      .reply(200, terminatePaging(listTransactionsResponse));
    const { result } = await invoke(
      listTransactions,
      listActionParams({ fetchAll: true }),
    );
    expect(result.data).toEqual({
      data: listTransactionsResponse.data,
      page: null,
    });
  });
  test("surfaces an API failure", async () => {
    rampNock()
      .get(PATH)
      .query(true)
      .reply(500, { error: { message: "Internal error" } });
    await expect(
      invoke(listTransactions, listActionParams()),
    ).rejects.toThrow();
  });
});
