import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { listVotesExamplePayload } from "../../examplePayloads";
import { CANNY_HOST, captureBody, testConnection, V2 } from "../../testHelpers";
import { listVotes } from "./listVotes";
const PATH = `${V2}/votes/list`;
const params = {
  connection: testConnection,
  boardId: "553c3ef8b8cdcd1501ba1234",
  postIdOptional: undefined,
  companyId: undefined,
  userIdOptional: undefined,
  fetchAll: false,
  pagination: { cursor: undefined, limit: 10 },
};
describe("listVotes", () => {
  afterEach(() => nock.cleanAll());
  test("returns one page of votes and drops the unset filters", async () => {
    const { captured, matcher } = captureBody();
    nock(CANNY_HOST)
      .post(PATH, matcher)
      .reply(200, listVotesExamplePayload.data);
    const { result } = await invoke(listVotes, params);
    expect(captured.body).toStrictEqual({
      apiKey: "test-api-key",
      boardID: "553c3ef8b8cdcd1501ba1234",
      limit: 10,
    });
    expect(result.data).toStrictEqual(listVotesExamplePayload.data);
  });
  test("surfaces an API error", async () => {
    nock(CANNY_HOST).post(PATH).reply(400, { error: "something went wrong" });
    await expect(invoke(listVotes, params)).rejects.toThrow();
  });
});
