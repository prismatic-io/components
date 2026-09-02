import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { deleteCommentExamplePayload } from "../../examplePayloads";
import { CANNY_HOST, captureBody, testConnection, V1 } from "../../testHelpers";
import { deleteComment } from "./deleteComment";
const PATH = `${V1}/comments/delete`;
const params = {
  connection: testConnection,
  commentId: "553c3ef8b8cdcd1501ba2222",
};
describe("deleteComment", () => {
  afterEach(() => nock.cleanAll());
  test("deletes a comment", async () => {
    const { captured, matcher } = captureBody();
    nock(CANNY_HOST)
      .post(PATH, matcher)
      .reply(200, deleteCommentExamplePayload.data);
    const { result } = await invoke(deleteComment, params);
    expect(captured.body).toStrictEqual({
      apiKey: "test-api-key",
      commentID: "553c3ef8b8cdcd1501ba2222",
    });
    expect(result.data).toStrictEqual(deleteCommentExamplePayload.data);
  });
  test("surfaces an API error", async () => {
    nock(CANNY_HOST).post(PATH).reply(404, { error: "comment not found" });
    await expect(invoke(deleteComment, params)).rejects.toThrow();
  });
});
