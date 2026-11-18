import { invoke } from "@prismatic-io/spectral/dist/testing";
import { SUCCESS_RESPONSE } from "../../constants";
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
import { addMemberToGroup } from "./addMemberToGroup";

const GROUP_ID = getGroupExamplePayload.data.id;
const MEMBER_ODATA_ID = `https://graph.microsoft.com/v1.0/directoryObjects/${getUserExamplePayload.data.id}`;

describe("addMemberToGroup", () => {
  afterEach(resetNock);

  test("happy path posts the member reference and returns the success response on 204", async () => {
    const scope = mockGraph()
      .post(`${API_PATH}/groups/${GROUP_ID}/members/$ref`, {
        "@odata.id": MEMBER_ODATA_ID,
      })
      .reply(204);
    const { result } = await invoke(addMemberToGroup, {
      connection,
      groupId: GROUP_ID,
      groupMemberOdataId: MEMBER_ODATA_ID,
    });
    expect(result).toEqual({ data: SUCCESS_RESPONSE });
    expect(scope.isDone()).toBe(true);
  });

  test("error path surfaces the failure", async () => {
    mockGraph()
      .post(`${API_PATH}/groups/${GROUP_ID}/members/$ref`)
      .reply(400, graphError);
    await expect(
      invoke(addMemberToGroup, {
        connection,
        groupId: GROUP_ID,
        groupMemberOdataId: MEMBER_ODATA_ID,
      }),
    ).rejects.toThrow();
  });
});
