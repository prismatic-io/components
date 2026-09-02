import { invokeDataSource } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { listPostsExamplePayload } from "../examplePayloads";
import { CANNY_HOST, captureBody, testConnection, V1 } from "../testHelpers";
import { selectPost } from "./selectPost";
const POSTS_LIST = `${V1}/posts/list`;
describe("selectPost", () => {
  afterEach(() => nock.cleanAll());
  test("returns label/key pairs for the selected board", async () => {
    const { captured, matcher } = captureBody();
    nock(CANNY_HOST)
      .post(POSTS_LIST, matcher)
      .reply(200, { ...listPostsExamplePayload.data, hasMore: false });
    const { result } = await invokeDataSource(selectPost, {
      connection: testConnection,
      boardId: "553c3ef8b8cdcd1501ba1234",
    });
    expect(captured.body).toStrictEqual({
      apiKey: "test-api-key",
      boardID: "553c3ef8b8cdcd1501ba1234",
      skip: 0,
      limit: 100,
    });
    expect(result).toStrictEqual([
      { label: "An awesome feature request", key: "553c3ef8b8cdcd1501ba1238" },
    ]);
  });
  test("returns an empty picklist when the board has no posts", async () => {
    nock(CANNY_HOST).post(POSTS_LIST).reply(200, { posts: [], hasMore: false });
    const { result } = await invokeDataSource(selectPost, {
      connection: testConnection,
      boardId: "553c3ef8b8cdcd1501ba1234",
    });
    expect(result).toStrictEqual([]);
  });
});
