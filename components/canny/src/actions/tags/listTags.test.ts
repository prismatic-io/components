import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { listTagsExamplePayload } from "../../examplePayloads";
import { CANNY_HOST, captureBody, testConnection, V1 } from "../../testHelpers";
import { listTags } from "./listTags";
const PATH = `${V1}/tags/list`;
const params = {
  connection: testConnection,
  boardId: "553c3ef8b8cdcd1501ba1234",
  fetchAll: false,
  pagination: { limit: 10, skip: 0 },
};
describe("listTags", () => {
  afterEach(() => nock.cleanAll());
  test("returns one page of tags for a board", async () => {
    const { captured, matcher } = captureBody();
    nock(CANNY_HOST)
      .post(PATH, matcher)
      .reply(200, listTagsExamplePayload.data);
    const { result } = await invoke(listTags, params);
    expect(captured.body).toStrictEqual({
      apiKey: "test-api-key",
      boardID: "553c3ef8b8cdcd1501ba1234",
      limit: 10,
      skip: 0,
    });
    expect(result.data).toStrictEqual(listTagsExamplePayload.data);
  });
  test("surfaces an API error", async () => {
    nock(CANNY_HOST).post(PATH).reply(400, { error: "something went wrong" });
    await expect(invoke(listTags, params)).rejects.toThrow();
  });
});
