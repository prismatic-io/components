import { invokeDataSource } from "@prismatic-io/spectral/dist/testing";
import {
  getGroupExamplePayload,
  getUserExamplePayload,
} from "../examplePayloads";
import { API_PATH, connection, mockGraph, resetNock } from "../testHelpers";
import { selectGroupMember } from "./selectGroupMember";

const GROUP_ID = getGroupExamplePayload.data.id;

describe("selectGroupMember", () => {
  afterEach(resetNock);

  test("maps group members to { key, label } elements", async () => {
    const member = getUserExamplePayload.data;
    mockGraph()
      .get(`${API_PATH}/groups/${GROUP_ID}/members`)
      .query({ $select: "id,displayName" })
      .reply(200, { value: [member] });
    const { result } = await invokeDataSource(selectGroupMember, {
      connection,
      groupId: GROUP_ID,
    });
    expect(result).toEqual([{ key: member.id, label: member.displayName }]);
  });

  test("returns an empty list when the group has no members", async () => {
    mockGraph()
      .get(`${API_PATH}/groups/${GROUP_ID}/members`)
      .query(true)
      .reply(200, { value: [] });
    const { result } = await invokeDataSource(selectGroupMember, {
      connection,
      groupId: GROUP_ID,
    });
    expect(result).toEqual([]);
  });
});
