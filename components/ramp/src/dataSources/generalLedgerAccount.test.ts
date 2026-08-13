import { invokeDataSource } from "@prismatic-io/spectral/dist/testing";
import { listGeneralLedgerAccountsResponse } from "../examplePayloads/ledgerAccounts";
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
import { selectLedgerAccount } from "./generalLedgerAccount";
const PATH = apiPath("/accounting/accounts");
describe("selectLedgerAccount", () => {
  afterEach(resetNock);
  test("maps the ledger account list into dropdown elements", async () => {
    rampNock()
      .get(PATH)
      .query(true)
      .reply(200, terminatePaging(listGeneralLedgerAccountsResponse));
    const { result } = await invokeDataSource(selectLedgerAccount, {
      connection: testConnection,
    });
    expect(result).toEqual([
      { key: "514", label: "Employees:Salaries & Wages - 6410" },
      { key: "514", label: "Employees:Salaries & Wages - 6410" },
    ]);
  });
  test("falls back to the bare name when the account has no code", async () => {
    rampNock()
      .get(PATH)
      .query(true)
      .reply(
        200,
        listBody([
          { id: "1", name: "Coded Account", code: "6410" },
          { id: "2", name: "Uncoded Account", code: null },
          { id: "3", name: "Codeless Account" },
        ]),
      );
    const { result } = await invokeDataSource(selectLedgerAccount, {
      connection: testConnection,
    });
    expect(elementLabels(result)).toEqual([
      "Coded Account - 6410",
      "Uncoded Account",
      "Codeless Account",
    ]);
  });
  test("sorts by id ascending regardless of reply order", async () => {
    rampNock()
      .get(PATH)
      .query(true)
      .reply(
        200,
        listBody([
          { id: "c", name: "Zulu", code: "3" },
          { id: "a", name: "Alpha", code: "1" },
          { id: "b", name: "Bravo", code: "2" },
        ]),
      );
    const { result } = await invokeDataSource(selectLedgerAccount, {
      connection: testConnection,
    });
    expect(elementKeys(result)).toEqual(["a", "b", "c"]);
  });
  test("returns an empty list when the API returns no records", async () => {
    rampNock().get(PATH).query(true).reply(200, emptyListBody());
    const { result } = await invokeDataSource(selectLedgerAccount, {
      connection: testConnection,
    });
    expect(result).toEqual([]);
  });
});
