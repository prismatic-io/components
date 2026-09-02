import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { retrieveCategoryExamplePayload } from "../../examplePayloads";
import { CANNY_HOST, captureBody, testConnection, V1 } from "../../testHelpers";
import { retrieveCategory } from "./retrieveCategory";
const PATH = `${V1}/categories/retrieve`;
const params = {
  connection: testConnection,
  categoryIdRequired: "553c3ef8b8cdcd1501ba12bb",
};
describe("retrieveCategory", () => {
  afterEach(() => nock.cleanAll());
  test("retrieves one category by ID", async () => {
    const { captured, matcher } = captureBody();
    nock(CANNY_HOST)
      .post(PATH, matcher)
      .reply(200, retrieveCategoryExamplePayload.data);
    const { result } = await invoke(retrieveCategory, params);
    expect(captured.body).toStrictEqual({
      apiKey: "test-api-key",
      id: "553c3ef8b8cdcd1501ba12bb",
    });
    expect(result.data).toStrictEqual(retrieveCategoryExamplePayload.data);
  });
  test("surfaces an API error", async () => {
    nock(CANNY_HOST).post(PATH).reply(404, { error: "category not found" });
    await expect(invoke(retrieveCategory, params)).rejects.toThrow();
  });
});
