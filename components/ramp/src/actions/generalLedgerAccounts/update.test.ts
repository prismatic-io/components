import { invoke } from "@prismatic-io/spectral/dist/testing";
import { getGeneralLedgerAccountResponse } from "../../examplePayloads/ledgerAccounts";
import {
  apiPath,
  rampNock,
  resetNock,
  testConnection,
} from "../../testHarness";
import { updateGeneralLedgerAccount } from "./update";
const ACCOUNT_ID = "514";
const PATH = apiPath(`/accounting/accounts/${ACCOUNT_ID}`);
const SUBSIDIARIES = ["d4fb347a-e24d-46aa-bdbd-f51ee6f3938b"];
describe("updateGeneralLedgerAccount", () => {
  afterEach(resetNock);
  test("maps the inputs onto the request body and returns the updated account", async () => {
    rampNock()
      .patch(PATH, {
        code: "6420",
        name: "Employees:Bonuses",
        reactivate: true,
        subsidiaries: SUBSIDIARIES,
      })
      .reply(200, {
        ...getGeneralLedgerAccountResponse,
        code: "6420",
        name: "Employees:Bonuses",
      });
    const { result } = await invoke(updateGeneralLedgerAccount, {
      connection: testConnection,
      generalLedgerAccountId: ACCOUNT_ID,
      code: "6420",
      name: "Employees:Bonuses",
      reactivate: true,
      subsidiaries: SUBSIDIARIES,
    });
    expect(result.data).toEqual({
      ...getGeneralLedgerAccountResponse,
      code: "6420",
      name: "Employees:Bonuses",
    });
  });
  test("surfaces an API failure", async () => {
    rampNock()
      .patch(PATH)
      .reply(404, { error: { message: "General ledger account not found" } });
    await expect(
      invoke(updateGeneralLedgerAccount, {
        connection: testConnection,
        generalLedgerAccountId: ACCOUNT_ID,
        code: "6420",
        name: "Employees:Bonuses",
        reactivate: true,
        subsidiaries: SUBSIDIARIES,
      }),
    ).rejects.toThrow();
  });
});
