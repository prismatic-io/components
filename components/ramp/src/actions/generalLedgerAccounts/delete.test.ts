import { invoke } from "@prismatic-io/spectral/dist/testing";
import { GENERIC_DELETE_RESPONSE } from "../../constants";
import {
  apiPath,
  rampNock,
  resetNock,
  testConnection,
} from "../../testHarness";
import { deleteGeneralLedgerAccount } from "./delete";
const ACCOUNT_ID = "514";
const PATH = apiPath(`/accounting/accounts/${ACCOUNT_ID}`);
describe("deleteGeneralLedgerAccount", () => {
  afterEach(resetNock);
  test("returns the generic delete constant rather than the API response body", async () => {
    rampNock().delete(PATH).reply(200, { id: ACCOUNT_ID, deleted: true });
    const { result } = await invoke(deleteGeneralLedgerAccount, {
      connection: testConnection,
      generalLedgerAccountId: ACCOUNT_ID,
    });
    expect(result.data).toBe(GENERIC_DELETE_RESPONSE);
  });
  test("surfaces an API failure", async () => {
    rampNock()
      .delete(PATH)
      .reply(404, { error: { message: "General ledger account not found" } });
    await expect(
      invoke(deleteGeneralLedgerAccount, {
        connection: testConnection,
        generalLedgerAccountId: ACCOUNT_ID,
      }),
    ).rejects.toThrow();
  });
});
