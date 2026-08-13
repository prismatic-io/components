import { invoke } from "@prismatic-io/spectral/dist/testing";
import { listDepartmentsResponse } from "../../examplePayloads/departments";
import {
  apiPath,
  listActionParams,
  rampNock,
  resetNock,
  terminatePaging,
} from "../../testHarness";
import { listDepartments } from "./list";
const PATH = apiPath("departments");
describe("listDepartments", () => {
  afterEach(resetNock);
  test("returns the list envelope untouched when Fetch All is off", async () => {
    rampNock().get(PATH).query({}).reply(200, listDepartmentsResponse);
    const { result } = await invoke(listDepartments, listActionParams());
    expect(result.data).toEqual(listDepartmentsResponse);
  });
  test("injects page_size 50 and returns the accumulated records when Fetch All is on", async () => {
    rampNock()
      .get(PATH)
      .query({ page_size: "50" })
      .reply(200, terminatePaging(listDepartmentsResponse));
    const { result } = await invoke(
      listDepartments,
      listActionParams({ fetchAll: true }),
    );
    expect(result.data).toEqual({
      data: listDepartmentsResponse.data,
      page: null,
    });
  });
  test("surfaces an API failure", async () => {
    rampNock()
      .get(PATH)
      .query(true)
      .reply(500, { error: { message: "Internal error" } });
    await expect(invoke(listDepartments, listActionParams())).rejects.toThrow();
  });
});
