import { invoke } from "@prismatic-io/spectral/dist/testing";
import {
  getGroupExamplePayload,
  getUserExamplePayload,
} from "../../examplePayloads";
import {
  API_PATH,
  connection,
  graphError,
  mockGraph,
  resetNock,
} from "../../testHelpers";
import { removeMemberOfGroup } from "./removeMemberOfGroup";

const GROUP_ID = getGroupExamplePayload.data.id;
const MEMBER_ID = getUserExamplePayload.data.id;
const MEMBER_PATH = `${API_PATH}/groups/${GROUP_ID}/members/${MEMBER_ID}/$ref`;

describe("removeMemberOfGroup", () => {
  afterEach(resetNock);

  test("happy path returns the delete record on 204", async () => {
    const scope = mockGraph().delete(MEMBER_PATH).reply(204);
    const { result } = await invoke(removeMemberOfGroup, {
      connection,
      groupId: GROUP_ID,
      memberId: MEMBER_ID,
    });
    expect(result).toEqual({
      data: {
        success: true,
        id: MEMBER_ID,
        message: "Group member removed successfully",
      },
    });
    expect(scope.isDone()).toBe(true);
  });

  test("error path surfaces the failure", async () => {
    mockGraph().delete(MEMBER_PATH).reply(404, graphError);
    await expect(
      invoke(removeMemberOfGroup, {
        connection,
        groupId: GROUP_ID,
        memberId: MEMBER_ID,
      }),
    ).rejects.toThrow();
  });
});
