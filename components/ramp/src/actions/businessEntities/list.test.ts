import { invoke } from "@prismatic-io/spectral/dist/testing";
import { listBusinessEntitiesResponse } from "../../examplePayloads/businessEntities";
import {
  apiPath,
  listActionParams,
  rampNock,
  resetNock,
  terminatePaging,
} from "../../testHarness";
import { listBusinessEntities } from "./list";
const PATH = apiPath("entities");
describe("listBusinessEntities", () => {
  afterEach(resetNock);
  test("returns the list envelope untouched when Fetch All is off", async () => {
    rampNock().get(PATH).query({}).reply(200, listBusinessEntitiesResponse);
    const { result } = await invoke(listBusinessEntities, listActionParams());
    expect(result.data).toEqual(listBusinessEntitiesResponse);
  });
  test("injects page_size 50 and returns the accumulated records when Fetch All is on", async () => {
    rampNock()
      .get(PATH)
      .query({ page_size: "50" })
      .reply(200, terminatePaging(listBusinessEntitiesResponse));
    const { result } = await invoke(
      listBusinessEntities,
      listActionParams({ fetchAll: true }),
    );
    expect(result.data).toEqual({
      data: listBusinessEntitiesResponse.data,
      page: null,
    });
  });
  test("surfaces an API failure", async () => {
    rampNock()
      .get(PATH)
      .query(true)
      .reply(500, { error: { message: "Internal error" } });
    await expect(
      invoke(listBusinessEntities, listActionParams()),
    ).rejects.toThrow();
  });
});
