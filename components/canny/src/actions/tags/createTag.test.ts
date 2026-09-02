import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { createTagExamplePayload } from "../../examplePayloads";
import { CANNY_HOST, captureBody, testConnection, V1 } from "../../testHelpers";
import { createTag } from "./createTag";
const PATH = `${V1}/tags/create`;
const params = {
  connection: testConnection,
  boardIdRequired: "553c3ef8b8cdcd1501ba1234",
  tagName: "bug",
};
describe("createTag", () => {
  afterEach(() => nock.cleanAll());
  test("creates a tag", async () => {
    const { captured, matcher } = captureBody();
    nock(CANNY_HOST)
      .post(PATH, matcher)
      .reply(200, createTagExamplePayload.data);
    const { result } = await invoke(createTag, params);
    expect(captured.body).toStrictEqual({
      apiKey: "test-api-key",
      boardID: "553c3ef8b8cdcd1501ba1234",
      name: "bug",
    });
    expect(result.data).toStrictEqual(createTagExamplePayload.data);
  });
  test("surfaces an API error", async () => {
    nock(CANNY_HOST).post(PATH).reply(422, { error: "invalid board" });
    await expect(invoke(createTag, params)).rejects.toThrow();
  });
});
