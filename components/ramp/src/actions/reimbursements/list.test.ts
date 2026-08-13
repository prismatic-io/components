import { invoke } from "@prismatic-io/spectral/dist/testing";
import { listReimbursementsResponse } from "../../examplePayloads/reimbursements";
import {
  apiPath,
  listActionParams,
  rampNock,
  resetNock,
  terminatePaging,
} from "../../testHarness";
import { listReimbursements } from "./list";
const PATH = apiPath("reimbursements");
describe("listReimbursements", () => {
  afterEach(resetNock);
  test("returns the list envelope untouched when Fetch All is off", async () => {
    rampNock().get(PATH).query({}).reply(200, listReimbursementsResponse);
    const { result } = await invoke(listReimbursements, listActionParams());
    expect(result.data).toEqual(listReimbursementsResponse);
  });
  test("injects page_size 50 and returns the accumulated records when Fetch All is on", async () => {
    rampNock()
      .get(PATH)
      .query({ page_size: "50" })
      .reply(200, terminatePaging(listReimbursementsResponse));
    const { result } = await invoke(
      listReimbursements,
      listActionParams({ fetchAll: true }),
    );
    expect(result.data).toEqual({
      data: listReimbursementsResponse.data,
      page: null,
    });
  });
  test("surfaces an API failure", async () => {
    rampNock()
      .get(PATH)
      .query(true)
      .reply(500, { error: { message: "Internal error" } });
    await expect(
      invoke(listReimbursements, listActionParams()),
    ).rejects.toThrow();
  });
});
