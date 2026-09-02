import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { deleteVoteExamplePayload } from "../../examplePayloads";
import { CANNY_HOST, captureBody, testConnection, V1 } from "../../testHelpers";
import { deleteVote } from "./deleteVote";
const PATH = `${V1}/votes/delete`;
const params = {
  connection: testConnection,
  voteId: "553c3ef8b8cdcd1501ba123b",
};
describe("deleteVote", () => {
  afterEach(() => nock.cleanAll());
  test("deletes a vote", async () => {
    const { captured, matcher } = captureBody();
    nock(CANNY_HOST)
      .post(PATH, matcher)
      .reply(200, deleteVoteExamplePayload.data);
    const { result } = await invoke(deleteVote, params);
    expect(captured.body).toStrictEqual({
      apiKey: "test-api-key",
      voteID: "553c3ef8b8cdcd1501ba123b",
    });
    expect(result.data).toStrictEqual(deleteVoteExamplePayload.data);
  });
  test("surfaces an API error", async () => {
    nock(CANNY_HOST).post(PATH).reply(404, { error: "vote not found" });
    await expect(invoke(deleteVote, params)).rejects.toThrow();
  });
});
