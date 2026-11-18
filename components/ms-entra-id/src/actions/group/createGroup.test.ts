import { invoke } from "@prismatic-io/spectral/dist/testing";
import { createGroupExamplePayload } from "../../examplePayloads";
import {
  API_PATH,
  connection,
  graphError,
  mockGraph,
  resetNock,
} from "../../testHelpers";
import { createGroup } from "./createGroup";

const params = {
  connection,
  displayName: "Marketing Team",
  mailEnabled: true,
  mailNickname: "MarketingTeam",
  securityEnabled: false,
  groupTypes: ["Unified"],
  additionalProperties: { visibility: "Private" },
};

describe("createGroup", () => {
  afterEach(resetNock);

  test("happy path posts the group fields merged with additional properties", async () => {
    const scope = mockGraph()
      .post(`${API_PATH}/groups`, {
        displayName: "Marketing Team",
        mailEnabled: true,
        mailNickname: "MarketingTeam",
        securityEnabled: false,
        groupTypes: ["Unified"],
        visibility: "Private",
      })
      .reply(201, createGroupExamplePayload.data);
    const { result } = await invoke(createGroup, params);
    expect(result).toEqual(createGroupExamplePayload);
    expect(scope.isDone()).toBe(true);
  });

  test("error path surfaces the failure", async () => {
    mockGraph().post(`${API_PATH}/groups`).reply(400, graphError);
    await expect(invoke(createGroup, params)).rejects.toThrow();
  });
});
