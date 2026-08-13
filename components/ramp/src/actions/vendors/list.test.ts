import { invoke } from "@prismatic-io/spectral/dist/testing";
import { listVendorsResponse } from "../../examplePayloads/vendors";
import {
  apiPath,
  listActionParams,
  rampNock,
  resetNock,
  terminatePaging,
} from "../../testHarness";
import { listVendors } from "./list";
const PATH = apiPath("/accounting/vendors");
describe("listVendors", () => {
  afterEach(resetNock);
  test("returns the list envelope untouched when Fetch All is off", async () => {
    rampNock().get(PATH).query({}).reply(200, listVendorsResponse);
    const { result } = await invoke(listVendors, listActionParams());
    expect(result.data).toEqual(listVendorsResponse);
  });
  test("injects page_size 50 and returns the accumulated records when Fetch All is on", async () => {
    rampNock()
      .get(PATH)
      .query({ page_size: "50" })
      .reply(200, terminatePaging(listVendorsResponse));
    const { result } = await invoke(
      listVendors,
      listActionParams({ fetchAll: true }),
    );
    expect(result.data).toEqual({ data: listVendorsResponse.data, page: null });
  });
  test("surfaces an API failure", async () => {
    rampNock()
      .get(PATH)
      .query(true)
      .reply(500, { error: { message: "Internal error" } });
    await expect(invoke(listVendors, listActionParams())).rejects.toThrow();
  });
});
