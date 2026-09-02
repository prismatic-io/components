import { invokeDataSource } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { listTagsExamplePayload } from "../examplePayloads";
import { CANNY_HOST, captureBody, testConnection, V1 } from "../testHelpers";
import { selectTag } from "./selectTag";
const TAGS_LIST = `${V1}/tags/list`;
describe("selectTag", () => {
  afterEach(() => nock.cleanAll());
  test("returns label/key pairs for the selected board", async () => {
    const { captured, matcher } = captureBody();
    nock(CANNY_HOST)
      .post(TAGS_LIST, matcher)
      .reply(200, listTagsExamplePayload.data);
    const { result } = await invokeDataSource(selectTag, {
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
      { label: "Example Tag Name", key: "553c3ef8b8cdcd1501ba12bb" },
    ]);
  });
  test("returns an empty picklist when the board has no tags", async () => {
    nock(CANNY_HOST).post(TAGS_LIST).reply(200, { tags: [], hasMore: false });
    const { result } = await invokeDataSource(selectTag, {
      connection: testConnection,
      boardId: "553c3ef8b8cdcd1501ba1234",
    });
    expect(result).toStrictEqual([]);
  });
});
