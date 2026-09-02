import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { createPostExamplePayload } from "../../examplePayloads";
import { CANNY_HOST, captureBody, testConnection, V1 } from "../../testHelpers";
import { createPost } from "./createPost";
const PATH = `${V1}/posts/create`;
const params = {
  connection: testConnection,
  boardIdRequired: "553c3ef8b8cdcd1501ba1234",
  authorIdRequired: "553c3ef8b8cdcd1501ba9999",
  title: "Add dark mode support",
  details: "A dark mode option for the dashboard.",
  categoryId: undefined,
  additionalFields: {
    customFields: { priority: "high" },
    eta: "06/2026",
    etaPublic: true,
    imageURLs: ["https://example.com/image.png"],
    additionalFields: {},
  },
};
describe("createPost", () => {
  afterEach(() => nock.cleanAll());
  test("creates a post and flattens the additional fields", async () => {
    const { captured, matcher } = captureBody();
    nock(CANNY_HOST)
      .post(PATH, matcher)
      .reply(200, createPostExamplePayload.data);
    const { result } = await invoke(createPost, params);
    expect(captured.body).toStrictEqual({
      apiKey: "test-api-key",
      authorID: "553c3ef8b8cdcd1501ba9999",
      boardID: "553c3ef8b8cdcd1501ba1234",
      title: "Add dark mode support",
      details: "A dark mode option for the dashboard.",
      customFields: { priority: "high" },
      eta: "06/2026",
      etaPublic: true,
      imageURLs: ["https://example.com/image.png"],
    });
    expect(result.data).toStrictEqual(createPostExamplePayload.data);
  });
  test("surfaces an API error", async () => {
    nock(CANNY_HOST).post(PATH).reply(422, { error: "invalid board" });
    await expect(invoke(createPost, params)).rejects.toThrow();
  });
});
