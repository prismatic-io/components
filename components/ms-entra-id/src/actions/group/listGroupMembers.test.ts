import { invoke } from "@prismatic-io/spectral/dist/testing";
import {
  getGroupExamplePayload,
  listGroupMembersExamplePayload,
} from "../../examplePayloads";
import {
  API_PATH,
  connection,
  emptyOdataQueryParams,
  graphError,
  mockGraph,
  resetNock,
} from "../../testHelpers";
import { listGroupMembers } from "./listGroupMembers";

const GROUP_ID = getGroupExamplePayload.data.id;

describe("listGroupMembers", () => {
  afterEach(resetNock);

  test("happy path returns a single page of members", async () => {
    const scope = mockGraph()
      .get(`${API_PATH}/groups/${GROUP_ID}/members`)
      .query({ $count: "false", $top: "10" })
      .reply(200, listGroupMembersExamplePayload.data);
    const { result } = await invoke(listGroupMembers, {
      connection,
      groupId: GROUP_ID,
      getAllPaginatedResults: false,
      odataQueryParams: { ...emptyOdataQueryParams, $top: 10 },
      eventualConsistencyLevelHeader: false,
    });
    expect(result).toEqual(listGroupMembersExamplePayload);
    expect(scope.isDone()).toBe(true);
  });

  test("error path surfaces the failure", async () => {
    mockGraph()
      .get(`${API_PATH}/groups/${GROUP_ID}/members`)
      .query(true)
      .reply(404, graphError);
    await expect(
      invoke(listGroupMembers, {
        connection,
        groupId: GROUP_ID,
        getAllPaginatedResults: false,
        odataQueryParams: emptyOdataQueryParams,
        eventualConsistencyLevelHeader: false,
      }),
    ).rejects.toThrow();
  });
});
