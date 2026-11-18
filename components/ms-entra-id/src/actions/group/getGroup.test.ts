import { invoke } from "@prismatic-io/spectral/dist/testing";
import { getGroupExamplePayload } from "../../examplePayloads";
import {
  API_PATH,
  connection,
  graphError,
  mockGraph,
  resetNock,
} from "../../testHelpers";
import { getGroup } from "./getGroup";

const GROUP_ID = getGroupExamplePayload.data.id;

describe("getGroup", () => {
  afterEach(resetNock);

  test("happy path returns the group with $select forwarded", async () => {
    const scope = mockGraph()
      .get(`${API_PATH}/groups/${GROUP_ID}`)
      .query({ $select: "id,displayName" })
      .reply(200, getGroupExamplePayload.data);
    const { result } = await invoke(getGroup, {
      connection,
      groupId: GROUP_ID,
      $select: "id,displayName",
    });
    expect(result).toEqual(getGroupExamplePayload);
    expect(scope.isDone()).toBe(true);
  });

  test("error path surfaces the failure", async () => {
    mockGraph().get(`${API_PATH}/groups/${GROUP_ID}`).reply(404, graphError);
    await expect(
      invoke(getGroup, { connection, groupId: GROUP_ID, $select: undefined }),
    ).rejects.toThrow();
  });
});
