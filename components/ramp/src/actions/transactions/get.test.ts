import { invoke } from "@prismatic-io/spectral/dist/testing";
import { getTransactionResponse } from "../../examplePayloads/transactions";
import {
  apiPath,
  rampNock,
  resetNock,
  testConnection,
} from "../../testHarness";
import { getTransaction } from "./get";
const TRANSACTION_ID = "fd14cd6a-846e-4994-9315-5a59e6bb465f";
const PATH = apiPath(`/transactions/${TRANSACTION_ID}`);
describe("getTransaction", () => {
  afterEach(resetNock);
  test("returns the transaction the API replies with", async () => {
    rampNock().get(PATH).reply(200, getTransactionResponse);
    const { result } = await invoke(getTransaction, {
      connection: testConnection,
      transactionId: TRANSACTION_ID,
    });
    expect(result.data).toEqual(getTransactionResponse);
  });
  test("surfaces an API failure", async () => {
    rampNock()
      .get(PATH)
      .reply(404, { error: { message: "Transaction not found" } });
    await expect(
      invoke(getTransaction, {
        connection: testConnection,
        transactionId: TRANSACTION_ID,
      }),
    ).rejects.toThrow();
  });
});
