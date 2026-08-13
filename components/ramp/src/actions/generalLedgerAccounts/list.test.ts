import { invoke } from "@prismatic-io/spectral/dist/testing";
import { listGeneralLedgerAccountsResponse } from "../../examplePayloads/ledgerAccounts";
import {
  apiPath,
  listActionParams,
  rampNock,
  resetNock,
  terminatePaging,
} from "../../testHarness";
import { listGeneralLedgerAccounts } from "./list";
const PATH = apiPath("/accounting/accounts");
describe("listGeneralLedgerAccounts", () => {
  afterEach(resetNock);
  test("returns the list envelope untouched when Fetch All is off", async () => {
    rampNock()
      .get(PATH)
      .query({})
      .reply(200, listGeneralLedgerAccountsResponse);
    const { result } = await invoke(
      listGeneralLedgerAccounts,
      listActionParams(),
    );
    expect(result.data).toEqual(listGeneralLedgerAccountsResponse);
  });
  test("injects page_size 50 and returns the accumulated records when Fetch All is on", async () => {
    rampNock()
      .get(PATH)
      .query({ page_size: "50" })
      .reply(200, terminatePaging(listGeneralLedgerAccountsResponse));
    const { result } = await invoke(
      listGeneralLedgerAccounts,
      listActionParams({ fetchAll: true }),
    );
    expect(result.data).toEqual({
      data: listGeneralLedgerAccountsResponse.data,
      page: null,
    });
  });
  test("surfaces an API failure", async () => {
    rampNock()
      .get(PATH)
      .query(true)
      .reply(500, { error: { message: "Internal error" } });
    await expect(
      invoke(listGeneralLedgerAccounts, listActionParams()),
    ).rejects.toThrow();
  });
});
