import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { retrieveTagExamplePayload } from "../../examplePayloads";
import { CANNY_HOST, captureBody, testConnection, V1 } from "../../testHelpers";
import { retrieveTag } from "./retrieveTag";
const PATH = `${V1}/tags/retrieve`;
const params = {
  connection: testConnection,
  tagId: "553c3ef8b8cdcd1501ba12bb",
};
describe("retrieveTag", () => {
  afterEach(() => nock.cleanAll());
  test("retrieves one tag by ID", async () => {
    const { captured, matcher } = captureBody();
    nock(CANNY_HOST)
      .post(PATH, matcher)
      .reply(200, retrieveTagExamplePayload.data);
    const { result } = await invoke(retrieveTag, params);
    expect(captured.body).toStrictEqual({
      apiKey: "test-api-key",
      id: "553c3ef8b8cdcd1501ba12bb",
    });
    expect(result.data).toStrictEqual(retrieveTagExamplePayload.data);
  });
  test("surfaces an API error", async () => {
    nock(CANNY_HOST).post(PATH).reply(404, { error: "tag not found" });
    await expect(invoke(retrieveTag, params)).rejects.toThrow();
  });
});
