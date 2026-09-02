import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { deletePostExamplePayload } from "../../examplePayloads";
import { CANNY_HOST, captureBody, testConnection, V1 } from "../../testHelpers";
import { deletePost } from "./deletePost";
const PATH = `${V1}/posts/delete`;
const params = {
  connection: testConnection,
  postId: "553c3ef8b8cdcd1501ba1238",
};
describe("deletePost", () => {
  afterEach(() => nock.cleanAll());
  test("deletes a post", async () => {
    const { captured, matcher } = captureBody();
    nock(CANNY_HOST)
      .post(PATH, matcher)
      .reply(200, deletePostExamplePayload.data);
    const { result } = await invoke(deletePost, params);
    expect(captured.body).toStrictEqual({
      apiKey: "test-api-key",
      postID: "553c3ef8b8cdcd1501ba1238",
    });
    expect(result.data).toStrictEqual(deletePostExamplePayload.data);
  });
  test("surfaces an API error", async () => {
    nock(CANNY_HOST).post(PATH).reply(404, { error: "post not found" });
    await expect(invoke(deletePost, params)).rejects.toThrow();
  });
});
