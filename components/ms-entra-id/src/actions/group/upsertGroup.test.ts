import { invoke } from "@prismatic-io/spectral/dist/testing";
import { SUCCESS_RESPONSE } from "../../constants";
import { createGroupExamplePayload } from "../../examplePayloads";
import {
  API_PATH,
  connection,
  graphError,
  mockGraph,
  resetNock,
} from "../../testHelpers";
import { upsertGroup } from "./upsertGroup";

const UPSERT_PATH = `${API_PATH}/groups(uniqueName='MarketingTeam')`;

const params = {
  connection,
  uniqueName: "MarketingTeam",
  useAsUpsert: true,
  groupFields: {
    displayName: "Marketing Team",
    mailEnabled: true,
    mailNickname: "MarketingTeam",
    securityEnabled: undefined,
    groupTypes: undefined,
  },
  additionalProperties: undefined,
};

describe("upsertGroup", () => {
  afterEach(resetNock);

  test("happy path returns the created group when the endpoint replies with a body", async () => {
    const scope = mockGraph()
      .matchHeader("Prefer", "create-if-missing")
      .patch(UPSERT_PATH, {
        displayName: "Marketing Team",
        mailEnabled: true,
        mailNickname: "MarketingTeam",
      })
      .reply(201, createGroupExamplePayload.data);
    const { result } = await invoke(upsertGroup, params);
    expect(result).toEqual(createGroupExamplePayload);
    expect(scope.isDone()).toBe(true);
  });

  test("happy path returns the success response when an update replies 204", async () => {
    mockGraph().patch(UPSERT_PATH).reply(204);
    const { result } = await invoke(upsertGroup, params);
    expect(result).toEqual({ data: SUCCESS_RESPONSE });
  });

  test("error path surfaces the failure", async () => {
    mockGraph().patch(UPSERT_PATH).reply(400, graphError);
    await expect(invoke(upsertGroup, params)).rejects.toThrow();
  });
});
