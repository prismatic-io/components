import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { retrieveVoteExamplePayload } from "../../examplePayloads";
import { CANNY_HOST, captureBody, testConnection, V1 } from "../../testHelpers";
import { retrieveVote } from "./retrieveVote";
const PATH = `${V1}/votes/retrieve`;
const params = {
  connection: testConnection,
  voteId: "553c3ef8b8cdcd1501ba123b",
};
describe("retrieveVote", () => {
  afterEach(() => nock.cleanAll());
  test("retrieves one vote by ID", async () => {
    const { captured, matcher } = captureBody();
    nock(CANNY_HOST)
      .post(PATH, matcher)
      .reply(200, retrieveVoteExamplePayload.data);
    const { result } = await invoke(retrieveVote, params);
    expect(captured.body).toStrictEqual({
      apiKey: "test-api-key",
      id: "553c3ef8b8cdcd1501ba123b",
    });
    expect(result.data).toStrictEqual(retrieveVoteExamplePayload.data);
  });
  test("surfaces an API error", async () => {
    nock(CANNY_HOST).post(PATH).reply(404, { error: "vote not found" });
    await expect(invoke(retrieveVote, params)).rejects.toThrow();
  });
});
