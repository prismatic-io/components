import { invokeDataSource } from "@prismatic-io/spectral/dist/testing";
import { listReimbursementsResponse } from "../examplePayloads/reimbursements";
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
import { selectReimbursement } from "./reimbursement";
const PATH = apiPath("reimbursements");
describe("selectReimbursement", () => {
  afterEach(resetNock);
  test("maps the reimbursement list into dropdown elements", async () => {
    rampNock()
      .get(PATH)
      .query(true)
      .reply(200, terminatePaging(listReimbursementsResponse));
    const { result } = await invokeDataSource(selectReimbursement, {
      connection: testConnection,
    });
    expect(result).toEqual([
      {
        key: "d47ba06e-14ac-4a7b-89b4-4775412ba545",
        label: "Delta Airlines - $4.8446",
      },
    ]);
  });
  test("renders the label as merchant and amount divided by one hundred", async () => {
    rampNock()
      .get(PATH)
      .query(true)
      .reply(200, listBody([{ id: "1", merchant: "Acme", amount: 12345 }]));
    const { result } = await invokeDataSource(selectReimbursement, {
      connection: testConnection,
    });
    expect(elementLabels(result)).toEqual(["Acme - $123.45"]);
  });
  test("sorts by id ascending regardless of reply order", async () => {
    rampNock()
      .get(PATH)
      .query(true)
      .reply(
        200,
        listBody([
          { id: "c", merchant: "Zulu", amount: 300 },
          { id: "a", merchant: "Alpha", amount: 100 },
          { id: "b", merchant: "Bravo", amount: 200 },
        ]),
      );
    const { result } = await invokeDataSource(selectReimbursement, {
      connection: testConnection,
    });
    expect(elementKeys(result)).toEqual(["a", "b", "c"]);
  });
  test("returns an empty list when the API returns no records", async () => {
    rampNock().get(PATH).query(true).reply(200, emptyListBody());
    const { result } = await invokeDataSource(selectReimbursement, {
      connection: testConnection,
    });
    expect(result).toEqual([]);
  });
});
