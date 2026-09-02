import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { createCommentExamplePayload } from "../../examplePayloads";
import { CANNY_HOST, captureBody, testConnection, V1 } from "../../testHelpers";
import { createComment } from "./createComment";
const PATH = `${V1}/comments/create`;
const params = {
  connection: testConnection,
  postId: "553c3ef8b8cdcd1501ba5678",
  commentAuthorId: "553c3ef8b8cdcd1501ba9999",
  commentValue: "Great idea! We should prioritize this.",
  parentId: undefined,
  additionalFields: {
    internal: true,
    imageURLs: ["https://example.com/image.png"],
    additionalFields: {},
  },
};
describe("createComment", () => {
  afterEach(() => nock.cleanAll());
  test("creates a comment and flattens the additional fields", async () => {
    const { captured, matcher } = captureBody();
    nock(CANNY_HOST)
      .post(PATH, matcher)
      .reply(200, createCommentExamplePayload.data);
    const { result } = await invoke(createComment, params);
    expect(captured.body).toStrictEqual({
      apiKey: "test-api-key",
      postID: "553c3ef8b8cdcd1501ba5678",
      authorID: "553c3ef8b8cdcd1501ba9999",
      value: "Great idea! We should prioritize this.",
      internal: true,
      imageURLs: ["https://example.com/image.png"],
    });
    expect(result.data).toStrictEqual(createCommentExamplePayload.data);
  });
  test("surfaces an API error", async () => {
    nock(CANNY_HOST).post(PATH).reply(422, { error: "invalid post" });
    await expect(invoke(createComment, params)).rejects.toThrow();
  });
});
