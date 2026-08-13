import { invoke } from "@prismatic-io/spectral/dist/testing";
import { listLocationsResponse } from "../../examplePayloads/locations";
import {
  apiPath,
  listActionParams,
  rampNock,
  resetNock,
  terminatePaging,
} from "../../testHarness";
import { listLocations } from "./list";
const PATH = apiPath("locations");
describe("listLocations", () => {
  afterEach(resetNock);
  test("returns the list envelope untouched when Fetch All is off", async () => {
    rampNock().get(PATH).query({}).reply(200, listLocationsResponse);
    const { result } = await invoke(listLocations, listActionParams());
    expect(result.data).toEqual(listLocationsResponse);
  });
  test("injects page_size 50 and returns the accumulated records when Fetch All is on", async () => {
    rampNock()
      .get(PATH)
      .query({ page_size: "50" })
      .reply(200, terminatePaging(listLocationsResponse));
    const { result } = await invoke(
      listLocations,
      listActionParams({ fetchAll: true }),
    );
    expect(result.data).toEqual({
      data: listLocationsResponse.data,
      page: null,
    });
  });
  test("surfaces an API failure", async () => {
    rampNock()
      .get(PATH)
      .query(true)
      .reply(500, { error: { message: "Internal error" } });
    await expect(invoke(listLocations, listActionParams())).rejects.toThrow();
  });
});
