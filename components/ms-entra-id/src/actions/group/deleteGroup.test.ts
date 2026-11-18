import { invoke } from "@prismatic-io/spectral/dist/testing";
import { getGroupExamplePayload } from "../../examplePayloads";
import {
  API_PATH,
  connection,
  graphError,
  mockGraph,
  resetNock,
} from "../../testHelpers";
import { deleteGroup } from "./deleteGroup";

const GROUP_ID = getGroupExamplePayload.data.id;

describe("deleteGroup", () => {
  afterEach(resetNock);

  test("happy path returns the delete record on 204", async () => {
    const scope = mockGraph()
      .delete(`${API_PATH}/groups/${GROUP_ID}`)
      .reply(204);
    const { result } = await invoke(deleteGroup, {
      connection,
      groupId: GROUP_ID,
    });
    expect(result).toEqual({
      data: {
        success: true,
        id: GROUP_ID,
        message: "Group deleted successfully",
      },
    });
    expect(scope.isDone()).toBe(true);
  });

  test("error path surfaces the failure", async () => {
    mockGraph().delete(`${API_PATH}/groups/${GROUP_ID}`).reply(404, graphError);
    await expect(
      invoke(deleteGroup, { connection, groupId: GROUP_ID }),
    ).rejects.toThrow();
  });
});
