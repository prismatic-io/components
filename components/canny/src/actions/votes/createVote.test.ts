import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { createVoteExamplePayload } from "../../examplePayloads";
import { CANNY_HOST, captureBody, testConnection, V1 } from "../../testHelpers";
import { createVote } from "./createVote";
const PATH = `${V1}/votes/create`;
const params = {
  connection: testConnection,
  postId: "553c3ef8b8cdcd1501ba1238",
  voterId: "553c3ef8b8cdcd1501ba9999",
  additionalFields: {},
};
describe("createVote", () => {
  afterEach(() => nock.cleanAll());
  test("creates a vote", async () => {
    const { captured, matcher } = captureBody();
    nock(CANNY_HOST)
      .post(PATH, matcher)
      .reply(200, createVoteExamplePayload.data);
    const { result } = await invoke(createVote, params);
    expect(captured.body).toStrictEqual({
      apiKey: "test-api-key",
      postID: "553c3ef8b8cdcd1501ba1238",
      voterID: "553c3ef8b8cdcd1501ba9999",
    });
    expect(result.data).toStrictEqual(createVoteExamplePayload.data);
  });
  test("surfaces an API error", async () => {
    nock(CANNY_HOST).post(PATH).reply(422, { error: "invalid post" });
    await expect(invoke(createVote, params)).rejects.toThrow();
  });
});
