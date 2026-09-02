import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { retrieveCommentExamplePayload } from "../../examplePayloads";
import { CANNY_HOST, captureBody, testConnection, V1 } from "../../testHelpers";
import { retrieveComment } from "./retrieveComment";
const PATH = `${V1}/comments/retrieve`;
const params = {
  connection: testConnection,
  commentId: "553c3ef8b8cdcd1501ba2222",
};
describe("retrieveComment", () => {
  afterEach(() => nock.cleanAll());
  test("retrieves one comment by ID", async () => {
    const { captured, matcher } = captureBody();
    nock(CANNY_HOST)
      .post(PATH, matcher)
      .reply(200, retrieveCommentExamplePayload.data);
    const { result } = await invoke(retrieveComment, params);
    expect(captured.body).toStrictEqual({
      apiKey: "test-api-key",
      id: "553c3ef8b8cdcd1501ba2222",
    });
    expect(result.data).toStrictEqual(retrieveCommentExamplePayload.data);
  });
  test("surfaces an API error", async () => {
    nock(CANNY_HOST).post(PATH).reply(404, { error: "comment not found" });
    await expect(invoke(retrieveComment, params)).rejects.toThrow();
  });
});
