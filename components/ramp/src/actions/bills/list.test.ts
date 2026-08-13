import { invoke } from "@prismatic-io/spectral/dist/testing";
import { listBillsResponse } from "../../examplePayloads/bills";
import {
  apiPath,
  listActionParams,
  listBody,
  rampNock,
  resetNock,
  terminatePaging,
} from "../../testHarness";
import { listBills } from "./list";
const PATH = apiPath("bills");
describe("listBills", () => {
  afterEach(resetNock);
  test("returns the list envelope untouched when Fetch All is off", async () => {
    rampNock().get(PATH).query({}).reply(200, listBillsResponse);
    const { result } = await invoke(listBills, listActionParams());
    expect(result.data).toEqual(listBillsResponse);
  });
  test("forwards Custom Query Params and Pagination on the single-page request", async () => {
    rampNock()
      .get(PATH)
      .query({ page_size: "10", start: "CURSOR-A", from_date: "2024-01-01" })
      .reply(200, listBillsResponse);
    const { result } = await invoke(
      listBills,
      listActionParams({
        pagination: { pageSize: 10, start: "CURSOR-A" },
        customQueryParams: { from_date: "2024-01-01" },
      }),
    );
    expect(result.data).toEqual(listBillsResponse);
  });
  test("injects page_size 50 and still forwards Start when Fetch All is on", async () => {
    rampNock()
      .get(PATH)
      .query({ page_size: "50", start: "CURSOR-A" })
      .reply(200, terminatePaging(listBillsResponse));
    const { result } = await invoke(
      listBills,
      listActionParams({
        fetchAll: true,
        pagination: { pageSize: 10, start: "CURSOR-A" },
      }),
    );
    expect(result.data).toEqual({ data: listBillsResponse.data, page: null });
  });
  test("accumulates records across pages and terminates on a null cursor", async () => {
    const firstRecord = { ...listBillsResponse.data[0], id: "bill-1" };
    const secondRecord = { ...listBillsResponse.data[0], id: "bill-2" };
    const nextUrl = `https://api.ramp.com${PATH}?start=CURSOR-2`;
    rampNock()
      .get(PATH)
      .query({ page_size: "50" })
      .reply(200, { data: [firstRecord], page: { next: nextUrl } });
    rampNock()
      .get(PATH)
      .query({ page_size: "50", start: "CURSOR-2" })
      .reply(200, listBody([secondRecord]));
    const { result } = await invoke(
      listBills,
      listActionParams({ fetchAll: true }),
    );
    expect(result.data).toEqual({
      data: [firstRecord, secondRecord],
      page: null,
    });
  });
  test("surfaces an API failure", async () => {
    rampNock()
      .get(PATH)
      .query(true)
      .reply(500, { error: { message: "Internal error" } });
    await expect(invoke(listBills, listActionParams())).rejects.toThrow();
  });
});
