import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { updatePostExamplePayload } from "../../examplePayloads";
import { CANNY_HOST, captureBody, testConnection, V1 } from "../../testHelpers";
import { updatePost } from "./updatePost";
const PATH = `${V1}/posts/update`;
const params = {
  connection: testConnection,
  postId: "553c3ef8b8cdcd1501ba1238",
  titleOptional: "Add dark mode support",
  detailsOptional: undefined,
  additionalFields: {
    customFields: undefined,
    eta: "07/2026",
    imageURLs: undefined,
    additionalFields: {},
  },
};
describe("updatePost", () => {
  afterEach(() => nock.cleanAll());
  test("updates a post and omits the unset optional fields", async () => {
    const { captured, matcher } = captureBody();
    nock(CANNY_HOST)
      .post(PATH, matcher)
      .reply(200, updatePostExamplePayload.data);
    const { result } = await invoke(updatePost, params);
    expect(captured.body).toStrictEqual({
      apiKey: "test-api-key",
      postID: "553c3ef8b8cdcd1501ba1238",
      title: "Add dark mode support",
      eta: "07/2026",
    });
    expect(result.data).toStrictEqual(updatePostExamplePayload.data);
  });
  test("surfaces an API error", async () => {
    nock(CANNY_HOST).post(PATH).reply(422, { error: "invalid post" });
    await expect(invoke(updatePost, params)).rejects.toThrow();
  });
});
