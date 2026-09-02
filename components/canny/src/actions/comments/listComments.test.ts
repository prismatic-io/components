import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { listCommentsExamplePayload } from "../../examplePayloads";
import { CANNY_HOST, captureBody, testConnection, V2 } from "../../testHelpers";
import { listComments } from "./listComments";
const PATH = `${V2}/comments/list`;
const params = {
  connection: testConnection,
  boardId: "553c3ef8b8cdcd1501ba1234",
  postIdOptional: undefined,
  authorId: undefined,
  companyId: undefined,
  fetchAll: false,
  pagination: { cursor: undefined, limit: 10 },
};
describe("listComments", () => {
  afterEach(() => nock.cleanAll());
  test("returns one page of comments and drops the unset filters", async () => {
    const { captured, matcher } = captureBody();
    nock(CANNY_HOST)
      .post(PATH, matcher)
      .reply(200, listCommentsExamplePayload.data);
    const { result } = await invoke(listComments, params);
    expect(captured.body).toStrictEqual({
      apiKey: "test-api-key",
      boardID: "553c3ef8b8cdcd1501ba1234",
      limit: 10,
    });
    expect(result.data).toStrictEqual(listCommentsExamplePayload.data);
  });
  test("surfaces an API error", async () => {
    nock(CANNY_HOST).post(PATH).reply(400, { error: "something went wrong" });
    await expect(invoke(listComments, params)).rejects.toThrow();
  });
});
