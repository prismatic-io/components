import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { retrievePostExamplePayload } from "../../examplePayloads";
import { CANNY_HOST, captureBody, testConnection, V1 } from "../../testHelpers";
import { retrievePost } from "./retrievePost";
const PATH = `${V1}/posts/retrieve`;
const params = {
  connection: testConnection,
  postId: "553c3ef8b8cdcd1501ba1238",
};
describe("retrievePost", () => {
  afterEach(() => nock.cleanAll());
  test("retrieves one post by ID", async () => {
    const { captured, matcher } = captureBody();
    nock(CANNY_HOST)
      .post(PATH, matcher)
      .reply(200, retrievePostExamplePayload.data);
    const { result } = await invoke(retrievePost, params);
    expect(captured.body).toStrictEqual({
      apiKey: "test-api-key",
      id: "553c3ef8b8cdcd1501ba1238",
    });
    expect(result.data).toStrictEqual(retrievePostExamplePayload.data);
  });
  test("surfaces an API error", async () => {
    nock(CANNY_HOST).post(PATH).reply(404, { error: "post not found" });
    await expect(invoke(retrievePost, params)).rejects.toThrow();
  });
});
