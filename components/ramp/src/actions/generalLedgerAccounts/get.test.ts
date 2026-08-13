import { invoke } from "@prismatic-io/spectral/dist/testing";
import { getGeneralLedgerAccountResponse } from "../../examplePayloads/ledgerAccounts";
import {
  apiPath,
  rampNock,
  resetNock,
  testConnection,
} from "../../testHarness";
import { getGeneralLedgerAccount } from "./get";
const ACCOUNT_ID = "514";
const PATH = apiPath(`/accounting/accounts/${ACCOUNT_ID}`);
describe("getGeneralLedgerAccount", () => {
  afterEach(resetNock);
  test("returns the ledger account the API replies with", async () => {
    rampNock().get(PATH).reply(200, getGeneralLedgerAccountResponse);
    const { result } = await invoke(getGeneralLedgerAccount, {
      connection: testConnection,
      generalLedgerAccountId: ACCOUNT_ID,
    });
    expect(result.data).toEqual(getGeneralLedgerAccountResponse);
  });
  test("surfaces an API failure", async () => {
    rampNock()
      .get(PATH)
      .reply(404, { error: { message: "General ledger account not found" } });
    await expect(
      invoke(getGeneralLedgerAccount, {
        connection: testConnection,
        generalLedgerAccountId: ACCOUNT_ID,
      }),
    ).rejects.toThrow();
  });
});
