import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { listPostsExamplePayload } from "../../examplePayloads";
import { CANNY_HOST, captureBody, testConnection, V1 } from "../../testHelpers";
import { listPosts } from "./listPosts";
const PATH = `${V1}/posts/list`;
const params = {
  connection: testConnection,
  boardId: "553c3ef8b8cdcd1501ba1234",
  authorId: undefined,
  companyId: undefined,
  tagIDs: ["553c3ef8b8cdcd1501ba4444"],
  fetchAll: false,
  pagination: { limit: 10, skip: 0 },
  listControls: { search: "dark mode", sort: "newest", status: "open" },
};
describe("listPosts", () => {
  afterEach(() => nock.cleanAll());
  test("returns one page of posts and forwards the list controls", async () => {
    const { captured, matcher } = captureBody();
    nock(CANNY_HOST)
      .post(PATH, matcher)
      .reply(200, listPostsExamplePayload.data);
    const { result } = await invoke(listPosts, params);
    expect(captured.body).toStrictEqual({
      apiKey: "test-api-key",
      boardID: "553c3ef8b8cdcd1501ba1234",
      tagIDs: ["553c3ef8b8cdcd1501ba4444"],
      limit: 10,
      skip: 0,
      search: "dark mode",
      sort: "newest",
      status: "open",
    });
    expect(result.data).toStrictEqual(listPostsExamplePayload.data);
  });
  test("surfaces an API error", async () => {
    nock(CANNY_HOST).post(PATH).reply(400, { error: "something went wrong" });
    await expect(invoke(listPosts, params)).rejects.toThrow();
  });
});
